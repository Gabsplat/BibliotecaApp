# Aplicación de Biblioteca Universitaria

¡Hola! Esta es nuestra aplicación de biblioteca para la Universidad Aconcagua. La creamos para ayudar a los estudiantes como nosotros a buscar libros, reservarlos y gestionar sus préstamos de manera fácil y eficiente.

## ¿Qué tiene nuestra aplicación?

Parte visual (Front-end)
Nuestra aplicación tiene una interfaz amigable y fácil de usar. La construimos con React Native y Expo, que son herramientas muy populares para hacer aplicaciones móviles. En nuestra aplicación, podes buscar libros, ver detalles de los libros, reservarlos y ver tus préstamos actuales. Todo esto lo hicimos en el archivo principal App.js. Además, nos aseguramos de que nuestra aplicación se vea bien tanto en iOS como en Android.

## Parte de servidor (Back-end)

Para que nuestra aplicación pueda interactuar con la base de datos de la biblioteca, creamos un servidor con Express. Este servidor se encarga de todas las solicitudes que hace nuestra aplicación, como buscar libros o reservarlos. Utilizamos varias herramientas para hacer esto, como passport para la autenticación de usuarios, cors para permitir las solicitudes a nuestro servidor, dotenv para manejar nuestras variables de entorno y connect-sqlite3 para interactuar con nuestra base de datos SQLite.

## ¿Cómo empezar a usar nuestra aplicación?

Para empezar a usar nuestra aplicación, primero necesitas clonar nuestro repositorio. Luego, instala las dependencias necesarias con npm install. Para iniciar el servidor, usa el comando npm start.
