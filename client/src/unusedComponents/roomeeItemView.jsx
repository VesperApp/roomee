import React from 'react';

const RoomeeItemView = ({ roomee }) => {
  const { coverPhoto, picture, location, username, email } = roomee;
  return (
    <div className="column is-one-third">
      <div className="card large round">
        <div className="card-image ">
          <figure className="image">
            <img src={coverPhoto} alt="coverPhoto" />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-96x96">
                <img src={picture} alt="card" />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-4 no-padding">{username}</p>
              <p>
                <span className="title is-6">
                  <a href="http://twitter.com/#">{email}</a>
                </span>
              </p>
              <p className="subtitle is-6">{location}</p>
            </div>
          </div>
          <div className="content">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum consequatur numquam aliquam tenetur ad
            amet inventore hic beatae, quas accusantium perferendis sapiente explicabo, corporis totam! Labore
            reprehenderit beatae magnam animi!
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomeeItemView;
