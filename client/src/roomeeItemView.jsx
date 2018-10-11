import React from 'react';

const RoomeeItemView = ({ roomee }) => {
  const { coverPhoto, picture, location, username, email } = roomee;
  return (
    <div class="column is-one-third">
      <div class="card large round">
        <div class="card-image ">
          <figure class="image">
            <img src={coverPhoto} alt="Image" />
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-96x96">
                <img src={picture} alt="Image" />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4 no-padding">{username}</p>
              <p>
                <span class="title is-6">
                  <a href="http://twitter.com/#">{email}</a>
                </span>
              </p>
              <p class="subtitle is-6">{location}</p>
            </div>
          </div>
          <div class="content">
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
