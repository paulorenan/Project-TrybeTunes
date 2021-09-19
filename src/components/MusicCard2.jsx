import React from 'react';
import PropTypes from 'prop-types';

class MusicCard2 extends React.Component {
  musics = () => {
    const { musica, value, onChange, checked } = this.props;
    const { trackName, previewUrl, trackId } = musica;
    return (
      <section className="eachMusic2">
        <div className="track-title2">{trackName}</div>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor={ trackId } className="track-title2">
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="favorite"
            checked={ checked }
            onChange={ onChange }
            value={ value }
            id={ trackId }
          />
        </label>
      </section>
    );
  }

  render() {
    return (
      <div data-testid="page-profile">
        { this.musics() }
      </div>
    );
  }
}

MusicCard2.propTypes = {
  music: PropTypes.arrayOf(PropTypes.any),
}.isRequired;

export default MusicCard2;
