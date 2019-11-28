package com.dataprovider.premiss.mappers;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.dataprovider.premiss.entitys.Resource;
import com.google.common.base.Joiner;
import com.google.common.base.Splitter;
import org.apache.ibatis.annotations.*;

import java.util.*;


/**
 * Created by linlin.zhang on 2017/8/11.
 */
public interface ResourceMapper extends BaseMapper<Resource> {

    @SelectProvider(type = ResourceMapper.ResourceProvider.class,method = "getResourceLevel")
    List<Resource> getResourceLevel(@Param("resources") List<Resource> resources);

    public class ResourceProvider {
        static Joiner regx = Joiner.on("|").skipNulls();
        static Joiner joiner = Joiner.on(",").skipNulls();
        static Splitter splitter = Splitter.on(">");
        public String getResourceLevel(Map attr){
            List<Resource> resources = (List<Resource>)attr.get("resources");
            Set<String> children = new HashSet<String>(),parents = new HashSet<String>();
            for(int i = 0;i<resources.size();i++){
                if(!children.contains(resources.get(i).getPath()))
                    children.add(resources.get(i).getPath());
                Iterator <String> strings = splitter.split(resources.get(i).getPath()).iterator();
                while (strings.hasNext()){
                    String parent = strings.next();
                    if(!parents.contains(parent)&&!parent.equals("")){
                        parents.add(parent);
                    }
                }
            }
            return "select id,resource_id resourceId,resource_name resourceName,url,game_id gameId,resource_type resourceType,parent_id parentId,path from t_e_resource where path REGEXP '"+regx.join(children.toArray())+"' or id in ("+joiner.join(parents)+ ")";
        }
    }
}
