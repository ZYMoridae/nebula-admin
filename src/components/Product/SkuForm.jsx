import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import _ from "lodash";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import "./ProductForm.css";
import Indicator from "../utils/Indicator";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import SkuAttributeForm from "./SkuAttributeForm";


const styles = theme => ({});

class SkuForm extends Component {
  constructor() {
    super();
    this.state = {
      skuAttributeExpanded: false
    };
  }

  addSkuAttributeOnClickHandler(index) {
    if (
      _.isNil(this.props.skus[index].skuAttributes) ||
      this.props.skus[index].skuAttributes.length == 0
    ) {
      this.setState({
        skuAttributeExpanded: true
      });
    }
    this.props.addSkuAttributeOnClickHandler(index);
  }

  render() {
    const {
      skus,
      parentClasses,
      handleChange,
      mode,
      onSkuDeleteClick,
      addSkuAttributeOnClickHandler,
      handleSkuAttributeChange,
      handleSkuAttributeCategoryChange
    } = this.props;

    let isUpdateMode = mode.toLowerCase() != "new";

    return (
      Array.isArray(skus) &&
      skus.map((sku, index) => (
        <Fade in={true} timeout={1000} key={index}>
          <Grid item xs={12} sm={12}>
            <Paper className={parentClasses.skuContainer}>
              <div>
                <div>
                  <Indicator index={index + 1} />
                </div>

                {isUpdateMode && sku.skuCode && (
                  <TextField
                    disabled
                    id="outlined-number"
                    label="Sku Code"
                    name={`${index}_skuCode`}
                    type="text"
                    className={parentClasses.textField}
                    InputLabelProps={{
                      shrink: true
                    }}
                    multiline
                    margin="normal"
                    variant="outlined"
                    value={sku.skuCode}
                    onChange={handleChange}
                  />
                )}

                <TextField
                  id="outlined-number"
                  label="Price"
                  name={`${index}_price`}
                  type="number"
                  className={parentClasses.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  multiline
                  margin="normal"
                  variant="outlined"
                  value={skus[index].price}
                  onChange={handleChange}
                />

                <TextField
                  id="outlined-number"
                  label="Stock"
                  name={`${index}_stock`}
                  type="number"
                  className={parentClasses.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  multiline
                  margin="normal"
                  variant="outlined"
                  value={skus[index].stock}
                  onChange={handleChange}
                />

                <SkuAttributeForm
                  {...this.props}
                  skuIndex={index}
                  addSkuAttributeOnClickHandler={this.addSkuAttributeOnClickHandler.bind(
                    this
                  )}
                />

                <Button
                  variant="contained"
                  color="secondary"
                  className={parentClasses.newButton}
                  onClick={() => {
                    onSkuDeleteClick(index);
                  }}
                >
                  <DeleteRoundedIcon className={parentClasses.deleteBtnIcon} />
                  Delete
                </Button>
              </div>
            </Paper>
          </Grid>
        </Fade>
      ))
    );
  }
}

export default withStyles(styles)(SkuForm);
