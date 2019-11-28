package com.dataprovider.premiss.mappers;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.dataprovider.premiss.entitys.Resource;
import com.dataprovider.premiss.entitys.RoleResource;
import com.dataprovider.premiss.entitys.UserGroup;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

/**
 * Created by linlin.zhang on 2017/9/5.
 */
public interface RoleResourceMapper  extends BaseMapper<RoleResource> {
    @Update("update data_premiss.t_e_role_resource set status = 0 where actor_id = #{roleId} and resource_id in (${ids})")
    boolean changeState(@Param("roleId") int roleId, @Param("ids") String ids);
    @Delete("delete  a from t_e_role_resource a join t_e_resource b on \n" +
            "a.actor_id = #{roleId} and b.game_id = #{gameId} and b.resource_type = #{type} and b.id = a.resource_id  ")
    boolean deletePermiss(@Param("roleId") int roleId, @Param("gameId") int gameId,@Param("type") String type);
}
