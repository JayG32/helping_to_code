const express = require("express")
const routes = express.Router()
const professores = require("./controller/professores")
const alunos = require("./controller/alunos")

routes.get("/", function (req, res) {
    return res.render("../views/index")
})

routes.get("/professores", professores.listar)
routes.get("/professores/cadastro", professores.cadastro)
routes.get("/professores/:id", professores.mostrar)
routes.get("/professores/:id/editar", professores.editar)

routes.post('/professores', professores.post)
routes.put("/professores", professores.put)
routes.delete("/professores", professores.delete)

// ----------------------------------------------------

routes.get("/alunos", alunos.listar)
routes.get("/alunos/cadastro", alunos.cadastro)
routes.get("/alunos/:id", alunos.mostrar)
routes.get("/alunos/:id/editar", alunos.editar)

routes.post("/alunos", alunos.post)
routes.put("/alunos", alunos.put)
routes.delete("/alunos", alunos.delete)

module.exports = routes