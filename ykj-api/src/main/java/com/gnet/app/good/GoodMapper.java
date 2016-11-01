package com.gnet.app.good;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import tk.mybatis.mapper.common.Mapper;

public interface GoodMapper extends Mapper<Good> {
	
	
	public List<Good> selectGoodsAll(@Param("name") String name, @Param("onsaleStatus") Integer onsaleStatus, @Param("businessId") String businessId);
	
	public List<Good> selectGoodsAllList(@Param("orderList") List<String> orderList, @Param("name") String name, @Param("onsaleStatus") Integer onsaleStatus, @Param("businessId") String businessId);
	
	public int isExists(@Param("model") String model, @Param("originValue") String originValue, @Param("businessId") String businessId);
	
	public int useInOrder(@Param("storageGoodsId") String storageGoodsId);
	
	public List<Good> findByIds(@Param("ids") List<String> ids);
	
	public List<Good> selectGoodsAllByCondition(GoodCondition condition);
	
	
	public List<StorageGoodStatusDetail> selectStorageGoodStatusDetailList(GoodCondition condition);
}
