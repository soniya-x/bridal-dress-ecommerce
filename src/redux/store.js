import { createStore, combineReducers } from 'redux';
import { mobileNoReducer, likedDataReducers, cartOrderDataListReducers, addressReducers,placedOrderReducers } from './reducers/reducers.js';

const rootReducer = combineReducers({
  mobileNo: mobileNoReducer,
  likedData: likedDataReducers,
  cartOrderDataList:cartOrderDataListReducers,
  address:addressReducers,
  placedOrder : placedOrderReducers
});

const store = createStore(rootReducer);

export default store;
