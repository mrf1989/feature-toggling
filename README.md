# Feature Toggling

Proyecto frontend que implementa una aplicación PetClinic basada en un plan de precios. Esta aplicación hace uso de la técnica de feature toggling para habilitar o deshabilitar las funcionalidades según el plan de precios activo al que esté suscrito el usuario autenticado.

## Instalación

Este proyecto consume la API Rest que puede clonarse del repositorio https://github.com/mrf1989/feature-toggling-backend (No necesita configuración de base de datos, hace uso de persistencia de datos en memoria).

Una vez que la API Rest está disponible y en ejecución, clonar este repositorio y editar el valor de `proxy` del fichero `package.json`. El valor asignado deberá ser la dirección en la que esté ejecutándose el backend, por ejemplo ``http://localhost:4000`.

Una vez configurado el proxy, ejecutar los siguientes comandos:

```
npm install
npm start
```

## Acceso

Para poder probar la demo de la prueba de concepto de PetClinic, estos son los usuarios con los que puede accederse.

| **Username** | **Password** | **Role** |
|--------------|--------------|----------|
| mruano       | 1234         | CUSTOMER |
| csanta17     | 1234         | CUSTOMER |
| admin        | 1234         | ADMIN    |
| vetdoc1      | 1234         | VET      |
| vetdoc2      | 1234         | VET      |
| vetdoc3      | 1234         | VET      |
