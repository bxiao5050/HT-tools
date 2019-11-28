package com.dataprovider.premiss.mappers;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.dataprovider.premiss.entitys.UserGroup;
import com.dataprovider.premiss.entitys.UserGroupResource;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;

/**
 * Created by linlin.zhang on 2017/9/5.
 */
public interface UserGroupResourceMapper  extends BaseMapper<UserGroupResource> {
    @Update("update data_premiss.t_e_usergroup_resource set status = 0 where user_group_id = #{groupId} and resource_id in (${ids})")
    boolean changeState(@Param("groupId") int groupId, @Param("ids") String ids);

    @Delete("delete a from t_e_usergroup_resource a join t_e_resource b on \n" +
            "a.user_group_id = #{groupId} and b.game_id = #{gameId} and b.resource_type = #{type} and b.id = a.resource_id  ")
    boolean deletePermiss(@Param("groupId") int groupId, @Param("gameId") int gameId,@Param("type") String type);
}
