package com.sevenroad.oas.web.utils;

import com.sevenroad.oas.dao.model.DataView;
import com.sevenroad.oas.dao.model.TableResult;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Workbook;
import java.io.ByteArrayOutputStream;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/5/8.
 */
public class FileResult {
    private List<TableResult> tableResults;
    private DataView dataView;
    public FileResult(DataView dataView,List<TableResult> list){
        this.dataView = dataView;
        this.tableResults = list;
    }
    public byte[] getResult(){
        try {
            Workbook wb = new HSSFWorkbook();
            for(int i = 0;i<dataView.getExportTable().length;i++){
                int tableIndex = dataView.getExportTable()[i] - 1;
                String tableName = "table_ " + tableIndex;
                //得到导出表的长度
                int exportTableLenth = dataView.getExportTable().length;
                //获取到目前数据库中拥有的表名
                String[] exportNames = dataView.getExportName();
                if(exportNames.length<exportTableLenth){
                    String[] newExportNames = new String[exportTableLenth];
                    int j ;
                    for (j = 0; j <exportNames.length ; j++) {
                        newExportNames[j] = exportNames[j];
                    }
                    for (int k = 0; k <newExportNames.length-1 ; k++) {
                        newExportNames[j+k] = newExportNames[exportNames.length-1]+"_"+k+1;
                    }
                    if(tableResults.size()> tableIndex){
                        tableName = newExportNames[i];
                        FileUtils.getSheet(tableName, tableResults.get(tableIndex), wb);
                    }
                }
                else if(tableResults.size()> tableIndex){
                    tableName = exportNames[i];
                    FileUtils.getSheet(tableName, tableResults.get(tableIndex), wb);
                }
            }
            ByteArrayOutputStream stream = new ByteArrayOutputStream();
            wb.write(stream);
            return stream.toByteArray();
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
