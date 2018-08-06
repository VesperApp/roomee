import React from "react";
import $ from "jquery";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import ListItemRoom from "./ListItemRoom.jsx";
import DetailsRoom from "./DetailsRoom.jsx";

var mostRate = {
  background: "#eee",
  textAlign: "center",
  fontSize: "2em"
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listRoom: [],
      detRoom: {}
    };
    this.load();
  }

  load() {
    // get request fetches the zipcode of the user's IP address and calls onEnterSite
    $.ajax({
      url: "/searchListing",
      success: data => {
        var dat = data
        dat.map(function(value) {
            return value.price > 500
        });
        this.setState({
          listRoom: dat.splice(0, 9)
          })
      },
      error: err => {
        // console.log('mon error c', err);
      }
    });
  }
  handleClickitem(room) {
    this.setState({
      detRoom: room,
      showDetailsComponent: true
    });
  }
  closeDetailRoom() {
    this.setState({
      showDetailsComponent: false
    });
  }
  render() {
    return (
      <div>
        <section className="hero is-medium is-primary">
          <div className="hero-body">
            <h1 className="animated pulse">Welcome to Roomee</h1>
                <div className="banner"> 
                  <img src="http://www.vesaliusdesign.com/wp-content/uploads/2018/07/extraordinary-home-and-garden-furniture-22-category-banner-750x360.jpg"/>
                </div> 
          </div>
        </section>
        <div>
          {this.state.showDetailsComponent === true ? (
            <DetailsRoom
              listing={this.state.detRoom}
              closeDetailRoom={this.closeDetailRoom.bind(this)}
            />
          ) : null}
        </div>

        <nav>
          <div style={mostRate}> The most rate </div>
          {this.state.listRoom.map(room => (
            <ListItemRoom
              room={room}
              key={room.id}
              handleClickitem={this.handleClickitem.bind(this)}
            />
          ))}
        </nav>
      </div>
    );
  }
}

export default Home;
