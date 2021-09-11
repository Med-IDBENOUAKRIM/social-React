import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FormAuth from "./components/Auth/FormAuth";
import Home from "./components/Home/Home";
import Nav from "./components/NavBar/Nav";
import Profil from "./components/Profil/Profil";
import PrivateComponent from "./PrivateComponents/PrivateComponent";
import ProfileComponentPrivate from "./PrivateComponents/ProfileComponentPrivate";
import Trending from "./components/Trending/Trending";


function App({history}) {


  return (
    <Router>
      <Nav />
      <Switch>
          <Route exact path='/'  component={Home} />
          <PrivateComponent exact path="/auth"  component={FormAuth} />
          <ProfileComponentPrivate exact path="/profil"  component={Profil} />
          <ProfileComponentPrivate exact path="/trending"  component={Trending} />
      </Switch>
    </Router>
  );
}

export default App;
