package com.dataprovider.core.interfaces;

/**
 * Created by linlin.zhang on 2017/7/29.
 */

import com.dataprovider.core.model.InputModel;
import com.dataprovider.core.model.OutputModel;

import java.util.List;

/**
 * 数据处理通道
 */
public interface DataChannel {
    OutputModel doHandler(InputModel input);
}
