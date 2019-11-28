package com.sevenroad.oas.mail.model;

import com.google.common.base.Function;
import com.google.common.collect.Lists;
import com.google.common.math.DoubleMath;
import com.mchange.lang.DoubleUtils;
import com.sevenroad.oas.mail.task.bean.DayReport;
import com.sevenroad.oas.mail.task.bean.MediaReport;
import com.sevenroad.oas.mail.task.bean.TotalReport;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.List;

/**
 * Created by linlin.zhang on 2018/3/7/007.
 */
public class ReportEntity {
    /**
     * 总览
     */
    public static class TotalData{
        List<GameTotalItem> mobileGame;

        public List<GameTotalItem> getMobileGame() {
            return mobileGame;
        }

        public void setMobileGame(List<GameTotalItem> mobileGame) {
            this.mobileGame = mobileGame;
        }

        public void transform(List<TotalReport> totalReports){
            TotalReport total = new TotalReport();
            total.setGame_name("总计");
            for(TotalReport item : totalReports){
                total.setBudget_month(item.getBudget_month() + total.getBudget_month());
                total.setToday(item.getToday() + total.getToday());
                total.setPay_month(item.getPay_month() + total.getPay_month());
            }
            if(total.getPay_month() > 0) {
                total.setPercent(total.getPay_month() * 100 / total.getBudget_month());
            }else{
                total.setPercent(0);
            }
            totalReports.add(total);
           this.mobileGame = Lists.transform(totalReports, new Function<TotalReport, GameTotalItem>() {
                @Override
                public GameTotalItem apply(TotalReport totalReport) {
                    GameTotalItem item = new GameTotalItem();
                    item.setGameName(totalReport.getGame_name().trim());
                    //保留2位小数
                    item.setMonthBudget(new BigDecimal(totalReport.getBudget_month()).setScale(2,BigDecimal.ROUND_DOWN).doubleValue());
                    item.setMonthCost(new BigDecimal(totalReport.getPay_month()).setScale(2,BigDecimal.ROUND_DOWN).doubleValue());
                    item.setPercent(new BigDecimal(totalReport.getPercent()).setScale(2,BigDecimal.ROUND_DOWN).doubleValue());
                    item.setTodayCost(new BigDecimal(totalReport.getToday()).setScale(2,BigDecimal.ROUND_DOWN).doubleValue());
                    return item;
                }
            });
        }
    }

    public static class GameTotalItem{
        private String gameName;
        private double todayCost;
        private double monthCost;
        private double monthBudget;
        private double percent;

        public String getGameName() {
            return gameName;
        }

        public void setGameName(String gameName) {
            this.gameName = gameName;
        }

        public double getTodayCost() {
            return todayCost;
        }

        public void setTodayCost(double todayCost) {
            this.todayCost = todayCost;
        }

        public double getMonthCost() {
            return monthCost;
        }

        public void setMonthCost(double monthCost) {
            this.monthCost = monthCost;
        }

        public double getMonthBudget() {
            return monthBudget;
        }

        public void setMonthBudget(double monthBudget) {
            this.monthBudget = monthBudget;
        }

        public double getPercent() {
            return percent;
        }

        public void setPercent(double percent) {
            this.percent = percent;
        }
    }

    /**
     * 单个游戏
     */
    public static class GameData{
        private String gameName;
        private List<GameDataItem> rows;
        private ChartData chartData;
        public String getGameName() {
            return gameName;
        }

        public void setGameName(String gameName) {
            this.gameName = gameName;
        }

        public List<GameDataItem> getRows() {
            return rows;
        }

        public void setRows(List<GameDataItem> rows) {
            this.rows = rows;
        }

        public ChartData getChartData() {
            return chartData;
        }

        public void setChartData(ChartData chartData) {
            this.chartData = chartData;
        }

