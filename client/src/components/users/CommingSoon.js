import React, { Component } from "react";
import SideNav from "../common/SideNav";

class CommingSoon extends Component {
  render() {
    const styles = {
      navBar: {
        paddingLeft: "0",
        float: "left",
        height: "160vh"
      }
    };

    return (
      <div className="profile">
        <div className="col-md-2" style={styles.navBar}>
          <SideNav />
        </div>

        <div className="row">
          <div className="card card-body col-md-10">
            <h1 className="text-center">Comming Soon!</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default CommingSoon;
