import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import '../styles/Album.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musicas: [],
      isLoading: true,
      favorite: [],
      isLoadingFav: true,
    };
  }

  componentDidMount() {
    const { isLoading, isLoadingFav } = this.state;
    if (isLoading) this.pegarMusicas();
    if (isLoadingFav) this.pegarMusicasFavoritas();
  }

  adicionarOuRemover = async (event) => {
    const { target: { checked } } = event;
    if (checked === true) {
      await this.adicionarMusica(event);
    } else {
      await this.removerMusica(event);
    }
    this.pegarMusicasFavoritas();
  }

  adicionarMusica = async ({ target: { value } }) => {
    const { musicas } = this.state;
    const musicaEscolhida = musicas.find((musica) => musica
      .trackId === parseInt(value, 10));
    this.setState({ isLoadingFav: true });
    await addSong(musicaEscolhida);
  }

  removerMusica = async ({ target: { value } }) => {
    const { musicas } = this.state;
    const musicaEscolhida = musicas.find((musica) => musica
      .trackId === parseInt(value, 10));
    this.setState({ isLoadingFav: true });
    await removeSong(musicaEscolhida);
  }

  pegarMusicasFavoritas = async () => {
    const favorite = await getFavoriteSongs();
    this.setState({ favorite, isLoadingFav: false });
  }

  pegarMusicas = async () => {
    const { match: { params: { id } } } = this.props;
    const musicas = await getMusics(id);
    await this.setState({ musicas, isLoading: false });
  }

  musicaCard = () => {
    const { musicas, favorite } = this.state;
    return (
      <div className="flexinho">
        <div className="musicsCard">
          <div className="musicsInfo">
            <img src={ musicas[0].artworkUrl100 } alt="Imagem album" className="musImg" />
            <h2 data-testid="artist-name">{musicas[0].artistName}</h2>
            <h3 data-testid="album-name">{musicas[0].collectionName}</h3>
          </div>
          <div className="musics">
            {musicas.slice(1).map((musica) => (
              <MusicCard
                musica={ musica }
                key={ musica.trackId }
                value={ musica.trackId }
                checked={ favorite.some((song) => song.trackId === musica.trackId) }
                onChange={ this.adicionarOuRemover }
                className="eachMusic"
              />))}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { isLoading, isLoadingFav } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {isLoading || isLoadingFav ? <Loading /> : this.musicaCard()}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Album;
