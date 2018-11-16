import React from 'react';
import Dropzone from 'react-dropzone';
import { Redirect } from 'react-router-dom';
import { photosOnDrop } from '../util';

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
  }

  onChange(event) {
    // the id tag of each form field is used as the property of the state object
    const change = {};
    change[event.target.id] = event.target.value;
    this.setState(change);
  }

  onDrop(files) {
    photosOnDrop(files).then(photoUrls => {
      console.log('FILES ', photoUrls);
      const photos = this.state.photos;
      photos.push({ url: photoUrls[0] });
      this.setState({ photos });
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
    const { redirect, photos } = this.state;
    const { onSubmitPost } = this.props;

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
                <Dropzone onDrop={this.onDrop} multiple accept="image/jpeg, image/png" maxSize={5242880}>
                  <p>Add unlimited images!</p>
                </Dropzone>
              </div>
              <aside>
                <h2>{photos.length} File(s) Uploaded</h2>
                <ul>
                  {photos.map(file => (
                    <li>
                      <img src={file.url} alt="lost the url" />
                    </li>
                  ))}
                </ul>
              </aside>
            </section>
            <div className="field">
              <div className="control">
                <button
                  className="button is-primary"
                  type="submit"
                  onClick={() => {
                    onSubmitPost(this.state);
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
