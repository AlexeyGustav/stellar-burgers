import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavLink to={'/'}>
          {({ isActive }) => (
            <div className={styles.burger}>
              <BurgerIcon
                type={'primary'}
                className={isActive ? styles.link_active : styles.link_logo}
              />
              <span className={isActive ? styles.link_active : styles.link}>
                Конструктор
              </span>
            </div>
          )}
        </NavLink>
        <NavLink to={'/feed'}>
          {({ isActive }) => (
            <div className={styles.burger}>
              <ListIcon
                type={'primary'}
                className={isActive ? styles.link_active : styles.link_logo}
              />
              <p className={isActive ? styles.link_active : styles.link}>
                Лента заказов
              </p>
            </div>
          )}
        </NavLink>
      </div>
      <div className={styles.logo}>
        <NavLink to={'/'}>
          <Logo className='' />
        </NavLink>
      </div>
      <NavLink to={'/profile'}>
        {({ isActive }) => (
          <div className={styles.link_position_last}>
            <ProfileIcon
              type={'primary'}
              className={isActive ? styles.link_active : styles.link_logo}
            />
            <p className={isActive ? styles.link_active : styles.link}>
              {userName || 'Личный кабинет'}
            </p>
          </div>
        )}
      </NavLink>
    </nav>
  </header>
);
