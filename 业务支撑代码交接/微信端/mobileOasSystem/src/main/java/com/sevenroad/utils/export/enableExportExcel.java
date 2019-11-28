package com.sevenroad.utils.export;

import com.sevenroad.utils.data.DataTable;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import java.util.LinkedList;

/**
 * Created by linlin.zhang on 2016/12/1.
 */
public interface enableExportExcel {
    String exportExcel(String fileName, LinkedList<DataTable> tables) throws Exception ;
}