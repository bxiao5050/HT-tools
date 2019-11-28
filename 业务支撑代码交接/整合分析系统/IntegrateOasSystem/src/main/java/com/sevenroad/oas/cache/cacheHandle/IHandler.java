package com.sevenroad.oas.cache.cacheHandle;

import com.sevenroad.oas.cache.model.HandlerContext;
import com.sevenroad.oas.cache.model.TableResultModel;

/**
 * Created by linlin.zhang on 2017/8/14.
 */
public interface IHandler {
    Boolean execute(HandlerContext ctx);
}
