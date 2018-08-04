import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CreateProfile from "../dashboard/CreateProfile";
import AddMusic from "../dashboard/Music/AddMusic";
import AddBand from "../dashboard/Music/AddBand";
import IsEmpty from "../../validation/IsEmpty";

const styles = theme => ({
  root: {
    width: "90%"
  },
  backButton: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

class StepperInfo extends Component {
  state = {
    activeStep: 0
  };

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  getSteps = () => {
    return [
      "Created Account",
      "Set-Up Profile",
      "Add Band Info (optional)",
      "Add Favorite Music"
    ];
  };

  getStepContent = stepIndex => {
    switch (stepIndex) {
      case 0:
        return "This is completed";
      case 1:
        if (IsEmpty(this.props.profile.profile)) {
          return <CreateProfile callBack={this.handleNext} />;
        } else {
          return "Completed!";
        }
      //return <CreateProfile callBack={this.handleNext} />;
      case 2:
        // if (this.props.profile.band.length === 0) {
        //   return <AddBand callBack={this.handleNext} />;
        // } else {
        //   return "Completed!";
        // }
        return <AddBand callBack={this.handleNext} />;
      case 3:
        return <AddMusic />;
      default:
        return "Uknown stepIndex";
    }
  };

  render() {
    const { classes } = this.props;
    const steps = this.getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed
              </Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <Typography
                className={classes.instructions}
                style={{ color: "white", fontSize: "20px" }}
              >
                {this.getStepContent(activeStep)}
              </Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                {IsEmpty(this.props.profile) ? (
                  <Button
                    disabled={activeStep === 1 || activeStep === 3}
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                ) : (
                  <Button
                    // disabled={activeStep === 1 || activeStep === 3}
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

StepperInfo.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(StepperInfo);
