package com.sevenroad.oas.dao.mapper;

import com.sevenroad.oas.dao.entity.Actor;
import com.sevenroad.oas.dao.entity.User;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * <p>
  *  Mapper 接口
 * </p>
 *
 * @author linlin.zhang
 * @since 2017-05-24
 */
public interface UserMapper extends BaseMapper<User> {
    @Select("select b.actor_id actorId,b.actor_name actorName,b.description,b.state from t_e_user_actor a join t_e_actor b on a.actor_id = b.actor_id where a.user_id = #{userId}")
    List<Actor> getUserActor(int userId);
    @Select("select max(user_id) from t_e_user")
    int getMaxUserId();
}