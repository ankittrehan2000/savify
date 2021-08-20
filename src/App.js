import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import SignUp from './screens/signup';
import Dashboard from './screens/dashboard';
import Login from './screens/login';
import TopNavbar from './components/navbar';
import { AuthProvider } from './authentication/authContext';
import PrivateRoutes from './authentication/privateRoutes';
import Blog from './screens/blog';
import About from './screens/about';
import Settings from './screens/settings';

function App() {
  return (

    <Router>
      <AuthProvider>
      <TopNavbar></TopNavbar>
        <Switch>
          <PrivateRoutes exact path="/" component={Dashboard}></PrivateRoutes>
          <PrivateRoutes exact path="/settings" component={Settings}></PrivateRoutes>
          <Route exact path="/signup" component={SignUp}>
          </Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/blog" component={Blog}></Route>
          <Route exact path="/about" component={About}></Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
