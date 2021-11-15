import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Homepage from './PAGES/Homepage/Homepage.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import Footer from "./Components/Footer/Footer";
import ProductDetail from './PAGES/Product Detail Page/ProductDetail.jsx';
import Products from './PAGES/Products/Products.jsx';
import Search from './Components/Search/Search.jsx';
import Login from './PAGES/Login/Login.jsx';
import Register from "./PAGES/Register/Register";
import { useEffect } from "react";
import store from './REDUX/Store.js';
import { loadUser } from './REDUX/Actions/userAction.js';
import { useSelector } from "react-redux";
import SpeedDial from './Components/Navbar/SpeedDial.jsx';
import MyProfile from './PAGES/MyProfile/MyProfile.jsx';
import Protectedroute from "./Components/ProtectedRoute/Protectedroute";
import EditProfile from "./PAGES/EditProfile/EditProfile";
import ChangePassword from "./PAGES/Change Password/ChangePassword";
import ForgetPassword from "./PAGES/ForgetPassword/ForgetPassword";
import PasswordReset from './PAGES/Password Reset/PasswordReset.jsx';
import Cart from "./PAGES/Cart/Cart";
import Shipping from "./PAGES/Shipping/Shipping";
import ConfirmOrder from './PAGES/Confirm Order/ConfirmOrder.jsx';
import Payment from "./PAGES/Payment/Payment";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { authAxios } from './Utils/Axios/axios.js';
import { useState } from 'react';
import OrderSuccess from './PAGES/Order Success/Ordersuccess';
import MyOrders from './PAGES/View All Orders/MyOrders.jsx';
import OrderDetails from './PAGES/OrderDetail/OrderDetail'
import Sidebar from "./Components/Admin Panel/Sidebar/Sidebar";
import Dashboard from "./Components/Admin Panel/Dashboard/Dashboard";
import AllProducts from "./Components/Admin Panel/All Products/AllProducts";
import UpdateProducts from './Components/Admin Panel/Update Products/UpdateProducts.jsx';
import AddProducts from './Components/Admin Panel/Add Products/AddProducts.jsx';
import Orders from "./Components/Admin Panel/Orders/Orders";
import UpdateOrder from "./Components/Admin Panel/Order Update/UpdateOrder";
import ManageUsers from "./Components/Admin Panel/Manage Users/ManageUsers";
import UpdateUserRole from './Components/Admin Panel/Update User Roles/UpdateUserRole.jsx';
import ManageReviews from "./Components/Admin Panel/Manage Reviews/ManageReviews";
import NotFoundPage from './Components/404 Not Found/NotFoundPage.jsx';


function App() {
  const [stripeKey, setStripeKey] = useState()
  const { isAuthenticated } = useSelector(state => state.user)
  useEffect(() => {
    store.dispatch(loadUser());
    const loadStripeKey = async () => {
      const { data } = await authAxios.get(`/api/v1/getStipePubKey`)
      setStripeKey(data.key)
    }
    loadStripeKey()

    window.addEventListener('contextmenu', (e) => e.preventDefault())
  }, [])
  console.log(stripeKey)
  return (
    <Router>
      <Navbar></Navbar>
      {isAuthenticated && <SpeedDial />}
      {stripeKey &&
        <Elements stripe={loadStripe(stripeKey)}>
          <Protectedroute exact path='/order/payment' component={Payment}></Protectedroute>
        </Elements>
      }
      <Switch>
        <Route exact path='/' component={Homepage}></Route>
        <Route path='/product/:id' component={ProductDetail}></Route>
        <Route exact path='/products' component={Products}></Route>
        <Route path='/products/:keyword' component={Products}></Route>
        <Route exact path='/search' component={Search}></Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/register' component={Register}></Route>
        <Route exact path='/forget-password' component={ForgetPassword}></Route>
        <Route exact path='/cart' component={Cart}></Route>
        <Route path='/password/reset/:resetToken' component={PasswordReset}></Route>
        <Route exact path='/sidebar' component={Sidebar}></Route>
        <Protectedroute exact path='/account' component={MyProfile}></Protectedroute>
        <Protectedroute exact path='/profile/edit-profile' component={EditProfile}></Protectedroute>
        <Protectedroute exact path='/profile/change-password' component={ChangePassword}></Protectedroute>
        <Protectedroute exact path='/shipping' component={Shipping}></Protectedroute>
        <Protectedroute exact path='/order/confirmation' component={ConfirmOrder}></Protectedroute>
        <Protectedroute exact path='/order/success' component={OrderSuccess}></Protectedroute>
        <Protectedroute exact path='/orders' component={MyOrders}></Protectedroute>
        <Protectedroute path='/orders/:id' component={OrderDetails}></Protectedroute>
        <Protectedroute isAdmin={true} exact path='/admin/dashboard' component={Dashboard}></Protectedroute>
        <Protectedroute isAdmin={true} exact path='/admin/all-products' component={AllProducts}></Protectedroute>
        <Protectedroute isAdmin={true} path='/admin/update-product/:id' component={UpdateProducts}></Protectedroute>
        <Protectedroute isAdmin={true} exact path='/admin/add-products' component={AddProducts}></Protectedroute>
        <Protectedroute isAdmin={true} exact path='/admin/orders' component={Orders}></Protectedroute>
        <Protectedroute isAdmin={true} path='/admin/order/update/:id' component={UpdateOrder}></Protectedroute>
        <Protectedroute isAdmin={true} exact path='/admin/manage-users' component={ManageUsers}></Protectedroute>
        <Protectedroute isAdmin={true} path='/admin/user/update/:id' component={UpdateUserRole}></Protectedroute>
        <Protectedroute isAdmin={true} path='/admin/manage-reviews' component={ManageReviews}></Protectedroute>
        <Route exact path='*' component={NotFoundPage}>

        </Route>
      </Switch>
      <Footer />
    </Router >

  );
}

export default App;
