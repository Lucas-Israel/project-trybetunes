import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      imagem: '',
    };
  }

  componentDidMount() {
    this.gettingUser();
  }

  gettingUser = async () => {
    const { user } = this.state;
    if (user.length < 1) {
      const use = await getUser();
      this.setState({ user: use.name, imagem: use.image });
    }
  }

  render() {
    const { user, imagem } = this.state;
    return (
      <div>
        <div className="header-user-name" data-testid="header-user-name">
          <div>
            <h3>
              TrybeTunes
            </h3>
          </div>
          <div className="header-user-display">
            <img className="header-img" src={ imagem } alt={ user } />
            <h3>
              {user || 'Carregando...'}
            </h3>
          </div>
        </div>
        <div className="headerzinho" data-testid="header-component">
          <div className="linksOnHeader">
            <Link
              style={ { textDecoration: 'none', color: 'white' } }
              to="/search"
              data-testid="link-to-search"
            >
              <h3>
                Search
              </h3>
            </Link>
          </div>
          <div className="linksOnHeader">
            <Link
              style={ { textDecoration: 'none', color: 'white' } }
              to="/favorites"
              data-testid="link-to-favorites"
            >
              <h3>
                Favorites
              </h3>
            </Link>
          </div>
          <div className="linksOnHeader">
            <Link
              style={ { textDecoration: 'none', color: 'white' } }
              to="/profile"
              data-testid="link-to-profile"
            >
              <h3>
                Profile
              </h3>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
