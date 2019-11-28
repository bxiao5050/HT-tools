package com.dataprovider.premiss;

import com.baomidou.mybatisplus.mapper.Condition;
import com.dataprovider.dao.DaoFactory;
import com.dataprovider.premiss.entitys.Resource;
import com.dataprovider.premiss.entitys.UserGroup;
import com.dataprovider.premiss.interfaces.IIntTreeNode;
import com.dataprovider.premiss.mappers.ResourceMapper;
import com.dataprovider.premiss.mappers.UserGroupMapper;
import com.dataprovider.premiss.mappers.UserMapper;
import com.dataprovider.premiss.trees.IntTreeble;
import org.apache.ibatis.session.SqlSession;

import java.util.List;

/**
 * Created by linlin.zhang on 2017/8/9.
 */
public class PremissFactory {


    public static void main(String[] args){
        SqlSession source = DaoFactory.getInstance(4);
        List<IIntTreeNode> zoneTree = null;
        try{

            ResourceMapper mapper = source.getMapper(ResourceMapper.class);
//            List<Resource> result = mapper.selectList(Condition.create().eq("resource_id",1).eq("game_id",10096));
//            List<Resource> powerList = mapper.getResourceLevel(result);

//            zoneTree = treeble.getTree(0);
//            System.out.println("11111111");

            UserGroupMapper userMapper = source.getMapper(UserGroupMapper.class);
            UserGroup group = userMapper.selectById(3);
            List<Resource> level = userMapper.getUserGroupLevelPath(group);
            List<Resource> powerList = mapper.getResourceLevel(level);
            IntTreeble treeble = new IntTreeble(powerList);
            zoneTree = treeble.getTree(0);
                        System.out.println("11111111");

        }finally {
            source.close();
        }
    }
}
