const connection = require('../db/connection');

module.exports={

    checarDuplicado: function(email, callback) {
        connection.query(`SELECT COUNT(*) as number FROM funcionarios WHERE email = '${email}'`, callback);
    },

    salvarDadosCadastrais: function(name, email, areas, code, hashedpassword, callback) {
        connection.query(`INSERT INTO empresas (nome_empresa, email, tipo_conta, areas_atuacao, codigo_cadastro, hashedpassword) VALUES ('${name}', '${email}', 'admin', '${areas}', '${code}', '${hashedpassword}')`, callback);
    },

    selecionarEmpresa: function (email, callback) {
        connection.query(`SELECT * from empresas where EMAIL = '${email}'`, callback);
    },

    salvarSenha: function (email, hashedpassword){        
        connection.query(`UPDATE empresas SET hashedpassword = '${hashedpassword}' WHERE email = '${email}'`);
    },

    selecionarFuncionarios: function (user_id, callback) {
        connection.query(`SELECT * FROM funcionarios WHERE id_empresa = '${user_id}' ORDER BY nome ASC `, callback);
    },

    deletarFuncionario: function (user_id, del, callback) {
        connection.query(`DELETE FROM funcionarios WHERE id_empresa = '${user_id}' and id = '${del}' `, callback);
    },

    editarValorMensal: function (user_id, value, user, callback) {
        connection.query(`UPDATE funcionarios SET saldo_mensal = '${value}' WHERE id_empresa = '${user_id}' and id = '${user}' `, callback);
    },

    selecionarUltimoEnvioMensal: function(user_id, callback) {
        connection.query(`SELECT * FROM envios WHERE id_empresa = '${user_id}' and tipo = 'mensal' ORDER BY id DESC LIMIT 1 `, callback);
    },

    enviarOutflowMensal: function (user_id, funcionarios) {
        for (var i = 0; i < funcionarios.length; i++) {
            connection.query(`UPDATE funcionarios SET outflow = outflow + ${funcionarios[i].saldo_mensal} WHERE id_empresa = '${user_id}' and id = '${funcionarios[i].id}'`);
        }
    },

    catalogarEnvioMensal: function (user_id) {
        connection.query(`INSERT INTO envios (id_empresa, data, tipo) VALUES ('${user_id}', NOW(), 'mensal')`);
    },

    selecionarNomeFuncionario: function (user, callback) {
        connection.query(`SELECT * FROM funcionarios WHERE id = '${user}'`, callback);
    },

    enviarOutflowIndividual: function(user_id, value, user) {
        connection.query(`UPDATE funcionarios SET outflow = outflow + '${value}' WHERE id_empresa = '${user_id}' and id = '${user}'`);
    },

    catalogarEnvioIndividual: function(name, user_id, value) {
        connection.query(`INSERT INTO envios (id_empresa, data, tipo, usuario, valor) VALUES ('${user_id}', NOW(), 'individual', '${name}', '${value}')`);
    },

    mostrarHistoricoEnvioMensal: function (user_id, callback) {
        connection.query(`SELECT * FROM envios WHERE id_empresa = '${user_id}' and tipo = 'mensal' ORDER BY id DESC `, callback);
    },

    mostrarHistoricoEnvioIndividual: function(user_id, callback) {
        connection.query(`SELECT * FROM envios WHERE id_empresa = '${user_id}' and tipo = 'individual' ORDER BY id DESC `, callback);
    },

    selecionarTransferenciasTodas: function (user_id, callback) {
        connection.query(`SELECT valor, data, motivo, d.nome as destinatario, r.nome as remetente FROM transferencias INNER JOIN funcionarios AS r ON transferencias.id_remetente = r.id  INNER JOIN funcionarios as d ON transferencias.id_destinatario = d.id WHERE transferencias.id_empresa = '${user_id}' ORDER BY data DESC`, callback);
    }
}
