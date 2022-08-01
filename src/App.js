import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Album from './components/Album';
import Favorites from './components/Favorites';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import Search from './components/Search';
import Carregando from './components/Carregando';
import { getUser } from './services/userAPI';
import Header from './components/Header';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loginName: '',
      logged: false,
      userGot: '',
    };
  }

  fetchUser = async () => {
    this.setState({
      logged: true,
    });
    const user = await getUser();
    this.setState({
      userGot: user.name,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { loginName, logged, userGot } = this.state;
    return (
      <div className="avo">
        <div className="header">
          <Header />
        </div>
        <h1>
          <p>
            TrybeTunes
          </p>
        </h1>
        <div className="pai">
          {/* <div className="sidebar">
            <div className="barzinho">
              <Link to="/">home</Link>
            </div>
            <div className="barzinho">
              <Link to="/search">Search</Link>
            </div>
            <div className="barzinho">
              <Link to="/album">Album</Link>
            </div>
            <div className="barzinho">
              <Link to="/favorites">Favorites</Link>
            </div>
            <div className="barzinho">
              <Link to="/profile">Profile</Link>
            </div>
            <div className="barzinhoend">
              <Link to="/profile/edit">Profile Edit</Link>
            </div>
          </div> */}
          <div className="componentsection">
            <Switch>
              <Route
                exact
                path="/"
              >
                { logged ? <Carregando /> : <Login
                  loginName={ loginName }
                  handleChange={ this.handleChange }
                  fetchUser={ this.fetchUser }
                /> }
                { userGot.length > 0 && <Redirect to="/search" />}
              </Route>
              <Route path="/search" component={ Search }>
                {userGot > 0 ? <Redirect /> : ''}
              </Route>
              <Route path="/album/:id" component={ Album } />
              <Route path="/favorites" component={ Favorites } />
              <Route exact path="/profile/edit" component={ ProfileEdit } />
              <Route path="/profile" component={ Profile } />
              <Route path="*" component={ NotFound } />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
