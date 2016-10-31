import request, {requestGetHeaders} from '../utils/request';
import querystring from 'querystring';

/**
 * 根据订单号获取订单商品
 */
export async function getOrderGoodsListWithDetailByOrderId(access_token, query) {
  return request(`/api/order_goods/getOrderGoodsListWithDetailByOrderId?${querystring.stringify(query)}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`,
    }
  });
}