package com.sevenroad.oas.web.model.consumer;

import com.sevenroad.oas.userPermiss.model.ItemPermiss;
import com.xiaoleilu.hutool.util.CollectionUtil;
import com.xiaoleilu.hutool.util.StrUtil;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/5/3.
 */
public class GetItemPermissConsumer implements CollectionUtil.Consumer<ItemPermiss> {
    private List<String> result = new ArrayList<String>();
    private int itemId;
    public GetItemPermissConsumer(int itemId){
        this.itemId = itemId;
    }
    public String getResult(){
        return StrUtil.join(",",result);
    }
    public void accept(ItemPermiss itemPermiss, int i) {
        if(itemPermiss != null) {
            if (itemPermiss.getItemId() == itemId) {
                result.add(itemPermiss.getPermissInfo());
            }
        }
    }
}
