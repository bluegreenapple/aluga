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
	createdAt: { type: Date},
	updatedAt: { type: Date},
	horarioDeEntrada: { type: Date, default: new Date('2015-01-01T12:00:00')},
	horarioDeSaida: { type: Date, default: new Date('2015-01-01T12:00:00')}
});