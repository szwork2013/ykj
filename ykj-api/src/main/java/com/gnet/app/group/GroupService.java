package com.gnet.app.group;

import com.gnet.app.customer.Customer;
import com.gnet.utils.page.PageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by yaoping on 16/10/23.
 */
@Service
@Transactional(readOnly = true)
public class GroupService {
    @Autowired
    private GroupMapper groupMapper;


    public Page<Group> pagination(Pageable pageable, List<String> orderList, String name, String phone) {
        return PageUtil.pagination(pageable, orderList, new PageUtil.Callback<Group>() {

            @Override
            public List<Group> getPageContent(){
                return groupMapper.selectGroupAll(name, phone);

            }
        });
    }
}
