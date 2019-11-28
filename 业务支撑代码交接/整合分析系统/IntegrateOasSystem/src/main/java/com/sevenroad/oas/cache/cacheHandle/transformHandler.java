package com.sevenroad.oas.cache.cacheHandle;

import com.google.common.base.Joiner;
import com.google.common.base.Strings;
import com.sevenroad.oas.cache.Imp.ColumnNameCache;
import com.sevenroad.oas.cache.Imp.TranslateColumnCache;
import com.sevenroad.oas.cache.model.HandlerContext;
import com.sevenroad.oas.cache.model.TableResultModel;
import com.sevenroad.oas.cache.model.TranslateProxy;
import com.sevenroad.oas.dao.Utils;
import com.sevenroad.oas.dao.model.Column;
import com.sevenroad.oas.dao.model.DBParam;
import com.sevenroad.oas.dao.model.ExcuteModel;
import com.sevenroad.oas.dao.model.TableResult;
import com.sevenroad.oas.web.common.SystemConfig;

import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by linlin.zhang on 2017/8/14.
 * 翻译
 */
public class transformHandler implements IHandler {


    private TranslateColumnCache translateColumnCache;

    private SystemConfig config;

    private ColumnNameCache columnNameCache;

    Joiner joiner = Joiner.on("/n").skipNulls();

    public transformHandler(ColumnNameCache columnNameCache, TranslateColumnCache cache, SystemConfig config){
        this.translateColumnCache = cache;
        this.config = config;
        this.columnNameCache = columnNameCache;
    }


    protected List<TableResult> transformRowData(String language, List<TableResult> tables){
        TableResult languageTable = new TableResult();
        languageTable.setResult(new ArrayList<Column>());
        Column name = new Column(),value = new Column();
        name.setColumnName("columnName");name.setColumnType(Types.VARCHAR);
        value.setColumnName("columnValue");value.setColumnType(Types.VARCHAR);
        List<String> nameRows = new ArrayList<>(),valueRows = new ArrayList<>();
        int count = 0;
        for(int i = 0;i<tables.size();i++) {
            List<Column> columns = tables.get(i).getResult();
            for (int j = 0; j < columns.size(); j++) {
                if (translateColumnCache.containKey(columns.get(j).getColumnName())) {
                    List<String> rowData = columns.get(j).getRowData();
                    String url = config.getTranslateUrl(language);
                    String originStr = joiner.join(rowData);
                    TranslateProxy proxy = new TranslateProxy(originStr, url);
                    Map<String, String> stringMap = proxy.translate();
                    if (stringMap.size() > 0) {
                        for (int z = 0; z < rowData.size(); z++) {
                            String trim = rowData.get(z).trim();
                            if (stringMap.containsKey(trim)) {
                                rowData.set(z, stringMap.get(trim));
                            }
                        }
                    }
                }
            }
        }
        return tables;
    }

    public List<TableResult> transformLanguage(String language,List<TableResult> tables){
        TableResult languageTable = new TableResult();
        languageTable.setResult(new ArrayList<Column>());
        Column name = new Column(),value = new Column();
        name.setColumnName("columnName");name.setColumnType(Types.VARCHAR);
        value.setColumnName("columnValue");value.setColumnType(Types.VARCHAR);
        List<String> nameRows = new ArrayList<>(),valueRows = new ArrayList<>();
        int count = 0;
        for(int i = 0;i<tables.size();i++){
            List<Column> columns = tables.get(i).getResult();
            for(int j = 0;j<columns.size();j++){
                if(translateColumnCache.containKey(columns.get(j).getColumnName())){
                    List<String> rowData = columns.get(j).getRowData();
                    String url = config.getTranslateUrl(language);
                    String originStr = joiner.join(rowData);
                    TranslateProxy proxy = new TranslateProxy(originStr,url);
                    Map<String,String> stringMap = proxy.translate();
                    if(stringMap.size()>0) {
                        for (int z = 0; z < rowData.size(); z++) {
                            if (stringMap.containsKey(rowData.get(z))) {
                                rowData.set(z, stringMap.get(rowData.get(z)));
                            }
                        }
                    }
                }
                String columnName = columnNameCache.getCache(language+columns.get(j).getColumnName());
                if(!Strings.isNullOrEmpty(columnName)){
                    languageTable.setRowCount(++count);
                    nameRows.add(columns.get(j).getColumnName());
                    valueRows.add(columnName);
                    columns.get(j).setColumnName(columnName);
                }
            }
        }
        name.setRowData(nameRows);
        value.setRowData(valueRows);
        languageTable.getResult().add(name);languageTable.getResult().add(value);
        tables.add(languageTable);
        return tables;
    }
    @Override
    public Boolean execute(HandlerContext ctx) {
        ExcuteModel excuteModel = ctx.getModel();
        int type = ctx.getTranslateType();
        DBParam language = Utils.getParam("language",excuteModel.getParams());
        TableResultModel result = ctx.getResult();
        if(language!=null){
            //只翻译内容
            if(type == 1) {
                result.setTables(this.transformRowData(language.getParamValue(), result.getTables()));
            } else if(type == 2){
                //翻译列名和内容
                result.setTables(this.transformLanguage(language.getParamValue(), result.getTables()));
            }else{
                //不翻译
                return true;
            }
        }
        return true;
    }
}
