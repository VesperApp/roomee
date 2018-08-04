import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class UserProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: 'https://bulma.io/images/placeholders/128x128.png',
      username: '',
      gender: '',
      birthday: '',
      location: '',
      hometown: ''
    };
  }

  componentDidMount() {
    this.fetchLoginUser((err, user) => {
      if (err) {
        console.log('Error on getting login user: ', err);
      } else {
        this.setState(user);
      }
    });
  }

  fetchLoginUser(callback) {
    axios.get('/loginUser')
         .then((res) => callback(null, res.data))
         .catch((err) => callback(err, null));
  }

  onChange(event) {
    const change = {};
    change[event.target.id] = event.target.value;
    this.setState(change);
  }


  render() {
    const { redirect, picture, username, gender, birthday, location, hometown } = this.state;
    if (redirect) {
      return (<Redirect to='/house' />);
    }
    return (
      <section className="section">
        <div id="create-listing" className="columns">
          <div className="column is-half is-offset-one-quarter">
            <h4 className="subtitle">
              Usser Profile:
            </h4>
            <div className="field">
              <figure class="image is-128x128">
                <img src={picture} />
              </figure>
            </div>
            <div className="field">
              <label className="label">
                Name:
              </label>
              <div className="control">
                <input className="input is-normal" id="title" value={username} onChange={this.onChange} />
              </div>
            </div>
            <div className="field">
              <label className="label">
                Gender:
              </label>
              <div className="control">
                <input className="input" id="address" value={gender} onChange={this.onChange} />
              </div>
            </div>
            <div className="field ">
              <label className="label">
                Birthday:
              </label>
              <div className="control">
                <input className="input" id="price" size="4" value={birthday} type="date" onChange={this.onChange} />
              </div>
            </div>
            <div className="field">
              <label className="label">
                Location:
              </label>
              <div className="control">

                <input className="input" id="description" value={location} onChange={this.onChange} />
              </div>
            </div>
            <div className="field">
              <label className="label">
                Hometown:
              </label>
              <div className="control">
                <input className="input" id="description" value={hometown} onChange={this.onChange} />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button className="button is-primary"
                  type="submit"
                  onClick={() => {
                    this.props.onSubmit(this.state);
                    this.setRedirect();
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default UserProfileView;
