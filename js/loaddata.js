/*
fichier loaddata.js 
script commun à tous les tableaux (appel de la fonction "load")
permet de charger le texte, les images et le son
*/

var langue;
var number;
var nextURL;
var sentenceAudio;

function load(sentenceArray, imageArray, audio) {

	// récupérer le numéro du tableau
	var url = window.location.pathname;
	number = parseInt(url[url.lastIndexOf('.')-1]);
		
	// afficher le numéro du tableau
	ctx.font = '100pt Arial';
	ctx.fillStyle = 'rgba(255,255,255,1.0)';
	ctx.fillText(number, canvas.width/2, canvas.height/2);
	
	// récupérer la langue demandée
	langue = window.location.search;
	if(langue == '') {
		// par défaut, en anglais
		langue = 'ENG';
	}
	else {
		langue = langue.split('=')[1];	
	}
	
	//loadAudio(audio);

	sentenceAudio = new buzz.sound('../sons/son' + number + '-' + langue + '.ogg');


	
	// charger le fichier xml des phrases
	
	// depuis si28
	
	try {
		xhr = new XMLHttpRequest();
		//xhr.open('GET', 'http://www.utc.fr/si28/opacite/xml/textes_tableau' + number + '_' + langue + '.xml', false);
		xhr.open('GET', '../js/xml/textes_tableau' + number + '_' + langue + '.xml', false);
		xhr.send(null);
		readData(xhr.responseXML, sentenceArray, imageArray, audio);
	}
	catch(err) {
		// en local
		
		if (document.implementation && document.implementation.createDocument) {
			var docXml = document.implementation.createDocument('', '', null);
			docXml.onload = function() {
				readData(docXml, sentenceArray, imageArray, audio);
			}
			docXml.load('../js/xml/textes_tableau' + number + '_' + langue + '.xml');
		}
		
	}
}

function readData(xml, sentenceArray, imageArray, audio) {
	// récupérer les phrases dans le tableau passé en paramètre
	var phrases = xml.getElementsByTagName('phrase');
	
	if(number == 3) {
		// parsing XML spécial pour le tableau3
		readDataForTableau3(sentenceArray, phrases);
	}
	else {
		for(var i=0; i<phrases.length; i++) {
			sentenceArray.push(phrases[i].firstChild.nodeValue);
		}
	}
	
	// charger les images
	loadImages(imageArray, audio);
}

function readDataForTableau3(sentenceArray, phrases) {
	for(var i=0; i<phrases.length; i++) {
		var phrase1 = new Array();
		var phrase2 = new Array();
		
		for(var j=0; j<phrases[i].childNodes.length; j++) {
			if(phrases[i].childNodes[j].tagName == 'changement') {
				var element1 = phrases[i].childNodes[j].firstChild.nodeValue.split(';')[0];
				if(element1 != '') {
					phrase1.push(element1);
				}
				var element2 = phrases[i].childNodes[j].firstChild.nodeValue.split(';')[1];
				if(element2 != '') {
					phrase2.push(element2);
				}					
			}
			else {
				var element = trim(phrases[i].childNodes[j].nodeValue);
				if(element != '') {
					phrase1.push(element);
					phrase2.push(element);
				}
			}
		}
		sentenceArray.push(phrase1);
		sentenceArray.push(phrase2);
	}
}

function trim(string) {
	return string.replace(/^\s+/g,'').replace(/\s+$/g,'')
}
			

function loadImages(imageArray, audio) {
	if(imageArray.length == 0) {
		//loadAudio(audio);
	}
	else {
		var imgCompt = 0;
		for(var i=0; i<imageArray.length; i++) {
			var img = new Image();
			img.onload = function() {
				imgCompt = imgCompt + 1;
				if(imgCompt == imageArray.length) {
					// charger le fichier audio
					//loadAudio(audio);
				}
			};
			img.src = imageArray[i];
			imageArray[i] = img;
		}
	}
}

function loadAudio(audio) {
	audio.id = 'sound';
	var sourceOgg = document.createElement('source');
	sourceOgg.src = '../sons/son' + number + '-' + langue + '.ogg';
	var sourceMP3 = document.createElement('source');
	sourceMP3.src = '../sons/son' + number + '-' + langue + '.mp3';
	audio.appendChild(sourceOgg);
	audio.appendChild(sourceMP3);
	// extension wav à changer en mp3 et ogg (selon les navigateurs)
	//audio.src = 'sons/son' + number + '-' + langue + '.ogg';
	
	// changement du 20/06/2012
	sentenceAudio = new buzz.sound('../sons/son' + number + '-' + langue + '.ogg');
}

function endFunction() {
	if(number == 4) {
		// dernier tableau, retour à l'accueil
		nextURL = '../';
		
		// afficher 'FIN'
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.font = '70pt Arial';
		ctx.globalAlpha = 1.0;
		ctx.fillStyle = 'rgb(255,255,255)';
		if(langue == 'FRA') {
			ctx.fillText('Fin', (canvas.width-ctx.measureText('Fin').width)/2, canvas.height/2);
		}
		if(langue == 'ENG')
		{
			ctx.fillText('The end', (canvas.width-ctx.measureText('The end').width)/2, canvas.height/2);
		}
		var tRedirection = setTimeout('redirection()',2000);
	}
	else {
		var next = number + 1;
		nextURL = '../tableau' + next + '/tableau' + next + '.html?langue=' + langue;
		redirection();
	}
}

function playSentence() {
	//audio.play();
	sentenceAudio.play();
}

function redirection() {
	window.location.assign(nextURL);
}