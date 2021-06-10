import logo from "./logo.svg";
import "./App.css";
import Details from "./Details";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import PrivateRoute from "./PrivateRoute";
// redux
import { Provider } from "react-redux";
import store from "./store";
const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
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
      </div>
    </Provider>
  );
};

export default App;
