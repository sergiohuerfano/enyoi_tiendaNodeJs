document.addEventListener('DOMContentLoaded', () => {
    cargarUsuarios();
    cargarCiudades();
  });
  
  function cargarUsuarios() {
    fetch('http://localhost:3000/Usuarios')
      .then(response => response.json())
      .then(usuarios => {
        const listaUsuarios = document.getElementById('lista-usuarios');
        listaUsuarios.innerHTML = '';
  
        usuarios.forEach(usuario => {
          const li = document.createElement('li');
          li.textContent = `ID: ${usuario.id_usuario}, Nombre: ${usuario.nombre_usuario}, Email: ${usuario.correo_usuario}`;
          listaUsuarios.appendChild(li);
        });
      })
      .catch(error => console.error('Error al cargar usuarios:', error));
  }
  
  function cargarCiudad() {
    fetch('http://localhost:3000/Ciudades')
      .then(response => response.json())
      .then(ciudades => {
        const listaCiudades = document.getElementById('lista-ciudades');
        listaCiudades.innerHTML = '';
  
        ciudades.forEach(ciudad => {
          const li = document.createElement('li');
          li.textContent = `ID: ${ciudad.id_ciudad}, Nombre: ${ciudad.nombre_ciudad}, Cobertura: ${ciudad.cobertura}`;
          listaCiudades.appendChild(li);
        });
      })
      .catch(error => console.error('Error al cargar productos:', error));
  }
  
  function crearUsuario() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const contraseña = document.getElementById('contraseña').value;
  
    fetch('http://localhost:3000/Usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre_usuario, correo_usuario, contrasena_usuario }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al agregar usuario');
        }
        return response.json();
      })
      .then(() => {
        cargarUsuarios();
        document.getElementById('nombre').value = '';
        document.getElementById('email').value = '';
        document.getElementById('contraseña').value = '';
      })
      .catch(error => console.error('Error al agregar usuario:', error));
  }
  
  function crearCiudad() {
    const nombreCiudad = document.getElementById('nombreCiudad').value;
    const idCiudad = document.getElementById('idCiudad').value;
  
    fetch('http://localhost:3000/Ciudades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre_ciudad: nombreCiudad, id_ciudad: idCiudad }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al agregar producto');
        }
        return response.json();
      })
      .then(() => {
        cargarCiudad();
        document.getElementById('nombreCiudad').value = '';
        document.getElementById('codigo').value = '';
      })
      .catch(error => console.error('Error al agregar producto:', error));
  }