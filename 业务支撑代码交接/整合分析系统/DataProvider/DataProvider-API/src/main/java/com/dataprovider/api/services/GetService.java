package com.dataprovider.api.services;

import com.dataprovider.core.Consts;
import com.dataprovider.core.channels.ForeignChannel;
import com.dataprovider.core.channels.GetChannel;
import com.dataprovider.core.channels.IntergrateChannel;
import com.dataprovider.core.model.InputModel;
import com.dataprovider.core.model.OutputModel;
import org.springframework.stereotype.Service;

/**
 * Created by linlin.zhang on 2017/7/31.
 */
@Service
public class GetService {
    GetChannel channel = new GetChannel();

    ForeignChannel foreignChannel = new ForeignChannel();

    IntergrateChannel intergrateChannel = new IntergrateChannel();

    public String GetData(int connectionId,String command,String params){
        InputModel model = new InputModel();
        model.setType(Consts.CUSTOMS_CACHE);
        model.setConnectionId(connectionId);
        model.setExecuteCommand(command);
        model.setExecuteParams(params);
        OutputModel out = channel.doHandler(model);
        return out.getExecuteResult();
    }

    /**
     * 获取海外查询接口
     * @param connectionId
     * @param command
     * @param params
     * @return
     */
    public String GetForeigh(int connectionId,String command,String params){
        InputModel model = new InputModel();
        model.setType(Consts.FOREIGN_CACHE);
        model.setConnectionId(connectionId);
        model.setExecuteCommand(command);
        model.setExecuteParams(params);
        OutputModel out = foreignChannel.doHandler(model);
        return out.getExecuteResult();
    }

    public String getIntergrate(int connectionId,String command,String params){
        InputModel model = new InputModel();
        model.setType(Consts.INTERGRATE_CACHE);
        model.setConnectionId(connectionId);
        model.setExecuteCommand(command);
        model.setExecuteParams(params);
        OutputModel out = intergrateChannel.doHandler(model);
        return out.getExecuteResult();
    }

}
