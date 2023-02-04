import React, { lazy } from 'react';
import styles from './app.module.css';
import Typography from '@mui/material/Typography';
import { loadRemoteModule } from '@virtual-store/load-remote-module';

const Cart = lazy(() => loadRemoteModule('cart', './Cart'));
const Items = lazy(() => loadRemoteModule('items', './Module'));

export const VirtualStore = () => {
  return (
    <>
      <div className={styles.container}>
        <Typography
          sx={{ display: 'inline' }}
          component="span"
          variant="h6"
          color="text.primary">
          My Store
        </Typography>
        <div className={styles.contentContainer}>
          <div className={styles.catalogContainer}>
            <React.Suspense fallback="...Loading">
              <Items></Items>
            </React.Suspense>
          </div>
          <div className={styles.cartContainer}>
            <div className={styles.sticky}>
              <React.Suspense fallback="...Loading">
                <Cart></Cart>
              </React.Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
