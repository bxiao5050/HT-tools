package com.dataprovider.core.handlers.language;

import com.dataprovider.core.helpers.TranslateService;
import com.dataprovider.core.interfaces.DataHandler;
import com.dataprovider.core.model.InputModel;
import com.dataprovider.core.model.OutputModel;
import com.dataprovider.core.model.TranslateModel;
import com.dataprovider.dao.DaoFactory;
import com.dataprovider.dao.entitys.Language;
import com.dataprovider.dao.mappers.LanguageMapper;
import com.dataprovider.dao.services.LanguageService;
import com.google.common.base.Splitter;
import com.xiaoleilu.hutool.util.StrUtil;
import org.apache.ibatis.session.SqlSession;

import java.util.List;

/**
 * Created by linlin.zhang on 2017/8/9.
 */
@com.dataprovider.core.annotations.DataHandler(index = 11,description = "翻译语言")

public class TranslateDataHandler implements DataHandler {
    private Splitter splitter = Splitter.on("/n").trimResults();
    public OutputModel handler(InputModel model) {
        TranslateModel translateModel = (TranslateModel) model;
        if(StrUtil.isNotEmpty(translateModel.getExecuteCommand())) {
           List<Language> result = TranslateService.translateLanguage(splitter.splitToList(translateModel.getExecuteCommand()), translateModel.getLanguage());
            SqlSession session = DaoFactory.getInstance(DaoFactory.INTERGRATE_CONNECTION,true);
            try {
                LanguageMapper mapper = session.getMapper(LanguageMapper.class);
                for (int i = 0; i < result.size(); i++) {
                    mapper.insert(result.get(i));
                    translateModel.getTranslateData().put(result.get(i).getLanguageKey(), result.get(i).getLanguageValue());
                }
            }finally {
                session.commit();
                session.close();
            }
        }
        return translateModel;
    }
}
