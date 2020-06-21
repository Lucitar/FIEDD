var express = require('express');
var router = express.Router();

var connection = require('../infra/connection');
var DatabaseMethods = require('../infra/DatabaseMethods');

var methods = new DatabaseMethods(connection);

var dateFormat = require('dateformat');
const fs = require('fs')
let menu_prof;

fs.readFile('./views/sistema/barras_menus/menu_prof.ejs', function (err, data) {
    if(err) throw err;
    menu_prof = data;
});


router.get('/', function(req, res, next){
	if(req.session.loggedin && req.session.level == 1){ //SUBSTITUIR ESSES IFS POR UM METODO
		res.render('./sistema/professor/dash_prof', {nome:req.session.nome, menuprof:menu_prof});
		console.log('eae', req.session.cpf, req.session.password, req.session.loggedin);
	}else{
		res.render('./error');
		
	}
	
})

router.get('/chat_escolha', function(req, res, next){
	if(req.session.loggedin && req.session.level == 1){ 
		res.render('./sistema/chats/prof/chat_escolha', {nome:req.session.nome, menuprof:menu_prof});
		
	}else{
		res.render('./error');
		
	}
	
})

router.post('/chat_entrar', function(req, res, next){
	if(req.session.loggedin && req.session.level == 1){
		let escolha = req.body.escolha;
		
		res.redirect(`/dashboard_professor/chat_${escolha}`);
	}else{
		res.render('./error');
		
	}
	
})

router.get('/chat_redes', function(req, res, next){
	if(req.session.loggedin && req.session.level == 1){
		methods.ler_msgs('redes', (err, results)=>{
			if(err) throw new Error(err);
			res.render('./sistema/chats/prof/chat_redes', {nome:req.session.nome, lista:results, menuprof:menu_prof, dateFormat:dateFormat});
		})
		
		//res.render('./sistema/chats/chat_redes', {nome:req.session.nome, turma:req.session.turma, lista:results});
		
	}else{
		res.render('./error');
		
	}
	
})

router.post('/chat_redes', function(req, res, next){
	if(req.session.loggedin && req.session.level == 1){
		var mensagem = req.body.mensagem;
		try{
		methods.enviar_msg('redes', req.session.nome, mensagem, (err)=>{
			if(err) throw new Error(err);
		})
		} finally {
		methods.ler_msgs('redes', (err, results)=>{
			if(err) throw new Error(err);
			res.render('./sistema/chats/prof/chat_redes', {nome:req.session.nome, lista:results, menuprof:menu_prof, dateFormat:dateFormat});
		})
		}
		//res.render('./sistema/chats/chat_redes', {nome:req.session.nome, turma:req.session.turma});
	}else{
		res.render('./error');
		
	}
	
})













/* TEM ALGUMA COISA ERRADA AQUI*/
router.get('/upload', function(req, res, next){
	if(req.session.loggedin && req.session.level == 1){
		var mensagem = req.body.mensagem;
		methods.listar_arq('redes', req.session.nome, mensagem, (err)=>{
			if(err) throw new Error(err);
		})

		methods.ler_msgs('redes', (err, results)=>{
			if(err) throw new Error(err);
			res.render('./sistema/chats/prof/chat_redes', {nome:req.session.nome, lista:results, menuprof:menu_prof});
		})
		//res.render('./sistema/chats/chat_redes', {nome:req.session.nome, turma:req.session.turma});
	}else{
		res.render('./error');
		
	}
	
})

	/*
		Sistema de Upload Test 0.1
		
	*/

var multer  = require('multer')
var armazenamento = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './views/sistema/arquivos/')
  },
  filename: function (req, file, cb) {
  	var ext = file.originalname.substr(file.originalname.lastIndexOf('.') + 1)
  	var dataformatada = dateFormat(Date(Date.now()).toString(), "dd-mm-yyyy-hh-MM-ss-TT")
    cb(null, file.fieldname + '-' + dataformatada + '.' + ext)
  }
})
 
var upload = multer({ storage: armazenamento })

router.get('/download_prof', function(req, res, next){
	if(req.session.loggedin && req.session.level==1){
		methods.listar_arqs((err, results)=>{
			res.render('./sistema/professor/upload', {nome:req.session.nome, lista:results, menuprof:menu_prof})
		})
	}else{
		res.render('./error');
	}
})

