import {useEffect, useState} from 'react';
import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import {cartSubs} from '@virtual-store/shared/subscriptions';

export interface ItemProps {
  item: any;
}

export const Item: React.FC<ItemProps> = ({item}) => {
  const [isBought, setIsBought] = useState(false);
  const addToCart = (item: any) => {
    cartSubs.publish('ADD_ITEM', item);
    setIsBought(true);
  };

  const removeFromCart = (item: any) => {
    cartSubs.publish('REMOVE_ITEM', item);
  };

  const handleOnItemRemove = (itemToRemove: any) => {
    if (item.id === itemToRemove.id) {
      setIsBought(false);
    }
  };

  useEffect(() => {
    cartSubs.subscribe('REMOVE_ITEM', (item: any) => handleOnItemRemove(item));
  }, []);

  const handleItemClick = (item: any) => {
    if (isBought) {
      removeFromCart(item);
    } else {
      addToCart(item);
    }
  };

  return (
    <Grid xs={4}>
      <Card sx={{minWidth: 275, height: 322}}>
        <CardMedia
          component="img"
          height="100"
          image={item.image}
          alt={item.title}
          sx={{padding: '1em 1em 0 1em', objectFit: 'contain'}}
        />
        <CardContent sx={{flex: '1 0 auto', minHeight: 125}}>
          <Typography
            variant="h6"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '1',
              WebkitBoxOrient: 'vertical',
            }}>
            {item.title}
          </Typography>
          <Typography variant="subtitle1">
            {item.category} - {item.price}$
          </Typography>
          <Typography
            variant="body2"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '3',
              WebkitBoxOrient: 'vertical',
            }}
            color="text.secondary">
            {item.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            pl: 1,
            pb: 1,
            flexDirection: 'column',
          }}>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleItemClick(item)}>
            {!isBought ? `Buy For ${item.price}$` : `Remove`}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
