<?php
function __($en, $fr, $it) {
  global $lang;
  if ($lang==='FR') {
    return $fr;
  } else if ($lang==='EN') {
    return $en;
  } else return $it;
}
?>
<html>

<head>
<meta http-equiv="X-UA-Compatible" content="chrome=1">

  <script type="text/javascript"
   src="http://ajax.googleapis.com/ajax/libs/chrome-frame/1/CFInstall.min.js"></script>

<title>Opacité</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">

<style type="text/css">

.desaturate {
	-webkit-transition: 1s ease all;
	-webkit-filter: grayscale(100%);
	-moz-filter: grayscale(100%);
	filter: grayscale(100%);
}

.desaturate:hover {
	-webkit-filter: grayscale(0%);
	-moz-filter: grayscale(0%);
	filter: grayscale(0%);
}



	body
	{
		background-color:black;
	}
	div#indexVerticalAlign
	{
		position: absolute;
		top: 40%;
		left: 30%;
	}
	font
	{
		font-family: helvetica;
	}
	.titleFont
	{
		font-size: 32;
	}
	.subtitleFont
	{
		font-size: 14;
	}
	a
	{
		text-decoration:none;
	}
	h4
	{
		display: inline;
	}
	h4#title
	{
		cursor: pointer;
	}
	ul
	{
		list-style-type: none;
	}
	li
	{
		cursor: pointer;
		display: inline;
	}
	p
	{
		display: inline;
		text-align: left;
	}
	div#soundOn {
		margin-top: 250px;
		text-align:center;
		margin-left:auto;
		margin-right:auto;
		width: 500px;
		display:none;
	}
	#question {
		font-size: 24;
	}
</style>

