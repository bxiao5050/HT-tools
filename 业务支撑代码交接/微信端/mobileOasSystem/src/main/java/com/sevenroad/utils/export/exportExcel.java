package com.sevenroad.utils.export;

import com.sevenroad.utils.config.systemConfig;
import com.sevenroad.utils.data.DataTable;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.util.CellRangeAddress;

import java.io.File;
import java.sql.Types;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedList;

/**
 * Created by linlin.zhang on 2016/11/4.
 */
public class exportExcel implements enableExportExcel {
    protected HSSFCellStyle getColumnStyle(HSSFWorkbook excel){
        HSSFCellStyle style = excel.createCellStyle();
        HSSFFont font = excel.createFont();
        font.setBold(true);
        style.setFont(font);
        style.setAlignment(HorizontalAlignment.CENTER);
        return style;
    }
    protected void setCellValue(HSSFCell cell,Object value,int type){
        switch (type){
            case Types.INTEGER:cell.setCellValue(Double.valueOf((value.toString())));
                break;
            case Types.NUMERIC:
                cell.setCellValue(Double.valueOf((value.toString())));
                break;
            default:cell.setCellValue(value.toString());break;
        }
    }

    @Override
    public String exportExcel(String fileName,LinkedList<DataTable> tables) throws Exception {
        HSSFWorkbook excel = new HSSFWorkbook();
        for(int i = 0;i<tables.size();i++) {
            DataTable table = tables.get(i);
            String[] columnsName = table.getColumnNames();
            int[] columnType = table.getColumnTypes();
            LinkedList<String[]> rows = table.getRows();
            HSSFSheet sheet = excel.createSheet(table.getTableName());
            HSSFRow title = sheet.createRow(0);
            HSSFCellStyle columnStyle = getColumnStyle(excel);
            //添加表名
            HSSFCell cell = title.createCell(0);
            cell.setCellValue(table.getTableName());
            cell.setCellStyle(columnStyle);
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0,columnsName.length-1));
            //列名
            HSSFRow row = sheet.createRow(1);
            for(int j =0;j<columnsName.length;j++) {
                cell = row.createCell(j);
                cell.setCellValue(columnsName[j]);
                cell.setCellStyle(columnStyle);
                sheet.autoSizeColumn(j,true);
            }
            //添加记录
            for(int j = 0;j<rows.size();j++){
                String[] item = rows.get(j);
                row = sheet.createRow(j+2);
                for(int z = 0;z<columnType.length;z++){
                    cell = row.createCell(z);
                    setCellValue(cell,item[z],columnType[z]);
                }
            }
        }

        File newFile = new File(systemConfig.getOtherConfig().exportExcel);
        if(!newFile.exists()) newFile.mkdir();
        else newFile = new File(systemConfig.getOtherConfig().exportExcel+fileName);
        excel.write(newFile);
        return fileName;
    }
}
