var mongoose = require('mongoose');

module.exports = mongoose.model('Imovel', {
	tipo : {type : String, default: ''},//casa, apto, condomínio
	cep: { type: String, default: ''},
	logradouro: { type: String, default: ''},
	complemento: { type: String, default: ''},
	bairro: { type: String, default: ''},
	localidade: { type: String, default:''},
	uf: { type: String, default:''},
	nPessoas: { type: String, default:''},
	nVagas: { type: String, default:''},
	valorFaxina: { type: String, default:''},
	zelador: { type: String, default:''},
	

	// horarioDeEntrada: { type: time, default: },
	// horarioDeSaida: { type: time, default: }
});