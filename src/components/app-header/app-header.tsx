import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUserData } from '../../services/slices/userSlice';

export const AppHeader: FC = () => <AppHeaderUI userName='' />;

// export const AppHeader: FC = () => {
//   const user = useSelector(getUserData);
//   return <AppHeaderUI userName={user?.name} />;
// };
