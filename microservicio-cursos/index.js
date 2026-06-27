const express = require('express');
const app = express();
const PORT = 3002; // Puerto asignado para cursos

// Permitir el uso de datos en formato JSON
app.use(express.json());

// Ruta de prueba para el Microservicio de Cursos
app.get('/api/cursos/prueba', (req, res) => {
    res.json({
        mensaje: "Microservicio de Cursos funcionando correctamente",
        materia: "Diseño Web",
        estado: "Activo"
    });
});

// Levantar servidor en el puerto 3002
app.listen(PORT, () => {
    console.log(`Servidor de Cursos corriendo en http://localhost:${PORT}`);
});