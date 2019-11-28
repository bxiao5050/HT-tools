package com.sevenroad.oas.userPermiss.model;

import com.google.common.collect.Lists;
import com.sevenroad.oas.userPermiss.IPermiss;

import java.util.List;

/**
 * Created by linlin.zhang on 2017/4/26.
 */
public class MenuLeafPermiss extends MenuPermiss {
    private Boolean isAdd = false;
    private Boolean isDel = false;
    private Boolean isEdit = false;
    private Boolean isQeury = false;

    private List<String> dataView;

    public Boolean getAdd() {
        return isAdd;
    }


    public void setAdd(Boolean add) {
        isAdd = add;
    }

    public Boolean getDel() {
        return isDel;
    }

    public void setDel(Boolean del) {
        isDel = del;
    }

    public Boolean getEdit() {
        return isEdit;
    }

    public void setEdit(Boolean edit) {
        isEdit = edit;
    }

    public Boolean getQeury() {
        return isQeury;
    }

    public void setQeury(Boolean qeury) {
        isQeury = qeury;
    }

    public List<String> getDataView() {
        return dataView;
    }

    public void setDataView(List<String> dataView) {
        this.dataView = dataView;
    }

    @Override
    public int UniteId() {
        return super.UniteId();
    }

    public void addDataView(String dataView){
        if(dataView == null) return;
        if(this.dataView == null)
            this.dataView = Lists.newArrayList();
        for(String item : this.dataView){
            if(item.equals(dataView)) return ;
        }
        this.dataView.add(dataView);
    }

    @Override
    public Boolean isPermiss(List<? extends IPermiss> permisses) {
        for(int i = 0;i<permisses.size();i++){
            List<MenuLeafPermiss> menuLeafPermisses = ((MenuPermiss)permisses.get(i)).getChildrenMenu();
            for(int j = 0;j<menuLeafPermisses.size();j++){
                MenuLeafPermiss item = menuLeafPermisses.get(j);
                if(item.UniteId() == UniteId()){
                    this.isAdd = item.getAdd();
                    this.isDel = item.getDel();
                    this.isEdit = item.getEdit();
                    this.isQeury = item.getQeury();
                    this.setDataView(item.getDataView());
                    setOwner(true);
                    return getOwner();
                }
            }

        }
        setOwner(false);
        return getOwner();
    }
}
