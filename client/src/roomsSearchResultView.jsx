import React from 'react';
import { Link } from 'react-router-dom';

const RoomsSearchResultView = ({ listing, onTitleClick }) => (
  <div className="container is-fluid">
    <div className="box">
      <Link to="/house">
        <h4 className="level-item has-text-centered " onClick={() => onTitleClick(listing)}>
          {listing.title}
        </h4>
      </Link>
      <div>
        <h4 className="level-item has-text-centered ">
          Address: {listing.city}, {listing.stateAbbr} {listing.zipCode}{' '}
        </h4>
        <h5 className="level-item has-text-centered ">Price: ${listing.price}</h5>

        <div className="level-item">
          {listing.photos.map(photo => {
            // cloundinary image sizes are manipulated by inserting arguments after the 'upload' part of the file parth
            // example: "http://res.cloudinary.com/dwysumxzw/image/upload/v1532558555/kog_r_full_shot_x2ggw7.jpg";
            // I'm not connected to the database yet and will need to test the lines below once we are
            if (photo.url === null) {
              return null;
            }
            const arr = photo.url.split('upload/');
            const uploadWidth = 'upload/w_200,c_scale/';
            const resizedPhotoUrl = arr.join(uploadWidth);

            return (
              <figure className="image is-200x200" key={photo.url}>
                <img src={resizedPhotoUrl} alt="" />
              </figure>
            );
          })}
        </div>
      </div>
    </div>
  </div>
);

export default RoomsSearchResultView;
