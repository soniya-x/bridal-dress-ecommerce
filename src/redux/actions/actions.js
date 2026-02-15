export const MOBILE_NO = "MOBILE_NO";
export const LIKED_DATA = "LIKED_DATA";
export const CART_ORDER_DATA_LIST = "CART_ORDER_DATA_LIST";
export const ADDRESS_DATA = "ADDRESS_DATA" 
export const PLACED_ORDER_DATA = "PLACED_ORDER_DATA" 

export const setMobileNo = (mobile) => {
  return {
    type: MOBILE_NO,
    payload: mobile,
  };
};

export const setLikedData = (likedData) => {
  return {
    type: LIKED_DATA,
    payload: likedData,
  };
};

export const setCartOrderList = (cartOrderDataList) => {
  return {
    type: CART_ORDER_DATA_LIST,
    payload: cartOrderDataList,
  };
};

export const setAdd = (address) => {
  return {
    type: ADDRESS_DATA,
    payload: address,
  };
};

export const setPlacedOrderData = (placedOrder) => {
  return {
    type: PLACED_ORDER_DATA,
    payload: placedOrder,
  };
};