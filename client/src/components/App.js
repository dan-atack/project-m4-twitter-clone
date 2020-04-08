import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import styled from 'styled-components';

import './App.css';
import Homefeed from './Homefeed';
import Notifications from './Notifications';
import Bookmarks from './Bookmarks';
import TweetDetails from './TweetDetails';
import UserProfile from './UserProfile';
import VisitProfile from './VisitProfile';
import Sidebar from './Sidebar';
import Header from './Header';
import TweetInput from './TweetInput';

function App() {

  return (
    <StyledBody className="App">
      <Header></Header>
      <Router>
      <TweetInput></TweetInput>
      <Sidebar></Sidebar>
        <Switch>
          <Route exact path='/'>
            <Homefeed></Homefeed>
          </Route>
          <Route path='/notifications'>
            <Notifications></Notifications>
          </Route>
          <Route path='/bookmarks'>
            <Bookmarks></Bookmarks>
          </Route>
          <Route path='/tweet/:id'>
            <TweetDetails></TweetDetails>
          </Route>
          <Route path='/userProfile'>
            <UserProfile></UserProfile>
          </Route>
          <Route path='/:profileId'>
            <VisitProfile></VisitProfile>
          </Route>
        </Switch>
      </Router>
    </StyledBody>
  );
};

const StyledBody = styled.div`
  display: grid;
  grid-template-areas:  'head head head head'
                        'side input input input'
                        'side main main main';
`;

export default App;
