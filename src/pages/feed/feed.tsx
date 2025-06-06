import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchFeed,
  getSelectorFeed,
  clearFeed
} from '../../services/slices/feedSlice';
import { AppDispatch } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const feed = useSelector(getSelectorFeed);

  const orders: TOrder[] = feed.orders;

  useEffect(() => {
    dispatch(fetchFeed());
    return () => {
      dispatch(clearFeed());
    };
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  const handleGetFeeds = () => {
    dispatch(fetchFeed());
    dispatch(clearFeed());
  };
  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
