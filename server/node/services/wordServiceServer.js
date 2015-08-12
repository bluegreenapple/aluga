var fs = require('fs');
var Docxtemplater = require('docxtemplater');
var moment = require('moment');
var momentTimezone = require('moment-timezone');
var extenso = require('./extenso.js');
var addZero = require('./addZero.js')
var money = require('money-math');



module.exports =  {

	

	generateDocx: function(inputFilePath, data) {
	    //Load the docx file as a binary
		content = fs.readFileSync(inputFilePath,"binary")
		doc = new Docxtemplater(content);

		//set the templateVariables
		var localeStr = 'pt-br'
		moment.locale(localeStr);

		var hoje = moment();

		var dataDeEntrada = moment(data.dataDeEntrada);
		var dataDeSaida = moment(data.dataDeSaida);
		var diff = dataDeSaida.diff(dataDeEntrada, 'days');
		var valorTotal = data.valorTotal.addZero();

		var aImovel = data.imovel;
		var valorFaxina = '100.00'.addZero();//data.valorFaxina;
		var nVagas = '2';
		if (aImovel == 'Casagrande') {
			valorFaxina = '230.00'.addZero();
			nVagas = '3';
		}
		

		
		var valorTotalMenosFaxina = money.subtract(valorTotal, valorFaxina);

		console.log(money.div(valorTotal, '2'.addZero())); 

		//calculo do numero de parcelas
		
		//parcela dupla por default
		var nParcelas = '2';

		//parcela única
		var dt = dataDeEntrada.diff(moment(), 'days');
		if (dt<=7) {
			nParcelas = '1';
		}
		

		//calculo das parcelas
		var valorParcela = money.div(valorTotal, nParcelas.addZero());
		var valorPrimeiraParcela = money.subtract( valorTotal, money.mul( money.subtract(nParcelas.addZero(),'1.00'), valorParcela));
		
		var parcelas = [];
		var v = valorParcela;
		

		for(i=0;i< +nParcelas; i++){
			var t = moment(dataDeEntrada).subtract(7, 'days');;//clone dataDeEntrada and subtract 7 days

			if (i==0) {
				v = valorPrimeiraParcela;
				t = moment();
			}
			t_extenso = t.format('LL');
			v_currency = 'R$ '+ money.format("EUR", v);
			v_extenso = v.replace(".", ",").extenso(true).toUpperCase();
			parcelas.push({nParcela:(i+1).toString(),valorParcela_currency:v_currency, valorParcela_extenso:v_extenso, dataParcela_extenso:t_extenso});
		}


		var dataWord = {
			//obrigatorio
		    "dataDeEntrada": moment.tz(dataDeEntrada, "Europe/London").format("DD/MM/YYYY"),
		    "dataDeEntrada_extenso": moment.tz(dataDeEntrada, "Europe/London").format("LL"),
		    "dataDeSaida": moment.tz(dataDeSaida, "Europe/London").format("DD/MM/YYYY"),
		    "dataDeSaida_extenso": moment.tz(dataDeSaida, "Europe/London").format("LL"),
		    "nDiarias": diff,
		    "nDiarias_extenso": diff.toString().extenso(false,true).toUpperCase(),
		    "dataDoContrato": moment().format("LL"),
		    "cidadeDoContrato":"São Paulo",
		    // "valorTotal_currency":"R$ 10.000,00",
		    // "valorTotal_extenso":"DEZ MIL REAIS",
		    "valorTotalMenosFaxina_currency": 'R$ '+ money.format("EUR", valorTotalMenosFaxina),
		    "valorTotalMenosFaxina_extenso": money.format("EUR", valorTotalMenosFaxina).extenso(true).toUpperCase(),
	   		"parcelas": parcelas,
        // [
        //  {nParcela:"1",valorParcela_currency:"R$ 110,00", valorParcela_extenso:"CEM REAIS", dataParcela_extenso:"02 de fevereiro de 2015"},
        //  {nParcela:"2",valorParcela_currency:"R$ 110,00", valorParcela_extenso:"CEM REAIS", dataParcela_extenso:"02 de fevereiro de 2015"}
        // ],

		    //opcional
		    "valorDoCaucao_currency":"R$ 5000,00",
		    "valorDoCaucao_extenso":"CINCO MIL REAIS".toUpperCase(),
		    "valorDaFaxina_currency": 'R$ '+ money.format("EUR", valorFaxina),
		    "valorDaFaxina_extenso": money.format("EUR", valorFaxina).extenso(true).toUpperCase(),
		    "nParcelas":nParcelas,
		    "nParcelas_extenso":nParcelas.extenso(false,true).toUpperCase(),
		    "nPessoas":"8",
		    "nPessoas_extenso":"OITO",
		    "horarioDeEntrada":"12:00",
		    "horarioDeSaida":"12:00",
		    
		    //hospede
		    "hospede_bancoCaucao":"____________________",//"BANCO ITAÚ S./A.",
		    "hospede_agenciaCaucao":"____________________",//"12887-3",
		    "hospede_contaTipoCaucao":"____________________",//"Corrente",
		    "hospede_contaCaucao":"____________________",//"3648-3",
		    "hospede_nChequeCaucao":"____________________",//"976.397.823.876",
		    "hospede_nome":"____________________________________",//"João Silva",
		    "hospede_cpf":"____________________",//"654.618.528-12",
		    "hospede_rg":"____________________",//"45.868.958.15",
		    "hospede_estadoCivil":"casado(a)",
		    "hospede_nacionalidade":"brasileiro(a)",
		    "hospede_cep":"____________________",//"05060-008",
		    "hospede_endereco":"________________________________________",//"Avenida Sabiá, 237, apto 51",
		    "hospede_bairro":"_______________________",//"Jardim Luisa",
		    "hospede_cidade":"____________________________",//"Belo Horizonte",
		    "hospede_estado":"_____",//"MG",

		    //locador
		   	"locador_nome":"INSTITUTO TAI YANG DE ASSISTÊNCIA À SAÚDE S.A.".toUpperCase(),
		   	"locador_cpfTipo":"CNPJ",
		    "locador_cpf":"05.599.778/0001-82",
		    "locador_rg":"Hippáloo",
		    "locador_cep":"04520-001",
		    "locador_endereco":"Rua Juriti, 579",
		    "locador_bairro":"Moema",
		    "locador_cidade":"São Paulo",
		    "locador_estado":"SP",
		    "locador_nomeAssinatura":"TJIOE KOK KION".toUpperCase(),


		    //conta de deposito
		    
		    "favorecido_nome":"INSTITUTO TAI YANG DE ASSISTÊNCIA À SAÚDE S.A.".toUpperCase(), 
			"favorecido_banco":"BANCO DO BRASIL S.A.".toUpperCase(),
			"favorecido_agencia":"1537-7",
			"favorecido_contaTipo":"Corrente",		   
			"favorecido_conta":"20006-9",
			"favorecido_cpfTipo":"CNPJ",
			"favorecido_cpf":"05.599.778/0001-82",

		    //imovel
		    
		    "imovel_nome":"ED. EVIDENCE - APTO. 64".toUpperCase(),
		    "imovel_apartamento":"64",
		    "imovel_endereco":"Passeio do Maracaí, 145 * Módulo 8 - Fortes",
		    "imovel_bairro":"Riviera de São Lourenço".toUpperCase(),
		    "imovel_cidade":"Bertioga".toUpperCase(),
		    "imovel_estado":"SP",
		    "imovel_nVagas":nVagas,
		    "imovel_nVagas_extenso":nVagas.extenso(false,true),
		    "imovel_zelador":"Sr. LEONARDO PEREIRA LIMA (ZELADOR)",
		}

		
		if (aImovel == "Acqua") 
		{
			dataWord.imovel_nome="CONDOMÍNIO ACQUA - APTO. BONAIRE 23".toUpperCase();
		    dataWord.imovel_apartamento="23";
		    dataWord.imovel_endereco="Alameda Nina, 171 * Módulo 3";
		    dataWord.nPessoas="10";
		    dataWord.nPessoas_extenso="DEZ";
		    dataWord.imovel_zelador= "ADMINISTRAÇÃO CONDOMÍNIO ACQUA";
		}
		else if(aImovel == "Ev64")
		{
			dataWord.imovel_nome="ED. EVIDENCE - APTO. 64".toUpperCase();
		    dataWord.imovel_apartamento="64";
		}
		else if(aImovel == "Ev75")
		{
			dataWord.imovel_nome="ED. EVIDENCE - APTO. 75".toUpperCase();
		    dataWord.imovel_apartamento="75";
		}
		else if (aImovel == "Casagrande") 
		{
			dataWord.imovel_nome="ED. CASAGRANDE - APTO. 73".toUpperCase();
		    dataWord.imovel_apartamento="73";
		    dataWord.imovel_endereco="Alameda Juruá, 214 * Módulo 8";
		    dataWord.nPessoas="10";
		    dataWord.nPessoas_extenso="DEZ";
		    dataWord.imovel_zelador= "Sr. JOSÉ SOUZA DOS SANTOS (ZELADOR)";
		}
		// else if (aImovel == "Rio Verde") 
		// {
		// 	dataWord.imovel_nome="CONDOMÍNIO ACQUA - APTO. BONAIRE 23".toUpperCase();
		//     dataWord.imovel_apartamento="23";
		//     dataWord.imovel_endereco="Alameda Nina; 171 * Módulo 3";
		//     dataWord.nPessoas="8";
		//     dataWord.nPessoas_extenso="OITO";
		// }
		// else if (aImovel == "Porto Belo") 
		// {
		// 	dataWord.imovel_nome="CONDOMÍNIO ACQUA - APTO. BONAIRE 23".toUpperCase();
		//     dataWord.imovel_apartamento="23";
		//     dataWord.imovel_endereco="Alameda Nina, 171 * Módulo 3";
		//     dataWord.nPessoas="8";
		//     dataWord.nPessoas_extenso="OITO";
		// }
		// else if (aImovel == "LagunaVicente") 
		// {
		// 	dataWord.imovel_nome="CONDOMÍNIO ACQUA - APTO. BONAIRE 23".toUpperCase();
		//     dataWord.imovel_apartamento="23";
		//     dataWord.imovel_endereco="Alameda Nina, 171 * Módulo 3";
		//     dataWord.nPessoas="8";
		//     dataWord.nPessoas_extenso="OITO";
		// }
		// else if (aImovel == "CapMartin") 
		// {
		// 	dataWord.imovel_nome = "CONDOMÍNIO ACQUA - APTO. BONAIRE 23".toUpperCase();
		//     dataWord.imovel_apartamento="23";
		//     dataWord.imovel_endereco="Alameda Nina, 171 * Módulo 3";
		//     dataWord.nPessoas="8";
		//     dataWord.nPessoas_extenso="OITO";
		// }

		var conta = data.locador_conta;
		if (conta == "Rony_Bradesco") 
		{
			dataWord.favorecido_nome="Rony Tjioe Chung".toUpperCase(); 
			dataWord.favorecido_banco="BANCO BRADESCO S.A.".toUpperCase();
			dataWord.favorecido_agencia="2870";
			dataWord.favorecido_contaTipo="Poupança";		   
			dataWord.favorecido_conta="10734-4";
			dataWord.favorecido_cpfTipo="CPF";
			dataWord.favorecido_cpf="364.509.678-70";
		}
		else if(conta == "TaiYang_BB")
		{
			
		}
		else if(conta == "Tjin_Santander")
		{
			dataWord.favorecido_nome="Pwa Tjioe Kok Tjin".toUpperCase(); 
			dataWord.favorecido_banco="BANCO SANTANDER S.A.".toUpperCase();
			dataWord.favorecido_agencia="3207";
			dataWord.favorecido_contaTipo="Corrente";		   
			dataWord.favorecido_conta="1000003-6";
			dataWord.favorecido_cpfTipo="CPF";
			dataWord.favorecido_cpf="022.679.098-39";
		}

		var locador = data.locador;
		if (locador == "TaiYang") 
		{
			dataWord.locador_nome = "INSTITUTO TAI YANG DE ASSISTÊNCIA À SAÚDE S.A.".toUpperCase() ;
		   	dataWord.locador_cpfTipo = "CNPJ";
		    dataWord.locador_cpf = "05.599.778/0001-82";
		    dataWord.locador_rg = "Hippáloo";
		    dataWord.locador_cep = "04520-001";
		    dataWord.locador_endereco = "Rua Juriti, 579";
		    dataWord.locador_bairro = "Moema";
		    dataWord.locador_cidade = "São Paulo";
		    dataWord.locador_estado = "SP";
		}
		else if(locador == "Tjin")
		{
			dataWord.locador_nome = "PWA TJIOE KOK TJIN".toUpperCase();
		   	dataWord.locador_cpfTipo = "CPF";
		    dataWord.locador_cpf = "022.679.098-39";
		    dataWord.locador_rg = "725423 - SSP/SP";
		    dataWord.locador_estadoCivil = "casado(a)",
		    dataWord.locador_nacionalidade = "brasileiro(a)",
		    dataWord.locador_profissão = "_______________",
		    dataWord.locador_cep = "87902-30";
		    dataWord.locador_endereco = "Av. Hélio Borenstein, nº 388";
		    dataWord.locador_bairro = "Vila Oliveira";
		    dataWord.locador_cidade = "Mogi das Cruzes";
		    dataWord.locador_estado = "SP";
		}

		var isCNPJ = false;
		if (dataWord.locador_cpfTipo == 'CNPJ') {isCNPJ = true};
		dataWord.isCNPJ = isCNPJ;
		dataWord.isCPF = !isCNPJ;

		var assinatura = data.locador_nomeAssinatura;
		if (assinatura == "Rony") 
		{
			dataWord.locador_nomeAssinatura = "Rony Tjioe Chung".toUpperCase(); 
		}
		else if(assinatura == "Tjin")
		{
			dataWord.locador_nomeAssinatura = "Pwa Tjioe Kok Tjin".toUpperCase(); 	
		}
		else if(assinatura == "Kion")
		{
			dataWord.locador_nomeAssinatura = "Tjioe Kok Kion".toUpperCase(); 
		}

		//fazer lista de pessoas
		var pessoas = [];
		for(i=0;i< +dataWord.nPessoas; i++){	
			pessoas.push({nome : '__________________________________',rg : '______________________'});
		}
		dataWord.pessoas = pessoas;

		//fazer lista de veículos
		var veiculos = [];
		for(i=0;i< +dataWord.imovel_nVagas; i++){	
			veiculos.push({nVeiculo : (i+1).toString(),veiculo : '___________________________________',placa : '________________'});
		}
		dataWord.veiculos = veiculos;

		doc.setData(dataWord);

		//apply them (replace all occurences of {first_name} by Hipp, ...)
		doc.render();
		var buf = doc.getZip().generate({type:"nodebuffer"});
		fs.writeFileSync("output.docx",buf);

		

  	}

};

