import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirect: false,
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const change = {};
    change[event.target.id] = event.target.value;
    this.setState(change);
  }

  async submitLogin(req) {
    try {
      await axios.post('/login', req);
      // let hi = await axios.post('/loginUser');
      await this.props.getLoginUser();
      this.setState({
        redirect: true,
      });
    } catch (err) {
      alert('Invalid username or password.');
    }
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div id="login" name="login" method="post" action="/login" className="column is-half is-offset-one-quarter">
        <div className="field">
          <label className="label" id="email">
            Email
          </label>
          <div className="control has-icons-left">
            <input
              className="input"
              id="username"
              placeholder="Username"
              value={this.username}
              onChange={this.onChange}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>
          </div>
        </div>
        <div className="field">
          <label className="label" id="password">
            Password
          </label>
          <div className="control has-icons-left">
            <input
              className="input"
              id="password"
              placeholder="Password"
              value={this.password}
              onChange={this.onChange}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock" />
            </span>
          </div>
        </div>
        <div>
          <input
            className="button is-primary"
            type="submit"
            value="Log In"
            onClick={() => this.submitLogin(this.state)}
          />
        </div>
      </div>
    );
  }
}

export default LoginView;
