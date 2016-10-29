package com.gnet.app.customerGroup;

import org.apache.ibatis.annotations.Param;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;

/**
 * Created by yaoping on 16/10/27.
 */
public interface CustomerGroupMapper extends Mapper<CustomerGroup> {
    List<CustomerGroup> selectPageAll(@Param("name") String name, @Param("phone") String phone);

    CustomerGroup selectOneById(@Param("id") String id);
}
