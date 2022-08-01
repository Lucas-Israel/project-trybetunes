import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  render() {
    const { loginName, handleChange, fetchUser } = this.props;
    const loginNameLengthValue = 3;
    return (
      <div data-testid="page-login">
        <label htmlFor="login-name">
          <input
            id="login-name"
            data-testid="login-name-input"
            name="loginName"
            value={ loginName }
            onChange={ handleChange }
          />
        </label>
        {' '}
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ loginName.length < loginNameLengthValue }
          onClick={ () => {
            createUser({ name: loginName });
            fetchUser();
          } }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  loginName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
};

export default Login;
