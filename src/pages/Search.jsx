import React from 'react';
import { Link } from 'react-router-dom';
import Header1 from '../components/Header1';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import '../styles/Search.css';
import Footer from '../components/Footer';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      isLoading: false,
      artist: '',
      album: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  procurarAlbum = async () => {
    const { nome } = this.state;
    const artista = nome;
    this.setState({ nome: '', isLoading: true, artist: artista });
    const album = await searchAlbumsAPI(nome);
    this.setState({ isLoading: false, album });
  }

  mainScreen = () => {
    const { nome } = this.state;
    const min = 2;
    return (
      <form className="searchForm">
        <label htmlFor="searchInput">
          <input
            id="searchInput"
            className="searchInput"
            data-testid="search-artist-input"
            name="nome"
            value={ nome }
            onChange={ this.handleChange }
            placeholder="Nome do Artista"
          />
        </label>
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ nome.length < min }
          onClick={ this.procurarAlbum }
          className="searchButton"
        >
          Pesquisar
        </button>
      </form>
    );
  }

  listaAlbum = () => {
    const { artist, album } = this.state;
    if (artist === '') return null;
    const result = `Resultado de álbuns de: ${artist}`;
    return (
      <div className="albumContainer">
        {album.length ? <div className="resultCont"><p>{result}</p></div>
          : <div className="notFound"><p>Nenhum álbum foi encontrado</p></div>}
        <div className="albums">
          { album.map(({ artistName, collectionId, collectionName, artworkUrl100 }) => (
            <Link to={ `album/${collectionId}` } key={ collectionId } className="albumCard">
              <div className="imgCont">
                <img src={ artworkUrl100 } alt="Album" className="albumImg" />
              </div>
              <div className="infoCont">
                <p className="colName">{ collectionName }</p>
                <p className="artName">{ artistName }</p>
              </div>
            </Link>
          ))}
        </div>
        <Footer />
      </div>
    );
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div data-testid="page-search">
        <Header1 />
        {isLoading ? <Loading /> : this.mainScreen()}
        {isLoading ? <Loading /> : this.listaAlbum()}
      </div>
    );
  }
}

export default Search;
