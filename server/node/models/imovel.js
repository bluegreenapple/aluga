var mongoose = require('mongoose');

module.exports = mongoose.model('Imovel', {
	tipo : {type : String, default: ''},//casa, apto, condomínio
	nome: { type: String, default: ''},//edificio flores
	cep: { type: String, default: ''},
	logradouro: { type: String, default: ''},
	complemento: { type: String, default: ''},// apto. 68
	bairro: { type: String, default: ''},
	localidade: { type: String, default:''},//Sao Paulo
	uf: { type: String, default:''},
	nPessoas: { type: String, default:''},
	nVagas: { type: String, default:''},
	valorFaxina: { type: String, default:''},
	zelador: { type: String, default:''},//Sr. Joao Silva
	

	// horarioDeEntrada: { type: time, default: },
	// horarioDeSaida: { type: time, default: }
});