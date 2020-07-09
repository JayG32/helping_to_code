const fs = require("fs")
const data = require("../data.json")
const { date } = require("../model/util")

exports.listar = function (req, res) {
    return res.render("alunos/listar", {alunos: data.alunos})
}

exports.mostrar = function (req, res) {
    
    const {id} = req.params

    const encontrarAluno = data.alunos.find(function (alunos) {
        return alunos.id  == id
    })

    if (!encontrarAluno) {
        return res.send("Aluno não encontrado!")
    }

    
    const alunos = {
        ...encontrarAluno,
        aniversario: date(encontrarAluno.nascimento).aniversario,
       
    }

    return res.render("alunos/mostrar", {alunos})
}

exports.cadastro = function (req, res) {
    return res.render("alunos/cadastro")
}

exports.post = function (req, res) {
    const keys = Object.keys(req.body)
//estrutura de validação se todos os dados estão preenchidos
    for(key of keys){
       if (req.body[key] == ""){
           return res.send("Por favor, preencha todos os campos")
       }
    }

    nascimento = Date.parse(req.body.nascimento)

    let id = 1
    const ultimoAluno = data.alunos[data.alunos.length-1]
    
    if(ultimoAluno){
        id = ultimoAluno.id + 1
    }

    data.alunos.push({
        id,
        ...req.body,
        nascimento, 

    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Erro!!!") 
            
        return res.redirect(`/alunos/${id}`)
        
    } )
}

exports.editar = function (req, res) {

    const {id} = req.params

    const encontrarAluno = data.alunos.find(function (alunos) {
        return id  == alunos.id
    })

    if (!encontrarAluno) {
        return res.send("Aluno não encontrado!")
    }
    const aluno = {
        ...encontrarAluno,
        nascimento: date(encontrarAluno.nascimento).iso,
    }

    return res.render("alunos/editar", {aluno})
}

exports.put = function (req, res) {
    const { id } = req.body

    let index = 0

    const encontrarAluno = data.alunos.find(function (aluno, encontrarIndex) {
        if (id == aluno.id) {
            index = encontrarIndex
            return true
        }
    })

    if(!encontrarAluno) return res.send("Aluno não encontrado!")

    const aluno = {
        ...encontrarAluno,
        ...req.body,
        nascimento: Date.parse(req.body.nascimento),
        id: Number(req.body.id)
    }

    data.alunos[index] = aluno

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return res.send("Erro")
        }

        return res.redirect(`/alunos/${id}`)
    })
}

exports.delete = function (req, res) {
    const { id } = req.body

    const filtrarAlunos = data.alunos.filter(function (alunos) {
        return alunos.id != id
    })

    data.alunos = filtrarAlunos

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Erro!!!") 
            
        return res.redirect("/alunos")
        
    } )

}
