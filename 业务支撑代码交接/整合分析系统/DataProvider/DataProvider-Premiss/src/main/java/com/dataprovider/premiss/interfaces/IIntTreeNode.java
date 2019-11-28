package com.dataprovider.premiss.interfaces;

import com.baomidou.mybatisplus.annotations.TableField;

import java.util.List;

/**
 * Created by linlin.zhang on 2017/8/11.
 */
public abstract class IIntTreeNode {
    @TableField(exist = false)
    private List<IIntTreeNode> children;

    abstract public int TreeNodeId();
    abstract public int TreeNodeParentId();

    public List<IIntTreeNode> getChildren() {
        return children;
    }

    public void setChildren(List<IIntTreeNode> children) {
        this.children = children;
    }
}
