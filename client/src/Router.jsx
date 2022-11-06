import React, { useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

import HomeScreen from "./screens/HomeScreen";
import SignupScreen from "./screens/SignupScreen";
import LoginScreen from "./screens/LoginScreen";
import PaymentScreen from "./screens/PaymentScreen";
import TransactionsScreen from "./screens/TransactionScreen";
import CartScreen from "./screens/CartScreen";
import UsersScreen from "./screens/UsersScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import SubCategoriesScreen from "./screens/SubCategoriesScreen";
import ShopSingleScreen from "./screens/ShopSingleScreen";
import ShopScreen from "./screens/ShopScreen";
import ContactScreen from "./screens/ContactScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ThanksScreen from "./screens/ThanksScreen";
import AddItemsScreen from "./screens/AddItemsScreen";
import AddCategoryScreen from "./screens/AddCategoryScreen";
import AddSubCategoryScreen from "./screens/AddSubCategoryScreen";
import ItemsScreen from "./screens/ItemsScreen";
import NotFoundScreen from "./screens/NotFound";
import OrderScreen from "./screens/OrderScreen";
import OrderSingleScreen from "./screens/OrderSingle";
import UpdateProductScreen from "./screens/UpdateProductScreen";
import Layout from "./components/Layout";

const Routing = () => {
  return (
   //  <BrowserRouter>
    <ScrollToTop>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomeScreen />} exact />
          <Route
            path="/login"
            element={
              <PreventMultipleLogin>
                <LoginScreen />
              </PreventMultipleLogin>
            }
          />
          <Route path="/signup" element={<SignupScreen />} />
          <Route
            path="/payment"
            // path="/payment/:productId"
            element={
              <ProtectUserRoute>
                <PaymentScreen />
              </ProtectUserRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectUserRoute>
                <TransactionsScreen />
              </ProtectUserRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectUserRoute>
                <CartScreen />
              </ProtectUserRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectAdminRoute>
                <UsersScreen />
              </ProtectAdminRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <ProtectAdminRoute>
                <CategoriesScreen />
              </ProtectAdminRoute>
            }
          />
          <Route
            path="/sub-categories"
            element={
              <ProtectAdminRoute>
                <SubCategoriesScreen />
              </ProtectAdminRoute>
            }
          />
          <Route
            path="/update-product/:productId"
            element={
              <ProtectAdminRoute>
                <UpdateProductScreen />
              </ProtectAdminRoute>
            }
          />
          <Route path="/shop" element={<ShopScreen />} />
          <Route path="/shop/:productId" element={<ShopSingleScreen />} />
          <Route path="/contact" element={<ContactScreen />} />
          <Route
            path="/profile"
            element={
              <ProtectUserRoute>
                <ProfileScreen />
              </ProtectUserRoute>
            }
          />
          <Route path="/thanks" element={<ThanksScreen />} />
          <Route
            path="/add-item"
            element={
              <ProtectAdminRoute>
                <AddItemsScreen />
              </ProtectAdminRoute>
            }
          />
          <Route
            path="/items"
            element={
              <ProtectAdminRoute>
                <ItemsScreen />
              </ProtectAdminRoute>
            }
          />
          <Route
            path="/add-category"
            element={
              <ProtectAdminRoute>
                <AddCategoryScreen />
              </ProtectAdminRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectAdminRoute>
                <OrderScreen />
              </ProtectAdminRoute>
            }
          />
          <Route
            path="/order/:orderId"
            element={
              <ProtectAdminRoute>
                <OrderSingleScreen />
              </ProtectAdminRoute>
            }
          />
          <Route
            path="/add-sub-category"
            element={
              <ProtectAdminRoute>
                <AddSubCategoryScreen />
              </ProtectAdminRoute>
            }
          />
          <Route path="*" element={<NotFoundScreen />} />
        </Route>
      </Routes>
    </ScrollToTop>
  );
};

const ProtectUserRoute = ({ children }) => {
  const [cookies] = useCookies();
  const user = cookies.user;
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const ProtectAdminRoute = ({ children }) => {
  const [cookies] = useCookies();
  const user = cookies.user;
  if (!user) {
    return <Navigate to="/" replace />;
  } else if (!user.isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const PreventMultipleLogin = ({ children }) => {
  const [cookies] = useCookies();
  const user = cookies.user;
  if (user) {
    return <Navigate to="/shop" replace />;
  } else {
    return children;
  }
};

const ScrollToTop = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return children;
};

export default Routing;
