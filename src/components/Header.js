import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
    };
  }

  componentDidMount() {
    this.gettingUser();
  }

  gettingUser = async () => {
    const { user } = this.state;
    if (user.length < 1) {
      const use = await getUser();
      this.setState({ user: use.name });
    }
  }

  render() {
    const { user } = this.state;
    return (
      <div className="headerzinho" data-testid="header-component">
        <div className="linksOnHeader">
          <Link to="/search" data-testid="link-to-search">Search</Link>
        </div>
        <div className="linksOnHeader">
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        </div>
        <div className="linksOnHeader">
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </div>
        <div className="linksOnHeader" data-testid="header-user-name">
          {user || 'Carregando...'}
        </div>
      </div>
    );
  }
}

export default Header;
