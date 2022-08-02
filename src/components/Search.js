import React from 'react';
import Header from './Header';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search" className="page">
        <Header />
        <h1>
          Search
        </h1>
        <div>
          <label htmlFor="input-search">
            <input id="input-search" data-testid="search-artist-input" />
          </label>
          {' '}
          <button data-testid="search-artist-button" type="button">Pesquisar</button>
        </div>
      </div>
    );
  }
}

export default Search;
