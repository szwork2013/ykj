package com.gnet.app.customerGroup;

import com.gnet.app.group.Group;
import com.gnet.utils.page.PageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by yaoping on 16/10/27.
 */
@Service
@Transactional(readOnly = true)
public class CustomerGroupService {
    @Autowired
    private CustomerGroupMapper customerGroupMapper;

    public Page<CustomerGroup> pagination(Pageable pageable, List<String> orderList, String name, String phone) {
        return PageUtil.pagination(pageable, orderList, new PageUtil.Callback<CustomerGroup>() {

            @Override
            public List<CustomerGroup> getPageContent(){
                return customerGroupMapper.selectPageAll(name, phone);

            }
        });
    }

    public CustomerGroup findDetailById(String id) {
        return customerGroupMapper.selectOneById(id);
    }

    public CustomerGroup findById(String id) {
        return customerGroupMapper.selectByPrimaryKey(id);
    }

    @Transactional(readOnly = false)
    public Boolean update(CustomerGroup customerGroup) {
        return customerGroupMapper.updateByPrimaryKey(customerGroup) == 1;
    }
}

