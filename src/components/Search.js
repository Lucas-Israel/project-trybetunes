import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Carregando from './Carregando';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      artistName: '',
      inputValue: '',
      musicSearch: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  searching = async () => {
    const { inputValue } = this.state;
    this.setState({ loading: true, artistName: inputValue });
    const abc = await searchAlbumsAPI(inputValue);
    this.setState({ loading: false, inputValue: '', musicSearch: abc });
  }

  render() {
    const { loading, artistName, inputValue, musicSearch } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div className="page">
          <h1>
            Search
          </h1>
          <div>
            <label htmlFor="input-search">
              <input
                id="input-search"
                data-testid="search-artist-input"
                name="inputValue"
                value={ inputValue }
                onChange={ this.handleChange }
                placeholder="Procurar artistas/bandas"
              />
            </label>
            {' '}
            <button
              data-testid="search-artist-button"
              type="button"
              disabled={ inputValue.length < 2 }
              onClick={ () => {
                this.searching();
              } }
            >
              Pesquisar

            </button>
          </div>
          <div>
            {loading && <Carregando /> }
            <p>
              {!loading
            && artistName.length > 0
            && `Resultado de álbuns de: ${artistName}`}
            </p>
            <div>
              {!loading && musicSearch.length > 0
              && musicSearch.map(({
                artistNameS,
                collectionId,
                collectionName,
                artworkUrl100 },
              index) => (
                <div className="searchedDiv" key={ artistName + index }>
                  <img className="searchImg" src={ artworkUrl100 } alt={ artistNameS } />
                  <Link
                    to={ `/album/${collectionId}` }
                    data-testid={ `link-to-album-${collectionId}` }
                  >
                    {collectionName}
                  </Link>
                </div>))}
              {musicSearch.length < 1
            && artistName.length > 0
            && 'Nenhum álbum foi encontrado'}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
