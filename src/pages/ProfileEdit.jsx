import React from 'react';
import '../styles/ProfileEdit.css';
import Header3 from '../components/Header3';
import { createUser, getUser } from '../services/userAPI';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
    }
  }

  componentDidMount() {
    this.pegarUsuario();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  criarUsuario = async () => {
    const { name, email, image, description } = this.state;
    await createUser({ name, email, image, description });
  }

  pegarUsuario = async () => {
    const user = await getUser();
    this.setState({ image: user.image });
  }

  render() {
    const { name, email, image, description } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header3 />
        <div className="flexProfile">
          <form className="profileCard">
            <div className="flexImg">
              <img
                src={ image === '' ? 'https://voxnews.com.br/wp-content/uploads/2017/04/unnamed.png' : image }
                alt="Imagem usuario" 
                className="imgUser2" />
            </div>
            <label htmlFor='nameInput' className="nameInput">
              Nome:
              <input type="text" name="name" id="nameInput" value={ name } onChange={ this.handleChange } className="infoInput"/>
            </label>
            <label htmlFor="emailInput" className="nameInput">
              Email:
              <input type="email" name="email" id="emailInput" value={ email } onChange={ this.handleChange } className="infoInput"/>
            </label>
            <label htmlFor="imageInput" className="nameInput">
              Imagem:
              <input type="text" name="image" id="imageInput" value={ image } onChange={ this.handleChange } className="infoInput"/>
            </label>
            <label htmlFor="desInput" className="nameInput">
              {`Descri????o: ${' '}`}
              <textarea name="description" id="desInput" cols="21" rows="2" value={ description } onChange={ this.handleChange } className="infoText"/>
            </label>
            <Link to="/profile" className="linkButton">
              <button onClick={ this.criarUsuario } className="buttonSave">Salvar Altera????es</button>
            </Link>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ProfileEdit;
