import React from 'react';
import { HashRouter, Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import SearchView from './searchView';
import LoginView from './loginView';
import SignUpView from './signUpView';
import CreateListingView from './createListingView';
import HouseListingView from './houseListingView';
import Home from './Home';
import Footer from './footer';
import Presentation from './hrrPresentation';
import UserProfileView from './userProfileView';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      listings: [],
      roomees: [],
      currentHouseView: {},
      registered: false,
      isLogin: false,
    };
    this.onSubmitPost = this.onSubmitPost.bind(this);
    this.onSearchRooms = this.onSearchRooms.bind(this);
    this.onSearchRoomees = this.onSearchRoomees.bind(this);
    this.searchRoomsByZipCode = this.searchRoomsByZipCode.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.onTitleClick = this.onTitleClick.bind(this);
    this.onInput = this.onInput.bind(this);
  }

  async componentDidMount() {
    const userZipcode = await axios('https://ipapi.co/json');
    this.setState({ ziptest: userZipcode.zip });
    this.searchRoomsByZipCode(userZipcode.zip);
    // check login status
    this.getLoginUser();
  }

  onSubmitPost(newListingData) {
    console.log(newListingData);
    // create new house listing in db
    this.setState({ currentHouseView: newListingData });
    // post request to server
    axios
      .post('/listing', newListingData)
      .then(() => {
        // console.log(`-------> Folowing data returned from server POST -> ${res}`)
      })
      .catch(err => console.log(err));
  }

  onSearchRooms(event) {
    const { term } = this.state;
    event.preventDefault();
    this.searchRoomsByZipCode(term);
  }

  onSearchRoomees(event) {
    const { term } = this.state;
    event.preventDefault();
    this.searchRoomeesByZipCode(term);
  }

  onSignUp() {
    // give user a human way to know they have registered
    this.setState({
      registered: true,
    });
  }

  onTitleClick(item) {
    // populate houselistingview with data from searchresult view
    this.setState({
      currentHouseView: item,
    });
  }

  onInput(e) {
    this.setState({ term: e.target.value });
  }

  async getLoginUser() {
    try {
      await axios.get('/loginUser');
      this.setState({ isLogin: true });
      return null;
    } catch (e) {
      return null;
    }
  }

  searchRoomsByZipCode(zipCode) {
    // get request queries databse for all listings matching the user's ip address zipcode
    axios
      .get('/searchListing', { params: { zip: zipCode } })
      .then(res => this.setState({ listings: res.data, roomees: [] }))
      .catch(err => console.log(err));
  }

  searchRoomeesByZipCode(zipCode) {
    axios
      .get('/searchRoomees', { params: { zip: zipCode } })
      .then(res => this.setState({ roomees: res.data, listings: [] }))
      .catch(err => console.log(err));
  }

  logout() {
    axios
      .get('/logout')
      .then(() => axios.get('/loginUser'))
      .then(() => this.setState({ isLogin: false }))
      .catch(err => console.log(err));
  }

  render() {
    const { isLogin, currentHouseView, registered, term, listings, roomees } = this.state;

    return (
      <HashRouter>
        <div className="container is-fluid">
          <h1 className="level-item title has-text-centered is-medium animated pulse">Roomee</h1>
          <nav className="level">
            <Link to="/" className="level-item">
              Home
            </Link>
            <Link to="/search" className="level-item">
              Search
            </Link>
            {isLogin ? (
              <Link to="/createListing" className="level-item">
                New Listing
              </Link>
            ) : null}
            {isLogin ? null : (
              <Link to="/loginView" className="level-item">
                Login
              </Link>
            )}
            {isLogin ? null : (
              <Link to="/signUpView" className="level-item">
                Sign Up
              </Link>
            )}
            {/* isLogin ? null : (
              <a href="/login/facebook" className="level-item">
                Login with Facebook
              </a>
            ) */}
            {isLogin ? (
              <Link to="/userProfileView" className="level-item">
                Profile
              </Link>
            ) : null}
            {isLogin ? (
              <a href="/logout" onClick={this.logout} className="level-item">
                Logout
              </a>
            ) : null}
          </nav>

          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/search"
              render={() => (
                <SearchView
                  onInput={this.onInput}
                  value={term}
                  listings={listings}
                  roomees={roomees}
                  onSearchRooms={this.onSearchRooms}
                  onSearchRoomees={this.onSearchRoomees}
                  onTitleClick={this.onTitleClick}
                />
              )}
            />
            <Route path="/signUpView" render={() => <SignUpView onSignUp={this.onSignUp} />} />
            <Route
              path="/loginView"
              render={() => <LoginView registered={registered} getLoginUser={this.getLoginUser.bind(this)} />}
            />
            <Route path="/userProfileView" render={() => <UserProfileView onTitleClick={this.onTitleClick} />} />
            <Route path="/createListing" render={() => <CreateListingView onSubmitPost={this.onSubmitPost} />} />
            <Route path="/house" render={() => <HouseListingView currentHouseView={currentHouseView} />} />
            <Route path="/presentation" component={Presentation} />
          </Switch>
          <Footer />
        </div>
      </HashRouter>
    );
  }
}
