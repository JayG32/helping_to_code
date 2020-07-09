module.exports = {

    idade: function (timestamp) {
        const hoje = new Date()
        const dataNascimento = new Date(timestamp)
    
        let idade = hoje.getFullYear() - dataNascimento.getFullYear()
    
        const mes = hoje.getMonth() - dataNascimento.getMonth()
    
        if (mes < 0 || mes == 0 && hoje.getDate() < dataNascimento.getDate()) {
            idade = idade - 1
        }
    
        return idade
    },

    date: function (timestamp) {
        const date = new Date(timestamp)

        const ano = date.getUTCFullYear()
        const mes = `0${date.getUTCMonth() + 1}`.slice(-2)
        const dia = `0${date.getUTCDate()}`.slice(-2)

        return{
            dia,
            mes,
            ano,
            iso: `${ano}-${mes}-${dia}`,
            aniversario: `${dia}/${mes}`
        } 
        
    }
}

