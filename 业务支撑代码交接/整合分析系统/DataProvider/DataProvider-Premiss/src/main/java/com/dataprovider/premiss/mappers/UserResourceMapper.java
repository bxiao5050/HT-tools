package com.dataprovider.premiss.mappers;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.dataprovider.premiss.entitys.UserGroup;
import com.dataprovider.premiss.entitys.UserResouce;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;

import java.util.List;

/**
 * Created by linlin.zhang on 2017/9/5.
 */
public interface UserResourceMapper  extends BaseMapper<UserResouce> {
    @Update("update data_premiss.t_e_user_resource set status = 0 where user_id = #{userId} and resource_id in (${ids})")
    boolean changeState(@Param("userId") int userId,@Param("ids") String ids);

    @Delete("delete a from t_e_user_resource a join t_e_resource b on \n" +
            "a.user_id = #{userId} and b.game_id = #{gameId} and b.resource_type = #{type} and b.id = a.resource_id  ")
    boolean deletePermiss(@Param("userId") int userId, @Param("gameId") int gameId,@Param("type") String type);
}
