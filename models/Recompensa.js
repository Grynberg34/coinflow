const connection = require('../db/connection');

module.exports={

    salvarRecompensa: function(name, categoria, preço, estoque, user_id, filename, callback) {
        connection.query(`INSERT INTO recompensas (nome, categoria, preço, estoque, id_empresa, nome_arquivo) VALUES ('${name}', '${categoria}', '${preço}', '${estoque}', '${user_id}', '${filename}') `, callback);
    },

    selecionarRecompensas: function(user_id, callback) {
        connection.query(`SELECT * FROM recompensas WHERE id_empresa = '${user_id}'`, callback);
    },

    editarEstoqueRecompensa: function (user_id, rec, value, callback) {
        connection.query(`UPDATE recompensas SET estoque = '${value}' WHERE id_empresa = '${user_id}' and id = '${rec}' `, callback);
    },

    removerRecompensa: function (user_id, del, callback) {
        connection.query(`DELETE FROM recompensas WHERE id_empresa = '${user_id}' and id = '${del}' `, callback);
    },

    selecionarRecompensasDisponiveis: function (empresa_id, callback) {
        connection.query(`SELECT * FROM recompensas where id_empresa = '${empresa_id}' and estoque > 0 ORDER BY nome ASC`, callback);

    },

    checarRecompensa: function (rec_id, empresa_id, callback) {
        connection.query(`SELECT * from recompensas where id_empresa = '${empresa_id}' and estoque > 0 and id = ${rec_id}`, callback);
    },

    registrarResgateRecompensa: function (user_id, empresa_id, recompensa, nome) {
        connection.query(`INSERT INTO resgates (id_empresa, id_funcionario, nome_funcionario, id_recompensa, nome_recompensa, valor_recompensa, data_resgate) VALUES ('${empresa_id}', '${user_id}', '${nome}', '${recompensa[0].id}', '${recompensa[0].nome}', '${recompensa[0].preço}', NOW())`);
    },

    descontarFlowin: function (user_id, recompensa) {
        connection.query(`UPDATE funcionarios SET flowin = flowin - ${recompensa[0].preço}`);
    },

    darBaixaEstoque: function (recompensa) {
        connection.query(`UPDATE recompensas SET estoque = estoque - 1 WHERE id = ${recompensa[0].id}`);
    }
}
