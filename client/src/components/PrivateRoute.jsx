import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './AuthContext';

class PrivateRoute extends Component {
  render() {
    const {
      component: Component, isLoggedIn, ...rest
    } = this.props;
    
    return(
      <AuthContext>
        {({ isLoggedIn }) => (
          <Route {...rest}
          render={props => isLoggedIn 
          ? (
            <Component {...props} />
          ) : (
            <Redirect to='/' />
          )}
          />
        )}      
      </AuthContext>

    )
  }
}

export { PrivateRoute };
