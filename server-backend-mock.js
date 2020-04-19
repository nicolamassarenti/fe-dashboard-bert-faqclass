var express = require('express');
var router = express.Router();
var app = express();

var port = 8081;

let faqPreview1 = {
	id: "00001",
	mainQuestion: "Come cambio password?",
	trained: true
};
let faqDetail1 = {
	id: "00001",
	mainQuestion: "Come cambio password?",
	trained: true,
	examples: {
		'it': ['Come cambio la password?', "Voglio cambiare la password", "Ciao, vorrei cambiare la password. Come posso fare?"],
		'en': ['How do I change the password?', "I want to change the password", "Hi, I would like to change the password. How can I do it?"],
		'fr': ['Comment changer le mot de passe?', "Je veux changer le mot de passe", "Salut, je voudrais changer le mot de passe. Comment faire?"],
		'de': ["Wie ändere ich das Passwort?", "Ich möchte das Passwort ändern", "Hallo, ich möchte das Passwort ändern. Wie kann ich das tun?"],
		'nl': ['Hoe wijzig ik het wachtwoord?', 'Ik wil het wachtwoord wijzigen', 'Hallo, ik wil het wachtwoord wijzigen. Hoe kan ik dit doen?']
	}

};
let faqPreview2 = {
	id: "00002",
	mainQuestion: "Come imposto la lingua della pagina?",
	trained: true
};
let faqDetail2 = {
	id: "00002",
	mainQuestion: "Come imposto la lingua della pagina?",
	trained: true,
	examples: {
		'it': ["Come imposto la lingua della pagina?", "voglio cambiare la lingua della pagina"],
		'en': ["How do I set the page language?", "I want to change the page language"],
		'fr': ["Comment définir la langue de la page?", "Je souhaite modifier la langue de la page"],
		'de': ["Wie stelle ich die Seitensprache ein?", "Ich möchte die Seitensprache ändern"],
		'nl': ["Hoe stel ik de paginataal in?", "Ik wil de paginataal wijzigen"]
	}
};
let faqPreview3 = {
	id: "00003",
	mainQuestion: "Qual è il numero verde?",
	trained: false
}
let faqDetail3 = {
	id: "00003",
	mainQuestion: "Qual è il numero verde?",
	trained: false,
	examples: {
		'it': ["Qual è il numero verde"],
		'en': ["What is the toll free number"],
		'fr': ["Quel est le numéro sans frais"],
		'de': ["Was ist die gebührenfreie Nummer?"],
		'nl': ['Wat is het gratis nummer']
	}
}

let faqPreviews = {
	kb: [faqPreview1, faqPreview2, faqPreview3]
};

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now())
	next()
});


router.get('/api/lang', function (req, res) {
	console.log("GET request to /api/lang?lang=" + req.query.lang);
	switch(req.query.lang){
		case 'it':
			res.send({"displayLang":"Italian"});
			break;
		case 'en':
			res.send({"displayLang":"English"});
			break;
		case 'fr':
			res.send({"displayLang":"French"});
			break;
		case 'de':
			res.send({"displayLang":"German"});
			break;
		case 'nl':
			res.send({"displayLang":"Dutch"});
			break;
	}
});

router.get('/api/faq', function (req, res) {
	if (req.query.id != undefined) {
		let id = req.query.id;
		console.log("GET request to /api/faq?id=" + req.query.id);
		switch (id) {
			case "00001":
				res.send(faqDetail1);
				break;
			case "00002":
				res.send(faqDetail2);
				break;
			case "00003":
				res.send(faqDetail3);
				break;
		}
	} else {
		console.log("GET request to /api/faq");
		res.send(faqPreviews);
	}
});

router.put('/api/faq', function (req, res) {
	console.log("PUT request to /api/faq - id: ");
	console.log(req.body)

	res.sendStatus(200);
});


router.put('/api/faq/example', function (req, res) {
	console.log("PUT request to /api/faq/example - id: " + req.query.id);

	res.sendStatus(200);
});

router.delete('/api/faq', function (req, res) {
	console.log("DELETE request to /api/faq - id: " + req.query.id);

	res.sendStatus(200);
});

router.delete('/api/faq/example', function (req, res) {
	console.log("DELETE request to /api/faq/example - id: " + req.query.id);

	res.sendStatus(200);
});

app.use("/", router);
app.listen(port);
console.log("App running on port: " + port);