import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchedArtist: '',
      loading: false,
    };
  }

  render() {
    const { searchedArtist, loading } = this.state;
    const { searchValue, handleChange, customSetState, musicSearch } = this.props;
    const disabledValue = 2;
    return (
      <div data-testid="page-search" className="page">
        <Header />
        <h1>
          Search
        </h1>
        <div>
          <label htmlFor="input-search">
            <input
              id="input-search"
              data-testid="search-artist-input"
              name="searchValue"
              value={ searchValue }
              onChange={ handleChange }
            />
          </label>
          {' '}
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ searchValue.length < disabledValue }
            onClick={ () => {
              this.setState({
                loading: true,
                searchedArtist: searchValue,
              });
              searchAlbumsAPI(searchValue)
                .then((data) => {
                  customSetState('musicSearch', data);
                  this.setState({ loading: false });
                });
              customSetState('searchValue', '');
            } }
          >
            Pesquisar

          </button>
        </div>
        <div>
          {loading && <Carregando /> }
          <p>
            {!loading
            && searchedArtist.length > 0
            && `Resultado de álbuns de: ${searchedArtist}`}
          </p>
          <div>
            {!loading && musicSearch.length > 0
              && musicSearch.map(({
                artistName,
                collectionId,
                collectionName },
              index) => (
                <div key={ artistName + index }>
                  <Link
                    to={ `/album/${collectionId}` }
                    data-testid={ `link-to-album-${collectionId}` }
                  >
                    {`Album ${collectionName}`}
                  </Link>
                </div>))}
            {musicSearch.length < 1
            && searchedArtist.length > 0
            && 'Nenhum álbum foi encontrado'}
          </div>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  searchValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  customSetState: PropTypes.func.isRequired,
  musicSearch: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Search;