        public void transform(String gameName, List<MediaReport> medisSource, List<DayReport> daySource){
            this.gameName = gameName;
            this.rows = Lists.newArrayList();
            GameDataItem sum = new GameDataItem();
            sum.setMediaSource("total:");
            for(MediaReport mediaReport : medisSource){
                GameDataItem item = new GameDataItem();
                item.setSystem(mediaReport.get纬度());
                item.setCost(mediaReport.get花费());
                sum.setCost(sum.getCost()+ item.getCost());
                item.setInstall(mediaReport.get激活());
                sum.setInstall(sum.getInstall()+ item.getInstall());
                item.setMediaSource(mediaReport.get媒体());
                item.setReg(mediaReport.get注册());
                sum.setReg(sum.getReg()+ item.getReg());
                item.setRoles(mediaReport.get创角());
                sum.setRoles(sum.getRoles()+ item.getRoles());
                item.setInstallCost(mediaReport.get激活成本());
                sum.setInstallCost(sum.getInstallCost()+ item.getInstallCost());
                item.setRegPercent(mediaReport.get注册率());
                item.setRolesPercent(mediaReport.get创角率());
                item.setRegCost(mediaReport.get注册成本());
                sum.setRegCost(sum.getRegCost()+ item.getRegCost());
                item.setRolesCost(mediaReport.get创角成本());
                sum.setRolesCost(sum.getRolesCost()+ item.getRolesCost());
                this.rows.add(item);
            }

            if(sum.getInstall() > 0){
                sum.setInstallCost(sum.getCost()/ sum.getInstall());
            }
            if(sum.getReg() > 0)
                sum.setRegCost(sum.getCost()/sum.getReg());
            if(sum.getRoles() > 0)
                sum.setRolesCost(sum.getCost()/sum.getRoles());

            if(sum.getInstall()>0){
                sum.setRegPercent(sum.getReg()*100/sum.getInstall());
                sum.setRolesPercent(sum.getReg()*100/sum.getInstall());
            }

            //保留2位小数
            sum.setInstallCost(new BigDecimal(sum.getInstallCost()).setScale(2, BigDecimal.ROUND_DOWN).doubleValue());
            sum.setRegCost(new BigDecimal(sum.getRegCost()).setScale(2, BigDecimal.ROUND_DOWN).doubleValue());
            sum.setRolesCost(new BigDecimal(sum.getRolesCost()).setScale(2, BigDecimal.ROUND_DOWN).doubleValue());
            sum.setRegPercent(new BigDecimal(sum.getRegPercent()).setScale(2, BigDecimal.ROUND_DOWN).doubleValue());
            sum.setRolesPercent(new BigDecimal(sum.getRolesPercent()).setScale(2, BigDecimal.ROUND_DOWN).doubleValue());

            this.rows.add(sum);
            this.reculateColor();
            chartData = new ChartData();
            int[] install = new int[daySource.size()],
                    reg = new int[daySource.size()],
                    role = new int[daySource.size()];
            double[] cost = new double[daySource.size()],
                    recharge=new double[daySource.size()],
                    installCosts=new double[daySource.size()],
                    regCosts=new double[daySource.size()],
                    roleCosts=new double[daySource.size()];

            for(int i = 0;i<daySource.size();i++){
                install[i] = daySource.get(i).get激活();
                reg[i] = daySource.get(i).get注册();
                role[i] = daySource.get(i).get创角();
                cost[i] = daySource.get(i).get花费();
                recharge[i]=daySource.get(i).get充值();
                installCosts[i]=daySource.get(i).get激活成本();
                regCosts[i]=daySource.get(i).get注册成本();
                roleCosts[i]=daySource.get(i).get创角成本();
            }
            chartData.setCost(cost);
            chartData.setInstall(install);
            chartData.setRegs(reg);
            chartData.setRoles(role);
            chartData.setRecharge(recharge);
            chartData.setInstallCosts(installCosts);
            chartData.setRegCosts(regCosts);
            chartData.setRoleCosts(roleCosts);
        }

        protected String getConstStyle(double value){
            if(value < 30){
                return "level1";
            }else if(value <= 50){
                return "level2";
            }else if(value <=  70){
                return "level3";
            }else if(value <= 90) {
                return "level4";
            }
            else {
                return "level5";
            }
        }
        protected String getPercentStyle(double sum,double value){
            double percent =  value*100.00/sum;
            if(percent < 20){
                return "level5";
            }else if(percent<= 40){
                return "level4";
            }else if(percent<= 60){
                return "level3";
            }else if(percent<= 80){
                return "level2";
            }else{
                return "level1";
            }
        }
        public void reculateColor(){
            double sumInstall = 0,sumRegs = 0,sumRoles = 0;
            for(GameDataItem item : rows){
                sumInstall += item.getInstallCost();
                sumRegs += item.getRegCost();
                sumRoles += item.getRolesCost();
            }
            for(GameDataItem item : rows){
                item.setRegsColor(getConstStyle(item.getRegPercent()));
                item.setRolesColor(getConstStyle(item.getRolesPercent()));
                item.setInstallCostColor(getPercentStyle(sumInstall/rows.size()*2,item.getInstallCost()));
                item.setRegCostColor(getPercentStyle(sumRegs/rows.size()*2,item.getRegCost()));
                item.setRolesCostColor(getPercentStyle(sumRoles/rows.size()*2,item.getRolesCost()));
            }
        }
    }
    public static class GameDataItem{
        private String mediaSource;
        private String system;
        private int install;
        private int reg;
        private int roles;
        private double cost = 0;
        private double regPercent = 0;
        private double rolesPercent = 0;
        private double installCost = 0;
        private double regCost = 0;
        private double rolesCost = 0;