<script type="text/javascript" src="js/jaysalvat-buzz-05c96cc/buzz.js"></script>
<script type="text/javascript">

	var title;
	var subtitle;
	var option1;
	var option1Text;
	var option2;
	var option2Text;
	var option3;
	var option3Text;
	var option4;
	var option5;
	var selectedOption = '';
	var selectedLanguage;

	var sound;

	function load() {

		sound = new buzz.sound( "./pian_accord1out_reverse_reduit.wav");
		sound.loop();
		sound.play();

		selectedLanguage = 'ENG';
		setTexts('<?= __("English", "Français", "Italiano"); ?>');
		if(document.getElementById('title').addEventListener) {
			document.getElementById('title').addEventListener('click', onTitleClickHandler, false);
			document.getElementById('start').addEventListener('click', onTitleClickHandler, false);
			document.getElementById('presentation').addEventListener('click', onListOptionClickHandler, false);
			document.getElementById('credits').addEventListener('click', onListOptionClickHandler, false);
			document.getElementById('contacts').addEventListener('click', onListOptionClickHandler, false);
			document.getElementById('language1').addEventListener('click', onListOptionClickHandler, false);
			document.getElementById('language2').addEventListener('click', onListOptionClickHandler, false);
		}
		else if(document.getElementById('title').attachEvent){
			document.getElementById('title').attachEvent('onclick', onTitleClickHandler);
			document.getElementById('start').attachEvent('onclick', onTitleClickHandler);
			document.getElementById('presentation').attachEvent('onclick', onListOptionClickHandler);
			document.getElementById('credits').attachEvent('onclick', onListOptionClickHandler);
			document.getElementById('contacts').attachEvent('onclick', onListOptionClickHandler);
			document.getElementById('language1').attachEvent('onclick', onListOptionClickHandler);
			document.getElementById('language2').attachEvent('onclick', onListOptionClickHandler);
		}
	}

	function setTexts(lang) {
		switch(lang) {
			case 'Français':
				title = 'Opacité';
				subtitle = 'Un récit interactif en 4 tableaux';
				start = 'Commencer';
				option1 = 'Présentation ';
				option1Text = 'Opacité est un court récit interactif en quatre tableaux.<br/>';
				option1Text += 'Nous vivons dans une époque du fantasme de la transparence - notamment politique et économique,</br>';
				option1Text += 'de l\'éclairage maximal, voire de la mise à nu. Mais dans le domaine psychologique et sentimental,</br>';
				option1Text += 'cela a-t-il un sens de vouloir être transparent à soi-même et aux autres ?</br>';
				option1Text += 'Ce récit interactif fait l\'éloge d\'une forme d\'opacité, entendue comme un entre-deux.</br>';
				option1Text += 'Cette histoire est celle d\'un trajet : depuis un rêve de transparence vers un désir d\'opacité.';
				option2 = 'Crédits ';
				option2Text = 'Auteurs : Serge Bouchardon, Léonard Dumas, Vincent Volckaert, Hervé Zénouda (design sonore),</br>';
				option2Text += 'Giovanna di Rosario (version en italien), Valerie Bouchardon (version en anglais).';
				option3 = 'Contacts ';
				option3Text = 'serge.bouchardon@utc.fr</br>';
				option3Text += 'leonard.dumas@gmail.com';
				option4 = 'English';
				option5 = 'Italiano';
				break;

			case 'English':
				title = 'Opacity';
				subtitle = 'A 4-part interactive story';
				start = 'Start';
				option1 = 'Presentation ';
				option1Text = 'Opacity is a 4-part short interactive story.<br/>';
				option1Text += 'We live in an age of obsession with transparency especially in politics and business.</br>';
				option1Text += 'But in our personal relationships, what is the point of being transparent to oneself and to others ?</br>';
				option1Text += 'The following interactive narrative commends a kind of opacity which is meant as an in-between.</br>';
				option1Text += 'It is the story of a journey from a dream of transparency to a desire for opacity.';
				option2 = 'Credits ';
				option2Text = 'Authors: Serge Bouchardon, Leonard Dumas, Vincent Volckaert, Herve Zenouda (sound design),</br>';
				option2Text += 'Giovanna di Rosario (Italian version), Valerie Bouchardon (English version).';
				option3 = 'Contacts ';
				option3Text = 'serge.bouchardon@utc.fr</br>';
				option3Text += 'leonard.dumas@gmail.com';
				option4 = 'Français';
				option5 = 'Italiano';
				break;

			case 'Italiano':
				title = 'Opacità';
				subtitle = 'Un breve racconto interattivo in quattro parti';
				start = 'Iniziare';
				option1 = 'Presentation ';
				option1Text = 'Opacità è un breve racconto interattivo in quattro parti.<br/>';
				option1Text += 'Viviamo in un\'epoca ossessionata dalla trasparenza - specialmente politica ed economica - dalla massima chiarezza,</br>';
				option1Text += 'dalla messa a nudo.</br>';
				option1Text += 'Ma in ambito psicologico e sentimentale ha senso voler essere a tutti i costi trasparenti, sia con sé stessi che con gli altri?</br>';
				option1Text += 'Questo racconto interattivo fa l\'elogio di una forma d\'opacità intesa come via di mezzo.</br>';
				option1Text += 'Questa storia è un percorso: da un sogno di trasparenza verso un desiderio di opacità.';
				option2 = 'Credits ';
				option2Text = 'Autori: Serge Bouchardon, Leonard Dumas, Vincent Volckaert, Herve Zenouda (sound design),</br>';
				option2Text += 'Giovanna di Rosario (traduzione italiana), Valerie Bouchardon (traduzione inglese).';
				option3 = 'Contacts ';
				option3Text = 'serge.bouchardon@utc.fr</br>';
				option3Text += 'leonard.dumas@gmail.com';
				option4 = 'English';
				option5 = 'Français';
				break;

			default:
				break;
		}
		document.getElementById('title').childNodes[0].innerHTML = title;
		document.getElementById('subtitle').childNodes[0].innerHTML = subtitle;
		document.getElementById('start').childNodes[0].childNodes[0].innerHTML = start;
		document.getElementById('presentation').childNodes[0].childNodes[0].innerHTML = option1;
		document.getElementById('credits').childNodes[0].childNodes[0].innerHTML = option2;
		document.getElementById('contacts').childNodes[0].childNodes[0].innerHTML = option3;
		document.getElementById('language1').childNodes[0].childNodes[0].innerHTML = option4;
		document.getElementById('language2').childNodes[0].childNodes[0].innerHTML = option5;

		var chosenOptionText = document.getElementById('chosenOptionText');
		if(chosenOptionText != null && selectedOption != '') {
				var text;
				switch(selectedOption) {
					case 'presentation':
						text = option1Text;
						break;

					case 'credits':
						text = option2Text;
						break;

					case 'contacts':
						text = option3Text;
						break;

					default:
						break;
				}

				chosenOptionText.childNodes[0].childNodes[0].innerHTML = text;
		}
	}

	function onListOptionClickHandler(event) {
		var targetID;
		if(event.srcElement) {
			target = event.srcElement.parentNode.parentNode;
		}
		else {
			target = event.currentTarget;
		}
		if(target.id == 'language1' || target.id == 'language2') {
			var lang = target.childNodes[0].childNodes[0].innerHTML;
			if(lang == 'English') {
				selectedLanguage = 'ENG';
			}
			else if(lang == 'Français'){
				selectedLanguage = 'FRA';
			}
			else if(lang == 'Italiano'){
				selectedLanguage = 'ITA';
			}
			else {
				selectedLanguage = 'ENG';
			}
			setTexts(lang);
		}
		else {
			setChosenListOption(target.id);
		}
	}

	function setChosenListOption(option) {
		selectedOption = option;
		var chosenOptionText = document.getElementById('chosenOptionText');
		if(chosenOptionText != null) {
				document.getElementById('indexVerticalAlign').removeChild(chosenOptionText);
		}
		var options = document.getElementsByTagName('li');
		for(var i=0; i<options.length; i++) {
			options[i].childNodes[0].style.textDecoration = 'none';
		}
		document.getElementById(option).childNodes[0].style.textDecoration = 'underline';
		var ul = document.createElement('ul');
		ul.id = 'chosenOptionText';
		var p = document.createElement('p');
		var font = document.createElement('font');
		font.id = 'subtitleFont';
		font.style.color = 'white';
		var text = '';
		switch(option) {
			case 'presentation':
				text = option1Text;
				break;

			case 'credits':
				text = option2Text;
				break;

			case 'contacts':
				text = option3Text;
				break;

			default:
				break;
		}
		font.innerHTML = text;
		document.getElementById('indexVerticalAlign').appendChild(ul);
		ul.appendChild(p);
		p.appendChild(font);
	}


	function onTitleClickHandler(event) {
		sound.fadeTo(0, 2000);
		setTimeout(goOnTableau1, 3000);
		document.getElementById("indexVerticalAlign").style.display = 'none';
		var question = "Runs with Firefox and Chrome<br><br><br>Is your computer's sound on?";
		if(selectedLanguage == "FRA") {
			question = 'Fonctionne avec Firefox et Chrome<br><br><br>Avez-vous pensé à allumer vos enceintes ?';
					}
		if(selectedLanguage == "ITA") {
			question = 'con Firefox e Chrome<br><br><br>Assicurati di aver acceso gli autoparlanti';
		}
		document.getElementById("question").childNodes[0].innerHTML =	question;
		document.getElementById("soundOn").style.display = 'block';
	}

	function goOnTableau1() {
		window.location.assign('tableau1/tableau1.html?langue=' + selectedLanguage);
	}

