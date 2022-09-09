const express = require("express");
const app = express();



const bodyParser = require('body-parser');

const path = require('path');

const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const { errorMonitor } = require("events");

const JWT_SECRET = "sorv1veteque2rol5ei9tepikachu7portaab2acax1igeladei6rabrastemp";

app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());

const mongoUrl="mongodb+srv://davipbr15:C8b65GpDNrNJxNu1@cluster0.asrju.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("   |        Conectado         |");
}).catch((e) => console.log(e));

app.listen(3002, ()=>{
    console.log("   |  Server Local Iniciado.  |");
})

app.get('/home',async(req,res)=>{

    res.send("Hello World");

})

app.post('/post',async (req, res) => {

    const {data} = req.body;

    console.log(data);

    

    try{



    } catch (error) {

        res.send({status:"Algo deu errado tente novamente"})

    }

});

require("./userDetails");
require("./loginDetail");

const Login = mongoose.model("LoginUser");
const Associate = mongoose.model("AssociateInfo");

app.post("/searchAssociate", async(req,res)=>{

    const { nomeCompletob } = req.body;

    const associate = await Associate.find(

        { dadosPessoais: { nomeCompleto: nomeCompletob} }

    );

    if(!nomeCompletob){

        return res.json({status: 'error', error: 'Escreva Algo Amigo.'})

    } else{

    if(!associate){
        return res.json({ status: 'error', error: 'Usuario inexistente ou inválido' })
    } else {


        res.json(associate);
        console.log(associate);

    }

    }




})

app.post("/loginUser", async(req,res)=>{

    

    const { username, password } = req.body;
	const user = await Login.findOne({ username }).lean();

	if (!user) {
		return res.json({ status: 'error', error: 'Senha ou Usuário Inválido' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			JWT_SECRET
		)

		return res.json({ status: 'Logado com Sucesso!', data: token })
	}

	res.json({ status: 'Error', error: 'Senha ou Usuário Inválido' })


})

app.post("/registerUser", async(req,res)=>{

    console.log(req.body);

    const { username, password: plainTextPassword } = req.body

	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Sua senha é muito cura deve ter mais de 6 caracteres'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)

	try {
		const response = await Login.create({
			username,
			password
		})
		console.log('Usuário criado com sucesso: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'Erro', error: 'Username already in use' })
		}
		throw error
	}

	res.json({ status: 'ok' })



})

app.post('/changePassword', async (req, res) => {
	const { token, newPassword: plainTextPassword } = req.body

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'Error', error: 'Senha Inválida' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Sua senha é muito curta deve ter mais de 6 caracteres.'
		})
	}

	try {
		const user = jwt.verify(token, JWT_SECRET)

		const _id = user.id

		const password = await bcrypt.hash(plainTextPassword, 10)

		await User.updateOne(
			{ _id },
			{
				$set: { password }
			}
		)
		res.json({ status: 'Ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'Error', error: ';))' })
	}
})

