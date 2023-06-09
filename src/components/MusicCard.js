import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
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
    const { favSongs } = this.state;
    const { trackId } = this.props;
    const favorito = favSongs.some(({ trackId: songID }) => songID === trackId);
    this.setState({ checked: favorito });
  }

  removeSongHandler = async (param1) => {
    await removeSong(param1);
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
    const { loading, checked } = this.state;
    const { trackName, previewUrl, trackId, musicas, update } = this.props;
    const songFilter = musicas.find(({ trackId: trackID }) => trackID === trackId);
    return (
      <div className="track" key={ trackId }>
        <div className="fav-star">
          <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
            Favorita
            <input
              type="checkbox"
              className="star"
              id={ trackId }
              checked={ checked }
              onChange={ () => {
                this.setState({ loading: true, checked: true });
                this.addSongHandler(songFilter);
                if (checked) {
                  this.removeSongHandler(songFilter);
                  this.setState({ checked: false });
                  update();
                }
              } }
            />
          </label>
        </div>
        <div className="song-name-div">
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
  update: PropTypes.func.isRequired,
};

export default MusicCard;
