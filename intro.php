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
<!doctype html>
<!-- Conditional comment for mobile ie7 blogs.msdn.com/b/iemobile/ -->
<!--[if IEMobile 7 ]>    <html class="no-js iem7" lang="en"> <![endif]-->
<!--[if (gt IEMobile 7)|!(IEMobile)]><!--> <html class="no-js" lang="en" manifest="cache.manifest"> <!--<![endif]-->
<head>
  <meta charset="utf-8">

  <title><?= __('Opacity', 'Opacité', 'Opacità'); ?></title>
  <meta name="description" content="">
  <meta name="HandheldFriendly" content="True">
  <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width" />
  <link rel="apple-touch-icon-precomposed" sizes="114x114" href="img/h/apple-touch-icon.png">
  <link rel="apple-touch-icon-precomposed" sizes="72x72" href="img/m/apple-touch-icon.png">
  <link rel="apple-touch-icon-precomposed" href="img/l/apple-touch-icon-precomposed.png">
  <link rel="shortcut icon" href="img/l/apple-touch-icon.png">

  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">


        <!-- iPhone SPLASHSCREEN-->
        <link href="img/startup-320x460.png" media="(device-width: 320px)" rel="apple-touch-startup-image">
        <!-- iPhone (Retina) SPLASHSCREEN-->
        <link href="img/startup-640x920.png" media="(device-width: 320px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">
        <!-- iPad (portrait) SPLASHSCREEN-->
        <link href="img/startup-768x1004.png" media="(device-width: 768px) and (orientation: portrait)" rel="apple-touch-startup-image">
        <!-- iPad (landscape) SPLASHSCREEN-->
        <link href="img/startup-748x1024.png" media="(device-width: 768px) and (orientation: landscape)" rel="apple-touch-startup-image">
        <!-- iPad (Retina, portrait) SPLASHSCREEN-->
        <link href="img/startup-1536x2008.png" media="(device-width: 1536px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">
        <!-- iPad (Retina, landscape) SPLASHSCREEN-->
        <link href="img/startup-2048x1496.png" media="(device-width: 1536px)  and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">


  <script>(function(a,b,c){if(c in b&&b[c]){var d,e=a.location,f=/^(a|html)$/i;a.addEventListener("click",function(a){d=a.target;while(!f.test(d.nodeName))d=d.parentNode;"href"in d&&(d.href.indexOf("http")||~d.href.indexOf(e.host))&&(a.preventDefault(),e.href=d.href)},!1)}})(document,window.navigator,"standalone")</script>
  <meta http-equiv="cleartype" content="on">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/add2home.css">

  <?php
    $hideLangList = isset($_GET['hideLangList'])?true:false;
    if ($hideLangList) { ?>
    <style media="screen" type="text/css">
    #langList { display: none; }
    </style>
  <?php } ?>

</head>
<body>
  <div id="container">

<div id="landscape">
    <div id="main" role="main" style="display: block; margin: 0px auto; overflow: hidden;">
    </div>
  </div>

  <script src="js/libs/jquery-1.7.1.min.js"></script>

  <!-- scripts concatenated and minified via ant build script-->
  <script>

(function(w) {
  "use strict";
  var appCache = w.applicationCache;

  function handleCacheEvent(e) {
    console.log("e.type: " + e.type);
  }

  function handleCacheError(e) {
    alert('Error: Cache failed to update!');
  };

  // Fired after the first cache of the manifest.
  appCache.addEventListener('cached', handleCacheEvent, false);

  // Checking for an update. Always the first event fired in the sequence.
  appCache.addEventListener('checking', handleCacheEvent, false);

  // An update was found. The browser is fetching resources.
  appCache.addEventListener('downloading', handleCacheEvent, false);

  // The manifest returns 404 or 410, the download failed,
  // or the manifest changed while the download was in progress.
  appCache.addEventListener('error', handleCacheError, false);

  // Fired after the first download of the manifest.
  appCache.addEventListener('noupdate', handleCacheEvent, false);

  // Fired if the manifest file returns a 404 or 410.
  // This results in the application cache being deleted.
  appCache.addEventListener('obsolete', handleCacheEvent, false);

  // Fired for each resource listed in the manifest as it is being fetched.
  appCache.addEventListener('progress', handleCacheEvent, false);

  // Fired when the manifest resources have been newly redownloaded.
  appCache.addEventListener('updateready', handleCacheEvent, false);

}(window));


