import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Product from './views/product';
import Login from './views/login';
import Home from './views/home';

function App() {
  return (


    <Router>
      <div>
        <Switch>
        <Route exact path="/">
            <Home />
          </Route>
          <Route path="/product">
            <Product />
          </Route>
          <Route path="/login" render={function () { return <Login /> }} />
        
          <PrivateRoute path="/404">
            <Home />
          </PrivateRoute>

        </Switch>
      </div>
    </Router>


  );
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route {...rest} render={function () {
      return localStorage.todoApp_accessToken ?
        children :
        <Redirect to={{ pathname: '/' }} />;
    }} />
  );
}

export default App;
