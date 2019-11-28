package com.dataprovider.api.controllers;

import com.dataprovider.api.services.TranslateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by linlin.zhang on 2017/8/8.
 * 调用百度api，一个月200万字
 */
@RestController
@RequestMapping("/Translate")
public class TranslateController {

    @Autowired
    TranslateService translateService;
    /**
     * 翻译为翻译为中文
     * @return
     */
    @RequestMapping("/CHS")
    public String TranslateCHS(String translateString){
        try {
            return translateService.TranslateCHS(translateString);
        }
        catch (Exception e){
            return "";
        }
    }
    /**
     * 翻译为翻译为英文
     * @return
     */
    @RequestMapping("/EN")
    public String TranslateEN(String translateString){
        try {
            return translateService.TranslateEN(translateString);
        }
        catch (Exception e){
            return "";
        }
    }

    /**
     * 翻译为繁体
     * @return
     */
    @RequestMapping("/Tradition")
    public String TranslateTradition(String translateString) {
        try {
            return translateService.TranslateTradition(translateString);
        }
        catch (Exception e){
            return "";
        }
    }
}
