var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
	text : {type : String, default: ''},
	imovel: { type: String, default: ''},
	locador: { type: String, default: ''},
	locador_nomeAssinatura: { type: String, default: ''},
	locador_conta: { type: String, default: ''},
	valorTotal: { type: String, default:''},
	dataDeEntrada: { type: Date, default: Date.now },
	dataDeSaida: { type: Date, default: Date.now },

	// horarioDeEntrada: { type: time, default: },
	// horarioDeSaida: { type: time, default: }
});