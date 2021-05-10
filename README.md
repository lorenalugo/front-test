## Services-test
Clona el repo: [https://github.com/lorenalugo/services-test](https://github.com/lorenalugo/services-test)
Primero, inicia el contenedor de la base de datos:

```bash
yarn postgre:start
```

Segundo, corre el seed y migraciones:

```bash
yarn sequelize:all
```

Tercero, inicia el servicio:

```bash
yarn dev
```


## Front-test

Inicia el servicio:

```bash
yarn dev
```

Abre en el navegador [http://localhost:3000](http://localhost:3000).

