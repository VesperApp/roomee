import React from 'react';
import $ from 'jquery';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import axios from 'axios';
import SearchView from './searchView.jsx';
// import LoginView from './loginView.jsx';
// import SignUpView from './signUpView.jsx';
import CreateListingView from './createListingView.jsx';
import HouseListingView from './houseListingView.jsx';
import Home from './Home.jsx';
import Footer from './footer.jsx';

import UserProfileView from './userProfileView.jsx'

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      term: '',
      listings: [],
      roomees:[],
      currentHouseView: {},
      justRegistered: false,
      showLogin: true
    };
    this.onSubmitPost = this.onSubmitPost.bind(this);
    this.onSearchRooms = this.onSearchRooms.bind(this);
    this.onSearchRoomees = this.onSearchRoomees.bind(this);
    this.searchRoomsByZipCode = this.searchRoomsByZipCode.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.onTitleClick = this.onTitleClick.bind(this);
    this.onInput = this.onInput.bind(this);
  }

  /* ******** Helpers and Events **********/

  componentDidMount () {
    // get request fetches the zipcode of the user's IP address and calls onEnterSite
    axios.get('http://ip-api.com/json')
         .then(response => {
           this.setState({ziptest: response.data.zip});
           this.searchRoomsByZipCode(response.data.zip
         )})
         .catch(err => console.log(err));

    // check login status  
    this.getLoginUser((err, user) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({isLogin: !!user});
      }
    })
  }

  onInput (e) {
    this.setState({ term: e.target.value });
  }

  onTitleClick (item) {
    // populate houselistingview with data from searchresult view
    this.setState({
      currentHouseView: item
    });
  }

  onSignUp (e) {
    // give user a human way to know they have registered
    this.setState({
      justRegistered: true
    });
  }

  /* ******** Helpers and Events **********/
  /*  ******** axios Requests **********/

  onSearchRooms (event) {
    event.preventDefault();
    this.searchRoomsByZipCode(this.state.term);
  }

  onSearchRoomees(event) {
    event.preventDefault();
    this.searchRoomeesByZipCode(this.state.term);
  }

  onSubmitPost (newListingData) {
    console.log(newListingData);
    // create new house listing in db
    this.setState( { currentHouseView: newListingData } )
    // post request to server
    axios.post('/listing', newListingData)
      .then((res) => {
        // console.log(`-------> Folowing data returned from server POST -> ${res}`)
      })
      .catch(err => console.log(err));
  }

  searchRoomsByZipCode (zipCode) {
    // get request queries databse for all listings matching the user's ip address zipcode
    axios.get('/searchListing', { params: { zip: zipCode } })
         .then(res => this.setState({ listings: res.data }))
         .catch(err => console.log(err) );
  }

  searchRoomeesByZipCode(zipCode) {
    axios.get('/roomees')
         .then(res => this.setState({roomees: res.data}))
         .catch(err => console.log(err));
  }

  getLoginUser(callback) {
    axios.get('/loginUser')
         .then((res) => callback(null, res.data))
         .catch((err) => callback(err, null));
  }

  logout() {
    axios.get('/logout')
         .then((res) => axios.get('/loginUser'))
         .then((res) => this.setState({isLogin: !!user}))
         .catch((err) => console.log(err));
  }

  /*  ******** axios Requests **********/
  /* ******** Render **********/

  render () {
    const {isLogin} = this.state;

    // passing props to views with routes
    const renderHouseListingView = props => (
      <HouseListingView
        currentHouseView={this.state.currentHouseView}
      />
    );
    // const renderSignUpView = props => (
    //   <SignUpView
    //     onSignUp={this.onSignUp}
    //   />
    // );
    // const renderLoginView = props => (
    //   <LoginView
    //     registered={this.state.justRegistered}
    //   />
    // );
    const renderCreateListingView = props => (
      <CreateListingView
        onSubmit={this.onSubmitPost}
      />
    );
    const renderSearchView = props => (
      <SearchView
        onInput={this.onInput}
        value={this.state.term}
        listings={this.state.listings}
        onSearchRooms={this.onSearchRooms}
        onSearchRoomees={this.onSearchRoomees}
        onTitleClick={this.onTitleClick}
      />);
      const renderUserProfileView = props => (
        <UserProfileView
        onTitleClick={this.onTitleClick}
        />
      );
      const renderHome = props => (
       <Home  />
      );

    return (
      <Router>
        <div className="hero">
          <h1 className="level-item title has-text-centered is-medium   animated pulse">
            Roomee
          </h1>
          {/* React router routes*/}
          <nav className="level">
            <Link to="/" className="level-item">
              Home
            </Link>
            <Link to="/search" className="level-item">
            Search
            </Link>

            {isLogin ? <Link to="/createListing" className="level-item">New Listing</Link> : null}
            {/*isLogin ? null : <Link to="/loginView" className="level-item">Login</Link>*/}
            {/*isLogin ? null : <Link to="/signUpView" className="level-item">Sign Up</Link>*/}
            {isLogin ? null : <a href="/login/facebook" className="level-item">Login with Facebook</a>}
            {isLogin ? <Link to="/userProfileView" className="level-item">Profile</Link> : null}
            {isLogin ? <a href="/logout" onClick={this.logout} className="level-item">Logout</a> : null}
          </nav>

          {/* define root */}
          <Route exact path="/" component={renderHome} />
          <Route path="/search" render={renderSearchView} />
          <Route path="/createListing" render={renderCreateListingView} />
          {/*<Route path="/loginView" render={renderLoginView} />
          <Route path="/signUpView" render={renderSignUpView} />*/}
          <Route path="/house" render={renderHouseListingView} />
          <Route path="/userProfileView" 
          render={renderUserProfileView}
          />

          <Footer />
        </div>
      </Router>
      
    );
  }

  /* ******** Render **********/
}

  // <footer className="footer has-text-centered heading is-6">
  // by the roomee project
  // </footer>