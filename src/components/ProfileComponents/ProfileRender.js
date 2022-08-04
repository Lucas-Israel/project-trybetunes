import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProfileRender extends React.Component {
  render() {
    const { name, image, email, description } = this.props;
    return (
      <div className="profile-pai">
        <section className="profile-section">
          <div className="div-img">
            <img
              className="profile-img"
              data-testid="profile-image"
              src={ image }
              alt={ name }
            />
          </div>
          <div className="div-name">
            <div className="prof-div">
              Nome:
            </div>
            {name}
          </div>
          <div className="div-email">
            <div className="prof-div">
              Email:
            </div>
            {email}
          </div>
          <div className="div-desc">
            <div className="prof-div">
              Descrição:
            </div>
            {description}
          </div>
        </section>
        <div className="div-btn">
          <button type="button" className="profile-button">
            <Link
              to="/profile/edit"
              style={ { textDecoration: 'none', color: 'black' } }
            >
              Editar perfil

            </Link>
          </button>
        </div>
      </div>
    );
  }
}

ProfileRender.defaultProps = {
  name: '',
  image: '',
  email: '',
  description: '',
};

ProfileRender.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  email: PropTypes.string,
  description: PropTypes.string,
};

export default ProfileRender;
