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

    async getAll(req, res) {
        try {
            const dados = await Curso.findAll({
                attributes: ['id', 'nome', 'duracao']
            });

            if (!dados) {
                return res.status(404).json({
                    mensagem: 'Nenhum curso encontrado'
                });
            }

            return res.json(dados);
        } catch (error) {
            console.error('Erro ao listar cursos:', error);
            return res.status(500).json({
                mensagem: 'Não foi possível listar os cursos'
            });
        }
    }
}

module.exports = new CursosController()