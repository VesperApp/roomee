import React from 'react';
import $ from 'jquery';

import ListItemRoom from './unusedComponents/ListItemRoom';
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
          listRoom: dat.splice(0, 9),
        });
      },
      error: err => {
        console.log('mon error c', err);
      },
    });
  }

  handleClickitem(room) {
    this.setState({
      detRoom: room,
      showDetailsComponent: true,
    });
  }

  closeDetailRoom() {
    this.setState({
      showDetailsComponent: false,
    });
  }

  render() {
    return (
      <div>
        <section className="hero is-medium is-primary">
          <div className="hero-body">
            <h1 className="animated pulse">Welcome to Roomee</h1>
          </div>
        </section>
        <div>
          {this.state.showDetailsComponent === true ? (
            <DetailsRoom listing={this.state.detRoom} closeDetailRoom={this.closeDetailRoom.bind(this)} />
          ) : null}
        </div>
        <nav>
          <div style={mostRate}> The most rate </div>
          {this.state.listRoom.map(room => (
            <ListItemRoom room={room} key={room.id} handleClickitem={this.handleClickitem.bind(this)} />
          ))}
        </nav>
      </div>
    );
  }
}

export default Home;
