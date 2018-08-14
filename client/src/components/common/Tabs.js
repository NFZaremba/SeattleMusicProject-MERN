import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import ProfileActions from "../dashboard/ProfileActions";
import EditProfile from "../dashboard/EditProfile";
import AddMusic from "../dashboard/Music/AddMusic";
import AddBand from "../dashboard/Music/AddBand";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});

class SimpleTabs extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" style={{ background: "rgb(3, 0, 204)" }}>
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Edit Profile" />
            <Tab label="Edit Favorite Music" />
            <Tab label="Edit Band Info" />
          </Tabs>
        </AppBar>
        {value === 0 && (
          <TabContainer style={{ background: "black" }}>
            <EditProfile />
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            <AddMusic />
          </TabContainer>
        )}
        {value === 2 && (
          <TabContainer>
            <AddBand />
          </TabContainer>
        )}
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTabs);
