/* @flow */

import React from 'react';
import './ProjMinCard.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ProjMaxCard from '../ProjMaxCard/ProjMaxCard';

const useStyles = makeStyles({
  card: {
    minWidth: '15%',
    marginTop: '30px',
  },
  title: {
    fontSize: 17,
  },
  pos: {
    marginBottom: 12,
  },
  rightAlign: {
    float: 'right',
    display: 'inline',
  }
});


export default function ProjMinCard(props) {
  const classes = useStyles();
  let toolsUsed = "";
  for (let i = 0; i < props.tools.length; i++) {
    toolsUsed += props.tools[i];
    if (i < props.tools.length - 1) {
      toolsUsed += ", ";
    }
  }

  let titleWithTick = (
    <Typography variant="h4" component="h2">
      Project Title
      <img className={classes.rightAlign} alt="tick-logo" src={require('../../../assets/icons/check_circle_black_18x18.png')} />
    </Typography>
  );

  let title = (
    <Typography variant="h4" component="h2">
      Project Title
    </Typography>
  );

  return (
    <Card className={classes.card} style={{maxWidth: ""}}>
      <CardContent>
        {props.taken === "0" ? title : titleWithTick}
        <br />
        <Typography>
          In this project you will need to do so and so....
        </Typography>

        <Typography>
          Tools Used: <b>{toolsUsed}</b>
        </Typography>
        <Typography>Applicants: {props.applicants}</Typography>
      </CardContent>
      <CardActions>
        <ProjMaxCard btnText="Read more" taken={props.taken}/>
      </CardActions>
    </Card>
  );
}