const mongoose = require("mongoose");


const AssociateInfoSchema = new mongoose.Schema(
    {
      dadosPessoais: {

        nomeCompleto:{type: String,trim: true},
        estadoCivil:String,
        nacionalidade:String,
        naturalidade:String,
        dataDeNascimento:String,
        cpf:String,
        profissao:String,
        documentoIdentificacao:String,
        numeroDocumento:String,
        orgaoExpeditor:String,
        enderecoPessoal:String,
        numeroEnderecoPessoal:String,
        complementoPessoal:String,
        bairroPessoal:String,
        cep:String,
        cidadeEstadoPessoal:String,
        emailPessoal:String,
        telefoneFixoPessoal:String,
        celularPessoal:String,

        }
        ,
        dadosProfissionais: {
            razaoSocial:String,
            nomeFantasia:String,
            cnpj:String,
            numeroInscricao:String,
            enderecoSede:String,
            numeroSede:String,
            complementoSede:String,
            bairroSede:String,
            cepSede:String,
            cidadeEstadoSede:String,
            emailProfissional:String,
            dataDeAbertura:String,  
            quantidadePessoasOcupadas:String,
            ramoDaAtividade:String
        }
    //
    },
    {
        collection:"AssociateInfo",
    }
);

mongoose.model("AssociateInfo", AssociateInfoSchema);