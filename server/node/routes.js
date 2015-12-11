var Todo = require('./models/todo');
var Imovel = require('./models/imovel');
var word = require('./services/wordServiceServer.js');
var cep = require('cep-brazil');

function getTodos(res){
	Todo.find(function(err, todos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todos); // return all todos in JSON format
		});
};

function getImoveis(res){
	Imovel.find(function(err, imoveis) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)
			console.log('a: ',imoveis);
			res.json(imoveis); // return all imoveis in JSON format
		});
};

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	app.get('/api/download/:aluguel_id', function(req, res) {

		// use mongoose to get one specific todo in the database
		Todo.findOne({_id : req.params.aluguel_id}, function(err, todo) {
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			console.log('download on server!');
			word.generateDocx('./ev.docx',todo);
			var file = 'output.docx';
			// res.download(file,todo.text); // Set disposition and send it.			
		  	res.download(file,todo.text+'.docx'); // Set disposition and send it.			
		});
	});

	// get all todos
	app.get('/api/todos', function(req, res) {

		// use mongoose to get all todos in the database
		getTodos(res);
	});

	// get an specific todo
	app.get('/api/todos/:todo_id', function(req, res) {

		// use mongoose to get one specific todo in the database
		Todo.findOne({_id : req.params.todo_id}, function(err, todo) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todo); // return the todo in JSON format
		});
	});

	// get all todos from a specific creator
	app.get('/api/todos/creatorid/:creator_id', function(req, res) {

		// use mongoose to get one specific todo in the database
		Todo.find({createdBy : req.params.creator_id}, function(err, todo) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todo); // return the todo in JSON format
		});
	});


	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			text : req.body.text,
			imovel: req.body.imovel,
			locador: req.body.locador,
			locador_conta: req.body.locador_conta,
			locador_nomeAssinatura: req.body.locador_nomeAssinatura,
			dataDeEntrada: req.body.dataDeEntrada,
			dataDeSaida: req.body.dataDeSaida,
			valorTotal: req.body.valorTotal,
			createdAt: new Date(),
			createdBy: req.body.createdBy,
			horarioDeEntrada: req.body.horarioDeEntrada,
			horarioDeSaida: req.body.horarioDeSaida,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			getTodos(res);
		});

	});

	//update a todo
	app.put('/api/todos/', function(req, res) {

		// use our todo model to find the todo we want
        Todo.findById(req.body._id, function(err, todo) {
        	
            if (err)
                res.send(err);

            todo.text = req.body.text;
			todo.imovel= req.body.imovel;
			todo.locador= req.body.locador;
			todo.locador_conta= req.body.locador_conta;
			todo.locador_nomeAssinatura= req.body.locador_nomeAssinatura;
			todo.dataDeEntrada= req.body.dataDeEntrada;
			todo.dataDeSaida= req.body.dataDeSaida;
			todo.valorTotal= req.body.valorTotal;
			todo.updatedAt= new Date();
			todo.createdBy= req.body.createdBy;
			todo.horarioDeEntrada = req.body.horarioDeEntrada;
			todo.horarioDeSaida = req.body.horarioDeSaida;
			
            // save the todo
            todo.save(function(err) {
                if (err)
                    res.send(err);

                getTodos(res);
            });

        });

	});

	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			getTodos(res);
		});
	});

	// // application -------------------------------------------------------------
	// app.get('*', function(req, res) {
	// 	res.sendFile('../../client/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	// });

	//IMOVEIS api ---------------------------------------------------------------------
	// get cep (necessario proxy para obter cep por causa de CORS nas apis)
	app.get('/api/imoveis/cep/:cep', function(req, res) {

		cep.get(req.params.cep)
		  .then(function (data) {

		  	//logica para remover ' - até 499/500' que aparece em alguns jsons dos correios
		  	var logradouro = data.street;
		  	var iLog = logradouro.indexOf(" - até ");
		  	if (iLog > -1) 
		  	{
		  		logradouro = logradouro.substring(0,iLog);
		  		// console.log(logradouro);
		  	}
		  	var iLog2 = logradouro.indexOf(" - de ");
		  	if (iLog2 > -1) 
		  	{
		  		logradouro = logradouro.substring(0,iLog2);
		  		// console.log(logradouro);
		  	}

		    var data2 = 
		    {
		    	'logradouro': logradouro,
		    	'bairro': data.district,
		    	'cidade': data.city,
		    	'uf': data.state,
		    	'cep': data.zipCode,
		    };
		    
		    res.json(data2);
		     
		  }).fail(function(err) {
		      res.json(err);
		  });
	});

	// get all imoveis
	app.get('/api/imoveis', function(req, res) {

		// use mongoose to get all imoveis in the database
		getImoveis(res);
	});

	// get an specific imovel
	app.get('/api/imoveis/:imovel_id', function(req, res) {

		// use mongoose to get one specific imovel in the database
		Imovel.findOne({_id : req.params.imovel_id}, function(err, imovel) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(imovel); // return the imovel in JSON format
		});
	});

	// get all todos from a specific creator
	app.get('/api/imoveis/creatorid/:creator_id', function(req, res) {

		// use mongoose to get one specific todo in the database
		Imovel.find({createdBy : req.params.creator_id}, function(err, imovel) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(imovel); // return the todo in JSON format
		});
	});

	// create imovel and send back all imoveis after creation
	app.post('/api/imoveis', function(req, res) {

		// create a imovel, information comes from AJAX request from Angular
		Imovel.create({
		    tipo : req.body.tipo,
		    nome : req.body.nome,
			cep: req.body.cep,
			logradouro: req.body.logradouro,
			numero: req.body.numero,
			complemento: req.body.complemento,
			bairro: req.body.bairro,
			localidade: req.body.localidade,
			nPessoas: req.body.nPessoas,
			nVagas: req.body.nVagas,
			valorFaxina: req.body.valorFaxina,
			zelador: req.body.zelador,
			createdAt: new Date(),
			createdBy: req.body.createdBy,
			horarioDeEntradaPadrao: req.body.horarioDeEntradaPadrao,
			horarioDeSaidaPadrao: req.body.horarioDeSaidaPadrao,
			
			done : false
		}, function(err, imovel) {
			if (err)
				res.send(err);

			// get and return all the imoveis after you create another
			getImoveis(res);
		});

	});

	//update a imovel
	app.put('/api/imoveis/', function(req, res) {

		// use our imovel model to find the imovel we want
        Imovel.findById(req.body._id, function(err, imovel) {
        	
            if (err)
                res.send(err);

            imovel.tipo = req.body.tipo;
		    imovel.nome = req.body.nome;
			imovel.cep= req.body.cep;
			imovel.logradouro= req.body.logradouro;
			imovel.numero= req.body.numero;
			imovel.complemento= req.body.complemento;
			imovel.bairro= req.body.bairro;
			imovel.localidade= req.body.localidade;
			imovel.nPessoas= req.body.nPessoas;
			imovel.nVagas= req.body.nVagas;
			imovel.valorFaxina= req.body.valorFaxina;
			imovel.zelador= req.body.zelador;
			imovel.updatedAt= new Date();
			imovel.createdBy= req.body.createdBy;
			imovel.horarioDeEntradaPadrao= req.body.horarioDeEntradaPadrao;
			imovel.horarioDeSaidaPadrao= req.body.horarioDeSaidaPadrao;

            // save the imovel
            imovel.save(function(err) {
                if (err)
                    res.send(err);

                getImoveis(res);
            });

        });

	});

	// delete a imovel
	app.delete('/api/imoveis/:imovel_id', function(req, res) {
		Imovel.remove({
			_id : req.params.imovel_id
		}, function(err, imovel) {
			if (err)
				res.send(err);

			getImoveis(res);
		});
	});
};