import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Detail from './views/Detail';
import Login from './views/Login';
import Home from './views/Home';
import Error from './views/Error';

import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="">
        <Switch>
          <NavRoute exact path="/" component={Home} />
          <NavRoute path="/detail" component={Detail} />
          <Route path="/login" render={function () { return <Login /> }} />
          <Route path="*">
            <Error />
          </Route>

          {/* <PrivateRoute path="/private">
            <Error />
          </PrivateRoute> */}
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

const NavRoute = ({ exact, path, component: Component }) => (
  <Route exact={exact} path={path} render={(props) => (
    <div>
      <Header />
      <Component {...props} />
      <Footer />
    </div>
  )} />
)

export default App;
