const express = require('express');
const app = express();
const PORT = 3002;

app.use(express.json());

// Simulación de Base de Datos en memoria con los campos del diseño técnico
let cursos = [
    { id: 1, codigo: "INF-37711", nombre: "Diseño Web", creditos: 4, docente: "Asignado del Curso" }
];

// 1. LISTAR CURSOS (GET)
app.get('/api/cursos', (req, res) => {
    res.status(200).json(cursos);
});

// 2. CONSULTAR CURSO POR ID (GET)
app.get('/api/cursos/:id', (req, res) => {
    const curso = cursos.find(c => c.id === parseInt(req.params.id));
    if (!curso) return res.status(404).json({ error: "Curso no encontrado" });
    res.status(200).json(curso);
});

// 3. REGISTRAR CURSO (POST)
app.post('/api/cursos', (req, res) => {
    const { codigo, nombre, creditos, docente } = req.body;
    
    if (!codigo || !nombre || !creditos || !docente) {
        return res.status(400).json({ error: "Todos los campos son obligatorios (codigo, nombre, creditos, docente)" });
    }

    if (parseInt(creditos) <= 0) {
        return res.status(400).json({ error: "El número de créditos debe ser mayor a 0" });
    }

    const nuevoCurso = {
        id: cursos.length > 0 ? cursos[cursos.length - 1].id + 1 : 1,
        codigo,
        nombre,
        creditos: parseInt(creditos),
        docente
    };

    cursos.push(nuevoCurso);
    res.status(201).json({ mensaje: "Curso registrado con éxito", curso: nuevoCurso });
});

// 4. ACTUALIZAR CURSO (PUT)
app.put('/api/cursos/:id', (req, res) => {
    const curso = cursos.find(c => c.id === parseInt(req.params.id));
    if (!curso) return res.status(404).json({ error: "Curso no encontrado" });

    const { codigo, nombre, creditos, docente } = req.body;

    if (codigo) curso.codigo = codigo;
    if (nombre) curso.nombre = nombre;
    if (creditos) {
        if (parseInt(creditos) <= 0) return res.status(400).json({ error: "Los créditos deben ser mayores a 0" });
        curso.creditos = parseInt(creditos);
    }
    if (docente) curso.docente = docente;

    res.status(200).json({ mensaje: "Curso actualizado con éxito", curso });
});

// 5. ELIMINAR CURSO (DELETE)
app.delete('/api/cursos/:id', (req, res) => {
    const index = cursos.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Curso no encontrado" });

    const cursoEliminado = cursos.splice(index, 1);
    res.status(200).json({ mensaje: "Curso eliminado con éxito", curso: cursoEliminado[0] });
});

app.listen(PORT, () => {
    console.log(`Microservicio de Cursos corriendo en http://localhost:${PORT}`);
});