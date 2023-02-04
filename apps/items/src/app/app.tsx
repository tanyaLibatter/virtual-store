import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Item } from '../components/item';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import { loadRemoteModule } from '@virtual-store/load-remote-module';

const Cart = lazy(() => loadRemoteModule('cart', './CartIcon'));
export const API_URL = '/assets/products.json';

export function App() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <>
      <React.Suspense fallback="...Loading">
        <Cart></Cart>
      </React.Suspense>
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {items.map((item) => (
            <Item key={item.id} item={item}></Item>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default App;
