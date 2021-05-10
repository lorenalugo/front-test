import React, { useState } from 'react';
import { useRouter } from 'next/router';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import API from './api';

const useStyles = makeStyles(() => ({
  root: {
    padding: 10,
  },
}));

export default function NewPassenger() {
  const classes = useStyles();
  const router = useRouter();
  const [formData, setFormData] = useState({
    names: '',
    flightNumber: '',
    packages: [],
  });
  const [formErrors, setFormErrors] = useState({});
  const handleClick = () => {
    const newPackages = formData.packages.concat([{ typeId: 1 }]);
    setFormData({
      ...formData,
      packages: newPackages,
    });
  };
  const handleChange = (name, e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSelectChange = (e, index) => {
    const { value } = e.target;
    const newPackages = [...formData.packages];
    newPackages[index].typeId = value;
    setFormData({
      ...formData,
      packages: newPackages,
    });
  };
  const handleFinish = async () => {
    const error = {};
    Object.keys(formData).forEach((key) => {
      if (key === 'names' && formData[key] === '') {
        error.names = true;
      }
      if (key === 'flightNumber' && formData[key].length < 5) {
        error.flightNumber = true;
      }
      if (key === 'packages' && (formData[key].length === 0 || formData[key].length > 3)) {
        error.packages = true;
      }
    });
    if (Object.keys(error).length === 0) {
      const result = await API.createPassenger(formData);
      router.push('/');
      return result;
    }
    setFormErrors(error);
    return error;
  };
  return (
    <form className="container" noValidate autoComplete="off">
      <div>
        <Grid container justify="flex-end">
          <Button color="primary" variant="outlined"><a href="/">Regresar</a></Button>
        </Grid>
        <Grid container alignItems="center" justify="space-around">
          <TextField
            required
            label="Nombre"
            value={formData.names}
            onChange={e => handleChange('names', e)}
            helperText="Requerido"
            error={!!formErrors.names}
            className={classes.root}
          />
          <TextField
            required
            label="Número del vuelo"
            value={formData.flightNumber}
            onChange={e => handleChange('flightNumber', e)}
            inputProps={{
              maxLength: 5,
            }}
            helperText="Debe contener 5 caracteres. Requerido"
            error={!!formErrors.flightNumber}
            className={classes.root}
          />
          <Grid item>
            <Button onClick={handleClick} color="primary" variant="outlined">Agregar equipaje</Button>
            {formErrors.packages ? (
              <Typography color="error" component="p" variant="body2">
                Debe ingresar al menos un equipaje (tres como máximo).
              </Typography>
            ) : null}
          </Grid>
        </Grid>

        {formData.packages.length > 0
          ? formData.packages.map((p, index) => (
            <Grid container alignItems="center" key={p.typeId}>
              <InputLabel id="select-label" className={classes.root}>Equipaje</InputLabel>
              <Select
                labelId="select-label"
                value={p.typeId}
                onChange={e => handleSelectChange(e, index)}
              >
                <MenuItem value={1}>Grande</MenuItem>
                <MenuItem value={2}>Pequeño</MenuItem>
                <MenuItem value={3}>Prenda</MenuItem>
              </Select>
            </Grid>
          ))
          : null}
        <Grid container justify="center">
          <Button onClick={handleFinish} color="primary" variant="outlined">Guardar</Button>
        </Grid>
      </div>
    </form>
  );
}
