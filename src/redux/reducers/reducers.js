import { CART_ORDER_DATA_LIST, MOBILE_NO, LIKED_DATA, ADDRESS_DATA,PLACED_ORDER_DATA  } from "../actions/actions.js";

const mobileNoInitialState = {
  mobile: null,
};

export const mobileNoReducer = (state = mobileNoInitialState, action) => {
  switch (action.type) {
    case MOBILE_NO: {
      return {
        ...state,
        mobile: action.payload
      };
    }

    default:
      return state;
  }
};

const likedDataInitialState = {
  likedData: [],
};

export const likedDataReducers = (state = likedDataInitialState, action) => {
  switch (action.type) {
    case LIKED_DATA: {
      return {
        ...state,
        likedData: action.payload
      };
    }
    default:
      return state;
  }
};


const cartOrderDataListInitialState = {
  cartOrderDataList: [],
};

export const cartOrderDataListReducers = (state = cartOrderDataListInitialState, action) => {
  switch (action.type) {
    case CART_ORDER_DATA_LIST: {
      return {
        ...state,
        cartOrderDataList: action.payload
      };
    }
    default:
      return state;
  }
};



const addressInitialState = {
  address: [],
};

export const addressReducers = (state = addressInitialState, action) => {
  switch (action.type) {
    case ADDRESS_DATA: {
      return {
        ...state,
        address: action.payload
      };
    }
    default:
      return state;
  }
};

const placedOrderInitialState = {
  address: [],
};

export const placedOrderReducers = (state = placedOrderInitialState, action) => {
  switch (action.type) {
    case PLACED_ORDER_DATA: {
      return {
        ...state,
        placedOrder: action.payload
      };
    }
    default:
      return state;
  }
};