</script>

</head>

<body onload="load();">
<div id="soundOn">
<h4 id="question"><font color="white"></font></h4>
</div>
<div id="indexVerticalAlign">

	<ul id="maincontent">
		<h4 id="title"><font class="titleFont" color="white"></font></h4>
	</ul>
	<ul>
		<h4 id="subtitle"><font class="subtitleFont" color="white"></font></h4>
	</ul>
	<ul>
		<li id="start"><h4><font class="subtitleFont" color="white"></font></h4></li>
		<li><h4><font class="subtitleFont" color="white"> | </font></h4></li>
		<li id="presentation"><h4><font class="subtitleFont" color="white"></font></h4></li>
		<li><h4><font class="subtitleFont" color="white"> | </font></h4></li>
		<li id="credits"><h4><font class="subtitleFont" color="white"></font></h4></li>
		<li><h4><font class="subtitleFont" color="white"> | </font></h4></li>
		<li id="contacts"><h4><font class="subtitleFont" color="white"></font></h4></li>
		<!--
		<li><h4><font class="subtitleFont" color="white"> | </font></h4></li>
		<li id="language"><h4><font class="subtitleFont" color="white"></font></h4></li>
		-->
		<li><h4><font class="subtitleFont" color="white"> | </font></h4></li>
		<li id="language1"><h4><font class="subtitleFont" color="white"></font></h4></li>
		<li><h4><font class="subtitleFont" color="white"> | </font></h4></li>
		<li id="language2"><h4><font class="subtitleFont" color="white"></font></h4></li>
	</ul>

</div>

<div>
	<a href="http://www.newmediawritingprize.co.uk/blog/?page_id=222" class="desaturate">
<img src="newMediaWritingPrize.png" >
</a>
</div>

  <script>
   // You may want to place these lines inside an onload handler
   CFInstall.check({
     mode: "overlay"
   });
  </script>
</body>
</html>