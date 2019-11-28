package com.dataprovider.core.model;

import java.util.*;
/**
 * Created by linlin.zhang on 2017/8/9.
 */
public class TranslateModel extends OutputModel {

    private String language;

    private Map<String,String> translateData;

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public Map<String, String> getTranslateData() {
        return translateData;
    }

    public void setTranslateData(Map<String, String> translateData) {
        this.translateData = translateData;
    }
}
