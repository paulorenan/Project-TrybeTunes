import React from 'react';
import '../styles/Favorite.css';
import Header2 from '../components/Header2';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard2 from '../components/MusicCard2';
import Loading from '../components/Loading';
import Footer from '../components/Footer';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      favorite: [],
    };
  }

  componentDidMount() {
    const { isLoading } = this.state;
    if (isLoading) this.pegarMusicasFavoritas();
  }

  pegarMusicasFavoritas = async () => {
    const favorite = await getFavoriteSongs();
    this.setState({ favorite, isLoading: false });
  }

  removerFavorite = async (event) => {
    await this.removerMusica(event);
    this.pegarMusicasFavoritas();
  }

  removerMusica = async ({ target: { value } }) => {
    const { favorite } = this.state;
    const musicaEscolhida = favorite.find((musica) => musica
      .trackId === parseInt(value, 10));
    this.setState({ isLoading: true });
    await removeSong(musicaEscolhida);
  }

  favoriteMusicCard = () => {
    const { favorite } = this.state;
    if (favorite.length) {
      return (
        <div className="allFav">
          <div className="favP"><p>Musicas Favoritas:</p></div>
          <div className="favCont">
            { favorite.map((musica) => (
              <div key={ musica.trackId } className="favCont2">
                <img src={ musica.artworkUrl100 } alt="Musica" className="favImg" />
                <MusicCard2
                  musica={ musica }
                  key={ musica.trackId }
                  value={ musica.trackId }
                  checked={ favorite.some((song) => song.trackId === musica.trackId) }
                  onChange={ this.removerFavorite }
                  className="favCard"
                />
              </div>
            ))}
          </div>
          <Footer />
        </div>
      );
    }
    return (<p>Não tem musicas favoritas</p>);
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header2 />
        { isLoading ? <Loading /> : this.favoriteMusicCard()}
      </div>
    );
  }
}

export default Favorites;
