import React from 'react';
import Dropzone from 'react-dropzone';
import { Redirect } from 'react-router-dom';

class UserProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onChange(event) {
    const change = {};
    change[event.target.id] = event.target.value;
    this.setState(change);
  }


  render() {
    const { redirect } = this.state;
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
              <label className="label">
                Name:
              </label>
              <div className="control">
                <input className="input is-normal" id="title" value={this.title} onChange={this.onChange} />
              </div>
            </div>
            <div className="field">
              <label className="label">
                Gender:
              </label>
              <div className="control">
                <input className="input" id="address" value={this.address} onChange={this.onChange} />
              </div>
            </div>
            <div className="field ">
              <label className="label">
                Birthday:
              </label>
              <div className="control">
                <input className="input" id="price" size="4" value={this.price} onChange={this.onChange} />
              </div>
            </div>
            <div className="field">
              <label className="label">
                Location:
              </label>
              <div className="control">

                <input className="input" id="description" value={this.description} onChange={this.onChange} />
              </div>
            </div>
            <div className="field">
              <label className="label">
                Hometown:
              </label>
              <div className="control">

                <input className="input" id="description" value={this.description} onChange={this.onChange} />
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
