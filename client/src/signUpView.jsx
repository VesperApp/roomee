import React from 'react';
import Dropzone from 'react-dropzone';

const SignUpView = ({ onSignUp }) => (
  <div className="columns section level is-half is-offset-one-quarter">
    <form className="column level-item is-narrow is-offset-5" id="signUp" name="signUp" method="post" action="/signUp">
      <div className="field">
        <label className="label">Profile Picture</label>
        <Dropzone multiple accept="image/jpeg, image/png" maxSize={5242880}>
          <p>Add your photo</p>
        </Dropzone>
      </div>
      <div className="field">
        <label className="label">Email</label>
        <div className="control has-icons-left">
          <input className="input is-primary" type="email" name="username" placeholder="Email" />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
        </div>
      </div>
      <div className="field">
        <label className="label">First Name</label>
        <div className="control has-icons-left">
          <input className="input " type="text" name="firstname" placeholder="First Name" />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
        </div>
      </div>
      <div className="field">
        <label className="label">Last Name</label>
        <div className="control has-icons-left">
          <input className="input " type="text" name="lastname" placeholder="Last Name" />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control has-icons-left">
          <input className="input" type="password" name="password" placeholder="Password" />
          <span className="icon is-small is-left">
            <i className="fas fa-lock" />
          </span>
        </div>
      </div>
      {
        // if user clicks submit, redirects to login page
        // however login is not allowed likely due to refresh problems
      }
      <input onClick={onSignUp} className="button is-primary" type="submit" value="Sign Up" />
    </form>
  </div>
);

export default SignUpView;
