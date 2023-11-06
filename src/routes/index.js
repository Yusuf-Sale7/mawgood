import React from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute, ProtectedAuth } from "../services/PrivateRoutes";
import Home from "../pages/Home/Home";
import Signin from "../pages/Auth/Signin";
import Signup from "../pages/Auth/Signup";
import Profile from "../pages/Profile/Profile";
import EditProfile from "../pages/Profile/EditProfile";
import EditPassword from "../pages/Profile/EditPassword";
import Favorites from "../pages/Profile/Favorites";
import Cart from "../pages/Profile/Cart";
import Checkout from "../pages/Profile/Checkout";
import AuthService from "../services/AuthService";
import PreLoader from "../utils/PreLoader";
import Category from "../pages/Category/Category";
import Search from "../pages/Search/Search";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Conact from "../pages/Contact/Contact";
import NotFound from "../pages/NotFound/NotFound";
import ResetPassword from "../pages/ResetPassword/ResetPassword";

function AppRoutes() {
  const auth = AuthService();
  const { isLoading, user } = auth.getCurrentUser();
  const isAuthenticated = user.username ? true : false;

  return isLoading ? (
    <PreLoader fullScreen />
  ) : (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signin"
          element={
            <ProtectedAuth isAuthenticated={isAuthenticated}>
              <Signin />
            </ProtectedAuth>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedAuth isAuthenticated={isAuthenticated}>
              <Signup />
            </ProtectedAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/edit-password"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <EditPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/favorites"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/cart"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/cart/checkout"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/contact" element={<Conact />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default AppRoutes;
