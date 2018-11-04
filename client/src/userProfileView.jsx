import React from 'react';

import axios from 'axios';
import { Redirect } from 'react-router-dom';
import RoomsSearchResultView from './roomsSearchResultView';

class UserProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: '',
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
    const { redirect, photo, username, gender, birthday, location, hometown } = this.state;
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
                  <img src={photo || 'https://bulma.io/images/placeholders/128x128.png'} />
                </figure>
              </div>
              <div className="field">
                <label className="label">Name:</label>
                <h5>{username}</h5>
                <div className="control" />
              </div>
              <div className="field">
                <label className="label">Gender:</label>
                <h5>{gender ? 'Male' : 'Female'}</h5>
                <div className="control" />
              </div>
              <div className="field ">
                <label className="label">Birthday:</label>
                <h5>{birthday}</h5>

                <div className="control" />
              </div>
            </div>
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
