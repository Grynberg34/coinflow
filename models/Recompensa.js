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
    }
}
