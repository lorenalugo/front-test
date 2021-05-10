## Services-test

Clona el repo: [services-test](https://github.com/lorenalugo/services-test)

Instala las dependencias


Primero, inicia el contenedor de la base de datos:

```bash
yarn postgre:start
```

Segundo, en otra terminal corre el seed y migraciones:

```bash
yarn sequelize:all
```

Tercero, inicia el servicio:

```bash
yarn dev
```


## Front-test

Clona el repo: [front-test](https://github.com/lorenalugo/front-test)

Instala las dependencias

Inicia el servicio:

```bash
yarn dev
```

Abre en el navegador [http://localhost:3000](http://localhost:3000).