router.post('/upload', upload.single('arquivo'), function(req, res, next){
	if(req.session.loggedin && req.session.level==1){
		methods.upload_arq(req.file.originalname, req.file.filename, req.session.disciplina, req.body.bimestre, req.body.turma, (err, results)=>{
			if(err) throw new Error(err);
			//if(err){res.redirect('/dashboard_professor/download_prof')}
			res.redirect('/dashboard_professor/download_prof')
		})
	}else{
		res.render('./error');
	}
})

router.post('/download_arq', function(req, res){
	if(req.session.loggedin && req.session.level==1){
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

router.post('/excluir_arq', function(req, res, next){
	if(req.session.loggedin && req.session.level==1){
		methods.excluir_arq(req.body.original, req.body.armazenado, (err, results)=>{
			if(err) throw new Error(err);
			try {
  				fs.unlinkSync(`./views/sistema/arquivos/${req.body.armazenado}`)
  				//file removed
			} catch(err) {
 				console.error(err)
			}
			//if(err){res.redirect('/dashboard_professor/download_prof')}
			res.redirect('/dashboard_professor/download_prof')
		})
	}else{
		res.render('./error');
	}
})

router.get('/recomendacoes_professor', function(req, res, next){
	if(req.session.loggedin && req.session.level==1){
		methods.ler_recomendacoes_professor(req.session.disciplina, (err, results)=>{
			if(err) throw new Error(err);
			res.render('./sistema/professor/recomendacoes_professor', {nome:req.session.nome, menuprof:menu_prof, lista:results, dateFormat:dateFormat});
		})
	}else{
		res.render('./error');
		
	}
	
})

router.post('/recomendacoes_professor_enviar', function(req, res, next){
	if(req.session.loggedin && req.session.level==1){
		methods.enviar_recomendacoes(req.body.sugestao , req.body.comentario , req.body.tipo , req.session.disciplina , req.body.turma , req.body.serie , (err)=>{
			if(err) throw new Error(err);
			res.redirect('/dashboard_professor/recomendacoes_professor')
		})
	}else{
		res.render('./error');
		
	}
	
})

router.post('/recomendacoes_professor_excluir', function(req, res, next){
	if(req.session.loggedin && req.session.level==1){
		methods.excluir_recomendacoes(req.body.id, (err)=>{
			if(err) throw new Error(err);
			res.redirect('/dashboard_professor/recomendacoes_professor')
		})
	}else{
		res.render('./error');
		
	}
	
})

router.get('/perfil_professor', function(req, res, next){
	if(req.session.loggedin && req.session.level==1){

		
		res.render('./sistema/professor/perfil_prof', {nome:req.session.nome, infos:req.session, menuprof:menu_prof});
		
	}else{
		res.render('./error');
		
	}
	
})

router.post('/alterar_perfil_professor', function(req, res, next){
	if(req.session.loggedin && req.session.level==1){
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
		methods.alterar_perfil_funcionario(email, senha, req.session.cpf, (err)=>{
			if(err) throw new Error(err);
			console.log('a', email, senha);
			try{
			req.session.email = email;
			}finally{
			res.redirect('/dashboard_professor/perfil_professor');
			}
		})
	}else{
		res.render('./error');
		
	}
	
})


router.get('/anotacoes_prof', function(req, res, next){
	if(req.session.loggedin && req.session.level==1){
		methods.ler_anotacoes_prof(req.session.cpf, (err, results)=>{
			if(err) throw new Error(err);
			res.render('./sistema/professor/anotacoes_prof', {nome:req.session.nome, menuprof:menu_prof, lista:results, dateFormat:dateFormat});
		})
	}else{
		res.render('./error');
		
	}
	
})

router.post('/anotacoes_prof_enviar', function(req, res, next){
	if(req.session.loggedin && req.session.level==1){
		methods.enviar_anotacao(req.session.cpf, req.body.titulo , req.body.anotacao, (err)=>{
			if(err) throw new Error(err);
			res.redirect('/dashboard_professor/anotacoes_prof')
		})
	}else{
		res.render('./error');
		
	}
	
})

router.post('/anotacoes_prof_excluir', function(req, res, next){
	if(req.session.loggedin && req.session.level==1){
		methods.excluir_anotacao(req.session.cpf, req.body.id, (err)=>{
			if(err) throw new Error(err);
			res.redirect('/dashboard_professor/anotacoes_prof')
		})
	}else{
		res.render('./error');
		
	}
	
})

module.exports = router;
