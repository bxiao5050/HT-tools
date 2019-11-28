package com.dataprovider.core.handlers.language;

import com.baomidou.mybatisplus.mapper.Condition;
import com.dataprovider.core.interfaces.DataHandler;
import com.dataprovider.core.model.InputModel;
import com.dataprovider.core.model.OutputModel;
import com.dataprovider.core.model.TranslateModel;
import com.dataprovider.dao.DaoFactory;
import com.dataprovider.dao.entitys.Language;
import com.dataprovider.dao.mappers.CacheMapper;
import com.dataprovider.dao.mappers.LanguageMapper;
import com.google.common.base.Joiner;
import com.xiaoleilu.hutool.crypto.SecureUtil;
import com.xiaoleilu.hutool.util.CollectionUtil;
import org.apache.ibatis.session.SqlSession;

import java.util.*;

/**
 * Created by linlin.zhang on 2017/8/9.
 */
@com.dataprovider.core.annotations.DataHandler(index = 10,description = "过滤已翻译的语言")
public class GrepDataHandler implements DataHandler {

    private Joiner joiner = Joiner.on("/n").skipNulls();

    public OutputModel handler(InputModel model) {
        TranslateModel translateModel = (TranslateModel) model;
        Map<String, String> transMap = new HashMap<String, String>();
        List<Language> languageList = null;
        List<String> disintct = new ArrayList<String>();
        SqlSession session = DaoFactory.getInstance(0);
        try {
            LanguageMapper mapper = session.getMapper(LanguageMapper.class);
            String[] list = translateModel.getExecuteCommand().split("/n");
            for(int i = 0;i<list.length;i++){
                String trim = list[i].trim();
                if(!disintct.contains(trim))
                    disintct.add(trim);
            }
            languageList = mapper.selectList(Condition.create().in("language_key", disintct).eq("language_type", translateModel.getLanguage()));
        }finally {
            session.commit();
            session.close();
        }
        ArrayList<String> nextList = new ArrayList<String>();
        for(int j = 0;j<disintct.size();j++) {
            Boolean isExit = false;
            for (int i = 0; i < languageList.size(); i++) {
                if(languageList.get(i).getLanguageKey().equals(disintct.get(j))){
                    transMap.put(languageList.get(i).getLanguageKey(),languageList.get(i).getLanguageValue());
                    isExit  = true;
                    break;
                }
            }
            if(isExit == false){
                nextList.add(disintct.get(j));
            }
        }
        translateModel.setTranslateData(transMap);
        translateModel.setExecuteCommand(joiner.join(nextList));
        return translateModel;
    }
}
