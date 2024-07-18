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
            const { nome, duracao } = req.query;
            let consultaDados = {};

            if (nome) {
                consultaDados.nome = nome;
            }

            if (duracao) {
                consultaDados.duracao = duracao;
            }

            const cursos = await Curso.findAll({
                attributes: ['id', 'nome', 'duracao'],
                where: consultaDados,
                order: [['id', 'ASC']]
            });

            if (!cursos || cursos.length === 0) {
                return res.status(404).json({
                    mensagem: 'Nenhum curso foi encontrado.'
                });
            }

            return res.json(cursos);
        } catch (error) {
            console.error('Erro ao listar o(s) curso(s):', error);
            return res.status(500).json({
                mensagem: 'Não foi possível listar o(s) curso(s).'
            });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const dados = req.body;

            // Verifico se o curso existe
            const curso = await Curso.findByPk(id);

            if (!curso) {
                return res.status(404).json({
                    mensagem: 'Curso não encontrado.'
                });
            }

            await curso.update(dados);
            res.json(curso);
        } catch (error) {
            console.error('Erro ao atualizar o curso:', error);
            res.status(500).json({
                mensagem: 'Erro ao atualizar o curso.'
            });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const curso = await Curso.findByPk(id);

            if (!curso) {
                return res.status(404).json({
                    mensagem: 'Curso não encontrado.'
                });
            }

            await curso.destroy();

            return res.status(204).send();
        } catch (error) {
            console.error('Erro ao excluir o curso:', error);
            return res.status(500).json({
                mensagem: 'Erro ao excluir o curso.'
            });
        }
    }
}

module.exports = new CursosController()