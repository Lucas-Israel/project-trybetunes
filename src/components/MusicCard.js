import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checked: false,
      favSongs: [],
    };
  }

  componentDidMount = async () => {
    await this.favSong();
  }

  favSong = async () => {
    await getFavoriteSongs();
    const storedFavSongs = localStorage.getItem('favorite_songs');
    this.setState({ favSongs: JSON.parse(storedFavSongs) });
  }

  addSongHandler = async (param1) => {
    await addSong(param1);
    this.setState({ loading: false });
  }

  render() {
    const { loading, checked, favSongs } = this.state;
    const { trackName, previewUrl, trackId, musicas } = this.props;
    const songFilter = musicas.find(({ trackId: trackID }) => trackID === trackId);
    const favorito = favSongs.some(({ trackId: songID }) => songID === trackId);
    return (
      <div className="track" key={ trackId }>
        <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
          <input
            type="checkbox"
            className="star"
            id={ trackId }
            checked={ checked || favorito }
            onChange={ () => {
              this.setState((before) => ({ loading: true, checked: !before.checked }));
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
