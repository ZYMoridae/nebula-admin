import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
	container: {
		backgroundColor: theme.palette.primary.footerDark,
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2
	},
	footerText: {
		color: 'white'
	},
	linkContainer: {
		textAlign: 'center',
		display: 'inline-flex',
		color: 'white',
		width: '100%'
	},
	linkItem: {
		marginRight: theme.spacing.unit * 2,
		transition: 'all 0.15s',
		color: 'white',
		textDecoration: 'none',
		'&:hover': {
      color: theme.palette.primary.main,
			transition: 'all 0.15s',
			textDecoration: 'underline'
    }
	}
});

class Footer extends Component {

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.container}>
				<Typography variant="caption" gutterBottom align="center" className={classes.footerText}>
					<a href='/' className={classes.linkItem}>
						Condition of Use	
					</a>
					<a href='/' className={classes.linkItem}>
						Privacy Notice
					</a>
					<a href='/' className={classes.linkItem}>
						Cookies
					</a> © 2019, Nebula
        </Typography>
			</div>
		)
	}
}

export default withStyles(styles)(Footer);