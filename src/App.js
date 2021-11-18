import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Detail from './views/detail';
import Login from './views/login';
import Register from './views/register';
import Home from './views/home';
import Error from './views/error';
import Post from './views/post';
import Profile from './views/profile/profile';
import ChangePassword from './views/profile/changepassword';
import AdminDB from './views/admin/admin';
import Users from './views/admin/user/Users';
import ForgotPassword from './views/forgotPassword';
import ListProducts from './views/listProducts';
import Category from './views/category';


import Header from './components/header';
import Footer from './components/footer';

function App() {
  return (
    <Router>
      <div className="">
        <Header/>
        <Switch>
          <NavRoute exact path="/" component={Home} />
          <Route path="/detail/:idProduct" render={function () { return <Detail /> }} />
          <Route path="/category" render={function () { return <Category /> }} />
          <NavRoute path="/post" component={Post} />
          <Route path="/login" render={function () { return <Login /> }} />
          <Route path="/register" render={function () { return <Register /> }} />
          <Route path="/profile" render={function () { return <Profile /> }} />
          <Route path="/changepassword" render={function () { return <ChangePassword /> }} />
          <Route path="/admin" render={function () { return <AdminDB /> }} />
          <Route path="/admin/users" render={function () { return <Users /> }} />
          <Route path="/forgotPassword" render={function () { return <ForgotPassword /> }} />
          <Route path="/listProducts" render={function () { return <ListProducts /> }} />
          <Route path="*">
            <Error />
          </Route>

          {/* <PrivateRoute path="/private">
            <Error />
          </PrivateRoute> */}
        </Switch>
        <Footer/>
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
      <Component {...props} />
    </div>
  )} />
)

export default App;
