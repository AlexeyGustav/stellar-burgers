import { ConstructorPage } from '@pages';
import { Feed } from '../../pages/feed/feed';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';

import { Routes, Route } from 'react-router-dom';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />
    </Routes>
  </div>
);
// const App = () => (
//   <div className={styles.app}>
//     <AppHeader />
//     <ConstructorPage />
//   </div>
// );

export default App;
