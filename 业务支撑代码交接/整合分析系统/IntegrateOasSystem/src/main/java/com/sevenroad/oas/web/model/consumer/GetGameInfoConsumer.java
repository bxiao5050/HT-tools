package com.sevenroad.oas.web.model.consumer;

import com.sevenroad.oas.dao.model.tables.UserGameInfo;
import com.sevenroad.oas.userPermiss.model.GamePermiss;
import com.xiaoleilu.hutool.util.CollectionUtil;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/5/3.
 */
public class GetGameInfoConsumer implements CollectionUtil.Consumer<UserGameInfo> {
    List<GamePermiss> result = new ArrayList<GamePermiss>();
    public List<GamePermiss> getResult() {
        return result;
    }
    public void accept(UserGameInfo userGameInfo, int i) {
        GamePermiss gamePermiss = new GamePermiss();
        UserGameInfo gameInfo = userGameInfo;
        gamePermiss.setGameId(gameInfo.getGameId());
        gamePermiss.setGameName(gameInfo.getGameName());
        gamePermiss.setMainGameId(gameInfo.getMainGameId());
        gamePermiss.setSystemId(gameInfo.getSystemId());
        gamePermiss.setSystemName(gameInfo.getSystemName());
        result.add(gamePermiss);
    }
}
