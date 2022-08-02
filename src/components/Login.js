import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { createUser, getUser } from '../services/userAPI';
import Carregando from './Carregando';
import PreLogin from './PreLogin';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      getUserValidation: false,
    };
  }

  funcCreateUser = async (param) => {
    createUser({ name: param });
    this.setState((before) => ({
      loading: !before.loading,
    }));
    await getUser();
    this.setState((before) => ({
      getUserValidation: !before.getUserValidation,
    }));
  }

  render() {
    const { loading, getUserValidation } = this.state;
    const { loginName, handleChange } = this.props;
    return (
      <div>
        { getUserValidation && <Redirect to="/search" />}
        { loading ? <Carregando /> : <PreLogin
          loginName={ loginName }
          handleChange={ handleChange }
          funcCreateUser={ this.funcCreateUser }
        />}
      </div>
    );
  }
}

Login.propTypes = {
  loginName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Login;
