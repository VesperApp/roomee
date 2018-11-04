import React from 'react';
import Dropzone from 'react-dropzone';
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar';
import { photosOnDrop } from '../util';

class SignUpView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { photo: null };
  }

  componentDidMount() {
    // initialize Bulma Calender, see: http://creativebulma.net//product/calendar/demo
    const options = {
      displayMode: 'dialog',
      dateFormat: 'YYYY-MM-DD', // sticks with the mySQL format
    }
    const calendars = bulmaCalendar.attach('[type="date"]', options);
    calendars.forEach(calendar => {
      calendar.on('date:selected', date => {
        console.log(date);
      });
    });
  }

  onDrop(files) {
    photosOnDrop(files).then(photos => this.setState({ photo: photos[0] }));
  }

  render() {
    const { photo } = this.state;
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
            <Dropzone
              onDrop={files => this.onDrop(files)}
              multiple
              accept='image/jpeg, image/png'
              maxSize={5242880}
              multiple
              accept='image/jpeg, image/png'
              maxSize={5242880}
            >
              <div style={{ position: 'absolute' }}>Add your photo</div>
              <img src={photo} style={{ height: '100%', width: '100%' }} />
            </Dropzone>
            <input style={{ display: 'none' }} name='photo' value={photo} />
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
          <div className='field'>
            <label className='label'>Gender</label>
            <div className='control'>
              <label class='radio'>
                <input type='radio' name='gender' value={1} />
                &nbsp;Male
              </label>
              <label class='radio'>
                <input type='radio' name='gender' value={0} />
                &nbsp;Female
              </label>
            </div>
          </div>
          <div className='field'>
            <label className='label'>Birthday</label>
            <div className='control has-icons-left'>
              <input
                className='input'
                type='date'
                name='birthday'
              />
              <span className='icon is-small is-left'>
                <i className='fas fa-lock' />
              </span>
            </div>
          </div>
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
