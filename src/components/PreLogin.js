import React from 'react';
import PropTypes from 'prop-types';

class PreLogin extends React.Component {
  render() {
    const { loginName, handleChange, funcCreateUser } = this.props;
    const conditionValue = 3;
    return (
      <div className="page">
        <h1>
          Login
        </h1>
        <div data-testid="page-login">
          {' '}
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
            disabled={ loginName.length < conditionValue }
            onClick={ () => funcCreateUser(loginName) }
          >
            Entrar

          </button>
        </div>
      </div>
    );
  }
}

PreLogin.propTypes = {
  loginName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  funcCreateUser: PropTypes.func.isRequired,
};

export default PreLogin;
