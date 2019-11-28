package com.sevenroad.model.result;

import com.sevenroad.model.resultModel;

/**
 * Created by linlin.zhang on 2017/2/7.
 */
public class changeGameResult extends resultModel {
    private int system_id ;
    private int game_id;
    public changeGameResult(int system_id,int game_id){
        this.system_id = system_id;
        this.game_id = game_id;
    }

    public int getGame_id() {
        return game_id;
    }

    public int getSystem_id() {
        return system_id;
    }
}
