package com.dataprovider.premiss.trees;

import com.dataprovider.premiss.interfaces.IStringTreeNode;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/8/11.
 */
public class StringTreeble {
    private List<? extends IStringTreeNode> list;
    public StringTreeble(List<? extends IStringTreeNode> list){
        this.list = list;
    }
    public List<IStringTreeNode> getTree(String parentId){
        List<IStringTreeNode> root = new ArrayList<IStringTreeNode>();
        for(int i = 0;i<list.size();i++){
            if(list.get(i).TreeNodeParentId() == parentId){
                root.add(list.get(i));
            }
        }
        for(int i = 0;i<root.size();i++){
            list.remove(root.get(i));
            root.get(i).setChildren(getTree(root.get(i).TreeNodeId()));
        }
        return root;
    }
}
