import React from 'react';
import '../styles/Profile.css';
import { Link } from 'react-router-dom';
import Header3 from '../components/Header3';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';
import Footer from '../components/Footer';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      user: {},
    };
  }

  componentDidMount() {
    this.pegarUsuario();
  }

  pegarUsuario = async () => {
    const user = await getUser();
    this.setState({ isLoading: false, user });
  }

  perfilUsuario = () => {
    const { user } = this.state;
    return (
      <section className="flexProfile">
        <div className="profileCard">
          <div className="imgLinkCard">
            <img
              data-testid="profile-image"
              src={ user.image === '' ? 'http://barcarena.pa.gov.br/portal/img/perfil/padrao.jpg' : user.image }
              alt="Imagem usuario"
              className="imgUser"
            />
            <Link to="/profile/edit" className="linkUser">Editar Perfil</Link>
          </div>
          <div className="nome">
            <h3 className="profileH3">Nome</h3>
            <p className="profileP">{ user.name }</p>
          </div>
          <div className="email">
            <h3 className="profileH3">Email</h3>
            <p className="profileP">
              { user.email === '' ? 'Email não informado' : user.email }
            </p>
          </div>
          <div className="descrição">
            <h3 className="profileH3">Descrição</h3>
            <p className="profileP">
              { user.description === '' ? 'Sem descrição' : user.description }
            </p>
          </div>
        </div>
        <Footer />
      </section>
    );
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header3 />
        { isLoading ? <Loading /> : this.perfilUsuario()}
      </div>
    );
  }
}

export default Profile;
