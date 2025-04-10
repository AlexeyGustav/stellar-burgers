// Добавим Navigate в компонент ProtectedRoute, но перед этим получим данные о пользователе и статус проверки авторизации:
import { useSelector } from '../../services/store';
import { Navigate } from 'react-router';
import { Preloader, OrderDetailsUI } from '@ui';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => children;

// const isAuthChecked = useSelector(isAuthCheckedSelector); // isAuthCheckedSelector — селектор получения состояния загрузки пользователя
// const user = useSelector(userDataSelector); // userDataSelector — селектор получения пользователя из store

// if (!isAuthChecked) {
//   // пока идёт чекаут пользователя, показываем прелоадер
//   return <Preloader />;
// }

// if (!user) {
//   // если пользователя в хранилище нет, то делаем редирект
//   return <Navigate replace to='/login' />;
// }

// return children;
// };
