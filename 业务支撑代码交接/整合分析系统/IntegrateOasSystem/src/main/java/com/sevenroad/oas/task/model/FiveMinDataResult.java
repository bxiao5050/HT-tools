package com.sevenroad.oas.task.model;

import java.util.List;

/**
 * Created by linlin.zhang on 2017/5/18.
 */
public class FiveMinDataResult {

    private List<FiveMinRow> msg;

    public List<FiveMinRow> getMsg() {
        return msg;
    }

    public void setMsg(List<FiveMinRow> msg) {
        this.msg = msg;
    }

    public class FiveMinRow{
        private double datetime;
        private int value;
        private String gamezone_id;

        public double getDatetime() {
            return datetime;
        }

        public void setDatetime(double datetime) {
            this.datetime = datetime;
        }

        public int getValue() {
            return value;
        }

        public void setValue(int value) {
            this.value = value;
        }

        public String getGamezone_id() {
            return gamezone_id;
        }

        public void setGamezone_id(String gamezone_id) {
            this.gamezone_id = gamezone_id;
        }
    }


}
