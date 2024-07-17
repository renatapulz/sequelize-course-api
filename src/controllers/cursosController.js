const Curso = require('../models/Curso')

class CursosController {
    async create(req, res) {
        try {
            const dados = req.body

            if (!dados.nome || !dados.duracao) {
                return res
                    .status(400)
                    .json({ mensagem: 'O nome e a duração são campos obrigatórios.' })
            }

            const curso = await Curso.create(dados)
            res.status(201).json(curso);
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro ao cadastrar um curso.' });
        }
    }
}

module.exports = new CursosController()