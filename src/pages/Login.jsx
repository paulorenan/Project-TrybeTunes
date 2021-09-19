import React from 'react';
import '../styles/Login.css';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import logo from '../images/Logo.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      isLoading: false,
      logado: false,

    };
    this.handleChange = this.handleChange.bind(this);
    this.criarUsuario = this.criarUsuario.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async criarUsuario() {
    const { nome } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name: nome });
    this.setState({ isLoading: false, logado: true });
  }

  render() {
    const { nome, isLoading, logado } = this.state;
    const min = 3;
    if (isLoading) return (<Loading />);
    if (logado) return (<Redirect to="/search" />);
    return (
      <div data-testid="page-login" className="page-login">
        <div className="logo-container">
          <img src={ logo } alt="Imagem logo" className="imgLogo" />
        </div>
        <form className="login-form">
          <label htmlFor="name-input">
            <input
              data-testid="login-name-input"
              placeholder="Nome"
              className="name-input"
              name="nome"
              value={ nome }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="login-submit-button"
            type="button"
            className="enter-button"
            disabled={ nome.length < min }
            onClick={ () => this.criarUsuario() }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
