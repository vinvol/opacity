<?php
function __($en, $fr, $it) {
  global $lang;
  if ($lang==='FR') {
    return $fr;
  } else if ($lang==='EN') {
    return $en;
  } else return $it;
}
?><!doctype html>
<!-- Conditional comment for mobile ie7 blogs.msdn.com/b/iemobile/ -->
<!--[if IEMobile 7 ]>    <html class="no-js iem7" lang="en"> <![endif]-->
<!--[if (gt IEMobile 7)|!(IEMobile)]><!--> <html class="no-js" lang="en" manifest="cache.manifest"> <!--<![endif]-->

<!--app-->

<head>
  <meta charset="utf-8">

  <title>Application</title>
  <meta name="description" content="">

  <!-- Mobile viewport optimization h5bp.com/ad -->
  <meta name="HandheldFriendly" content="True">
  <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

  <!-- Home screen icon  Mathias Bynens mathiasbynens.be/notes/touch-icons -->
  <!-- For iPhone 4 with high-resolution Retina display: -->
  <link rel="apple-touch-icon-precomposed" sizes="114x114" href="img/h/apple-touch-icon.png">
  <!-- For first-generation iPad: -->
  <link rel="apple-touch-icon-precomposed" sizes="72x72" href="img/m/apple-touch-icon.png">
  <!-- For non-Retina iPhone, iPod Touch, and Android 2.1+ devices: -->
  <link rel="apple-touch-icon-precomposed" href="img/l/apple-touch-icon-precomposed.png">
  <!-- For nokia devices: -->
  <link rel="shortcut icon" href="img/l/apple-touch-icon.png">

  <!-- iOS web app, delete if not needed. https://github.com/h5bp/mobile-boilerplate/issues/94 -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <link rel="apple-touch-startup-image" href="img/startup-tablet-landscape.png"/>
  <!-- <script>(function(){var a;if(navigator.platform==="iPad"){a=window.orientation!==90||window.orientation===-90?"img/startup-tablet-landscape.png":"img/startup-tablet-portrait.png"}else{a=window.devicePixelRatio===2?"img/startup-retina.png":"img/startup.png"}document.write('<link rel="apple-touch-startup-image" href="'+a+'"/>')})()</script> -->
  <script>(function(){var a;if(navigator.platform==="iPad"){a=window.orientation!==90||window.orientation===-90?"img/startup-tablet-landscape.png":"img/startup-tablet-portrait.png"}else{a=window.devicePixelRatio===2?"img/startup-retina.png":"img/startup.png"}document.write('<link rel="apple-touch-startup-image" href="'+a+'"/>')})()</script>

  <!-- The script prevents links from opening in mobile safari. https://gist.github.com/1042026 -->
  <script>(function(a,b,c){if(c in b&&b[c]){var d,e=a.location,f=/^(a|html)$/i;a.addEventListener("click",function(a){d=a.target;while(!f.test(d.nodeName))d=d.parentNode;"href"in d&&(d.href.indexOf("http")||~d.href.indexOf(e.host))&&(a.preventDefault(),e.href=d.href)},!1)}})(document,window.navigator,"standalone")</script>

  <!-- Mobile IE allows us to activate ClearType technology for smoothing fonts for easy reading -->
  <meta http-equiv="cleartype" content="on">

  <!-- more tags for your 'head' to consider h5bp.com/d/head-Tips -->
  <meta name="format-detection" content="telephone=no">

  <!-- Main Stylesheet -->
  <link rel="stylesheet" href="css/style.css">

  <!-- All JavaScript at the bottom, except for Modernizr which enables HTML5 elements & feature detects -->
  <!--  <script src="js/libs/modernizr-2.0.6.min.js"></script> -->
	<script>
(function(w) {
  "use strict";
  w.request = null;
  w.requestAnimFrame = (function() {
    return w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.mozRequestAnimationFrame || w.oRequestAnimationFrame || w.msRequestAnimationFrame ||
    function(callback) {
      return w.setTimeout(callback, 1000 / 60);
    };
  })();
  w.cancelRequestAnimFrame = (function() { return w.cancelAnimationFrame || w.webkitCancelRequestAnimationFrame || w.mozCancelRequestAnimationFrame || w.oCancelRequestAnimationFrame || w.msCancelRequestAnimationFrame || clearTimeout; })();


}(window));

	</script>

  <?php
    $hideLangList = isset($_GET['hideLangList'])?true:false;
    if ($hideLangList) { ?>
    <style media="screen" type="text/css">
    #langList { display: none; }
    </style>
  <?php } ?>

</head>

<body class="inApp">

    <div id="myAudioDiv" psle="display: none; width: 0px; height:0px;">
      <audio id="myAudio" preload="none">
        <?php
          if (isset($_GET['nosound'])) {
            echo '<source src="media/son1-ENG.mp3" />';
          } else {
          echo '<source src="media/4scences_q9_joint_std.mp3" />';
          }
        ?>
      </audio>
    </div>
  <div id="container" style="height: 1200px;">
    <header>
    </header>
    <div id="landscape">
    <div id="main" role="main" style="display: block; margin: 0 auto; overflow: hidden;">
      <div style="text-align: center;"><img src="loading.gif" /></div>
    </div>
    </div>

    <div id="portrait" style="display: block; width: 50px;
margin: 150px;">Opacite.<br/>
    <?php echo __("Opacity works in landscape mode.", "Opacité fonctionne en mode paysage.", "Opacità funziona in modalità landscape."); ?>
    </div>

    <footer id="footer" style="display: none; width: 0px; height:0px;">
    </footer>
  </div> <!--! end of #container -->


  <!-- JavaScript at the bottom for fast page loading -->
  <script src="js/libs/jquery-1.7.1.min.js"></script>

  <!-- scripts concatenated and minified via ant build script-->
  <!-- <script src="js/helper.js"></script> -->
  <script>
	var originalTexts = <?php include "texts.json"; ?>,
		lang = '<?php echo $lang; ?>';
  </script>
  <script src="opacity.js"></script>

  <script>
    document.getElementsByTagName('body')[0].ontouchmove = function (e) { e.preventDefault(); };
    document.getElementsByTagName('body')[0].ontouchstart= function (e) { e.preventDefault(); };
  </script>
  <!-- Asynchronous Google Analytics snippet. Change UA-XXXXX-X to be your site's ID.
       mathiasbynens.be/notes/async-analytics-snippet -->

  <script>
    var _gaq=[["_setAccount","UA-32806250-1"],["_trackPageview"]];
    (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.async=1;
    g.src=("https:"==location.protocol?"//ssl":"//www")+".google-analytics.com/ga.js";
    s.parentNode.insertBefore(g,s)}(document,"script"));
  </script>
    
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
  

  </script>

</body>
</html>