const connection = require('../db/connection');

module.exports={

    checarCodigo: function (code, callback) {
        connection.query(`SELECT id FROM empresas WHERE codigo_cadastro = '${code}'`, callback);
    },

    checarDuplicado: function (email, callback) {
        connection.query(`SELECT COUNT(*) as number FROM empresas WHERE email = '${email}'`, callback)
    },

    salvarDadosCadastrais: function (name, email, id_empresa, hashedpassword, callback) {
        connection.query(`INSERT INTO funcionarios (nome, email, tipo_conta, id_empresa, hashedpassword) VALUES ('${name}', '${email}', 'user', '${id_empresa}', '${hashedpassword}')`, callback)
    },

    checarFuncionario: function (email) {
        connection.query(`SELECT * from funcionarios where EMAIL = '${email}' `);
    },

    salvarSenha: function (email,hashedpassword){        
        connection.query(`UPDATE funcionarios SET hashedpassword = '${hashedpassword}' WHERE email = '${email}'`);
    },

    selecionarOutrosFuncionarios: function (user_id, id_empresa, callback) {
        connection.query(`SELECT * FROM funcionarios WHERE id_empresa = '${id_empresa}' AND NOT id = '${user_id}' ORDER BY nome ASC `, callback);
    },

    checarExistenciaFuncionario: function (user, id_empresa, callback) {
        connection.query(`SELECT COUNT(*) as number FROM funcionarios WHERE id_empresa = '${id_empresa}' AND id = '${user}'`, callback);
    },

    enviarOutflow: function (value, id_empresa, user, user_id, motivo) {
        connection.query(`UPDATE funcionarios SET flowin = flowin + '${value}' WHERE id_empresa = '${id_empresa}' and id = '${user}'`);
        connection.query(`UPDATE funcionarios SET outflow = outflow - '${value}' WHERE id_empresa = '${id_empresa}' and id = '${user_id}'`);
        connection.query(`INSERT INTO transferencias (id_empresa, data, id_remetente, id_destinatario, valor, motivo) VALUES ('${id_empresa}', NOW(), '${user_id}', '${user}', '${value}', '${motivo}')`);
    },

    selecionarFuncionarioLogado: function (id_empresa, user_id, callback) {
        connection.query(`SELECT * FROM funcionarios WHERE id_empresa = '${id_empresa}' AND id = '${user_id}'`, callback);
    },

    selecionarTransferenciasEnviadas: function(id_empresa, user_id, callback) {
        connection.query(`SELECT * FROM transferencias INNER JOIN funcionarios ON transferencias.id_destinatario = funcionarios.id WHERE transferencias.id_empresa = '${id_empresa}' AND transferencias.id_remetente = '${user_id}' ORDER BY data DESC`, callback);
    },

    selecionarTransferenciasRecebidas: function (id_empresa, user_id, callback) {
        connection.query(`SELECT * FROM transferencias INNER JOIN funcionarios ON transferencias.id_remetente = funcionarios.id WHERE transferencias.id_empresa = '${id_empresa}' AND transferencias.id_destinatario = '${user_id}' ORDER BY data DESC`, callback);
    },

    selecionarTransferenciasTodas: function (id_empresa, callback) {
        connection.query(`SELECT valor, data, motivo, d.nome as destinatario, r.nome as remetente FROM transferencias INNER JOIN funcionarios AS r ON transferencias.id_remetente = r.id  INNER JOIN funcionarios as d ON transferencias.id_destinatario = d.id WHERE transferencias.id_empresa = '${id_empresa}' ORDER BY data DESC`, callback);
    }
}
