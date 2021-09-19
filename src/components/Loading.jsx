import React from 'react';
import '../styles/Loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div data-testid="page-profile" className="loadCont">
        <p>Carregando...</p>
      </div>
    );
  }
}

export default Loading;
