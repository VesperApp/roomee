import React from 'react';

// component is show when a user searching for rooms clicks on an individual listing AND when a user
// creates a new listing as confirmation that their listing has been entered in the database
const HouseListingView = ({ currentHouseView }) => (
  <div id="house-listing-view" className="section columns">
    <div className="column has-text-left is-half">
      <div className="box">
        <label className="label">Listing details</label>
        <p className="content">{currentHouseView.title}</p>
        <div>
          <label className="label">Address</label>
          <p className="content">
            {`${currentHouseView.address} 
            ${currentHouseView.city}, ${currentHouseView.stateAbbr} ${currentHouseView.zipCode}`}
          </p>
        </div>
        <div>
          <label className="label">Price</label>
          <p className="content">{`$${currentHouseView.price}`}</p>
        </div>
        <div>
          <label className="label">Description</label>
          <p className="content">{currentHouseView.description}</p>
        </div>
        <div>
          <label className="label">Contact</label>
          <p>{currentHouseView.user ? <a> {currentHouseView.user.email} </a> : 'N/A'}</p>
        </div>
      </div>
    </div>
    <div className="column">
      <div className="box">
        <label className="label">Listing images</label>

        {currentHouseView.photos.map((photo, ind) => {
          if (photo.url === null) {
            return 'No images posted!';
          }

          // this array could contain strings (when rendered after a user creates a new listing) or
          // objects from our database when rednered after a serach, if it is an array of
          // objects, we need the string located at photo.url, otherwise we can use the string as
          // provided. a better solution would be for this page to receive consistent props
          if (photo.url) {
            photo = photo.url;
          }
          const arr = photo.split('upload/');
          // pictures are hosted on cloudinary and inserting these parameters in the url resizes the
          // picures. Ideally the ratio of the images would be consistent for better layout but we //didn't get to that feature
          const uploadWidth = 'upload/w_412,c_scale/';
          const resizedPhotoUrl = arr.join(uploadWidth);
          return (
            <div className="box">
              <img src={resizedPhotoUrl} alt="" key={ind} />
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

export default HouseListingView;
