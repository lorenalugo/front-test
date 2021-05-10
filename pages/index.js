import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import API from './api';

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
    maxWidth: 800,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ddd',
    margin: 'auto',
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function SimpleList() {
  const classes = useStyles();
  const [passengers, setPassengers] = useState(null);
  useEffect(() => {
    const getPassengersData = async () => {
      try {
        const { data: { result: { passengers: data } } } = await API.getPassengers();
        setPassengers(data);
      } catch (e) {
        console.log(e);
      }
    };
    getPassengersData();
  }, []);

  return (
    <div className="container">
      <Grid container justify="space-between">
        <Typography component="h2" variant="h5">
          Pasajeros
        </Typography>
        <Button color="primary" variant="outlined"><a href="/passenger">Agregar nuevo pasajero</a></Button>
      </Grid>
      <List component="div" aria-label="passengers list">
        <Grid container justify="space-between">
          <Grid item xs={6}><Typography>Nombre</Typography></Grid>
          <Grid item xs={6}><Typography>Vuelo</Typography></Grid>
        </Grid>
        {passengers && passengers.length > 0 ? (
          passengers.map(passenger => (
            <ListItemLink key={passenger.id} href={`/passengers/${passenger.id}`}>
              <Grid container justify="space-between">
                <ListItemText primary={passenger.names} />
                <ListItemText primary={passenger.flightNumber} />
              </Grid>
            </ListItemLink>
          ))
        ) : (
          <Typography>No se encuentraron pasajeros</Typography>
        )}
      </List>
    </div>
  );
}
