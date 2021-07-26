import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { LandingPage, BrowsePage, FavoritesPage, NewsPage, PetDetailsPage, AdminPage, AddPetPage } from './pages'
import { Header, AuthProvider, PrivateRoute } from './components'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

// Todo: determine if we are logged in or not, pass as props to Skeleton
// Todo: fix style so "page" does not render behind Header (for example Landing Page)
// The last route is for unknown paths

class App extends Component {
  render() {
    return (
      <div className="App">
        <AuthProvider>
          <Router>
            <Header />
            <Switch>
              <Route exact path="/" component={LandingPage}/>         
              <Route exact path="/browse" component={BrowsePage}/>
              <PrivateRoute exact path="/favorites" component={FavoritesPage}/>
              <Route exact path="/news" component={NewsPage}/>
              <PrivateRoute exact path="/admin" component={AdminPage}/>
              <PrivateRoute path="/admin/add-pet" component={AddPetPage} />
              <Route exact path="/pet-profile/:id" component={PetDetailsPage} />
              <Route component={LandingPage} />
            </Switch>
          </Router>         
        </AuthProvider>
      </div>
    );
  }
}

export default App;
