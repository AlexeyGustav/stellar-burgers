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

import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchIngredientDetails,
  getSelectorIngredients
} from '../../services/slices/ingridientsSlice';
import { getUser } from '../../services/slices/userSlice';
import { Preloader } from '@ui';
import { ProtectedRoute } from '../protected-route/protected-route';

export default function App() {
  const dispatch = useDispatch();
  const loader = useSelector(getSelectorIngredients);
  const navigate = useNavigate();
  const location = useLocation();

  const backgroundLocation = location.state && location.state.background;

  const handleCloseModal = () => {
    navigate(-1);
  };

  if (!loader) {
    return <Preloader />;
  }

  useEffect(() => {
    dispatch(fetchIngredientDetails());
    const token = localStorage.getItem('refreshToken');
    console.log('token: ', token);
    if (token) {
      dispatch(getUser());
    }
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {/* Modals */}
      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={'Информация о заказе'}
                onClose={handleCloseModal}
                children={<OrderInfo />}
              />
            }
          />

          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title={'Детали ингредиента'}
                onClose={handleCloseModal}
                children={<IngredientDetails />}
              />
            }
          />

          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                title={'Заказ'}
                onClose={handleCloseModal}
                children={<OrderInfo />}
              />
            }
          />

          {/* <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <OrderInfo />
              </ProtectedRoute>
            }
          /> */}
        </Routes>
      )}
    </div>
  );
}
