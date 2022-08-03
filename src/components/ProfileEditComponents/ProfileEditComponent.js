import React from 'react';
import PropTypes from 'prop-types';

class ProfileEditComponent extends React.Component {
  render() {
    const { description, email, image, name, handleUser, saveUser } = this.props;
    const ready = name.length > 2
    && description.length > 2
    && email.length > 2
    && image.length > 2;
    return (
      <section className="section-edit">
        <form className="edit-form">
          <p className="div-img-edit">
            <img src={ image } alt={ name } className="profile-img edit-img-preview" />
          </p>
          <div>
            <div>
              Imagem:
            </div>
            <label htmlFor="img">
              <input
                type="text"
                data-testid="edit-input-image"
                name="image"
                id="img"
                value={ image }
                onChange={ handleUser }
                required
              />
            </label>
          </div>
          <div>
            <div>
              Nome:
            </div>
            <label htmlFor="name">
              <input
                type="text"
                data-testid="edit-input-name"
                name="name"
                id="name"
                value={ name }
                onChange={ handleUser }
                required
              />
            </label>
          </div>
          <div>
            <div>
              Email:
            </div>
            <label htmlFor="email">
              <input
                type="email"
                data-testid="edit-input-email"
                name="email"
                id="email"
                value={ email }
                onChange={ handleUser }
                required
              />
            </label>
          </div>
          <div>
            <div>
              Descrição:
            </div>
            <label htmlFor="desc">
              <input
                type="text"
                data-testid="edit-input-description"
                name="description"
                id="desc"
                value={ description }
                onChange={ handleUser }
                required
              />
            </label>
          </div>
          <div className="edit-btn">
            <button
              data-testid="edit-button-save"
              type="submit"
              onClick={ saveUser }
              disabled={ !ready }
            >
              Atualizar
            </button>
          </div>
        </form>
      </section>
    );
  }
}

ProfileEditComponent.defaultProps = {
  description: '',
  email: '',
  image: 'https://st2.depositphotos.com/4164031/6914/i/450/depositphotos_69145633-stock-photo-flag-of-brazil.jpg',
  name: '',
  handleUser: () => '',
  saveUser: () => '',
};

ProfileEditComponent.propTypes = {
  description: PropTypes.string,
  email: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  handleUser: PropTypes.func,
  saveUser: PropTypes.func,
};

export default ProfileEditComponent;
