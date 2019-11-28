package com.sevenroad.job.task.bean;

import java.util.List;
import java.util.Map;

/**
 * Created by linlin.zhang on 2018/4/11/011.
 */
public class weekReport {
    private String countDate;
    private String title;
    private List<GameData> gameData;
    public static class GameData{
        private String agentName;
        Map<String,String> gameData;

        public GameData(String agentName,Map<String,String> gameData){
            this.agentName = agentName;
            this.gameData = gameData;
        }

        public String getAgentName() {
            return agentName;
        }

        public void setAgentName(String agentName) {
            this.agentName = agentName;
        }

        public Map<String, String> getGameData() {
            return gameData;
        }

        public void setGameData(Map<String, String> gameData) {
            this.gameData = gameData;
        }
    }

    public String getCountDate() {
        return countDate;
    }

    public void setCountDate(String countDate) {
        this.countDate = countDate;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<GameData> getGameData() {
        return gameData;
    }

    public void setGameData(List<GameData> gameData) {
        this.gameData = gameData;
    }
}
