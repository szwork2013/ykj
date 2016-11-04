package com.gnet.app.indents;

import org.apache.ibatis.annotations.Param;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;

/**
 * Created by yaoping on 16/11/3.
 */
public interface IndentsMapper extends Mapper<Indents> {
    List<Indents> selectPageAll(@Param("name") String name, @Param("phone") String phone);

    Indents selectOneById(@Param("id") String id);
}
