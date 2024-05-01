//express
const express = require('express');
const app = express();
const PORT = 3000; // puede cambiar

// nombre y profecion
let nombreprof = {
  nombre: 'fernando mendoza',
  profesion: 'tec informatico'
}

//array 
let librosBiblicos = [
    {id: 1 , nombre: 'Genesis', autor: 'Moises'},
    {id: 2 , nombre: 'Exodo', autor: 'Moises'},
    {id: 3 , nombre: 'Levitico', autor: 'Moises'},
    {id: 4 , nombre: 'Romanos', autor: 'Pablo'},
    {id: 5 , nombre: 'Apocalipsis', autor: 'Juan'},
    {id: 6 , nombre: 'Juan I', autor: 'Juan'},
    {id: 7 , nombre: 'Juan II', autor: 'Juan'},
];
//manejo de JSON
app.use(express.json());

// 1. Obtener un endpoint de bienvenida con su nombre y su profesion actual
app.get('/misdatos', (req, res) => {
  res.json(nombreprof);
});

// 2. Obtener libros por autor
app.get('/libros-autor/:autor', (req, res) => {
  const autorBuscado = req.params.autor.toLowerCase();
  const librosAutor = librosBiblicos.filter((libro) => libro.autor.toLowerCase() === autorBuscado);
  if (librosAutor.length > 0) {
      res.json(librosAutor);
  } else {
      res.status(404).json({mensaje : 'No se encontraron libros para el autor especificado'});
  }
});

// 3. Obtener la cantidad total de libros
app.get('/cant-libros', (req, res) => {
  const cantidad_Libros = librosBiblicos.length;
  res.json({cantidad_Libros});
});

// 4. Obtener libros por nombre que contenga el texto "Juan"
app.get('/libros-juan', (req, res) => {
  const nombreJuan = 'juan';
  const librosNombre = librosBiblicos.filter((libro) => libro.nombre.toLowerCase().includes(nombreJuan));
  if (librosNombre.length > 0) {
      res.json(librosNombre);
  } else {
      res.status(404).json({mensaje : 'No se encontraron libros con el nombre Juan'});
  }
});

// 5. Ordenar libros por nombre
app.get('/libros-orden', (req, res) => {
  const librosOrdenados = librosBiblicos.sort((a, b) => {
      return a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase());
  });
  res.json(librosOrdenados);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost: ${PORT}`);
});

