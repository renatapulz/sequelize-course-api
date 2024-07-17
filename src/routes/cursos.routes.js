const { Router } = require('express')
const CursosController = require('../controllers/cursosController')

const cursosRoutes = new Router()

cursosRoutes.post('/', (req, res) => CursosController.create(req, res));
cursosRoutes.get('/', (req, res) => CursosController.get(req, res));

module.exports = cursosRoutes
