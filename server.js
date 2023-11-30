const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Colombia2024',
  database: 'enyoi2'
});

connection.connect(err => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos exitosa');
});

// API REST.

// Consultar los usuarios
app.get('/Usuarios', (req, res) => {
    connection.query('SELECT * FROM tb_usuarios', (err, results) => {
      if (err) {
        console.error('Error al obtener usuarios:', err);
        res.status(500).send('Error interno del servidor');
        return;
      }
      res.json(results);
    });
  });

// Consultar las ciudades
app.get('/Ciudades', (req, res) => {
    connection.query('SELECT * FROM tb_ciudad', (err, results) => {
      if (err) {
        console.error('Error al obtener productos:', err);
        res.status(500).send('Error interno del servidor');
        return;
      }
      res.json(results);
    });
  });

// Crear un nuevo usuario
app.post('/Usuarios', (req, res) => {
    const { id_usuario, id_ciudad, id_refiere, nombre_usuario, direccion, rol, estado, correo_usuario, contrasena_usuario, telefono_usuario } = req.body;
  
    if (!id_usuario || !id_ciudad || !id_refiere || !nombre_usuario || !direccion || !rol || !estado || !correo_usuario || !contrasena_usuario || !telefono_usuario) {
      res.status(400).send('Todos los campos son obligatorios');
      return;
    }
  
    connection.query('INSERT INTO tb_usuarios (id_usuario, id_ciudad, id_refiere, nombre_usuario, direccion, rol, estado, correo_usuario, contrasena_usuario, telefono_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [id_usuario, id_ciudad, id_refiere, nombre_usuario, direccion, rol, estado, correo_usuario, contrasena_usuario, telefono_usuario], (err, results) => {
      if (err) {
        console.error('Error al crear un nuevo usuario:', err);
        res.status(500).send('Error interno del servidor');
        return;
      }
  
      res.status(201).send('Usuario creado exitosamente');
    });
  });

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

// Actualizar un usuario
app.put('/Usuarios/:id_usuario', (req, res) => {
    const idUsuario = req.params.idUsuario;
    const { id_usuario, id_ciudad, id_refiere, nombre_usuario, direccion, rol, estado, correo_usuario, contrasena_usuario, telefono_usuario } = req.body;
  
    if (!id_usuario || !id_ciudad || !id_refiere || !nombre_usuario || !direccion || !rol || !estado || !correo_usuario || !contrasena_usuario || !telefono_usuario) {
      res.status(400).send('Todos los campos son obligatorios');
      return;
    }
  
    connection.query('UPDATE tb_usuarios SET id_ciudad = ?, email = ?, id_refiere = ?, nombre_usuario = ?, direccion = direccion, rol = ?, estado = ?, correo_usuario = ?, contrasena_usuario = ?, telefono_usuario = ? WHERE id_usuario = ?', [id_usuario, id_ciudad, id_refiere, nombre_usuario, direccion, rol, estado, correo_usuario, contrasena_usuario, telefono_usuario, id_usuario], (err, results) => {
      if (err) {
        console.error('Error al actualizar un usuario:', err);
        res.status(500).send('Error interno del servidor');
        return;
      }
  
      res.status(200).send('Usuario actualizado exitosamente');
    });
  });

// Eliminar un usuario
app.delete('/Usuarios/:id_usuario', (req, res) => {
    const id_usuario = req.params.id_usuario;
  
    connection.query('DELETE FROM tb_usuarios WHERE id_usuario = ?', [id_usuario], (err, results) => {
      if (err) {
        console.error('Error al eliminar un usuario:', err);
        res.status(500).send('Error interno del servidor');
        return;
      }
  
      res.status(200).send('Usuario eliminado exitosamente');
    });
  });