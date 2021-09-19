import React from 'react';
import '../styles/Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer navbar-fixed-bottom">
        <div className="flexFooter">
          <div className="info">
            <p>Criador Por: Paulo Renan Almeida.</p>
            <p>Todos os direitos reservados.</p>
          </div>
          <div className="cont">
            <p>Contato:</p>
            <a href="https://github.com/paulorenan" target="_blank" rel="noreferrer" className="conta">GitHub</a>
            <a href="https://www.linkedin.com/in/paulorenan9/" target="_blank" rel="noreferrer" className="conta">LinkedIn</a>
            <a href="https://www.instagram.com/p.renan9/" target="_blank" rel="noreferrer" className="conta">Instagram</a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
