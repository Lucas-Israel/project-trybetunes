import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  addSongHandler = async (param1) => {
    await addSong(param1);
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    const { trackName, previewUrl, trackId, musicas } = this.props;
    const songFilter = musicas.find(({ trackID }) => trackID === trackId);
    return (
      <div className="track">
        <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
          <input
            type="checkbox"
            id={ trackId }
            onClick={ () => {
              this.setState({ loading: true });
              this.addSongHandler(songFilter);
            } }
          />
        </label>
        <div>
          {loading ? <Carregando /> : trackName}
        </div>
        <div>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  musicas: PropTypes.arrayOf(
    PropTypes.shape({}).isRequired,
  ).isRequired,
};

export default MusicCard;
