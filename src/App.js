import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Album from './components/Album';
import Favorites from './components/Favorites';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import Search from './components/Search';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loginName: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  customSetState = (param1, param2) => {
    this.setState({
      [param1]: param2,
    });
  }

  render() {
    const { loginName } = this.state;
    return (
      <div className="pai">
        <Switch>
          <Route
            exact
            path="/"
            render={ (param) => (<Login
              { ...param }
              loginName={ loginName }
              handleChange={ this.handleChange }
            />) }
          />
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default App;
