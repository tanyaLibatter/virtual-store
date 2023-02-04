import { useEffect, useState } from 'react';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { cartSubs } from '@virtual-store/shared/subscriptions';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  marginBottom: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  width: 70,
}));

const CartIcon = () => {
  const [total, setTotal] = useState(0);

  const onAddItemToCart = () => {
    setTotal((prevTotal) => prevTotal + 1);
  };

  const onRemoveItemFromCart = () => {
    setTotal((prevTotal) => prevTotal - 1);
  };

  useEffect(() => {
    cartSubs.subscribe('ADD_ITEM', onAddItemToCart);
    cartSubs.subscribe('REMOVE_ITEM', onRemoveItemFromCart);
  }, []);

  return (
    <Grid
      container
      sx={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}
    >
      <Item>
        <ShoppingCartIcon fontSize="large" /> {total ? `(${total})` : ''}
      </Item>
    </Grid>
  );
};

export default CartIcon;
