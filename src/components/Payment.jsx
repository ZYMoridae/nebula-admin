import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import PaymentOrder from './payment/PaymentOrder';
import AddressForm from './payment/AddressForm';
import PaymentMethod from './payment/PaymentMethod';
import {isMobile} from 'react-device-detect';

const styles = theme => ({
  root: {
    // width: '90%',
    marginTop: theme.spacing.unit * 5
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  stepControllerContainer: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 5,
    textAlign: 'center'
  },
  // The bellow styles will apply to Payment Order page
  paymentOrderContainer: {
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 4
  },
  textField: {

  },
  gridItem: {
    paddingTop: '0px !important',
    paddingBottom: '0px !important'
  },
  gridContainer: {
    marginBottom: theme.spacing.unit * 8,
    marginTop: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 8,
    paddingRight: theme.spacing.unit * 8
  },
  paymentMethodContainer: {
    marginBottom: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 4
  },
  paymentMethodInputContainer: {
    paddingRight: isMobile ? '0' : theme.spacing.unit * 8,
    marginTop: isMobile ? theme.spacing.unit * 2 : '0'
  },
  ccBlockMobile: {
    padding: '0 !important'
  }
});

function getSteps() {
  return ['Confirm your order', 'Your shipping address', 'Finalise your order'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Step 1: Select campaign settings...';
    case 1:
      return 'Step 2: What is an ad group anyways?';
    case 2:
      return 'Step 3: This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
}

class Payment extends Component {
  constructor() {
    super();
    this.state = {
      activeStep: 0,
      completed: new Set(),
      skipped: new Set()
    };
  }

  skippedSteps() {
    return this.state.skipped.size;
  }

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  isStepComplete(step) {
    return this.state.completed.has(step);
  }

  completedSteps() {
    return this.state.completed.size;
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps() - this.skippedSteps();
  }

  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1;
  }

  totalSteps() {
    return getSteps().length;
  }

  /**
   * Render sub-components which controller by the step controller
   */
  renderSubComponent(props, activeStep, classes) {
    return (
      <div>
        {activeStep == 0 && <PaymentOrder {...props} classes={classes}/>}
        {activeStep == 1 && <AddressForm {...props} classes={classes}/>}
        {activeStep == 2 && <PaymentMethod {...props} classes={classes}/>}
      </div>
    )
  }

  componentWillMount() {
    const { fetchActivateOrder, orderId } = this.props;

    fetchActivateOrder(orderId);
  }

  render() {
    const { classes, shippingInfoFormData, orderId, createShippingInfo, creditCardInfo} = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    let cartItems = JSON.parse(localStorage.getItem('_pfc'));
    // const totalSteps = () => getSteps().length;

    const isStepOptional = (step) => { step === 1 };

    const handleSkip = () => {
      const { activeStep } = this.state;
      if (!this.isStepOptional(activeStep)) {
        // You probably want to guard against something like this
        // it should never occur unless someone's actively trying to break something.
        throw new Error("You can't skip a step that isn't optional.");
      }

      this.setState(state => {
        const skipped = new Set(state.skipped.values());
        skipped.add(activeStep);
        return {
          activeStep: state.activeStep + 1,
          skipped,
        };
      });
    };

    const updateShippingInfo = () => {
      // Validate shipping info
      if(!shippingInfoFormData.firstname 
          || !shippingInfoFormData.lastname
          || !shippingInfoFormData.email
          || !shippingInfoFormData.telephone
          || !shippingInfoFormData.postCode
          || !shippingInfoFormData.address1
          || !shippingInfoFormData.address2) {
            return;
          }
      
      // Validate credit card info
      if(!creditCardInfo.cardnumber
          || !creditCardInfo.cardname
          || !creditCardInfo.expiry
          || !creditCardInfo.cvc) {
            return;
          }
      
      let paymentPayload = {};

      paymentPayload.cardNumber = creditCardInfo.cardNumber;
      paymentPayload.name = creditCardInfo.cardname; 
      paymentPayload.expiry = creditCardInfo.expiry;
      paymentPayload.cvv = creditCardInfo.cvc;


      createShippingInfo(orderId, shippingInfoFormData, {
        paymentType: 'CCC',
        creditCard: paymentPayload
      });
    }


    const handleNext = () => {
      let activeStep;
      
      console.log(this.isLastStep());


      if (this.isLastStep()) {
        console.log('222');
        updateShippingInfo();
      }else {
        activeStep = this.state.activeStep + 1;
        this.setState({
          activeStep,
        });
      }
      
      // if (this.isLastStep() && !this.allStepsCompleted()) {
      //   // It's the last step, but not all steps have been completed
      //   // find the first step that has been completed
      //   const steps = getSteps();
      //   activeStep = steps.findIndex((step, i) => !this.state.completed.has(i));
      // } else {
        
      // }

    };

    const handleBack = () => {
      this.setState(state => ({
        activeStep: state.activeStep - 1,
      }));
    };

    const handleStep = step => () => {
      this.setState({
        activeStep: step,
      });
    };

    const handleComplete = () => {
      // eslint-disable-next-line react/no-access-state-in-setstate
      const completed = new Set(this.state.completed);
      completed.add(this.state.activeStep);
      this.setState({
        completed,
      });

      /**
       * Sigh... it would be much nicer to replace the following if conditional with
       * `if (!this.allStepsComplete())` however state is not set when we do this,
       * thus we have to resort to not being very DRY.
       */
      if (completed.size !== this.totalSteps() - this.skippedSteps()) {
        this.handleNext();
      }
    };

    const handleReset = () => {
      this.setState({
        activeStep: 0,
        completed: new Set(),
        skipped: new Set(),
      });
    };

    return (
      <div className={classes.root}>
        <Stepper alternativeLabel nonLinear activeStep={activeStep}>
          {steps.map((label, index) => {
            const props = {};
            const buttonProps = {};
            if (isStepOptional(index)) {
              buttonProps.optional = <Typography variant="caption">Optional</Typography>;
            }
            if (this.isStepSkipped(index)) {
              props.completed = false;
            }
            return (
              <Step key={label} {...props}>
                <StepButton
                  onClick={handleStep(index)}
                  completed={this.isStepComplete(index)}
                  {...buttonProps}
                >
                  {label}
                </StepButton>
              </Step>
            );
          })}
        </Stepper>

        <Grid container spacing={0}>
          <Grid item xs={1} md={2}>

          </Grid>
          <Grid item xs={10} md={8}>
            {/* Rendering sub-components */}
            {this.renderSubComponent(this.props, this.state.activeStep, classes)}

            <div className={classes.stepControllerContainer}>
              {this.allStepsCompleted() ? (
                <div>
                  <Typography className={classes.instructions}>
                    All steps completed - you&apos;re finished
              </Typography>
                  <Button onClick={this.handleReset}>Reset</Button>
                </div>
              ) : (
                  <div>
                    {/* <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography> */}
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}
                      >
                        Back
                </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'} 
                </Button>
                      {isStepOptional(activeStep) &&
                        !this.state.completed.has(this.state.activeStep) && (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleSkip}
                            className={classes.button}
                          >
                            Skip
                    </Button>
                        )}
                      {/* {activeStep !== steps.length &&
                        (this.state.completed.has(this.state.activeStep) ? (
                          <Typography variant="caption" className={classes.completed}>
                            Step {activeStep + 1} already completed
                    </Typography>
                        ) : (
                            <Button variant="contained" color="primary" onClick={this.handleComplete}>
                              {this.completedSteps() === this.totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                            </Button>
                          ))} */}
                    </div>
                  </div>
                )}
            </div>
          </Grid>
          <Grid item xs={1} md={2}>

          </Grid>
        </Grid>

      </div>
    );
  }
}

export default withStyles(styles)(Payment);