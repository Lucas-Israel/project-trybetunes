import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import Carregando from './Carregando';
import { getUser, updateUser } from '../services/userAPI';
import ProfileEditComponent from './ProfileEditComponents/ProfileEditComponent';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: {},
      redirect: false,
    };
  }

  componentDidMount = () => {
    this.gettingUser();
  }

  gettingUser = async () => {
    this.setState({ loading: true });
    const gotUser = await getUser();
    this.setState({ loading: false, user: gotUser });
  }

  handleUser = ({ target }) => {
    const { name: targetname, value } = target;
    this.setState((before) => ({
      user: {
        description: targetname === 'description' ? value : before.user.description,
        email: targetname === 'email' ? value : before.user.email,
        image: targetname === 'image' ? value : before.user.image,
        name: targetname === 'name' ? value : before.user.name,
      },
    }));
  };

  saveUser = async (event) => {
    const { user } = this.state;
    this.setState({ loading: true });
    event.preventDefault();
    await updateUser(user);
    this.setState({ loading: false, redirect: true });
  }

  render() {
    const { loading, user: { description, email, image, name }, redirect } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <div className="page">
          {redirect && <Redirect to="/profile" />}
          {loading ? <Carregando /> : <ProfileEditComponent
            description={ description }
            email={ email }
            image={ image }
            name={ name }
            handleUser={ this.handleUser }
            saveUser={ this.saveUser }
          />}
        </div>
      </div>
    );
  }
}

export default ProfileEdit;
