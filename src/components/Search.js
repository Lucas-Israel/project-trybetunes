import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

class Search extends React.Component {
  render() {
    const { searchValue, handleChange } = this.props;
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
          >
            Pesquisar

          </button>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  searchValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Search;
