// Counter.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import ReactMarkdown from 'react-markdown';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import NavigationIcon from '@material-ui/icons/Navigation';
import HomeIcon from '@material-ui/icons/Home';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  subHeader: {
    fontWeight: 600
  }
});

class HomeContainer extends Component {
  constructor(props){
    super(props);
  }


  render(){
    return (
      <div className={styles.root} style={{ padding: 20 }}>
         <Fab
          variant="extended"
          size="medium"
          color="primary"
          aria-label="Add"
          href="/products"
        >
          <HomeIcon/>
          Products
        </Fab>
        {/* <Paper elevation={1} style={{padding: 20, marginTop: 20}}>
          <ReactMarkdown source={markdown} escapeHtml={false}/>
        </Paper> */}
      </div>
    )
  }
}
function mapStateToProps(state){
  return {
    count: state.counterReducer,
  };
}
export default connect(mapStateToProps)(HomeContainer);