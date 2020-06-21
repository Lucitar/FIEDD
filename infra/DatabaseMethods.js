function DatabaseMethods(connection){
	this._connection = connection;
}

DatabaseMethods.prototype.login_aluno = function(matricula, password, callback){
	this._connection.query('SELECT * FROM alunos WHERE matricula = ? AND senha = ?', [matricula, password], callback)	
}

DatabaseMethods.prototype.login_func = function(cpf, password, callback){
	this._connection.query('SELECT * FROM funcionarios WHERE cpf = ? AND senha = ?', [cpf, password], callback)
}

DatabaseMethods.prototype.alterar_perfil_alunos = function(email, senha, matricula, callback){
	this._connection.query(`UPDATE alunos SET email = '${email}', senha = '${senha}' WHERE matricula = ${matricula}`, callback)
}

DatabaseMethods.prototype.alterar_perfil_funcionario = function(email, senha, cpf, callback){
	this._connection.query(`UPDATE funcionarios SET email = '${email}', senha = '${senha}' WHERE cpf = ${cpf}`, callback)
}

DatabaseMethods.prototype.cadastrar_func = function(matricula, callback){
	
}

DatabaseMethods.prototype.ler_prod = function(inep, callback) {
	this._connection.query('SELECT * FROM produtos_? ORDER BY cod_prod ASC', [inep], callback)
}
DatabaseMethods.prototype.ler_prod_cadastro = function(inep, callback) {
	this._connection.query('SELECT * FROM produtos_? ORDER BY id_prod DESC', [inep], callback)
}

DatabaseMethods.prototype.buscar_prod = function(inep, cod_prod, categoria_prod, callback){
	this._connection.query('SELECT * FROM produtos_? WHERE cod_prod = ? OR categoria = ?', [inep, cod_prod, categoria_prod], callback)
}

DatabaseMethods.prototype.cadastrar_prod = function(inep, cod, nome, cpf, validade, categoria, quantidade, callback){
	this._connection.query(`INSERT INTO produtos_${inep}(cod_prod, nome_prod, last_cpf_user, validade, categoria, quantidade, quantidade_atual) VALUES (${cod}, '${nome}', ${cpf}, '${validade}', '${categoria}', '${quantidade}', '${quantidade}')`, callback) // FAZER ELSE PRA CASO N EXISTA
}//fazer sistema pra n repetir cadastros e tals

/*
DatabaseMethods.prototype.cadastrar_prods = function(produtos, callback){
	so usar um for no unitario
}
*/
DatabaseMethods.prototype.ler_excluidos = function(inep, callback){
	this._connection.query(`SELECT * FROM produtosexcluidos_${inep} ORDER BY cod_prod ASC`, callback)
}

DatabaseMethods.prototype.buscar_excluidos = function(inep, cod_prod, categoria_prod, callback){
	this._connection.query('SELECT * FROM produtosexcluidos_? WHERE cod_prod = ? OR categoria = ?', [inep, cod_prod, categoria_prod], callback)
}

DatabaseMethods.prototype.excluir_prod1 = function(inep, cod, callback){
	this._connection.query(`SELECT * FROM produtos_${inep} WHERE cod_prod = ${cod}`, callback)
}

DatabaseMethods.prototype.excluir_prod2 = function(inep, cod_prod, nome, last_cpf_user, categoria, callback){
	this._connection.query(`INSERT INTO produtosexcluidos_${inep}(cod_prod, nome_prod, last_cpf_user, categoria) VALUES (${cod_prod}, '${nome}', ${last_cpf_user}, '${categoria}')`, callback)
}

DatabaseMethods.prototype.excluir_prod3 = function(inep, cod_prod, callback){
	this._connection.query(`DELETE FROM produtos_${inep} WHERE cod_prod = ${cod_prod}`)
}

DatabaseMethods.prototype.restaurar_prod1 = function(inep, cod, callback){
	this._connection.query(`SELECT * FROM produtosexcluidos_${inep} WHERE cod_prod = ${cod}`, callback)
}

DatabaseMethods.prototype.restaurar_prod2 = function(inep, cod_prod, nome, last_cpf_user, categoria, callback){
	this._connection.query(`INSERT INTO produtos_${inep}(cod_prod, nome_prod, last_cpf_user, categoria) VALUES (${cod_prod}, '${nome}', ${last_cpf_user}, '${categoria}')`, callback)
}

DatabaseMethods.prototype.restaurar_prod3 = function(inep, cod_prod, callback){
	this._connection.query(`DELETE FROM produtosexcluidos_${inep} WHERE cod_prod = ${cod_prod}`)
}

DatabaseMethods.prototype.redefinir_quant = function(inep, cod, quant, cpf, callback){
	this._connection.query(`UPDATE produtos_${inep} SET quantidade_atual = ${quant}, last_cpf_user = ${cpf} WHERE cod_prod = ${cod}`, callback)
}

