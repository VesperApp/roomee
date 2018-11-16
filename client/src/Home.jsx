import React from 'react';
import $ from 'jquery';
import ListItemRoom from './ListItemRoom';
import DetailsRoom from './unusedComponents/DetailsRoom';

const mostRate = {
  background: '#eee',
  textAlign: 'center',
  fontSize: '2em',
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listRoom: [],
      detRoom: {},
    };
    this.load();
  }

  load() {
    // get request fetches the zipcode of the user's IP address and calls onEnterSite
    $.ajax({
      url: '/searchListing',
      success: data => {
        const dat = data;
        dat.map(value => {
          return value.price > 500;
        });
        this.setState({
          listRoom: dat.splice(-4),
        });
      },
      error: err => {
        console.log('mon error c', err);
      },
    });
  }

  render() {
    const { onTitleClick } = this.props;

    return (
      <div className="container">
        <section className="hero is-primary is-medium">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Welcome to Roomee</h1>
              <h2 className="subtitle">Search for and post room rental listings</h2>
            </div>
          </div>
        </section>
        <div className="tile is-ancestor">
          {this.state.listRoom.map(room => (
            <ListItemRoom room={room} key={room.id} onTitleClick={onTitleClick} />
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
