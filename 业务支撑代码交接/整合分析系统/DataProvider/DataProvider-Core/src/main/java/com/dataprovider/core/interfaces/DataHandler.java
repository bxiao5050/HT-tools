package com.dataprovider.core.interfaces;

import com.dataprovider.core.model.InputModel;
import com.dataprovider.core.model.OutputModel;

/**
 * Created by linlin.zhang on 2017/7/29.
 */
public interface DataHandler {
    OutputModel handler(InputModel model);
}
