import React from 'react';
import WishItem from './WishItem';

function WishList({wishes, onDelete,onEdit }) {

  return (
    <ul>
      {wishes.map((wish) => (
        <WishItem
          wish={wish}
          key={wish.id}
          editWish={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default WishList;
