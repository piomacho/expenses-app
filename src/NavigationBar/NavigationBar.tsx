import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
// import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

function NavigationBar(props: any) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          />
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button
              color="inherit"
              style={{ textDecoration: 'none', color: 'white' }}>
              Informacje
            </Button>
          </Link>
          <Link to="/expenses" style={{ textDecoration: 'none' }}>
            <Button
              color="inherit"
              style={{ textDecoration: 'none', color: 'white' }}>
              Aplikacja do rozliczeń
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavigationBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavigationBar);
