package com.dataprovider.core.channels;

import com.dataprovider.core.annotations.DataChannel;
import com.dataprovider.core.interfaces.DataHandler;
import com.dataprovider.core.model.InputModel;
import com.dataprovider.core.model.OutputModel;
import com.dataprovider.core.utils;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/8/2.
 */
@DataChannel(handlers = {0,3})
public class IntergrateChannel {
    List<DataHandler> handlers;
    public OutputModel doHandler(InputModel input) {

        for(int i = 0;i<handlers.size();i++) {
            DataHandler next = handlers.get(i);
            if (next != null) {
                input = next.handler(input);
            }
        }
        return (OutputModel) input;
    }
    public IntergrateChannel(){
        DataChannel metaData = getClass().getAnnotation(DataChannel.class);
        int[] handlers = metaData.handlers();
        this.handlers = new ArrayList<DataHandler>();
        for(int i = 0;i<handlers.length;i++) {
            this.handlers.add(utils.GetDataHandler(handlers[i]));
        }
    }
}
