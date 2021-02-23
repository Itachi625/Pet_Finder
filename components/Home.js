import React, { Component } from "react";
import { connect } from "react-redux";
import { artistsListAll, artistsListSearch } from "../store/actions";
import { Link } from "react-router-dom";

class Home extends Component {
  // state = {
  //   keyword: "the keyword value is:",
  //   value: "",
  // };
  componentDidMount() {
    this.props.dispatch(artistsListAll());
  }

  showArtistsAll = (data) =>
    data
      ? data
          .sort(function (a, b) {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;

            //sorting alphabetically
          })
          .map((item) => (
            <Link
              to={`/artist/${item.id}`}
              key={item.id}
              className="artist_item"
            >
              <div>{item.name}</div>
            </Link>
          ))
      : null;

  getKeywords = (event) => {
    let key = event.target.value;
    this.props.dispatch(artistsListSearch(key));
  };

  // fun1(event) {
  //   this.setState({
  //     value: event.target.value,
  //   });
  // }

  render() {
    return (
      <>
        <div className="display">
          <div className="search_container">
            <h2>Search your Name</h2>
            <input type="text" onChange={(event) => this.getKeywords(event)} />
          </div>
          {/* <div>
            <input onChange={(event) => this.fun1(event)} />
            <div>{this.state.keyword}</div>
            <div>{this.state.value}</div>
            <br />
          </div> */}

          <div className="artist_container">
            {this.showArtistsAll(this.props.artists.artistList)}
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    artists: state.artists,
  };
}
export default connect(mapStateToProps)(Home);
