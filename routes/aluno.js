var express = require('express');
var router = express.Router();

var connection = require('../infra/connection');
var DatabaseMethods = require('../infra/DatabaseMethods');

var methods = new DatabaseMethods(connection);
var dateFormat = require('dateformat');

let fs = require('fs');
let menu_aluno;

fs.readFile('./views/sistema/barras_menus/menu_aluno.ejs', function (err, data) {
    if(err) throw err;
    menu_aluno = data;
});


router.get('/', function(req, res, next){
	if(req.session.loggedin && typeof req.session.level === "undefined"){		
		res.render('./sistema/aluno/dash_aluno', {nome:req.session.nome, turma:req.session.turma, menualuno:menu_aluno});
	}else{

		res.render('./error');
		
	}
	
})

router.get('/chat_escolha', function(req, res, next){
	if(req.session.loggedin && typeof req.session.level === "undefined"){
		res.redirect(`/dashboard_aluno/chat_${req.session.turma}`);

	}else{
		res.render('./error');
		
	}
	
})

router.get('/chat_redes', function(req, res, next){
	if(req.session.loggedin && typeof req.session.level === "undefined" && req.session.turma=="redes"){
		methods.ler_msgs(req.session.turma, (err, results)=>{
			if(err) throw new Error(err);
			res.render('./sistema/chats/aluno/chat_redes', {nome:req.session.nome, turma:req.session.turma, lista:results, menualuno:menu_aluno, dateFormat:dateFormat});
		})
		
		//res.render('./sistema/chats/chat_redes', {nome:req.session.nome, turma:req.session.turma, lista:results});
		
	}else{
		res.render('./error');
		
	}
	
})

router.post('/chat_redes', function(req, res, next){
	if(req.session.loggedin && typeof req.session.level === "undefined" && req.session.turma=="redes"){
		var mensagem = req.body.mensagem;
		methods.enviar_msg(req.session.turma, req.session.nome, mensagem, (err)=>{
			if(err) throw new Error(err);
		})

		methods.ler_msgs(req.session.turma, (err, results)=>{
			if(err) throw new Error(err);
			res.render('./sistema/chats/aluno/chat_redes', {nome:req.session.nome, turma:req.session.turma, lista:results, menualuno:menu_aluno, dateFormat:dateFormat});
		})
		//res.render('./sistema/chats/chat_redes', {nome:req.session.nome, turma:req.session.turma});
	}else{
		res.render('./error');
		
	}
	
})

router.get('/perfil_aluno', function(req, res, next){
	if(req.session.loggedin && typeof req.session.level === "undefined"){

		
		res.render('./sistema/aluno/perfil_aluno', {nome:req.session.nome, infos:req.session, menualuno:menu_aluno});
		
	}else{
		res.render('./error');
		
	}
	
})

router.post('/alterar_perfil_aluno', function(req, res, next){
	if(req.session.loggedin && typeof req.session.level === "undefined"){
		var email;
		var senha;
		if(req.body.email_novo != "" && req.body.email_novo == req.body.email_novo_conf && req.body.email_novo != req.session.email){
			email = req.body.email_novo;
		} else {
			email = req.session.email;
		}
		
		if(req.body.senha_nova != "" && req.body.senha_nova == req.body.senha_nova_conf && req.body.senha_nova != req.session.password){
			senha = req.body.senha_nova;
		} else {
			senha = req.session.password; 
		}
		console.log(email, senha);
		methods.alterar_perfil_alunos(email, senha, req.session.matricula, (err)=>{
			if(err) throw new Error(err);
			console.log('a', email, senha);
			req.session.email = email;
			res.redirect('/dashboard_aluno/perfil_aluno');
		})
	}else{
		res.render('./error');
		
	}
	
})

router.get('/download_aluno', function(req, res, next){
	if(req.session.loggedin && typeof req.session.level === "undefined"){
		methods.listar_arqs((err, results)=>{
			if(err) throw new Error(err);
			res.render('./sistema/aluno/download_aluno', {nome:req.session.nome, lista:results, menualuno:menu_aluno})
		})
	}else{
		res.render('./error');
	}
})

router.post('/download_arq', function(req, res){
	if(req.session.loggedin && typeof req.session.level === "undefined"){
		try {
			res.download(`./views/sistema/arquivos/${req.body.armazenado}`, `${req.body.original}`)

		}
		catch(err) {
			console.error(err)
		}
		finally {
			//res.redirect('/dashboard_professor/download_prof')
		}
		
		
		//next()
	}else{
		res.render('./error');
	}
})

router.get('/ouvidoria_aluno', function(req, res, next){
	if(req.session.loggedin && typeof req.session.level === "undefined"){
		
		res.render('./sistema/aluno/ouvidoria_aluno', {nome:req.session.nome, infos:req.session, menualuno:menu_aluno});
		
	}else{
		res.render('./error');
		
	}
	
})

router.post('/ouvidoria_aluno/enviar', function(req, res){
	if(req.session.loggedin && typeof req.session.level === "undefined"){
		methods.enviar_ouvidoria(req.session.matricula, req.session.nome, req.body.tipo, req.body.mensagem, (err, results)=>{
			if(err) throw new Error(err);
			res.redirect('/dashboard_aluno/ouvidoria_aluno');
		})
	}else{
		res.render('./error');
	}
})

router.get('/recomendacoes_aluno', function(req, res, next){
	if(req.session.loggedin && typeof req.session.level === "undefined"){
		methods.ler_recomendacoes((err, results)=>{
			res.render('./sistema/aluno/recomendacoes_aluno', {nome:req.session.nome, menualuno:menu_aluno, lista:results, dateFormat:dateFormat});
		})
	}else{
		res.render('./error');
		
	}
	
})

router.post('/recomendacoes_aluno_buscar', function(req, res, next){
	if(req.session.loggedin && typeof req.session.level === "undefined"){
		if(req.body.tipo == 'Tudo'){
			res.redirect('/dashboard_aluno/recomendacoes_aluno');
		} else {
			methods.buscar_recomendacoes(req.body.tipo, (err, results)=>{
				res.render('./sistema/aluno/recomendacoes_aluno', {nome:req.session.nome, menualuno:menu_aluno, lista:results, dateFormat:dateFormat});
			})
		}
	}else{
		res.render('./error');
		
	}
	
})

module.exports = router;
