import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import API from '../api.config';

class CreateListingView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      address: '',
      city: '',
      stateAbbr: '',
      zipCode: '',
      price: '',
      description: '',
      photos: [],
      redirect: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.setRedirect = this.setRedirect.bind(this);

    const { title, stateAbbr, address, city, zipCode, price, description, photos } = this.state;
  }

  onChange(event) {
    // the id tag of each form field is used as the property of the state object
    const change = {};
    change[event.target.id] = event.target.value;
    this.setState(change);
  }

  // this function uploads all files dropped into the the DropZone to Cloudinary, more info here:
  // https://tinyurl.com/y873sr55
  onDrop(files) {
    // Push all the axios request promises into a single array
    const uploaders = files.map(file => {
      // Initial FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('tags', `codeinfuse, medium, gist`);
      // Replace the preset name with your own ***********
      formData.append('upload_preset', API.cloudinaryPresetName);
      // Replace API key with your own Cloudinary key  ***********
      // images are hosted on Cloudinary, you can set up your own free account
      formData.append('api_key', API.cloudinaryKey);
      formData.append('timestamp', (Date.now() / 1000) | 0);

      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own) ***********
      return axios
        .post(API.CloudinaryURL, formData, {
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
        })
        .then(response => {
          const data = response.data;
          const fileURL = data.secure_url;
          this.state.photos.push(fileURL);
        });
    });

    // Once all the files are uploaded
    axios.all(uploaders).then(() => {
      // while we are only saving files photo urls to state and passing those to our database, a user
      // could presently upload an unlimited amount of image files to our Cloudinary account
      // const photos = this.state.photos.slice();
      // this.setState({
      //   photo1: photos[0],
      //   photo2: photos[1],
      //   photo3: photos[2],
      //   photo4: photos[3],
      //   photo5: photos[4]
      // });

      var temp = [];
      this.state.photos.forEach(function(ele) {
        temp.push({ url: ele });
      });
      this.setState({
        photosData: temp,
      });
    });
  }

  setRedirect() {
    // invoked when the submit button is clicked to redirect user to /house endpoint which renders
    // the houseListingView component
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/house" />;
    }
    return (
      <section className="section">
        <div id="create-listing" className="columns">
          <div className="column is-half is-offset-one-quarter">
            <h4 className="subtitle">Create Your Listing:</h4>
            <div className="field">
              <label className="label">Title:</label>
              <div className="control">
                <input className="input is-normal" id="title" value={this.title} onChange={this.onChange} />
                <p className="help">What do you want to call your listing?</p>
              </div>
            </div>
            <div className="field">
              <label className="label">Address:</label>
              <div className="control">
                <input className="input" id="address" value={this.address} onChange={this.onChange} />
                <p className="help">Where is your listing located?</p>
              </div>
            </div>
            <div className="columns">
              <div className="field column is-one-quarter">
                <div className="control">
                  <input className="input" id="city" value={this.city} onChange={this.onChange} />
                  <p className="help">City</p>
                </div>
              </div>
              <div className="field column is-one-fifth">
                <div className="control">
                  <input className="input" id="stateAbbr" size="2" value={this.stateAbbr} onChange={this.onChange} />
                  <p className="help">State</p>
                </div>
              </div>
              <div className="field column is-one-fifth">
                <div className="control">
                  <input className="input" id="zipCode" size="5" value={this.zipCode} onChange={this.onChange} />
                  <p className="help">ZipCode</p>
                </div>
              </div>
            </div>
            <div className="field ">
              <label className="label">Price:</label>
              <div className="control">
                <input
                  className="input"
                  id="price"
                  type="number"
                  size="4"
                  value={this.price}
                  onChange={this.onChange}
                />
                <p className="help">USD</p>
              </div>
            </div>
            <div className="field">
              <label className="label">Description:</label>
              <div className="control">
                <input className="input" id="description" value={this.description} onChange={this.onChange} />
              </div>
            </div>
            <section>
              <div className="dropzone">
                {/* https://www.npmjs.com/package/react-dropzone */}
                <Dropzone onDrop={this.onDrop} multiple accept="image/jpeg, image/png" maxSize={5242880}>
                  <p>Add unlimited images!</p>
                </Dropzone>
              </div>
              <aside>
                <h2>{this.state.photos.length} File(s) Uploaded</h2>
                <ul>
                  {this.state.photos.map((f, i) => {
                    // this is very odd, the line above correctly displays the file name, but
                    <li key={f}>File {i}</li>;
                    // the line above is not rendering ANYTHING
                    // the photos are being saved  however, so come back to this post-MVP
                  })}
                </ul>
              </aside>
            </section>
            <div className="field">
              <div className="control">
                <button
                  className="button is-primary"
                  type="submit"
                  onClick={() => {
                    this.props.onSubmit(this.state);
                    this.setRedirect();
                  }}
                >
                  Create Listing
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default CreateListingView;
