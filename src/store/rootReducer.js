import { combineReducers } from "redux";

import cartReducer from "./slices/cartSlice";
import categoryReducer from "./slices/categorySlice";
import orderReducer from "./slices/orderSlice";
import productReducer from "./slices/productSlice";
import shippingAddressReducer from "./slices/shippingAddressSlice";
import userReducer from "./slices/userSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  order: orderReducer,
  user: userReducer,
  product: productReducer,
  category: categoryReducer,
  address: shippingAddressReducer,
});

export default rootReducer;