DatabaseMethods.prototype.criar_secao = function(inep, cod, quant, cpf, callback){
	this._connection.query(``, callback)
}

DatabaseMethods.prototype.ler_msgs = function(turma, callback){
	this._connection.query(`SELECT * FROM chat_${turma} ORDER BY id ASC`, callback)
	
}

DatabaseMethods.prototype.enviar_msg = function(turma, remetente, mensagem, callback){
	this._connection.query(`INSERT INTO chat_${turma}(remetente, mensagem) VALUES ('${remetente}', '${mensagem}')`, callback)

}

DatabaseMethods.prototype.upload_arq = function(nomeoriginal, nomearmazenado, disciplina, bimestre, turma, callback){
	this._connection.query(`INSERT INTO arquivos(nomeoriginal, nomearmazenado, disciplina, bimestre, turma) VALUES ('${nomeoriginal}', '${nomearmazenado}', '${disciplina}', '${bimestre}', '${turma}')`, callback)

}

DatabaseMethods.prototype.download_arq = function(callback){
	this._connection.query(`INSERT INTO chat_${turma}(remetente, mensagem) VALUES ('${remetente}', '${mensagem}')`, callback)

}

DatabaseMethods.prototype.listar_arqs = function(callback){
	this._connection.query(`SELECT * FROM arquivos ORDER BY turma ASC`, callback)

}

DatabaseMethods.prototype.excluir_arq = function(nomeoriginal, nomearmazenado, callback){
	this._connection.query(`DELETE FROM arquivos WHERE nomeoriginal = '${nomeoriginal}' AND nomearmazenado = '${nomearmazenado}'`, callback)

}

DatabaseMethods.prototype.listar_ouvidoria = function(callback){
	this._connection.query(`SELECT * FROM ouvidoria`, callback)

}

DatabaseMethods.prototype.buscar_ouvidoria = function(tipo, callback){
	this._connection.query(`SELECT * FROM ouvidoria WHERE tipo = '${tipo}'`, callback)

}

DatabaseMethods.prototype.enviar_ouvidoria = function(matricula_remetente, nome_remetente, tipo, mensagem, callback){
	this._connection.query(`INSERT INTO ouvidoria(matricula_remetente, nome_remetente, tipo, mensagem) VALUES ('${matricula_remetente}', '${nome_remetente}', '${tipo}', '${mensagem}')`, callback)

}

DatabaseMethods.prototype.excluir_ouvidoria = function(matricula_remetente, mensagem, callback){
	this._connection.query(`DELETE FROM ouvidoria WHERE matricula_remetente = '${matricula_remetente}' AND mensagem = '${mensagem}'`, callback)

}

DatabaseMethods.prototype.ler_recomendacoes = function(callback){
	this._connection.query(`SELECT * FROM recomendacoes`, callback)

}

DatabaseMethods.prototype.ler_recomendacoes_professor = function(disciplina, callback){
	this._connection.query(`SELECT * FROM recomendacoes WHERE disciplina = '${disciplina}' ORDER BY serie ASC`, callback)

}

DatabaseMethods.prototype.buscar_recomendacoes = function(tipo, callback){
	this._connection.query(`SELECT * FROM recomendacoes WHERE tipo_sugestao = '${tipo}'`, callback)

}

DatabaseMethods.prototype.enviar_recomendacoes = function(nome_sugestao, comentario_sugestao, tipo_sugestao, disciplina, turma, serie, callback){
	this._connection.query(`INSERT INTO recomendacoes(nome_sugestao, comentario_sugestao, tipo_sugestao, disciplina, turma, serie) VALUES ('${nome_sugestao}', '${comentario_sugestao}', '${tipo_sugestao}', '${disciplina}', '${turma}', '${serie}')`, callback)
}

DatabaseMethods.prototype.excluir_recomendacoes = function(id, callback){
	this._connection.query(`DELETE FROM recomendacoes WHERE id = '${id}'`, callback)
}


DatabaseMethods.prototype.ler_anotacoes_prof = function(cpf, callback){
	this._connection.query(`SELECT * FROM anotacoes WHERE cpf = '${cpf}'`, callback)

}

DatabaseMethods.prototype.enviar_anotacao = function(cpf, titulo, anotacao, callback){
	this._connection.query(`INSERT INTO anotacoes(cpf, titulo_anotacao, anotacao) VALUES (${cpf}, '${titulo}', '${anotacao}')`, callback)
}

DatabaseMethods.prototype.excluir_anotacao = function(cpf, id, callback){
	this._connection.query(`DELETE FROM anotacoes WHERE id = '${id}' AND cpf = '${cpf}' `, callback)
}

module.exports = DatabaseMethods;