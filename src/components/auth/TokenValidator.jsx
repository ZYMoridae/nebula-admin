import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

});

class TokenValidator extends Component {

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.container}>

			</div>
		)
	}
}

export default withStyles(styles)(TokenValidator);