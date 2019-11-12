import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import _ from "lodash";

import "react-image-gallery/styles/css/image-gallery.css";
import Paper from "@material-ui/core/Paper";

import Fade from "@material-ui/core/Fade";

import TextField from "@material-ui/core/TextField";

import AsyncSelect from "react-select/async";

import "./ProductForm.css";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Indicator from "../utils/Indicator";
import IconButton from "@material-ui/core/IconButton";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";

// import SkuAttributeForm from "./SkuAttributeForm";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import SkuAttribute from "./SkuAttribute";

const styles = theme => ({});

class SkuAttributeForm extends Component {
  constructor() {
    super();
    this.state = {
      skuAttributeExpanded: false
    };
  }

  handlePanelChange() {
    this.setState({
      skuAttributeExpanded: !this.state.skuAttributeExpanded
    });
  }

  addSkuAttributeOnClickHandler(skuIndex) {
    // this.setState({
    //   skuAttributeExpanded: !this.state.skuAttributeExpanded
    // });
    if (
      _.isNil(this.props.skus[skuIndex].skuAttributes) ||
      this.props.skus[skuIndex].skuAttributes.length == 0
    ) {
      this.setState({
        skuAttributeExpanded: true
      });
    }
    this.props.addSkuAttributeOnClickHandler(skuIndex);
  }

  render() {
    const {
      classes,
      parentClasses,
      skuAttributes,
      mode,
      addSkuAttributeOnClickHandler,
      skuIndex,
      skus
    } = this.props;

    return Array.isArray(skus[skuIndex].skuAttributes) &&
      skus[skuIndex].skuAttributes.length > 0 ? (
      <Fade in={true} timeout={1000}>
        <ExpansionPanel
          expanded={this.state.skuAttributeExpanded}
          onChange={() => {
            this.handlePanelChange();
          }}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            Sku Attributes
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            className={parentClasses.skuAttributePanelDetails}
          >
            {Array.isArray(skus[skuIndex].skuAttributes) &&
              skus[skuIndex].skuAttributes.map((skuAttribute, index) => (
                <SkuAttribute
                  key={index}
                  {...this.props}
                  skuAttributeIndex={index}
                  skuAttribute={skuAttribute}
                ></SkuAttribute>
              ))}

            <Button
              size="small"
              variant="outlined"
              className={parentClasses.newButton}
              color="primary"
              onClick={() => {
                this.addSkuAttributeOnClickHandler(skuIndex);
              }}
            >
              <AddRoundedIcon />
              Add Sku Attribute
            </Button>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Fade>
    ) : (
      <Button
        size="small"
        variant="outlined"
        className={parentClasses.newButton}
        color="primary"
        onClick={() => {
          this.addSkuAttributeOnClickHandler(skuIndex);
        }}
      >
        <AddRoundedIcon />
        Add Sku Attribute
      </Button>
    );
  }
}

export default withStyles(styles)(SkuAttributeForm);
