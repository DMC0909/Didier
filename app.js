const express = require('express');
const {cursos} = require('./cursos');
const app = express();

app.get('/', function(req, res){
    //funcionalidad
    res.send('mi primer servidor web')
});

app.get('/cursos', function(req, res){
    //funcionalidad
    res.send(cursos);
});

app.get('/cursos/programacion', (req, res)=>{
    res.send(cursos.programacion);
});
app.get('/cursos/hacking', (req, res)=>{
    res.send(cursos.hacking);
});
const Puerto = process.env.PORT || 501;
app.listen(Puerto,()=>{
        console.log('servidor Ejecutandose', Puerto);
})

app.get('/cursos/programacion/:filtro', (req, res) => {
    // Obtener variable o parámetro
    const filtro = req.params.filtro.toLowerCase(); // Convertir el filtro a minúsculas para hacer una búsqueda insensible a mayúsculas
    //const Todoscursos = [...cursos.programacion, ...cursos.hacking]; // Combina los cursos de programación y hacking
    // Crear filtro
    const resultado = cursos.programacion.filter(curso => {
        const lenguaje = curso.nombre.toLowerCase(); // Convertir el nombre del curso a minúsculas
        const plataforma = curso.plataforma.toLowerCase(); // Convertir la plataforma del curso a minúsculas
        const nivel = curso.nivel.toLowerCase(); // Convertir la plataforma del curso a minúsculas
        return lenguaje.includes(filtro) || plataforma.includes(filtro) || nivel.includes(filtro); // Verificar si el filtro coincide con el nombre o la plataforma del curso
    });
    if (resultado.length === 0) {
        const mensaje = `No se encontró ningún resultado para el filtro: ${filtro}`;
        return res.status(404).send(mensaje);
    }
    const consulta = req.query  
        if(consulta.ordenar =='vistas'){
            resultado.sort((a, b) => a.vistas - b.vistas);
        }
    res.send(resultado);
});
