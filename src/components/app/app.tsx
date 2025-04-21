import {
  ConstructorPage,
  Feed,
  Login,
  ForgotPassword,
  Register,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';

import { OnlyUnAuth, ProtectedRoute } from '../protected-route/protected-route';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';

import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchIngredientDetails,
  getSelectorIngredients
} from '../../services/slices/ingridientsSlice';
import { getUser } from '../../services/slices/userSlice';
import { RootState } from 'src/services/store';
import { ThunkDispatch } from 'redux-thunk';
import { Preloader } from '@ui';

export default function App() {
  const dispatch = useDispatch();
  const loader = useSelector(getSelectorIngredients);
  const navigate = useNavigate();

  if (!loader) {
    return <Preloader />;
  }

  useEffect(() => {
    dispatch(fetchIngredientDetails());
    // dispatch(getUser());
  }, [dispatch]);

  const onClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
        <Route
          path='/register'
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />
        <Route
          path='/profile'
          element={<OnlyUnAuth component={<Profile />} />}
        />
        <Route
          path='/profile/orders'
          element={<OnlyUnAuth component={<ProfileOrders />} />}
        />
        <Route path='*' element={<NotFound404 />} />
        {/* Modals */}
        <Route path='/feed/:number' element={<OrderInfo />} />

        <Route
          path='/ingredients/:id'
          element={
            <Modal
              title={'Модальное окно ингредиента'}
              onClose={onClose}
              children={<IngredientDetails />}
            />
          }
        />
        <Route
          path='/profile/orders/:number'
          element={<OnlyUnAuth component={<OrderInfo />} />}
        />
      </Routes>
    </div>
  );
}
