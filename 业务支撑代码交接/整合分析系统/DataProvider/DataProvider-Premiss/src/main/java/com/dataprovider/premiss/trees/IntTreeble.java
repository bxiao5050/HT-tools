package com.dataprovider.premiss.trees;

import com.dataprovider.premiss.interfaces.IIntTreeNode;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by linlin.zhang on 2017/8/11.
 */
public class IntTreeble {
    private List<? extends IIntTreeNode> list;
    public IntTreeble(List<? extends IIntTreeNode> list){
        this.list = list;
    }
    public List<IIntTreeNode> getTree(int parentId){
        List<IIntTreeNode> root = new ArrayList<IIntTreeNode>();
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
