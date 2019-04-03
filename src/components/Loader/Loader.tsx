import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { LoaderWrapper } from './Loader.styles';

const styles = (theme: any) => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
});

function CircularIndeterminate(props: any) {
  const { classes } = props;
  return (
    <LoaderWrapper>
      <CircularProgress className={classes.progress} />
    </LoaderWrapper>
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CircularIndeterminate);