var addToHomeConfig = {
      animationIn: 'bubble',
      animationOut: 'drop',
      autostart: true,
      lifespan: 999999,
      expire:0,
      touchIcon:true,
      message:'<?= __("en_us", "fr_fr", "it_it"); ?>'
    },
    originalTexts = <?php include "texts.json"; ?>,
    lang = '<?php echo $lang; ?>',
    langList = '<ul style="float: right; font-size: 0.8em;">' + (lang !== 'FR'?'<li id="langFR">français</li>':'') + (lang !== 'EN'?'<li id="langEN">english</li>':'') + (lang !== 'IT'?'<li id="langIT">italiano</li>':'') + '</ul>',
    texts,
    mainDiv = $('#main'),
    credited,
    introduction = function() {
      credited = originalTexts.credited;
      texts = originalTexts[lang];
      langList = '<ul id="langList" style="float: right; font-size: 0.8em;">' + (lang !== 'FR'?'<li id="langFR">français</li>':'') + (lang !== 'EN'?'<li id="langEN">english</li>':'') + (lang !== 'IT'?'<li id="langIT">italiano</li>':'') + '</ul>',

      mainDiv.html('<div id="centerMe" style="text-align: justify; font-size: 0.8em; min-height: 450px;"></div>');
      mainDiv.slideDown("slow", function() {
        var textCredited = "",
          i = 0;
        for (i; i < credited.length; i++) {
          textCredited += '<a href=' + credited[i].url + '>' + credited[i].name + '</a> ';
        }

        $('#centerMe').fadeOut(0);
        $('#centerMe').append(langList);
        document.title =  texts.introduction.title;
        $('#centerMe').append('<h1 style="margin:0;">' + texts.introduction.title + '</h1>');


        $('#centerMe').append('<p id="textPresentation" style="font-size:0.75em; margin: 10px 0">' + texts.introduction.abstract + '</p>');
        $('#centerMe').append('<p id="credited" style="font-size:0.75em;">' + textCredited + '</p>');
        $('#lang' + lang).css('font-weight', 'bold');
        $('#langFR').bind('click', function() {
          lang = 'FR';
          addToHome.setLang('fr_fr');
          mainDiv.fadeOut("slow", function() {
            introduction();
          });
        });
        $('#langEN').bind('click', function() {
          lang = 'EN';
          addToHome.setLang('en_en');
          mainDiv.fadeOut("slow", function() {
            introduction();
          });

        });
        $('#langIT').bind('click', function() {
          lang = 'IT';
          addToHome.setLang('it_it');
          mainDiv.fadeOut("slow", function() {
            introduction();
          });

        });
        $('#centerMe').fadeIn("slow", function() {
          window.scrollTo(0, 1);
          $('#textPresentation').bind('touchstart', function() {
            mainDiv.trigger('scene', 1);
          });

          $('#textPresentation').bind('click', function() {
            mainDiv.trigger('scene', 1);
          });
        });
      });
    };
    introduction();


  </script>
  <script src="js/add2home.js"></script>

  <script>
    var _gaq=[["_setAccount","UA-32806250-1"],["_trackPageview"]];
    (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.async=1;
    g.src=("https:"==location.protocol?"//ssl":"//www")+".google-analytics.com/ga.js";
    s.parentNode.insertBefore(g,s)}(document,"script"));
  </script>

</body>
</html>