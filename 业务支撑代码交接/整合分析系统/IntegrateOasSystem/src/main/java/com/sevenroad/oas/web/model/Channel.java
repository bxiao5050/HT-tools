package com.sevenroad.oas.web.model;

/**
 * @author qinglong.luo
 * @date 2018/7/23 19:21
 * @desc  用于解析渠道的实体类
 * @ModifyBy
 */
public class Channel {
    private String channel_id;
    private String channel_name;

    public String getChannel_id() {
        return channel_id;
    }

    public void setChannel_id(String channel_id) {
        this.channel_id = channel_id;
    }

    public String getChannel_name() {
        return channel_name;
    }

    public void setChannel_name(String channel_name) {
        this.channel_name = channel_name;
    }

    @Override
    public String toString() {
        return "Channel{" +
                "channel_id='" + channel_id + '\'' +
                ", channel_name='" + channel_name + '\'' +
                '}';
    }
}
