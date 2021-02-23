import React, { Component } from "react";
import { connect } from "react-redux";
import { artistDetail, clearArtistDetail } from "../store/actions";
import { Link } from "react-router-dom";

class Artist extends Component {
  componentDidMount() {
    this.props.dispatch(artistDetail(this.props.match.params.id));
  }

  componentWillUnmount() {
    this.props.dispatch(clearArtistDetail());
  }

  artistTemplate = (data) =>
    data.artistData ? (
      <div className="artist_view">
        <div>
          <Link to="/">Back home</Link>
          <div className="artist_description">
            <strong>Email Id:</strong>
            {data.artistData[0].email}
          </div>
        </div>
        <div className="artist_description">
          <strong>website:</strong>
          {data.artistData[0].website}
          <br />
          <br />
          <div className="tags">
            <div>
              <strong>Zipcode:</strong> {data.artistData[0].address.zipcode}
            </div>
          </div>
        </div>
      </div>
    ) : null;

  render() {
    console.log(this.props);
    return (
      <>
        <div className="display">{this.artistTemplate(this.props.artists)}</div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    artists: state.artists,
  };
}

export default connect(mapStateToProps)(Artist);
