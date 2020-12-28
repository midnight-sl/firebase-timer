import './styles/App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Timers from './components/Timers';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { AuthProvider } from './components/Auth';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <PrivateRoute exact path="/" component={Timers} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
