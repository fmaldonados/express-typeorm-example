# Express, TypeORM and Typescript Example project

This project is a basic starter project on how to use Express and TypeORM together using Typescript.

The project is using right now SQLite as its DB engine.

## Install

```cmd
    $ npm install
```

## Run Project

```cmd
    $ npm run watch
```

## agregar admin User
para añadir un usuario administrador solo hay que quitar el parametro de verificacion de cabecera de autenticacion al request http que se realiza en el archivo routes.ts en la linea 24.

realizar una http request (POST) desde postman con el siguiente cuerpo:
    ```json
    {
	    "username":"admin",
	    "password":"admin",
	    "firstName":"admin",
	    "lastName":"admin",
	    "role":"Admin"
    }
    ```