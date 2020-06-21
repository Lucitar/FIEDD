var express = require('express');
var router = express.Router();

var connection = require('../infra/connection');
var DatabaseMethods = require('../infra/DatabaseMethods');

var methods = new DatabaseMethods(connection);

var dateFormat = require('dateformat');
let fs = require('fs');
let menu_coord;

fs.readFile('./views/sistema/barras_menus/menu_coord.ejs', function (err, data) {
    if(err) throw err;
    menu_coord = data;
});


router.get('/', function(req, res, next){
	if(req.session.loggedin && req.session.level == 2){ 
		res.render('./sistema/coordenador/dash_coord', {nome:req.session.nome, menucoord: menu_coord});
		console.log('eae', req.session.cpf, req.session.password, req.session.loggedin);
	}else{
		res.render('./error');
		
	}
	
})

router.get('/ouvidoria_coordenador', function(req, res, next){
	if(req.session.loggedin && req.session.level == 2){
		methods.listar_ouvidoria((err, results) =>{
		res.render('./sistema/coordenador/ouvidoria_coord', {nome:req.session.nome, menucoord: menu_coord, lista:results, dateFormat:dateFormat});
		})
	}else{
		res.render('./error');
		
	}
	
})

router.post('/ouvidoria_coordenador_buscar', function(req, res, next){
	if(req.session.loggedin && req.session.level == 2){
		if(req.body.tipo == "todos"){
			res.redirect('/dashboard_coordenador/ouvidoria_coordenador')
		} else {
			methods.buscar_ouvidoria(req.body.tipo, (err, results) =>{
				if(err) throw new Error(err);
				res.render('./sistema/coordenador/ouvidoria_coord', {nome:req.session.nome, menucoord: menu_coord, lista:results, dateFormat:dateFormat});
			})
		}
	}else{
		res.render('./error');
		
	}
	
})

router.post('/ouvidoria_coordenador_excluir', function(req, res, next){
	if(req.session.loggedin && req.session.level == 2){
		methods.excluir_ouvidoria(req.body.matricula, req.body.mensagem, (err, results) =>{
			res.redirect('/dashboard_coordenador/ouvidoria_coordenador');
		})
	}else{
		res.render('./error');
		
	}
	
})

router.get('/perfil_coord', function(req, res, next){
	if(req.session.loggedin && req.session.level == 2){

		
		res.render('./sistema/coordenador/perfil_coord', {nome:req.session.nome, infos:req.session, menucoord: menu_coord});
		
	}else{
		res.render('./error');
		
	}
	
})

router.post('/alterar_perfil_coord', function(req, res, next){
	if(req.session.loggedin && req.session.level == 2){
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
		methods.alterar_perfil_alunos(email, senha, req.session.cpf, (err)=>{
			if(err) throw new Error(err);
			console.log('a', email, senha);
			req.session.email = email;
			res.redirect('/dashboard_coordenador/perfil_coord');
		})
	}else{
		res.render('./error');
		
	}
	
})

module.exports = router;


