package com.dataprovider.premiss.interfaces;

import com.baomidou.mybatisplus.annotations.TableField;

import java.util.List;

/**
 * Created by linlin.zhang on 2017/8/11.
 */
public abstract class IStringTreeNode {
    @TableField(exist = false)
    private List<IStringTreeNode> children;

    abstract public String TreeNodeId();
    abstract public String TreeNodeParentId();

    public List<IStringTreeNode> getChildren() {
        return children;
    }

    public void setChildren(List<IStringTreeNode> children) {
        this.children = children;
    }
}
