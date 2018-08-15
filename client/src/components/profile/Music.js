import React, { Component } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

class Music extends Component {
  render() {
    const { favoritemusic, band } = this.props;

    const musicItems = favoritemusic.map(music => (
      <li key={music._id} className="list-group-item">
        <p>
          <strong>Song: </strong> {music.song}
        </p>
        <p>
          <strong>Artist: </strong> {music.artist}
        </p>
        <p>
          <strong>Album: </strong>
          {music.album}
        </p>
        <p>
          <strong>Genre: </strong>
          {music.genre}
        </p>
      </li>
    ));

    const bandName = band.map(bandItem => (
      <li key={bandItem._id} className="list-group-item">
        <h4>{bandItem.name}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{bandItem.from}</Moment> -
          {bandItem.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{bandItem.to}</Moment>
          )}
        </p>
        <p>
          <strong>Genre: </strong> {bandItem.genre}
        </p>
        <p>
          <strong>Description: </strong>
          {bandItem.description}
        </p>
      </li>
    ));
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-white">Favorite Music</h3>
          {musicItems.length > 0 ? (
            <ul className="list-group">{musicItems}</ul>
          ) : (
            <p className="text-center text-white">No Favorite Music Listed</p>
          )}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-white">Band</h3>
          {bandName.length > 0 ? (
            <ul className="list-group">{bandName}</ul>
          ) : (
            <p className="text-center text-white">No Band Listed</p>
          )}
        </div>
      </div>
    );
  }
}

Music.propTypes = {
  favoritemusic: PropTypes.array.isRequired,
  band: PropTypes.array.isRequired
};

export default Music;
