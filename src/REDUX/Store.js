import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { addProductReducer, addReviewReducer, adminProductReducer, deleteProductReducer, productReducer, singleProductReducer, updateProductReducer } from './Reducers/productReducers.js'
import logger from 'redux-logger'
import { adminAllUserReducer, changePasswordReducer, deleteUserReducer, profileReducer, singleUserReducer, updateUserReducer, userReducer } from './Reducers/userReducer.js'
import { cartReducer } from "./Reducers/cartReducer";
import { adminAllOrdersReducer, deleteOrderReducer, orderReducer, singleOrderReducer, updateOrderReducer } from './Reducers/orderReducer.js'
const reducer = combineReducers({
  user: userReducer,
  products: productReducer,
  singleProduct: singleProductReducer,
  profile: profileReducer,
  changePassword: changePasswordReducer,
  cart: cartReducer,
  orders: orderReducer,
  singleOrder: singleOrderReducer,
  addReview: addReviewReducer,
  deleteProduct: deleteProductReducer,
  adminProducts: adminProductReducer,
  updateProduct: updateProductReducer,
  addProduct: addProductReducer,
  adminOrders: adminAllOrdersReducer,
  updateOrder: updateOrderReducer,
  deleteOrder: deleteOrderReducer,
  allUsers: adminAllUserReducer,
  deleteUser: deleteUserReducer,
  singleUser: singleUserReducer,
  updateUser: updateUserReducer
})
const initialState = {
  cart: {
    cartItems: localStorage.cart ? JSON.parse(localStorage.cart) : [],
    shippingInfo: localStorage.shipping ? JSON.parse(localStorage.shipping) : {}
  }
}
const middlewares = [thunk, logger]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)))

export default store;