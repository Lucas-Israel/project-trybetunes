import React from 'react';
import Header from './Header';
import Carregando from './Carregando';
import { getUser } from '../services/userAPI';
import ProfileRender from './ProfileComponents/ProfileRender';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: '',
    };
  }

  componentDidMount = () => {
    this.getFav();
  }

  getFav = async () => {
    this.setState({ loading: true });
    const usuario = await getUser();
    this.setState({ loading: false, user: usuario });
  }

  render() {
    const { loading, user: { name, image, email, description } } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <div className="page">
          {loading ? <Carregando /> : <ProfileRender
            name={ name }
            image={ image }
            email={ email }
            description={ description }
          />}
        </div>
      </div>
    );
  }
}

export default Profile;
