import React from 'react';

import axios from 'axios';
import { Redirect } from 'react-router-dom';
import RoomsSearchResultView from './roomsSearchResultView';

class UserProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: 'https://bulma.io/images/placeholders/128x128.png',
      username: '',
      gender: '',
      birthday: '',
      location: '',
      hometown: '',
      userListing: '',
      zipCode: '',
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.fetchLoginUser((err, user) => {
      if (err) {
        console.log('Error on getting login user: ', err);
      } else {
        this.setState(user);

        this.fetchUserListings((err, data) => {
          this.setState({ userListing: data });
        });
      }
    });
  }

  onChange(event) {
    const change = {};
    change[event.target.id] = event.target.value;
    this.setState(change);
  }

  fetchLoginUser(callback) {
    axios
      .get('/loginUser')
      .then(res => callback(null, res.data))
      .catch(err => callback(err, null));
  }

  fetchUserListings(callback) {
    axios
      .get('/userListings', {
        params: { userId: this.state.id },
      })
      .then(res => callback(null, res.data))
      .catch(err => callback(err, null));
  }

  render() {
    const { redirect, picture, username, gender, birthday, location, hometown } = this.state;
    if (redirect) {
      return <Redirect to="/house" />;
    }

    return (
      <section className="section">
        <div className="columns">
          <div className="column">
            <div className="box">
              <h4 className="subtitle">My Profile:</h4>
              <div className="field">
                <figure className="image is-128x128">
                  <img src={picture} />
                </figure>
              </div>
              <div className="field">
                <label className="label">Name:</label>
                <h5>{username}</h5>
                <div className="control" />
              </div>
              <div className="field">
                <label className="label">Gender:</label>
                <h5>{gender}</h5>
                <div className="control" />
              </div>
              <div className="field ">
                <label className="label">Birthday:</label>
                <h5>{birthday}</h5>

                <div className="control" />
              </div>
            </div>
            {/* <div className="box">
              <label className="label">Search Zipcode:</label>
              <p className="help">Enter your desired search zipcode for Roomee(s) or shared room listings</p>

              <div className="field column is-one-fifth">
                <div className="control">
                  <input className="input" id="zipCode" size="5" value={this.zipCode} onChange={this.onChange} />
                  <p className="help">ZipCode</p>
                </div>
              </div>
            </div> 

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
                  Save Changes
                </button> 
              </div>
            </div> */}
          </div>
          <div className="column is-half">
            <div className="box">
              <h4 className="subtitle">My Listings:</h4>
              {!this.state.userListing.length ? (
                <div className="has-text-centered title is-4">Sorry, no results found in this area</div>
              ) : (
                this.state.userListing.map(item => (
                  <RoomsSearchResultView onTitleClick={this.props.onTitleClick} listing={item} key={item.id} />
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default UserProfileView;