        private String regsColor;
        private String rolesColor;

        public double getInstallCost() {
            return installCost;
        }

        public void setInstallCost(double installCost) {
            this.installCost = installCost;
        }

        private String installCostColor;
        private String regCostColor;
        private String rolesCostColor;

        public String getMediaSource() {
            return mediaSource;
        }

        public void setMediaSource(String mediaSource) {
            this.mediaSource = mediaSource;
        }

        public String getSystem() {
            return system;
        }

        public void setSystem(String system) {
            this.system = system;
        }

        public int getInstall() {
            return install;
        }

        public void setInstall(int install) {
            this.install = install;
        }

        public int getReg() {
            return reg;
        }

        public void setReg(int reg) {
            this.reg = reg;
        }

        public int getRoles() {
            return roles;
        }

        public void setRoles(int roles) {
            this.roles = roles;
        }

        public double getCost() {
            return cost;
        }

        public void setCost(double cost) {
            this.cost = cost;
        }

        public double getRegPercent() {
            return regPercent;
        }

        public void setRegPercent(double regPercent) {
            this.regPercent = regPercent;
        }

        public double getRolesPercent() {
            return rolesPercent;
        }

        public void setRolesPercent(double rolesPercent) {
            this.rolesPercent = rolesPercent;
        }

        public double getRegCost() {
            return regCost;
        }

        public void setRegCost(double regCost) {
            this.regCost = regCost;
        }

        public double getRolesCost() {
            return rolesCost;
        }

        public void setRolesCost(double rolesCost) {
            this.rolesCost = rolesCost;
        }

        public String getRegsColor() {
            return regsColor;
        }

        public void setRegsColor(String regsColor) {
            this.regsColor = regsColor;
        }

        public String getRolesColor() {
            return rolesColor;
        }

        public void setRolesColor(String rolesColor) {
            this.rolesColor = rolesColor;
        }

        public String getInstallCostColor() {
            return installCostColor;
        }

        public void setInstallCostColor(String installCostColor) {
            this.installCostColor = installCostColor;
        }

        public String getRegCostColor() {
            return regCostColor;
        }

        public void setRegCostColor(String regCostColor) {
            this.regCostColor = regCostColor;
        }

        public String getRolesCostColor() {
            return rolesCostColor;
        }

        public void setRolesCostColor(String rolesCostColor) {
            this.rolesCostColor = rolesCostColor;
        }
    }

    public static class ChartData{
        private int[] install;
        private int[] regs;
        private int[] roles;
        private double[] cost;
        private double[] recharge;
        private double[] installCosts;
        private double[] regCosts;
        private double[] roleCosts;

        public int[] getInstall() {
            return install;
        }

        public void setInstall(int[] install) {
            this.install = install;
        }

        public int[] getRegs() {
            return regs;
        }

        public void setRegs(int[] regs) {
            this.regs = regs;
        }

        public int[] getRoles() {
            return roles;
        }

        public void setRoles(int[] roles) {
            this.roles = roles;
        }

        public double[] getCost() {
            return cost;
        }

        public void setCost(double[] cost) {
            this.cost = cost;
        }

        public double[] getRecharge() {
            return recharge;
        }

        public void setRecharge(double[] recharge) {
            this.recharge = recharge;
        }

        public double[] getInstallCosts() {
            return installCosts;
        }

        public void setInstallCosts(double[] installCosts) {
            this.installCosts = installCosts;
        }

        public double[] getRegCosts() {
            return regCosts;
        }

        public void setRegCosts(double[] regCosts) {
            this.regCosts = regCosts;
        }

        public double[] getRoleCosts() {
            return roleCosts;
        }

        public void setRoleCosts(double[] roleCosts) {
            this.roleCosts = roleCosts;
        }
    }

    private String countDate;
    private String titleContent;
    private String remark;
    TotalData totalData;
    List<GameData> gameData;

    List<String> dateList;

    public String getCountDate() {
        return countDate;
    }

    public void setCountDate(String countDate) {
        this.countDate = countDate;
    }

    public String getTitleContent() {
        return titleContent;
    }

    public void setTitleContent(String titleContent) {
        this.titleContent = titleContent;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public TotalData getTotalData() {
        return totalData;
    }

    public void setTotalData(TotalData totalData) {
        this.totalData = totalData;
    }

    public List<GameData> getGameData() {
        return gameData;
    }

    public void setGameData(List<GameData> gameData) {
        this.gameData = gameData;
    }

    public List<String> getDateList() {
        return dateList;
    }

    public void setDateList(List<String> dateList) {
        this.dateList = dateList;
    }
}
