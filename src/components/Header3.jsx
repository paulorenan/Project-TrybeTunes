import React from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import logoHeader from '../images/logoHeader.png';
import Loading from './Loading';

class Header3 extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      usuario: {},
    };
  }

  componentDidMount() {
    this.pegarUsuario();
  }

  pegarUsuario = async () => {
    const usuario = await getUser();
    this.setState({ usuario, isLoading: false });
  }

  render() {
    const { usuario: { name, image }, isLoading } = this.state;
    if (isLoading) return (<Loading />);
    return (
      <header data-testid="header-component">
        <div className="logoEImg">
          <img src={ logoHeader } alt="Logo header" className="logoHeader" />
          <Link to="/profile" className="imgENome">
            <img
                src={ image === '' ? 'https://voxnews.com.br/wp-content/uploads/2017/04/unnamed.png' : image }
                alt="Imagem usuario" 
                className="userImg" />
            <p data-testid="header-user-name" className="userName">{ name === '' ? 'Usuario' : name }</p>
          </Link>
        </div>
        <nav>
          <Link
            to="/search"
            data-testid="link-to-search"
            className="search"
          >
            Pesquisa
          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className="favorites"
          >
            Favoritos
          </Link>
          <Link
            to="/profile"
            data-testid="link-to-profile"
            className="profile3"
          >
            Perfil
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header3;
