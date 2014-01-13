<?php

include("Mobile_Detect.php");
$detect = new Mobile_Detect();
$possibleLanguages = array('EN', 'FR', 'IT');
$positions = array();
$lang = isset($_GET['lang'])?$_GET['lang']:null;
if (!in_array($lang, $possibleLanguages)) {
	$languagesString = strtoupper($_SERVER['HTTP_ACCEPT_LANGUAGE']);
	for ($i=0; $i < count($possibleLanguages); $i++) {
	  $positions[$i] = strpos($languagesString, $possibleLanguages[$i]);
	}
	$lang = $possibleLanguages[min($positions)];
}

if (isset($_GET['debug'])) {
  include 'app.php'; die();
}


if ($detect->isMobile()) {
	if ($detect->isiOS()) {
		if ($detect->is('safari')) {
			include 'intro.php';
		} else {
			include 'app.php';
		}
	} else {
			include 'app.php';
	}
} else {
	touch('access.txt');
	$f = file_get_contents('access.txt');
	$f .= "\n";
	$f .= date('l jS \of F Y h:i:s A');
	$f .= "\t";
	$f .= $_SERVER['HTTP_USER_AGENT'];
	file_put_contents('access.txt', $f);
	include 'pc.php';
}