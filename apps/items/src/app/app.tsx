import React, { useEffect, useState, Suspense, lazy } from "react";
import { Item } from "../components/item";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import { loadRemoteModule } from "@virtual-store/load-remote-module";
import { ErrorBoundary } from "react-error-boundary";
import Skeleton from "@mui/material/Skeleton";
import { ItemsSkeleton } from "../components/itemsSkeleton";


const CartIcon = lazy(() => loadRemoteModule("cart", "./CartIcon"));

export const API_URL = "https://fakestoreapi.com/products";


const CartIconFallback = () => {
  return (
    <Grid
      container
      sx={{ display: "flex", alignItems: "flex-end", flexDirection: "column", pb: 1 }}>
      <Skeleton variant="rounded" width={100} height={30} />
    </Grid>
  );
};

export function App() {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <ErrorBoundary FallbackComponent={CartIconFallback}>
        <React.Suspense fallback="...Loading">
          <CartIcon></CartIcon>
        </React.Suspense>
      </ErrorBoundary>

      {isLoading ? <ItemsSkeleton></ItemsSkeleton>
        : <ErrorBoundary FallbackComponent={CartIconFallback}>
          <Box sx={{ width: "100%" }}>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              {items.map((item) => (
                <Item key={item.id} item={item}></Item>
              ))}
            </Grid>
          </Box>
        </ErrorBoundary>
      }


    </>
  );
}

export default App;
