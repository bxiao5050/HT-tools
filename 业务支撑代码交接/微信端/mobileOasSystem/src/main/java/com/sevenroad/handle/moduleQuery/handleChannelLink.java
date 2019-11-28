package com.sevenroad.handle.moduleQuery;

import com.sevenroad.handle.channelImp;
import com.sevenroad.handle.handleImp;

import javax.servlet.http.HttpServletRequest;
import java.util.LinkedList;

/**
 * Created by linlin.zhang on 2016/11/25.
 */
public class handleChannelLink {
    private channelImp root;
    public handleChannelLink(HttpServletRequest request) throws Exception{

        root = new userAgentChannel(request);
        root.setChannelImp(new accessTokenChannel(request))
                .setChannelImp(new paramsChannel(request));
    }
    public channelImp doHandle() throws Exception{
            return root.execute(null);
    }
}
