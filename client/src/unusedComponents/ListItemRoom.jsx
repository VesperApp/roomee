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
  <div className="tile" style={contentStyle} onClick={() => handleClickitem(room)}>
    <article className="tile is-child box">
      <p className="subtitle">{room.title}</p>
      <figure className="image is-4by3">
        {room.photos[0].url ? <img src={room.photos[0].url} alt="room" /> : null}
      </figure>

      <p className="content">
        {' '}
        <span className="price" style={price}>
          $
        </span>
        {room.price} per month
      </p>
    </article>
  </div>
);

export default ListItemRoom;
