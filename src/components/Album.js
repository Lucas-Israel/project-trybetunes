import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: [],
      musicas: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const value = await getMusics(id);
    this.setState({
      album: value.filter((_element, index) => index === 0),
      musicas: value.filter((_element, index) => index !== 0),
    });
  }

  render() {
    const { album, musicas } = this.state;
    const albumName = album.map(({ collectionCensoredName }) => (
      <p key={ collectionCensoredName } data-testid="album-name">
        Collection Name
        {': '}
        {collectionCensoredName}
      </p>
    ));
    const artistNam = album.map(({ artistName }) => (
      <p key={ artistName } data-testid="artist-name">
        {`Artista: ${artistName}`}
      </p>));
    const albumPicture = album.map(({ artistId, artworkUrl100 }) => (
      <div key={ artistId }>
        <img src={ artworkUrl100 } alt={ artistId } />
      </div>
    ));
    return (
      <div data-testid="page-album">
        <Header />
        <div className="page">
          {albumPicture}
          {artistNam}
          {albumName}
          {musicas.map(({ previewUrl, trackId, trackName }) => (
            <div key={ trackId } className="tracks">
              <MusicCard
                previewUrl={ previewUrl }
                trackName={ trackName }
                trackId={ trackId }
                musicas={ musicas }
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
