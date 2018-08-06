import React from 'react';

// component is show when a user searching for rooms clicks on an individual listing AND when a user
// creates a new listing as confirmation that their listing has been entered in the database
const HouseListingView = ({currentHouseView}) => (
  <div id="house-listing-view" className="section columns">
    <div className="column has-text-left is-half">
      <div>
        <h3 className="heading">Title</h3>
        <p className="content">{currentHouseView.title}</p>
      </div>
      <div>
        <h3 className="heading">Address</h3>
        <p className="content">
          {currentHouseView.address + ' '}
          {currentHouseView.city + ', '}
          {currentHouseView.stateAbbr + ' '}
          {currentHouseView.zipCode}
        </p>
      </div>
      <div>
        <h3 className="heading">Price</h3>
        <p className="content">{'$' +currentHouseView.price}</p>
      </div>
      <div>
        <h3 className="heading">Description</h3>
        <p className="content">
        {currentHouseView.description}</p>
        </div>
      <div>
        <h3 className="heading">Contact via Email</h3>
        <p>{currentHouseView.user ? <a> {currentHouseView.user.email} </a>: "N/A"}</p>
      </div>
    </div>
    <div className="column">
        {
          currentHouseView.photos.map((photo,ind) => {
            if(photo.url===null) {return null;}

            // this array could contain strings (when rendered after a user creates a new listing) or
            // objects from our database when rednered after a serach, if it is an array of
            // objects, we need the string located at photo.url, otherwise we can use the string as
            // provided. a better solution would be for this page to receive consistent props
            if (photo.url) { photo = photo.url; }
            const arr = photo.split('upload/');
            // pictures are hosted on cloudinary and inserting these parameters in the url resizes the
            // picures. Ideally the ratio of the images would be consistent for better layout but we //didn't get to that feature
            const uploadWidth = 'upload/w_412,c_scale/';
            const resizedPhotoUrl = arr.join(uploadWidth);
            return (<img src={resizedPhotoUrl} alt="picture of room for rent" key={ind}></img>)
          })
        }
      </div>
  </div>
);

export default HouseListingView;
