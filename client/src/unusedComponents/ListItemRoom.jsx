import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

const contentStyle = {
  margin: '40px',
  border: 'none',
  boxShadow: '0px 0px 2px #eee',
  width: '27%',
  display: 'inline-block',
  cursor: 'pointer',
};

const title = {
  margin: '10px',
  marginLeft: '20px',
  fontSize: '19px',
};

const price = {
  margin: '10px',
  marginLeft: '20px',
  fontSize: '17px',
  color: 'green',
  fontWeigth: 'bold',
};

const rate = {
  marginLeft: '16px',
};

const ListItemRoom = ({ room, handleClickitem }) => (
  <div className="container column is-fluid" style={contentStyle} onClick={() => handleClickitem(room)}>
    <div className="images">
      <img src={room.photos[0].url} />
    </div>
    <div className="title" style={title}>
      {' '}
      {room.title}{' '}
    </div>
    <span className="price" style={price}>
      {' '}
      ${room.price}{' '}
    </span>
    <span> per month </span> <br />
    {/* <div style={rate}><StarRatingComponent name="rate2" editing={false} starCount={5} value={4.5} /> </div> */}
  </div>
);

export default ListItemRoom;
