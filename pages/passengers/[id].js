import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import API from '../api';

const PassengerById = () => {
  const router = useRouter();
  const { id } = router.query;
  const [packages, setPackages] = useState(null);
  useEffect(() => {
    const getPassengerById = async () => {
      try {
        const { data: { result: { packages: data } } } = await API.getPassengerById(id);
        setPackages(data);
      } catch (e) {
        console.log(e);
      }
    };
    if (id) {
      getPassengerById();
    }
  }, [id]);
  const handleClick = async () => {
    try {
      await API.updatePackages(id);
      router.push('/');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="container">
      <Grid container justify="flex-end">
        <Button color="primary" variant="outlined"><a href="/">Regresar</a></Button>
      </Grid>
      <Typography component="h2" variant="h5">
        Pasajero:
        {' '}
        {id}
      </Typography>
      <List component="div" aria-label="passengers list">
        <Grid container justify="space-between">
          <Grid item xs={2}><Typography>Número</Typography></Grid>
          <Grid item xs={10}><Typography>Tipo de equipaje</Typography></Grid>
        </Grid>
        {packages && packages.length > 0 ? (
          packages.map((p, index) => (
            <ListItem key={p.id}>
              <Grid container justify="space-between">
                <Grid item xs={2}><ListItemText primary={index} /></Grid>
                <Grid item xs={10}><ListItemText primary={p.type.name} /></Grid>
              </Grid>
            </ListItem>
          ))
        ) : (
          <Typography>No se encuentró equipaje</Typography>
        )}
      </List>
      <Grid container justify="space-between">
        <Button onClick={handleClick} color="primary" variant="outlined">Retirar equipaje</Button>
      </Grid>
    </div>
  );
};

export default PassengerById;
