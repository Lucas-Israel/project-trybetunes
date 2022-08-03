import React from 'react';
import Header from './Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';
import MusicCard from './MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      gotFavs: [],
    };
  }

  componentDidMount = () => {
    this.getFavs();
  }

  getFavs = async () => {
    this.setState({ loading: true });
    const favorites = await getFavoriteSongs();
    this.setState({ gotFavs: favorites, loading: false });
  }

  update = () => {
    this.setState({ gotFavs: [] });
    this.getFavs();
    this.forceUpdate();
  }

  render() {
    const { gotFavs, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div className="page">
          <h1>{!loading && gotFavs.length < 1 ? 'No favorites' : 'Favorite songs'}</h1>
          {gotFavs.map(({ previewUrl, trackId, trackName }) => (
            <div key={ trackId } className="tracks">
              <MusicCard
                previewUrl={ previewUrl }
                trackName={ trackName }
                trackId={ trackId }
                musicas={ gotFavs }
                update={ this.update }
              />
            </div>
          ))}
          {loading && gotFavs.length < 1 && <Carregando />}
        </div>
      </div>
    );
  }
}

export default Favorites;
