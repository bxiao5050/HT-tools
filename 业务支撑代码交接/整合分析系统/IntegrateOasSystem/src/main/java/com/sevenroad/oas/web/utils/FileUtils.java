package com.sevenroad.oas.web.utils;

import com.google.common.collect.Lists;
import com.sevenroad.oas.dao.model.Column;
import com.sevenroad.oas.dao.model.TableResult;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.sql.Types;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/5/8.
 */
public class FileUtils {
    public static Logger logger = LoggerFactory.getLogger(FileUtils.class);
    public static Sheet getSheet(String sheetName,TableResult tableResult, Workbook workbook){
        try {
            Sheet sheet = workbook.createSheet(sheetName);
            List<Column> columnList = tableResult.getResult();
            HSSFCellStyle columnStyle = getColumnStyle((HSSFWorkbook) workbook);
            //添加表名
            Row title = sheet.createRow(0);
            Cell titleCell = title.createCell(0);
            titleCell.setCellValue(sheetName);
            titleCell.setCellStyle(columnStyle);
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, columnList.size() - 1));
            //创建列头
            Row columns = sheet.createRow(1);
            for (int i = 0; i < columnList.size(); i++) {
                getCell(columns.createCell(i),
                        Types.VARCHAR,
                        columnList.get(i).getColumnName());
            }
            //生成数据
            for (int i = 0; i < tableResult.getRowCount(); i++) {
                Row row = sheet.createRow(i + 2);
                for (int j = 0; j < columnList.size(); j++) {
                    getCell(row.createCell(j),
                            columnList.get(j).getColumnType(),
                            columnList.get(j).getRowData().get(i));

                }
            }
            //自动调节单元格内宽
            for(int i = 0;i<columnList.size();i++){
                sheet.autoSizeColumn(i);
            }
            return sheet;
        }
        catch (Exception e){
            logger.error("err : {}",e);
            return null;
        }

    }
    public static Cell getCell(Cell cell,int type,String value){
        try {
            switch (type) {
                case Types.DOUBLE:
                case Types.INTEGER:
                    cell.setCellValue(Double.valueOf(value));
                    break;
                case Types.DATE:
                default:
                    cell.setCellValue(value);
                    break;
            }
            return cell;
        }catch (Exception e){
            logger.error("err : {} ",e);
            cell.setCellValue(value);
            return cell;
        }
    }
    public static HSSFCellStyle getColumnStyle(HSSFWorkbook excel){
        HSSFCellStyle style = excel.createCellStyle();
        HSSFFont font = excel.createFont();
        font.setBold(true);
        style.setFont(font);
        style.setAlignment(HorizontalAlignment.CENTER);
        return style;
    }

    public static List<String> getExcelRowData(String fileName,MultipartFile file){
        try{
            List<String> rowDatas= Lists.newArrayList();
            Workbook workbook=null;
            try {
                workbook  =WorkbookFactory.create(file.getInputStream());
            } catch (Exception ex) {
                workbook = new HSSFWorkbook(file.getInputStream());
            }
            Sheet  sheet=workbook.getSheetAt(0);
            for (int i=0;i<=sheet.getLastRowNum();i++){
                Row  row=sheet.getRow(i);
                if(row!=null){
                    StringBuilder data=new StringBuilder();
                    for (int j=0;j<row.getLastCellNum();j++){
                        if(row.getCell(j)!=null){
                            switch (row.getCell(j).getCellType()){
                                case HSSFCell.CELL_TYPE_STRING:
                                    data.append(row.getCell(j).getStringCellValue()).append(",");
                                    break;
                                case HSSFCell.CELL_TYPE_NUMERIC:
                                    //如果为时间格式的内容
                                    if (HSSFDateUtil.isCellDateFormatted(row.getCell(j))) {
                                        //注：format格式 yyyy-MM-dd hh:mm:ss 中小时为12小时制，若要24小时制，则把小h变为H即可，yyyy-MM-dd HH:mm:ss
                                        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                                        data.append(sdf.format(HSSFDateUtil.getJavaDate(row.getCell(j).
                                                getNumericCellValue())).toString()).append(",");
                                        break;
                                    } else {
                                        data.append(new DecimalFormat("0").format(row.getCell(j).getNumericCellValue())).append(",");
                                    }
                                    break;
                            }
                        }
                    }

                    rowDatas.add(data.substring(0,data.length()-1));
                }
            }

            return rowDatas;
        }catch (Exception ex){
            logger.error("读取"+fileName+"文件出现异常:{}",ex.getMessage(),ex);
            return null;
        }
    }
}
