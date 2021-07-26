import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { LandingPage, BrowsePage, FavoritesPage, NewsPage, PetDetailsPage, AdminPage } from './pages'
import { Header, AuthProvider, PrivateRoute } from './components'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from './components/Footer';

// Todo: determine if we are logged in or not, pass as props to Skeleton
// Todo: fix style so "page" does not render behind Header (for example Landing Page)

class App extends Component {
  render() {
    return (
      <div className="App">
        <AuthProvider>
          <Router>
            <Header />
            <div className={"paddingBottom"}>
              <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/browse" component={BrowsePage} />
                <PrivateRoute exact path="/favorites" component={FavoritesPage} />
                <Route exact path="/news" component={NewsPage} />
                <Route path="/pet-profile/:id" component={PetDetailsPage} />
                <Route exact path="/admin" component={AdminPage} />
              </Switch>
            </div>
            <Footer />
          </Router>
        </AuthProvider>
      </div>
    );
  }
}

export default App;
