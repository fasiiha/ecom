import { combineReducers } from "redux";

import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productSlice";
import userReducer from "./slices/userSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  product: productReducer,
});

export default rootReducer;
