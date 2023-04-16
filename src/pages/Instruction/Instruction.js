import React from 'react';
import './Instruction.css';
import { Container, Typography, List, ListItem, ListItemIcon, ListItemText, Slide } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion, faTrophy, faHeart, faClock } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => ({
  instructionList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: theme.spacing(4),
  },
  instructionItem: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(1),
    maxWidth: '300px',
  },
  instructionIcon: {
    fontSize: '2rem',
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  instructionBest: {
    fontSize: '1.5rem',
    marginTop: theme.spacing(4),
  },
}));

function Instruction() {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className="instruction-container">
      <Slide in={true} direction="up" timeout={1000}>
        <Typography variant="h2" component="h1" gutterBottom>
          Instructions
        </Typography>
      </Slide>
      <List className={classes.instructionList}>
        <Slide in={true} direction="up" timeout={1500}>
          <ListItem className={classes.instructionItem}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faQuestion} className={classes.instructionIcon} />
            </ListItemIcon>
            <ListItemText primary="Your task is to guess the word that links the 4 pictures." />
          </ListItem>
        </Slide>
        <Slide in={true} direction="up" timeout={2000}>
          <ListItem className={classes.instructionItem}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faTrophy} className={classes.instructionIcon} />
            </ListItemIcon>
            <ListItemText primary="There are 4 levels to clear to win the game and get on the Leaderboard!" />
          </ListItem>
        </Slide>
        <Slide in={true} direction="up" timeout={2500}>
          <ListItem className={classes.instructionItem}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faHeart} className={classes.instructionIcon} />
            </ListItemIcon>
            <ListItemText primary="You have 3 lives to guess the word." />
          </ListItem>
        </Slide>
        <Slide in={true} direction="up" timeout={3000}>
          <ListItem className={classes.instructionItem}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faClock} className={classes.instructionIcon} />
            </ListItemIcon>
            <ListItemText primary="There is a limit of 10 minutes for all 4 levels." />
          </ListItem>
        </Slide>
      </List>
      <Slide in={true} direction="up" timeout={3500}>
        <Typography variant="h4" component="p" className={classes.instructionBest}>
          All the best!
        </Typography>
      </Slide>
    </Container>
  );
}

export default Instruction;