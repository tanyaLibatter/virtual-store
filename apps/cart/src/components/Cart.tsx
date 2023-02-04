import React, { useState, useEffect } from 'react';
import { cartSubs } from '@virtual-store/shared/subscriptions';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Cart = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  const addItemToCart = (item: any) => {
    setCartItems((prevItems) => [...prevItems, item]);
    setTotal((prevTotal) => prevTotal + item.price);
  };

  const removeItemFromCart = (item: any) => {
    setCartItems((prevItems) => {
      return prevItems.filter((i) => i.id !== item.id);
    });
    setTotal((prevTotal) => prevTotal - item.price);
  };

  const handleItemRemove = (item: any) => {
    cartSubs.publish('REMOVE_ITEM', item);
  };

  useEffect(() => {
    cartSubs.subscribe('ADD_ITEM', (item: any) => addItemToCart(item));
    cartSubs.subscribe('REMOVE_ITEM', (item: any) => removeItemFromCart(item));
  }, []);

  return (
    <List sx={{ width: '100%', minHeight: 200, bgcolor: 'background.paper' }}>
      {cartItems.map((item) => (
        <>
          <ListItem alignItems="center">
            <img style={{ width: 40, height: 40 }} src={`${item.image}`} />
            <ListItemText
              sx={{ marginLeft: 2 }}
              primary={
                <>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {item.title}- {item.price}$
                  </Typography>
                </>
              }
            />
            <Button
              variant="text"
              size="small"
              onClick={() => handleItemRemove(item)}
            >
              Remove
            </Button>
          </ListItem>
          <Divider />
        </>
      ))}
      {total > 0 && (
        <ListItem alignItems="center">
          <ListItemText
            sx={{ marginLeft: 2 }}
            primary={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="h6"
                  color="text.primary"
                >
                  Total: {total.toFixed(2)}$
                </Typography>
              </>
            }
          />
        </ListItem>
      )}

      {!cartItems.length && (
        <ListItem alignItems="center">
          <ListItemText
            sx={{ marginLeft: 2 }}
            primary={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="h6"
                  color="text.primary"
                >
                  Your Cart Is Empty
                </Typography>
              </>
            }
          />
        </ListItem>
      )}
    </List>
  );
};

export default Cart;
