import React from 'react';
import { Link } from 'react-router-dom';

const ListItemRoom = ({ room, onTitleClick }) => (
  <article className="tile is-child box" onClick={() => onTitleClick(room)}>
    <Link to="/house">
      <p className="subtitle" onClick={() => onTitleClick(room)}>
        {room.title}
      </p>
      <figure className="image is-4by3">
        {room.photos[0].url ? <img src={room.photos[0].url} alt="room" /> : null}
      </figure>
      <p className="content">
        ${room.price}
        /month
      </p>
    </Link>
  </article>
);

export default ListItemRoom;
