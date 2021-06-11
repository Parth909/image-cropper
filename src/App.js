import "./App.css";
import Details from "./Details";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
              component={(props) => <Details {...props} testprop="Test Prop" />}
            />
          </Switch>
        </Router>
        <Alert />
      </Provider>
    </div>
  );
};

export default App;
