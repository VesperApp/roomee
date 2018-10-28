import React from 'react';

const LoginView = ({ registered }) => (
  <form id="login" name="login" method="post" action="login" className="column is-half is-offset-one-quarter">
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
      <label className="label">Password</label>
      <div className="control has-icons-left">
        <input className="input" type="password" name="password" placeholder="Password" />
        <span className="icon is-small is-left">
          <i className="fas fa-lock" />
        </span>
      </div>
    </div>
    <div>
      <input className="button is-primary" type="submit" value="Log In" />
    </div>
  </form>
);

export default LoginView;
