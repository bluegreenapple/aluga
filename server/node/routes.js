var Todo = require('./models/todo');
var word = require('./services/wordServiceServer.js');

function getTodos(res){
	Todo.find(function(err, todos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todos); // return all todos in JSON format
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
			// horarioDeEntrada: req.body.horarioDeEntrada,
			// horarioDeSaida: req.body.horarioDeSaida,
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
};