package com.gnet.app.indents;

import com.gnet.utils.sort.OrderType;

/**
 * Created by yaoping on 16/11/3.
 */
public class IndentsOrderType implements OrderType {

    private String key;
    private String value;

    private  IndentsOrderType(String key, String value){
        this.key = key;
        this.value = value;
    }


    @Override
    public String getKey() {
        return key;
    }

    @Override
    public String getValue() {
        return value;
    }
}
