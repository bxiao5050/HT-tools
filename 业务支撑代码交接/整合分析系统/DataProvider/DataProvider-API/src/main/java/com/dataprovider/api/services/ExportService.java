package com.dataprovider.api.services;

import cn.afterturn.easypoi.excel.ExcelExportUtil;
import cn.afterturn.easypoi.excel.entity.ExportParams;
import cn.afterturn.easypoi.excel.entity.params.ExcelExportEntity;
import com.dataprovider.dao.CustomDBQuery;
import com.dataprovider.dao.DaoFactory;
import com.dataprovider.dao.models.Table;
import org.apache.ibatis.session.SqlSession;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.*;

/**
 * Created by linlin.zhang on 2018/1/17.
 */
@Service
public class ExportService {

    public byte[] exportExcel(int connecitonId,String sql,int index){
        SqlSession source = DaoFactory.getInstance(connecitonId);
        CustomDBQuery query = new CustomDBQuery(source);
        List<Table> result = query.GetQueryResult(sql);
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        try {
                Table table = result.get(index);
                //标题
                List<ExcelExportEntity> entityList = new ArrayList<ExcelExportEntity>();
                //内容
                List<Map<String, Object>> dataResult = new ArrayList<Map<String, Object>>();
                for (Object ii : table.getColumnName()) {
                    entityList.add(new ExcelExportEntity((String) ii, ii));
                }
                Iterator<String[]> iterable = table.getRows().iterator();
                while (iterable.hasNext()) {
                    HashMap<String, Object> row = new HashMap<>();
                    String[] cells = iterable.next();
                    for (int j = 0; j < table.getColumnName().length; j++) {
                        row.put(table.getColumnName()[j], cells[j]);
                    }
                    dataResult.add(row);
                }
            Workbook workbook = ExcelExportUtil.exportExcel(new ExportParams("data", "data"), entityList,
                        dataResult);
            workbook.write(stream);
        }catch (Exception e){

        }

        return stream.toByteArray();
    }
}
