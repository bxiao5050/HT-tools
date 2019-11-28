package com.sevenroad.oas.mail.task.bean;

/**
 * Created by linlin.zhang on 2018/3/16/016.
 */
public class TotalReport {
    private String game_id;
    private String game_name;
    private double today;
    private double pay_month;
    private double budget_month;
    private double percent;


    public String getGame_name() {
        return game_name;
    }

    public void setGame_name(String game_name) {
        this.game_name = game_name;
    }

    public double getToday() {
        return today;
    }

    public void setToday(double today) {
        this.today = today;
    }

    public double getPay_month() {
        return pay_month;
    }

    public void setPay_month(double pay_month) {
        this.pay_month = pay_month;
    }

    public double getBudget_month() {
        return budget_month;
    }

    public void setBudget_month(double budget_month) {
        this.budget_month = budget_month;
    }

    public double getPercent() {
        return percent;
    }

    public void setPercent(double percent) {
        this.percent = percent;
    }

    public String getGame_id() {
        return game_id;
    }

    public void setGame_id(String game_id) {
        this.game_id = game_id;
    }
}
