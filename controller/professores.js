const fs = require("fs")
const data = require("../model/data.json")
const {idade, date} = require("../model/util")

exports.listar = function (req, res) {
    return res.render("professores/listar", {professores: data.professores})
}

exports.mostrar = function (req, res) {
    
    const {id} = req.params

    const encontrarProfessor = data.professores.find(function (professor) {
        return professor.id  == id
    })

    if (!encontrarProfessor) {
        return res.send("Professor não encontrado!")
    }

    
    const professor = {
        ...encontrarProfessor,
        nascimento: idade(encontrarProfessor.nascimento),
        servicos: encontrarProfessor.servicos.split(","),
        // created_at: new Intl.DateTimeFormat("pt-BR").format(encontrarProfessor.created_at),
    }

    return res.render("professores/mostrar", {professor})
}

exports.cadastro = function (req, res) {
    return res.render("professores/cadastro")
}

exports.post = function (req, res) {
    const keys = Object.keys(req.body)
//estrutura de validação se todos os dados estão preenchidos
    for(key of keys){
       if (req.body[key] == ""){
           return res.send("Por favor, preencha todos os campos")
       }
    }

    let {avatar_url,nome, email, nascimento, sexo, servicos } = req.body 
    
    nascimento = Date.parse(req.body.nascimento)
    const created_at = Date.now()
    const id = Number(data.professores.length+1 ) 

    data.professores.push({
        id,
        avatar_url, 
        nome, 
        email,
        nascimento, 
        sexo,
        servicos
        // created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Erro!!!") 
            
        return res.redirect("/professores")
        
    } )

}

exports.editar = function (req, res) {

    const {id} = req.params

    const encontrarProfessor = data.professores.find(function (professor) {
        return professor.id  == id
    })

    if (!encontrarProfessor) {
        return res.send("professor não encontrado!")
    }
    const professor = {
        ...encontrarProfessor,
        nascimento: date(encontrarProfessor.nascimento).iso,
    }

    return res.render("professores/editar", {professor})
}

exports.put = function (req, res) {
    const { id } = req.body

    let index = 0

    const encontrarProfessor = data.professores.find(function (professor, encontrarIndex) {
        if (id == professor.id) {
            index = encontrarIndex
            return true
        }
    })

    if(!encontrarProfessor) return res.send("professor não encontrado!")

    const professor = {
        ...encontrarProfessor,
        ...req.body,
        nascimento: Date.parse(req.body.nascimento),
        id: Number(req.body.id)
    }

    data.professores[index] = professor


    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return res.send("Erro")
        }

        return res.redirect(`/professores/${id}`)
    })
}

exports.delete = function (req, res) {
    const { id } = req.body

    const filtrarProfessores = data.professores.filter(function (professor) {
        return professor.id != id
    })

    data.professores = filtrarProfessores

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Erro!!!") 
            
        return res.redirect("/professores")
        
    } )

}
