import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import SkuAttribute from "./SkuAttribute";

const styles = theme => ({});

class SkuAttributeForm extends Component {
  render() {
    const {
      classes,
      parentClasses,
      skuAttributes,
      mode,
      addSkuAttributeOnClickHandler,
      skuIndex
    } = this.props;

    return (
      Array.isArray(skuAttributes) &&
      skuAttributes.map((skuAttribute, index) => (
        <SkuAttribute key={index} {...this.props} skuAttributeIndex={index}></SkuAttribute>
      ))
    );
  }
}

export default withStyles(styles)(SkuAttributeForm);
