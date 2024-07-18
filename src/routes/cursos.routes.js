const { Router } = require('express')
const CursosController = require('../controllers/cursosController')

const cursosRoutes = new Router()

cursosRoutes.post('/', (req, res) => CursosController.create(req, res));
cursosRoutes.get('/', (req, res) => CursosController.getAll(req, res));
cursosRoutes.put('/:id', (req, res) => CursosController.update(req, res));
cursosRoutes.delete('/:id', (req, res) => CursosController.delete(req, res));

module.exports = cursosRoutes
