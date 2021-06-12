import "./css/App.css";
import EditDetails from "./EditDetails";
import Details from "./Details";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import PrivateRoute from "./PrivateRoute";
// redux
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./Alert";

const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/details" />
            </Route>
            <Route
              exact
              path="/login"
              component={(props) => <Login {...props} />}
            />
            <Route
              exact
              path="/register"
              component={(props) => <Register {...props} />}
            />
            <PrivateRoute
              exact
              path="/details"
              component={(props) => <Details {...props} />}
            />
            <PrivateRoute
              exact
              path="/edit-details"
              component={(props) => (
                <EditDetails {...props} testprop="Test Prop" />
              )}
            />
          </Switch>
        </Router>
        <Alert />
      </Provider>
    </div>
  );
};

export default App;
