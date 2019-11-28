package com.dataprovider.premiss.mappers;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.dataprovider.premiss.entitys.Resource;
import com.dataprovider.premiss.entitys.Role;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * Created by linlin.zhang on 2017/8/21.
 */
public interface RoleMapper extends BaseMapper<Role> {

    @Select("select c.* from t_e_role_resource b \n" +
            "join t_e_resource c on and b.status = 1 and b.resource_id = c.id and b.actor_id = #{roleId}")
    List<Resource> getAcotorResource(@Param("roleId")int roleId);

    @Select("select c.* from t_e_role_resource b \n" +
            "join t_e_resource c on b.status = 1 and b.resource_id = c.id and b.actor_id = #{roleId} and c.resource_type = #{type} and c.game_id = #{gameId}")
    List<Resource> getAcotorResourceByTypeAndGameId(@Param("roleId")int roleId,@Param("type")String type,@Param("gameId")int gameId);

}
