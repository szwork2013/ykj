package com.gnet.app.group;

import org.apache.ibatis.annotations.Param;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;

/**
 * Created by yaoping on 16/10/23.
 */
public interface GroupMapper extends Mapper<Group> {
    List<Group> selectGroupAll(@Param("name") String name, @Param("goodId") String phone);
}
