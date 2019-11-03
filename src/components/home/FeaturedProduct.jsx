import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ShareIcon from '@material-ui/icons/Share';
import _ from 'lodash';
import Utils from '../../utils/Utils';

const styles = theme => ({
  card: {
    // maxWidth: ,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  priceCaption: {
    color: '#B12704'
  },
  productItemLink: {
    textDecoration: 'none',
    transition: 'all 0.3s',
    margin: 0,
    '&:hover': {
      color: 'orange',
      transition: 'all 0.3s'
    }
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  cardHeader: {
    padding: theme.spacing.unit * 2
  }
});

class FeaturedProduct extends React.Component {
  componentWillMount() {
    this.setState({ expanded: false });
    this.handleExpandClick = () => {
      this.setState(state => ({ expanded: !state.expanded }));
    };
  }

  render() {
    const { classes, product } = this.props;
    
    return (
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          title={
            <a className={classes.productItemLink} href={`/products/${product.id}`}>
              <Typography variant="subtitle2" className={classes.productItemLink} color="primary" gutterBottom>
                {_.capitalize(product.name)}
              </Typography>
            </a>
          }
          // subheader={
          //   <Typography variant="caption" gutterBottom>
          //     by {product.vendor.username}
          //   </Typography>
          // }
        />
        <CardMedia
          className={classes.media}
          image={Utils.getRandomProductImageUrl()}
          title="Paella dish"
        />
        {/* <CardContent>
          <Typography variant="subtitle2" className={classes.priceCaption} gutterBottom>
            ${product.price}
          </Typography>
        </CardContent> */}
        {/* <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
        </CardActions> */}
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
              minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
              heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
              browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
              chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
              salt and pepper, and cook, stirring often until thickened and fragrant, about 10
              minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
              without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat
              to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is just tender, 5 to 7
              minutes more. (Discard any mussels that don’t open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then serve.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

FeaturedProduct.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeaturedProduct);