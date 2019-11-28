package com.dataprovider.api.services;

import com.dataprovider.core.channels.TranslateChannel;
import com.dataprovider.core.model.TranslateModel;
import com.xiaoleilu.hutool.json.JSONUtil;
import org.springframework.stereotype.Service;

/**
 * Created by linlin.zhang on 2017/8/8.
 */
@Service
public class TranslateService {
    private TranslateChannel channel = new TranslateChannel();
    public final  String EN = "en";
    public final  String Tradition="cht";
    public final  String CHS="zh";

    public String TranslateCHS(String translateString){
        TranslateModel model = new TranslateModel();
        model.setExecuteCommand(translateString);
        model.setLanguage(CHS);
        channel.doHandler(model);
        return JSONUtil.toJsonStr(model.getTranslateData());
    }
    public String TranslateEN(String translateString){
        TranslateModel model = new TranslateModel();
        model.setExecuteCommand(translateString);
        model.setLanguage(EN);
        channel.doHandler(model);
        return JSONUtil.toJsonStr(model.getTranslateData());
    }
    public String TranslateTradition(String translateString){
        TranslateModel model = new TranslateModel();
        model.setExecuteCommand(translateString);
        model.setLanguage(Tradition);
        channel.doHandler(model);
        return JSONUtil.toJsonStr(model.getTranslateData());
    }
}
