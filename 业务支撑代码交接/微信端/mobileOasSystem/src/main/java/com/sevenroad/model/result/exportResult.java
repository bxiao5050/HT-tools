package com.sevenroad.model.result;

import com.sevenroad.model.resultModel;

/**
 * Created by linlin.zhang on 2016/12/1.
 */
public class exportResult  extends resultModel {
    private String localFile;
    private String exportFile;
    public exportResult(String localFile,String exportFile){
        this.localFile = localFile;
        this.exportFile = exportFile;
    }

    public String getExportFile() {
        return exportFile;
    }

    public String getLocalFile() {
        return localFile;
    }

    @Override
    public String toString() {
        return super.toString();
    }
}