app.post("/registerAssociate", async(req,res)=>{
    /*
{
"dadosPessoais":{
        "nomeCompleto":"nomeCompletob",
        "estadoCivil":"estadoCivilb",
        "nacionalidade":"nacionalidadeb",
        "naturalidade":"naturalidadeb",
        "dataDeNascimento":"dataDeNascimentob",
        "cpf":"cpfb",
        "profissao":"profissaob",
        "documentoIdentificacao":"documentoIdentificacaob",
        "numeroDocumento":"numeroDocumentob",
        "orgaoExpeditor":"orgaoExpeditorb",
        "enderecoPessoal":"enderecoPessoalb",
        "numeroEnderecoPessoal":"numeroEnderecoPessoalb",
        "complementoPessoal":"complementoPessoalb",
        "bairroPessoal":"bairroPessoalb",
        "cep":"cepb",
        "cidadeEstadoPessoal":"cidadeEstadoPessoalb",
        "emailPessoal":"emailPessoalb",
        "telefoneFixoPessoal":"telefoneFixoPessoalb",
        "celularPessoal":"celularPessoalb"
}
}*/
 /*dadosPessoais:{
        nomeCompleto:nomeCompletob,
        estadoCivil:estadoCivilb,
        nacionalidade:nacionalidadeb,
        naturalidade:naturalidadeb,
        dataDeNascimento:dataDeNascimentob,
        cpf:cpfb,
        profissao:profissaob,
        documentoIdentificacao:documentoIdentificacaob,
        numeroDocumento:numeroDocumentob,
        orgaoExpeditor:orgaoExpeditorb,
        enderecoPessoal:enderecoPessoalb,
        numeroEnderecoPessoal:numeroEnderecoPessoalb,
        complementoPessoal:complementoPessoalb,
        bairroPessoal:bairroPessoalb,
        cep:cepb,
        cidadeEstadoPessoal:cidadeEstadoPessoalb,
        emailPessoal:emailPessoalb,
        telefoneFixoPessoal:telefoneFixoPessoalb,
        celularPessoal:celularPessoalb }
    });*/
    const {nomeCompletob,
        estadoCivilb,
        nacionalidadeb,
        naturalidadeb,
        dataDeNascimentob,
        cpfb,
        profissaob,
        documentoIdentificacaob,
        numeroDocumentob,
        orgaoExpeditorb,
        enderecoPessoalb,
        numeroEnderecoPessoalb,
        complementoPessoalb,
        bairroPessoalb,
        cepb,
        cidadeEstadoPessoalb,
        emailPessoalb,
        telefoneFixoPessoalb,
        celularPessoalb,
        razaoSocialb,
        nomeFantasiab,
        cnpjb,
        numeroInscricaob,
        enderecoSedeb,
        numeroSedeb,
        complementoSedeb,
        bairroSedeb,
        cepSedeb,
        cidadeEstadoSedeb,
        emailProfissionalb,
        dataDeAberturab,
        quantidadePessoasOcupadasb,
        ramoDaAtividadeb,} = req.body;
    try{
        await Associate.create({

            dadosPessoais:{
            nomeCompleto:nomeCompletob,
            estadoCivil:estadoCivilb,
            nacionalidade:nacionalidadeb,
            naturalidade:naturalidadeb,
            dataDeNascimento:dataDeNascimentob,
            cpf:cpfb,
            profissao:profissaob,
            documentoIdentificacao:documentoIdentificacaob,
            numeroDocumento:numeroDocumentob,
            orgaoExpeditor:orgaoExpeditorb,
            enderecoPessoal:enderecoPessoalb,
            numeroEnderecoPessoal:numeroEnderecoPessoalb,
            complementoPessoal:complementoPessoalb,
            bairroPessoal:bairroPessoalb,
            cep:cepb,
            cidadeEstadoPessoal:cidadeEstadoPessoalb,
            emailPessoal:emailPessoalb,
            telefoneFixoPessoal:telefoneFixoPessoalb,
            celularPessoal:celularPessoalb,
            }
            ,
            dadosProfissionais:{
                razaoSocial:razaoSocialb,
                nomeFantasia:nomeFantasiab,
                cnpj:cnpjb,
                numeroInscricao:numeroInscricaob,
                enderecoSede:enderecoSedeb,
                numeroSede:numeroSedeb,
                complementoSede:complementoSedeb,
                bairroSede:bairroSedeb,
                cepSede:cepSedeb,
                cidadeEstadoSede:cidadeEstadoSedeb,
                emailProfissional:emailProfissionalb,
                dataDeAbertura:dataDeAberturab,  
                quantidadePessoasOcupadas:quantidadePessoasOcupadasb,
                ramoDaAtividade:ramoDaAtividadeb
            }

        });
        res.send({status:"Ok"});
        console.log(nomeCompletob + " registrado com sucesso!");
        console.log("");
        console.log(req.body);
    } catch (error){
        res.send({status: "Error"});
    }
})

app.post("/login", async(req,res)=>{

   
})


