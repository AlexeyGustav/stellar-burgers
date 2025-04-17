// // Добавим Navigate в компонент ProtectedRoute, но перед этим получим данные о пользователе и статус проверки авторизации:
// import { useSelector } from '../../services/store';
// import { Navigate } from 'react-router';
// import { Preloader, OrderDetailsUI } from '@ui';

// type ProtectedRouteProps = {
//   children: React.ReactElement;
// };

// export const ProtectedRoute = ({ children }: ProtectedRouteProps) => children;

// // const isAuthChecked = useSelector(isAuthCheckedSelector); // isAuthCheckedSelector — селектор получения состояния загрузки пользователя
// // const user = useSelector(userDataSelector); // userDataSelector — селектор получения пользователя из store

// // if (!isAuthChecked) {
// //   // пока идёт чекаут пользователя, показываем прелоадер
// //   return <Preloader />;
// // }

// // if (!user) {
// //   // если пользователя в хранилище нет, то делаем редирект
// //   return <Navigate replace to='/login' />;
// // }

// // return children;
// // };

import { Navigate, useLocation } from 'react-router-dom';
import { getUserData, getAuthChecked } from '../../services/slices/userSlice';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  component: React.JSX.Element;
};

export const ProtectedRoute = ({
  onlyUnAuth = true,
  component
}: ProtectedRouteProps): React.JSX.Element => {
  const user = useSelector(getUserData);
  const isAuthChecked = useSelector(getAuthChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    // маршрут для авторизованного, но не авторизован
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    // маршрут для неавторизованного, но авторизован
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate replace to={from} />;
  }

  // onlyUnAuth && !user для неавторизованного и неавторизован
  // !onlyUnAuth && user для авторизованного и авторизован

  return component;
};

export const OnlyUnAuth = ProtectedRoute;

export const OnlyAuth = ({ component }: { component: React.JSX.Element }) => (
  <ProtectedRoute onlyUnAuth={false} component={component} />
);
