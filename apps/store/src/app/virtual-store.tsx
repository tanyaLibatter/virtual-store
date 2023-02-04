import React, { lazy } from "react";
import styles from "./app.module.css";
import Typography from "@mui/material/Typography";
import { loadRemoteModule } from "@virtual-store/load-remote-module";
import Grid from "@mui/material/Unstable_Grid2";
import Skeleton from "@mui/material/Skeleton";
import { ErrorBoundary } from "react-error-boundary";

const Cart = lazy(() => loadRemoteModule("cart", "./Cart"));
const Items = lazy(() => loadRemoteModule("items", "./Module"));

const CartFallback = () => {
  return (
    <Grid
      container
      sx={{ display: "flex", alignItems: "flex-end", flexDirection: "column", pb: 1 }}>
      <Skeleton variant="rounded" width="100%" height={300} />
    </Grid>
  );
};

export const VirtualStore = () => {
  return (
    <>
      <div className={styles.stickyHeader}>
        <Typography
          sx={{ display: "inline" }}
          component="span"
          variant="h6"
          color="text.primary">
          My Store
        </Typography>
      </div>
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <div className={styles.catalogContainer}>
            <React.Suspense fallback="...Loading">
              <Items></Items>
            </React.Suspense>
          </div>
          <div className={styles.cartContainer}>
            <div className={styles.sticky}>
              <ErrorBoundary FallbackComponent={CartFallback}>
                <React.Suspense fallback="...Loading">
                  <Cart></Cart>
                </React.Suspense>
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
