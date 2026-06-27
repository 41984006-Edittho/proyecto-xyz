const express = require('express');
const app = express();
const PORT = 3001; // Puerto asignado para estudiantes

// Permitir que el servidor entienda datos en formato JSON
app.use(express.json());

// Ruta inicial de prueba (Hola Mundo)
app.get('/api/estudiantes/prueba', (req, res) => {
    res.json({
        mensaje: "Microservicio de Estudiantes funcionando correctamente",
        estudiante: "Edisson Edgar Ñahui Palomino"
    });
});

// Levantar el servidor en el puerto configurado
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});