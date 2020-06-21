var express = require('express');
var router = express.Router();

var connection = require('../infra/connection');
var DatabaseMethods = require('../infra/DatabaseMethods');

var methods = new DatabaseMethods(connection);

/* GET home page. */
router.get('/', function(req, res, next) {
	
	

	if(req.session.loggedin && req.session.level == 2){
		res.redirect('/dashboard_coordenador');
	} else if(req.session.loggedin && req.session.level == 1){
		res.redirect('/dashboard_professor');
	} else if(req.session.loggedin && typeof req.session.level === "undefined"){
		res.redirect('/dashboard_aluno');
	} else {
		res.render('./inicio/index');
	}

});

router.post('/auth_aluno', function(req, res, next){
	var matricula = req.body.matricula;
	var password = req.body.password;
	
	methods.login_aluno(matricula, password, (err, results) => {
		if(err) throw new Error(err)
		if (results.length > 0) {
			req.session.matricula = matricula;
			req.session.password = password;
			req.session.nome = results[0].nome;
			req.session.email = results[0].email;
			req.session.turma = results[0].turma;
			req.session.serie = results[0].serie;
			req.session.loggedin = true;
			res.redirect('/dashboard_aluno');
			console.log('eae', matricula, password, req.session.matricula, req.session.matricula, req.session.password, req.session.loggedin);
		} else {
			req.session.loggedin = false;
			res.redirect('/');
			
		}
		res.end();
	});
});

router.post('/auth_func', function(req, res){
	var cpf = req.body.cpf;
	var password = req.body.password;
	console.log(req.body);
	methods.login_func(cpf, password, (err, results) => {
		if(err) throw new Error(err)
		if (results.length > 0) {
			req.session.cpf = cpf;
			req.session.password = password;
			req.session.nome = results[0].nome;
			req.session.email = results[0].email;
			req.session.level = results[0].nivel_acesso;
			req.session.inep = results[0].inep;
			req.session.disciplina = results[0].disciplina;
			req.session.loggedin = true;
			if(req.session.level == 1){
				res.redirect('/dashboard_professor');
			} else if(req.session.level == 2){
				res.redirect('/dashboard_coordenador');
			}
		} else {
			req.session.loggedin = false;
			res.redirect('/');
			
		}
		res.end();
	});
});

router.get('/sair', function(req, res, next){
	console.log(req.session);
	console.log(req.session.id);
	console.log(req.get('cookie'));
	
	req.session.destroy(function(err){
		res.clearCookie('userid')
		res.redirect('/')
	})
	
})

module.exports = router;
