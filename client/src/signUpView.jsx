import React from 'react';
import Dropzone from 'react-dropzone';
import { photosOnDrop } from '../util';

class SignUpView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { photo: null };
  }

  onDrop(files) {
    photosOnDrop(files).then((photos) => this.setState({photo: photos[0]}));
  }

  render() {
    return (
      <div className='columns section level is-half is-offset-one-quarter'>
        <form
          className='column level-item is-narrow is-offset-5'
          id='signUp'
          name='signUp'
          method='post'
          action='/signUp'
        >
          <div className='field'>
            <label className='label'>Profile Picture</label>
            <Dropzone onDrop={(files) => this.onDrop(files)} multiple accept="image/jpeg, image/png" maxSize={5242880} multiple accept='image/jpeg, image/png' maxSize={5242880}>
              <div style={{position:'absolute'}}>Add your photo</div>
              <img src={this.state.photo} style={{height:'100%', width:'100%'}}/>
            </Dropzone>

          </div>
          <div className='field'>
            <label className='label'>Email</label>
            <div className='control has-icons-left'>
              <input
                className='input is-primary'
                type='email'
                name='username'
                placeholder='Email'
              />
              <span className='icon is-small is-left'>
                <i className='fas fa-envelope' />
              </span>
            </div>
          </div>
          <div className='field'>
            <label className='label'>First Name</label>
            <div className='control has-icons-left'>
              <input
                className='input '
                type='text'
                name='firstname'
                placeholder='First Name'
              />
              <span className='icon is-small is-left'>
                <i className='fas fa-user' />
              </span>
            </div>
          </div>
          <div className='field'>
            <label className='label'>Last Name</label>
            <div className='control has-icons-left'>
              <input
                className='input '
                type='text'
                name='lastname'
                placeholder='Last Name'
              />
              <span className='icon is-small is-left'>
                <i className='fas fa-user' />
              </span>
            </div>
          </div>
          <div className='field'>
            <label className='label'>Password</label>
            <div className='control has-icons-left'>
              <input
                className='input'
                type='password'
                name='password'
                placeholder='Password'
              />
              <span className='icon is-small is-left'>
                <i className='fas fa-lock' />
              </span>
            </div>
          </div>
          {
            // if user clicks submit, redirects to login page
            // however login is not allowed likely due to refresh problems
          }
          <input
            onClick={this.props.onSignUp}
            className='button is-primary'
            type='submit'
            value='Sign Up'
          />
        </form>
      </div>
    );
  }
}

export default SignUpView;
