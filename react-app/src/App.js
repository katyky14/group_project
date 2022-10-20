import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/index';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Products from './components/products/getProducts';
import CreateProductForm from './components/products/productForm';
import ProductDetail from './components/products/productDetail';
import { ReviewForm } from './components/reviews/reviewform';
import {UpdateReviewForm} from './components/reviews/updateReviewForm';
import CartForm from './components/ShoppingCart/CartForm';
import GetCartItems from './components/ShoppingCart/ShoppingCart';
import UpdatedProductForm from './components/products/EditProductForm';
import SearchProducts from './components/products/searchProducts';



function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar loaded={loaded}/>
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        {/* <ProtectedRoute path='/' exact={true} >
          <Products />
        </ProtectedRoute> */}
        <ProtectedRoute path='/products/new' exact={true}>
          <CreateProductForm />
        </ProtectedRoute>
        <ProtectedRoute path='/products/:productId/carts/new' exact={true}>
          <CartForm />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <Products />
        </Route>
        <Route path='/search'>
          <SearchProducts />
        </Route>
        <Route path="/products/:productId" exact={true}>
          <ProductDetail />
        </Route>
        <ProtectedRoute path='/shopping-carts' exact={true}>
          <GetCartItems/>
        </ProtectedRoute>
        <ProtectedRoute path='/:productId/review/new' exact={true}>
          <ReviewForm />
        </ProtectedRoute>
        <ProtectedRoute path='/:productId/review/:reviewId/update' exact={true}>
          <UpdateReviewForm />
        </ProtectedRoute>
        <ProtectedRoute path='/products/:productId/edit'>
          <UpdatedProductForm />
        </ProtectedRoute>
        <Route>
          <h1>Route Not Found</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
