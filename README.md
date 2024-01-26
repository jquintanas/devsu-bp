
# Angular BP

Proyecto de validación de conocimientos en el framework Angular, este aplicativo fue solicitado como parte de un proceso de selección en la empresa de desarrollo de software DEVSU.

El mismo está desarrollado con Angular 16 y empleando el uso de signals y los últimos estandares de la versión utilizada, se tomo en cuenta rendimiento, usabilidad y los requerimientos proporcionados para esta prueba.

No se uso ningún componente pre fabricado ni librerías adicionales, pero si se utilizo un generador de animación de precarga. 
## Environment Variables

Dentro de la ruta **src/environments/** se encuentra la configuración de variables utilizadas para el proyecto, si se requiere hacer alguna actualización se debe hacer en estos archivos dependiendo del ambiente.

* authorId -> valor del header **authorId** usado en los request.

* servidor -> Ruta base del servidor donde están alojados los servicios.

* paths
    * productos -> ruta del endPoint de productos.
    * verificacion -> ruta de verificación de id de producto.


## Tech Stack

**Client:** Angular

**Test:** Karma y Jasmine



## Installation

Se requiere tener instalado **node@18.16.0** y **angular@16.2.12**

En caso de no tener angular instalado ejecutar el siguiente comando

```
npm i -g @angular/cli@16.2.12
```

En caso de no tener node js, descargar el archivo apropiado desde [Descarga](https://nodejs.org/en/download/)

Pasos a seguir para la instalación

**Estos pasos deben ejecutarse en la carpeta raíz del proyecto**

```bash
  npm install 
```


    
## Ejecución

Para ejecutar el proyecto se deben seguir los siguientes pasos

```bash
  ng serve
```

Para poder ejecutar los test del proyecto se debe ejecutar el siguiente comando.

```bash
  ng test --code-coverage=true --watch=false
```
## Demo

![Demo](/docs/demo.png)

![sonarQube test](/docs/sonar.PNG)

![Karma test](/docs/test.png)
## Authors

- [@jquintanas](https://github.com/jquintanas)

