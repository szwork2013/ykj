package com.gnet.app.indents;

import com.gnet.app.customerGroup.CustomerGroup;
import com.gnet.utils.page.PageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by yaoping on 16/11/3.
 */
@Service
@Transactional(readOnly = true)
public class IndentsService {
    @Autowired
    private IndentsMapper indentsMapper;

    public Page<Indents> pagination(Pageable pageable, List<String> orderList, String name, String phone) {
        return PageUtil.pagination(pageable, orderList, new PageUtil.Callback<Indents>() {

            @Override
            public List<Indents> getPageContent(){
                return indentsMapper.selectPageAll(name, phone);

            }
        });
    }

    public Indents findById(String id) {
        return indentsMapper.selectByPrimaryKey(id);
    }

    @Transactional(readOnly = false)
    public Boolean delete(String id) {
        return indentsMapper.deleteByPrimaryKey(id) == 1;
    }
}
