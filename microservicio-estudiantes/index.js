const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

// Simulación de Base de Datos en memoria con los campos exigidos por la rúbrica
let estudiantes = [
    { id: 1, codigo: "41984006", nombres: "Edisson Edgar", apellidos: "Ñahui Palomino", correo: "41984006@continental.edu.pe", carrera: "Ingeniería de Sistemas" }
];

// 1. LISTAR ESTUDIANTES (GET)
app.get('/api/estudiantes', (req, res) => {
    res.status(200).json(estudiantes);
});

// 2. CONSULTAR ESTUDIANTE POR ID (GET)
app.get('/api/estudiantes/:id', (req, res) => {
    const estudiante = estudiantes.find(e => e.id === parseInt(req.params.id));
    if (!estudiante) return res.status(404).json({ error: "Estudiante no encontrado" });
    res.status(200).json(estudiante);
});

// 3. REGISTRAR ESTUDIANTE (POST)
app.post('/api/estudiantes', (req, res) => {
    const { codigo, nombres, apellidos, correo, carrera } = req.body;
    
    if (!codigo || !nombres || !apellidos || !correo || !carrera) {
        return res.status(400).json({ error: "Todos los campos son obligatorios (codigo, nombres, apellidos, correo, carrera)" });
    }

    const nuevoEstudiante = {
        id: estudiantes.length > 0 ? estudiantes[estudiantes.length - 1].id + 1 : 1,
        codigo,
        nombres,
        apellidos,
        correo,
        carrera
    };

    estudiantes.push(nuevoEstudiante);
    res.status(201).json({ mensaje: "Estudiante registrado con éxito", estudiante: nuevoEstudiante });
});

// 4. ACTUALIZAR ESTUDIANTE (PUT)
app.put('/api/estudiantes/:id', (req, res) => {
    const estudiante = estudiantes.find(e => e.id === parseInt(req.params.id));
    if (!estudiante) return res.status(404).json({ error: "Estudiante no encontrado" });

    const { codigo, nombres, apellidos, correo, carrera } = req.body;

    if (codigo) estudiante.codigo = codigo;
    if (nombres) estudiante.nombres = nombres;
    if (apellidos) estudiante.apellidos = apellidos;
    if (correo) estudiante.correo = correo;
    if (carrera) estudiante.carrera = carrera;

    res.status(200).json({ mensaje: "Estudiante actualizado con éxito", estudiante });
});

// 5. ELIMINAR ESTUDIANTE (DELETE)
app.delete('/api/estudiantes/:id', (req, res) => {
    const index = estudiantes.findIndex(e => e.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Estudiante no encontrado" });

    const estudianteEliminado = estudiantes.splice(index, 1);
    res.status(200).json({ mensaje: "Estudiante eliminado con éxito", estudiante: estudianteEliminado[0] });
});

app.listen(PORT, () => {
    console.log(`Microservicio de Estudiantes corriendo en http://localhost:${PORT}`);
});