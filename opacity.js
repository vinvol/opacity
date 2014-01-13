/*global $:true, originalTexts:true, lang:true, console:true, */
(function(thiswindow) {
	"use strict";

	function deepCopy(obj) {
		var out, i = 0;
		if (Object.prototype.toString.call(obj) === '[object Array]') {
			var	len = obj.length;
			out = [];
			for (; i < len; i++) {
				out[i] = deepCopy(obj[i]);
			}
			return out;
		}
		if (typeof obj === 'object') {
			out = {};
			for (i in obj) {
				out[i] = deepCopy(obj[i]);
			}
			return out;
		}
		return obj;
	}
	window.deepCopy = deepCopy;

	function findPosition(obj) {
		var curleft = 0,
			curtop = 0;
		if (obj.offsetParent) {
			do {
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			} while (obj = obj.offsetParent);
		}
		return {
			'x': curleft,
			'y': curtop
		};
	}
	var texts, mainDiv = $('#main'),
		credited, soundStartTime = 0,
		soundEndTime = 0,
		langList, sound = document.getElementById('myAudio'),
		introduction = function() {
			credited = originalTexts.credited;
			texts = deepCopy(originalTexts[lang]);
			langList = '<ul id="langList" style="float: right; font-size: 0.8em;">' + (lang !== 'FR' ? '<li id="langFR">français</li>' : '') + (lang !== 'EN' ? '<li id="langEN">english</li>' : '') + (lang !== 'IT' ? '<li id="langIT">italiano</li>' : '') + '</ul>', mainDiv.html('<div id="centerMe" style="text-align: justify; font-size: 0.8em;"></div>');
			mainDiv.slideDown("slow", function() {
				var textCredited = "",
					i = 0;
				for (i; i < credited.length; i++) {
					textCredited += '<a href=' + credited[i].url + '>' + credited[i].name + '</a>';
				}

				$('#centerMe').fadeOut(0);
				$('#centerMe').append(langList);

				$('#centerMe').append('<h1 style="margin:0;">' + texts.introduction.title + '</h1>');

				$('#centerMe').append('<p id="textPresentation" style="font-size:0.75em; margin: 30px 0">' + texts.introduction.abstract + '</p>');
				$('#centerMe').append('<p id="credited" style="font-size:0.74em;">' + textCredited + '</p>');

				$('#lang' + lang).css('font-weight', 'bold');
				$('#langFR').bind('touchstart', function() {
					lang = 'FR';
					mainDiv.fadeOut("slow", function() {
						introduction();
					});
				});
				$('#langEN').bind('touchstart', function() {
					lang = 'EN';
					mainDiv.fadeOut("slow", function() {
						introduction();
					});

				});
				$('#langIT').bind('touchstart', function() {
					lang = 'IT';
					mainDiv.fadeOut("slow", function() {
						introduction();
					});

				});
				$('#centerMe').fadeIn("slow", function() {
					window.scrollTo(0, 1);
					$('#textPresentation').bind('touchstart', function() {
						$('#centerMe').fadeOut("slow", function() {
							$('#centerMe').html("...");
							$('#centerMe').fadeIn("slow");
						});
						mainDiv.trigger('scene', 'loading');
					});
				});
			});
		},
		soundWatcher = function(e) {
			var cur = Math.round(sound.currentTime * 100);
			if (sound.currentTime < (soundStartTime - 1)) {
				sound.currentTime = soundStartTime;
			}
			if (sound.currentTime > soundEndTime) {
				sound.currentTime = soundStartTime;
			}
			setTimeout(soundWatcher, 125);
		},
		loadThings = function() {
			var startTime = new Date().getTime(),
				redoProgress = null,
				soundProgress = function(evt) {
					clearTimeout(redoProgress);
					sound.pause();
					try {
						var buffer = parseFloat(sound.buffered.end(0), 10) || 0,
							duration = sound.duration,
							now = new Date().getTime(),
							passedTime = now - startTime,
							progression = (buffer / duration),
							invProgression = 1 - progression,
							eta = Math.round(invProgression / progression * passedTime / 1000);

						$('#loaderProgress').width(100 * buffer / duration + '%');
						$('#loaderText').html(eta + 's');

						if (progression === 1) {
							soundWatcher();
							$(sound).unbind('progress', soundProgress);
							mainDiv.trigger('scene', 1);
						} else {
							redoProgress = setTimeout(1500, soundProgress);
						}

					} catch (e) {
						console.warn(e);
					}
				};


			sound.ready = false;
			$(sound).bind('progress', soundProgress);

			$('#centerMe').fadeOut("slow", function() {
				$('#centerMe').html('<div id="loader" style=" position: absolute; width: 95%; height: 200px; margin: 10px 0; border: 1px white solid;"><div id="loaderProgress" style="width: 1%; background: white; display: block; height: 200px;"></div><div id="loaderText" style="width: 90%; text-shadow: 0 0 5px black; display: block; height: 190px;margin: 5px;position: inherit;top: 0;line-height: 2em;font-size: 5em;text-align: center;">ETA</div>');
				$('#centerMe').fadeIn("slow");
			});

			sound.play();
		},
		executeOne = function() {
			soundStartTime = 0;
			soundEndTime = 26.10;
			sound.currentTime = soundStartTime;
			sound.play();

			$('#centerMe').fadeOut("slow", function() {
				$('#centerMe').remove();
				// ONE
				mainDiv.fadeOut(0);
				mainDiv.append('<canvas id="canvasOne" width="320" height="240" style="width: 100%; height: 85%;"></canvas><div id="sentences" style="color: #E4E4E4; font-size: 0.97em; text-align: center;"></div>');
				mainDiv.fadeIn();
				var lines = 5,
					columns = 7,
					canvasOne = document.getElementById('canvasOne'),
					ctxOne = canvasOne.getContext('2d'),
					imageOne = new Image(),
					lastCaseWidth = 0,
					maskOne = [],
					widthOne = canvasOne.clientWidth,
					heightOne = canvasOne.clientHeight,
					caseWidth = 320 / columns,
					caseHeight = 240 / lines,
					caseWidthPercent = Math.round(100 / columns),
					caseHeightPercent = Math.round(100 / lines),
					i, j, totalMasksHeight = 0,
					totalMasksWidth = 0,
					opacitySteps = [75, 40, 25, 10, 7],
					nextOpacityStep = opacitySteps.shift(),
					//mask dissapear
					move = function(e) {
						var x = (e.hasOwnProperty('originalEvent') && e.originalEvent !== undefined && e.originalEvent.hasOwnProperty('touches')) ? e.originalEvent.touches[0].pageX - canvasOne.parentElement.offsetLeft : e.offsetX,
							y = (e.hasOwnProperty('originalEvent') && e.originalEvent !== undefined && e.originalEvent.hasOwnProperty('touches')) ? e.originalEvent.touches[0].pageY - canvasOne.parentElement.offsetTop : e.offsetY,
							i = Math.floor((x / widthOne * 320) / caseWidth),
							j = Math.floor((y / heightOne * 240) / caseHeight),
							k, len = lines * columns,
							index = j * columns + i,
							opacity = 0;
						if (maskOne[index] > 0) {
							maskOne[index] -= 10;
						}

						for (k = 0; k < len; k++) {
							opacity += maskOne[k];
						}
						opacity /= (lines * columns);

						if (opacity < nextOpacityStep) {
							//console.warn(opacity,  nextOpacityStep);
							if (opacitySteps.length > 0) {
								$(canvasOne).trigger("step");
							}
						}

						ctxOne.drawImage(imageOne, 0, 0, 320, 240);
						for (j = 0; j < lines; j++) {
							for (i = 0; i < columns; i++) {
								index = j * columns + i;
								ctxOne.fillStyle = "rgba(0, 0, 0, " + maskOne[index] / 100 + ')';
								if (maskOne[index] > 0) {
									ctxOne.strokeRect(i * caseWidth, j * caseHeight, caseWidth, caseHeight);
								}
								ctxOne.fillRect(i * caseWidth, j * caseHeight, caseWidth, caseHeight);
							}
						}
					};

				//create text
				$('#sentences').html(texts.sentencesOne.shift());

				//console.log(widthOne);
				//console.log(heightOne);
				imageOne.onload = function() {
					for (j = 0; j < lines; j++) {
						for (i = 0; i < columns; i++) {
							maskOne[j * columns + i] = 100;
						}
					}
					ctxOne.fillStyle = 'rgba(0, 0, 0, 1)';
					ctxOne.fillRect(0, 0, 320, 240);
					$(canvasOne).bind("touchmove", move);
				};
				imageOne.src = "img/Interieur-ordi5.jpg";

				function onStepEvent(e) {
					nextOpacityStep = opacitySteps.shift();
					$('#sentences').fadeOut('slow', function() {
						$('#sentences').html(texts.sentencesOne.shift());
						$('#sentences').fadeIn('slow', function() {
							if (opacitySteps.length === 0) {
								$(canvasOne).unbind('step', onStepEvent);
								setTimeout(function() {
									mainDiv.trigger("scene", 2);
								}, 1500);
							}
						});
					});
				}
				$(canvasOne).bind('step', onStepEvent);
			});
		},
		executeTwo = function() {

			soundStartTime = 26.30;
			soundEndTime = 67.30;
			sound.currentTime = soundStartTime;

			mainDiv.fadeOut("slow", function() {
				mainDiv.html('<div id="sentences" style="float: left; position: relative; top: 0; left:0; color: #E4E4E4; font-size: 1em; text-align: center; width: 70%;">		</div>		<div id="wives" style="float: left; position:relative; overflow: hidden; width: 20%; height: 99%;">			<div id="wife1" style="display: block;border: 0; opacity: 1; z-index: 4; position: absolute; top: 0; left: 0; opacity: 1; width: 100%; height:100%; background: url(img/femme1.png)  center center no-repeat;  background-size: contain;"></div>			<div id="wife2" style="display: block;border: 0; opacity: 1; z-index: 3; position: absolute; top: 0; left: 0; opacity: 1; width: 100%; height:100%; background: url(img/femme2.png)  center center no-repeat;  background-size: contain;"></div>			<div id="wife3" style="display: block;border: 0; opacity: 1; z-index: 2; position: absolute; top: 0; left: 0; opacity: 1; width: 100%; height:100%; background: url(img/femme3.png)  center center no-repeat;  background-size: contain;"></div>			<div id="wife4" style="display: block;border: 0; opacity: 1; z-index: 1; position: absolute; top: 0; left: 0; opacity: 1; width: 100%; height:100%; background: url(img/femme4.png) center center no-repeat; background-size: contain;"></div>		</div>');
				// TWO
				mainDiv.fadeIn("slow", function() {
					var lines = 7,
						columns = 10,
						wivesDiv = $('#wives'),
						sentencesDiv = $('#sentences'),
						sentenceIndex = 0,
						i, j, nextOpacityStep;

					//create text
					j = texts.sentencesTwo.length;
					for (i = 0; i < j; i += 1) {
						$('#sentences').append('<div class="sentence" style="color: #E4E4E4; opacity: 0; font-size: 0.8m; margin-bottom: 14%;">' + texts.sentencesTwo[i] + '</div>');
					}

					//wives dissapear

					function move(e) {
						wivesDiv[0].children[0].style.opacity = Math.max(0, wivesDiv[0].children[0].style.opacity - 0.025);
						sentencesDiv[0].children[sentenceIndex].style.opacity = 1 - parseFloat(wivesDiv[0].children[0].style.opacity);
						if (wivesDiv[0].children[0].style.opacity === '0') {
							$(wivesDiv[0].children[0]).remove();
							sentenceIndex++;
							if (sentenceIndex > 3) {
								wivesDiv.unbind("touchmove", move);
								setTimeout(function() {
									mainDiv.trigger("scene", 3);
								}, 1500);
							}
						}
					}
					wivesDiv.bind("touchmove", move);
				});
			});
		},
		executeThree = function() {

			soundStartTime = 71.30;
			soundEndTime = 108.37;
			sound.currentTime = soundStartTime;

			mainDiv.fadeOut("slow", function() {
				mainDiv.html('<div id="his" style="font-size: 0.5em; width: 100%; text-align: center;">'+texts.his+'<br/></div><div id="hers" style="width: 100%; font-size: 0.5em; position: absolute; left: 0px; bottom: 0px; text-align: center;">'+texts.hers+'<br/></div>		<div id="sentences" style="color: #E4E4E4; font-size: 1em; line-height: 3em; text-align: center; position: absolute; margin-bottom: -1em; bottom: 50%;">			<div id="mainSentence" style="color: #E4E4E4; font-size: 1em;"></div><br class="clear" />			<div id="modificatedSentence" style="color: #E4E4E4; font-size: 1em; position: absolute; top: 50px; visibility: hidden;"></div></div>');
				// THREE
				mainDiv.fadeIn("slow", function() {

					var container = $('#container'),
						step = 0,
						maxStep = 50,
						FADE_OUT = true,
						HIS = true,
						HERS = false,
						FADE_IN = false,
						mode = FADE_OUT,
						speaker = HIS,
						createText = function() {
							var i, max, str = '',
								nextSentences, sentenceInput;

							if (speaker === HERS) {
								$('#hers').append($('#mainSentence').text() + '<br/>');
							} else {
								$('#his').append($('#mainSentence').text() + '<br/>');
							}
							speaker = !speaker;

							nextSentences = texts.sentencesThree.shift();
							sentenceInput = nextSentences.original.replace(/ /gi, '&nbsp;');
							sentenceInput = sentenceInput.split('+');
							max = sentenceInput.length;
							str = '';
							for (i = 0; i < max; i += 1) {
								str = str + '<span>' + sentenceInput[i] + '</span>';
							}

							$('#mainSentence').html('<span>' + str + '</span>');

							sentenceInput = nextSentences.modified.replace(/ /gi, '&nbsp;');
							sentenceInput = sentenceInput.split('+');
							max = sentenceInput.length;
							str = '';
							for (i = 0; i < max; i += 1) {
								str = str + '<span>' + sentenceInput[i] + '</span>';
							}
							$('#modificatedSentence').html('<span>' + str + '</span>');
						},
						move = function(e) {
							var i = 0,
								max = document.getElementById('mainSentence').children[0].children.length,
								obj, d, size, nextObj, objWidth, nextObjWidth;

							step += 1;
							//console.log(mode, step);
							size = 0;
							for (i = 0; i < max; i++) {
								obj = document.getElementById('mainSentence').children[0].children[i];
								nextObj = document.getElementById('modificatedSentence').children[0].children[i];

								objWidth = obj.getBoundingClientRect().right - obj.getBoundingClientRect().left;
								nextObjWidth = nextObj.getBoundingClientRect().right - nextObj.getBoundingClientRect().left;

								obj.style.width = parseInt(objWidth + ((nextObjWidth - objWidth) / (maxStep - step)), 10) + 'px';

								if ((mode && (obj.innerHTML !== nextObj.innerHTML)) || (!mode && (obj.style.opacity !== ''))) {
									d = (mode) ? 1 - 2 * step / maxStep : 2 * step / maxStep;
									if (!isNaN(d)) {
										obj.style.opacity = d;
									}
								}
								size += objWidth;
							}

							document.getElementById('mainSentence').style.marginLeft = ((document.getElementById('main').getBoundingClientRect().right - document.getElementById('main').getBoundingClientRect().left) - size) / 2 + 'px';

							if (step >= maxStep) {
								mode = !mode;
								for (i = 0; i < max; i++) {
									obj = document.getElementById('mainSentence').children[0].children[i];
									nextObj = document.getElementById('modificatedSentence').children[0].children[i];

									if ((!mode && (obj.innerHTML !== nextObj.innerHTML)) || (mode && (obj.innerHTML === nextObj.innerHTML))) {
										obj.innerHTML = nextObj.innerHTML;
									}
								}
								if (mode) {
									if (texts.sentencesThree.length === 0) {
										container.unbind("touchmove", move);
										setTimeout(function() {
											mainDiv.trigger("scene", 4);
										}, 1500);
									} else {
										createText();
									}
								}
								step = 0;

							}

						};
					container.bind("touchmove", move);
					createText();
					move();
				});
			});
		},
		executeFour = function() {

			soundStartTime = 108.37;
			soundEndTime = 148.71;

			mainDiv.fadeOut("slow", function() {
				var i = 0,
					j = texts.sentencesFour.length,
					sentencesWidth, canvas, height, width, ctx;
				mainDiv.html('<div><img id="image" style="position:absolute; top:0; left:0; height: 99%" src="img/tableau5.jpg" /><canvas style="position:absolute; top:0; left:0; opacity: 0.8;" id="mask"></canvas></div><div id="sentences" style="font-size: 0.51em; position: inherit; right: 0px; top: 0px; left: 47%;"></div>');

				//create text
				for (i = 0; i < j; i += 1) {
					$('#sentences').append('<div class="phrase" style="overflow: hidden; width: 0px;"><span style="width: 300px; display: block;">' + texts.sentencesFour[i] + '</span></div>');
				}

				document.getElementById('image').onload = function() {

					canvas = document.getElementById('mask');
					ctx = document.getElementById('mask').getContext('2d');



					canvas.height = height = parseInt(document.getElementById('main').style.height, 10) - 1;
					canvas.width = width = parseInt(height * 180 / 268, 10) + 1;
					sentencesWidth = (parseInt(document.getElementById('main').style.width, 10) - 1) - width;
					document.getElementById('sentences').style.width = sentencesWidth + 'px';



					ctx.fillStyle = "#222";
					ctx.fillRect(0, 0, width, height);

					// FOUR
					mainDiv.fadeIn("slow", function() {

						var factor = 0.60,
							controlPointFactor = 1.2,
							Point = function(x, y, color, size) {
								this.previous = null;
								this.next = null;
								this.x = x;
								this.y = y;
								this.dx = 0; //0.5 - Math.random();
								this.dy = 0; //0.5 - Math.random();
								this.color = 0xFFFFFF; //color.getCSSIntegerRGBA();
								this.size = size;
								this.medianAngle = null;
								this.angleToNext = null;
								this.angleToPrevious = null;
								this.context = null;
								this.ending = null;
								this.controlPoints = null;
								this.recycle = function() {
									this.computeControlPoints();
								};
								this.computeControlPoints = function() {
									if (this.next === null) {
										return;
									}
									if (this.previous === null) {
										return;
									}
									this.controlPoints = {
										a: {
											x: this.previous.nextAnchors.a.x + (this.previousAnchors.a.x - this.previous.nextAnchors.a.x) * (controlPointFactor),
											y: this.previous.nextAnchors.a.y + (this.previousAnchors.a.y - this.previous.nextAnchors.a.y) * (controlPointFactor)
										},
										b: {
											x: this.previous.nextAnchors.b.x + (this.previousAnchors.b.x - this.previous.nextAnchors.b.x) * (controlPointFactor),
											y: this.previous.nextAnchors.b.y + (this.previousAnchors.b.y - this.previous.nextAnchors.b.y) * (controlPointFactor)
										}
									};
									this.previousAnchors = {
										a: {
											x: this.x + Math.cos(this.angleToPrevious + Math.PI / 2) * this.size,
											y: this.y + Math.sin(this.angleToPrevious + Math.PI / 2) * this.size
										},
										b: {

											x: this.x + Math.cos(this.angleToPrevious - Math.PI / 2) * this.size,
											y: this.y + Math.sin(this.angleToPrevious - Math.PI / 2) * this.size
										}
									};
									this.nextAnchors = {
										a: {
											x: this.x + Math.cos(this.angleToNext + Math.PI / 2) * this.size,
											y: this.y + Math.sin(this.angleToNext + Math.PI / 2) * this.size
										},
										b: {

											x: this.x + Math.cos(this.angleToNext - Math.PI / 2) * this.size,
											y: this.y + Math.sin(this.angleToNext - Math.PI / 2) * this.size
										}
									};
								};
								this.setPrevious = function(previous) {
									this.previous = previous;
									this.angleToPrevious = Math.atan2(this.y - this.previous.y, this.x - this.previous.x);

									this.previousAnchors = {
										a: {
											x: this.x + Math.cos(this.angleToPrevious + Math.PI / 2) * this.size,
											y: this.y + Math.sin(this.angleToPrevious + Math.PI / 2) * this.size
										},
										b: {

											x: this.x + Math.cos(this.angleToPrevious - Math.PI / 2) * this.size,
											y: this.y + Math.sin(this.angleToPrevious - Math.PI / 2) * this.size
										}
									};
									this.computeControlPoints();
								};
								this.setNext = function(next) {
									this.next = next;
									this.angleToNext = Math.atan2(this.y - this.next.y, this.x - this.next.x) + Math.PI;
									this.nextAnchors = {
										a: {
											x: this.x + Math.cos(this.angleToNext + Math.PI / 2) * this.size,
											y: this.y + Math.sin(this.angleToNext + Math.PI / 2) * this.size
										},
										b: {

											x: this.x + Math.cos(this.angleToNext - Math.PI / 2) * this.size,
											y: this.y + Math.sin(this.angleToNext - Math.PI / 2) * this.size
										}
									};
									next.setPrevious(this);
								};
								this.drawFlow = function() {
									if (this.controlPoints === null) {
										this.computeControlPoints();
									}
									ctx.globalCompositeOperation = 'destination-out';
									ctx.fillStyle = "rgba(255, 0, 0, 0.5)"; //this.color;
									if (this.previous === null) {
										ctx.beginPath();
										ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
										ctx.closePath();
										ctx.fill();
										if (this.next !== null) {
											ctx.beginPath();
											ctx.moveTo(this.nextAnchors.a.x, this.nextAnchors.a.y);
											ctx.lineTo(this.next.previousAnchors.a.x, this.next.previousAnchors.a.y);
											ctx.lineTo(this.next.previousAnchors.b.x, this.next.previousAnchors.b.y);
											ctx.lineTo(this.nextAnchors.b.x, this.nextAnchors.b.y);
											ctx.closePath();
											ctx.fill();

											ctx.beginPath();
											ctx.arc(this.next.x, this.next.y, this.next.size, 0, Math.PI * 2, true);
											ctx.closePath();
											ctx.fill();
										}
									} else {
										if (this.next !== null) {
											ctx.beginPath();
											ctx.moveTo(this.previousAnchors.a.x, this.previousAnchors.a.y);

											ctx.quadraticCurveTo(this.controlPoints.a.x, this.controlPoints.a.y, this.next.previousAnchors.a.x, this.next.previousAnchors.a.y);

											ctx.lineTo(this.next.previousAnchors.b.x, this.next.previousAnchors.b.y);
											ctx.quadraticCurveTo(this.controlPoints.b.x, this.controlPoints.b.y, this.previousAnchors.b.x, this.previousAnchors.b.y);
											ctx.closePath();
											ctx.fill();
										} else {
											ctx.beginPath();
											ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
											ctx.closePath();
											ctx.fill();
										}
									}
								};
							},
							canvasOne = document.getElementById('mask'),
							coords = [],
							imgFinger = new Image(),
							p1 = null,
							frame = 0,
							last = p1,
							distance = 1,
							sentenceIndex = 0,
							tstart, tmove, lastX, mouseX, lastY, mouseY, refresh = function(e) {
								if (sentenceIndex > 5) return;
								if (typeof window.request !== "undefined") {
									var p = p1,
										i = 0,
										size = 0;
									canvas.width = canvas.width;

									ctx.fillStyle = "#222";
									ctx.fillRect(0, 0, width, height);

									while (p.next !== null) {
										//p.recycle();
										p.drawFlow();
										//p.drawNextAnchors();
										//p.draw();
										p = p.next;
										i++;
									}
									size = parseInt(i / 20 * 300, 10);
									if (document.getElementById('sentences').children.length > sentenceIndex) {
										document.getElementById('sentences').children[sentenceIndex].style.width = size + "px";
									}
									if (i > 20) {
										p1 = p1.next;
										sentenceIndex++;
										if (sentenceIndex > 5) {
											window.cancelRequestAnimFrame(window.request);
											window.cancelRequestAnimFrame(window.request);
											document.getElementById('mask').removeEventListener('touchstart', tstart);
											document.getElementById('mask').removeEventListener('touchmove', tmove);
											setTimeout(function() {
												mainDiv.trigger("scene", 5);
											}, 1500);
										}
										while (p1.next !== null) {
											p1 = p1.next;
										}
									}

									if (frame++ === 1) {
										frame = 0;
										if (p1.next !== null) {
											p1 = p1.next;
										}
									}

									if (Math.max(1, 0.75 * Math.sqrt(Math.pow(mouseX - lastX, 2) + Math.pow(mouseY - lastY, 2))) > distance) {
										distance += 2;
									} else {
										distance -= 2;
									}
									distance = Math.max(1, distance);
									if (distance > 1) {
										lastX = mouseX;
										lastY = mouseY;

										p = new Point(mouseX, mouseY, distance, distance);
										last.setNext(p);

										last = p;
									}
								}
							},
							drawShape = function() {
								tstart = function(e) {
									e.preventDefault();
									document.getElementById('mask').removeEventListener('touchstart', tstart);

									var offset = findPosition(document.getElementById('mask'));
									mouseX = e.hasOwnProperty('touches') ? e.touches[0].pageX - offset.x : e.offsetX;
									mouseY = e.hasOwnProperty('touches') ? e.touches[0].pageY - offset.y : e.offsetY;

									lastX = mouseX;
									lastY = mouseY;
									p1 = new Point(mouseX, mouseY);
									last = p1;

									(function animloop() {

										refresh();
										window.request = window.requestAnimFrame(animloop);
										var t = typeof window.request;

									}());

								};
								tmove = function(e) {
									e.preventDefault();
									var offset = findPosition(document.getElementById('mask'));

									mouseX = e.hasOwnProperty('touches') ? e.touches[0].pageX - offset.x : e.offsetX;
									mouseY = e.hasOwnProperty('touches') ? e.touches[0].pageY : e.offsetY;

								};

								document.getElementById('mask').addEventListener('touchstart', tstart);
								document.getElementById('mask').addEventListener('touchmove', tmove);
							};
						drawShape();
					});
				};
			});
		},
		executeFive = function() {
			sound.currentTime = 0;
			sound.pause();
			mainDiv.fadeOut("slow", function() {
				mainDiv.html("<h1>" + texts.endWord + "</h1>");
				mainDiv.fadeIn("slow", function() {
					$('#footer').html('<div style="visibility: hidden"><img src="img/femme1.png" /><img src="img/femme2.png" /><img src="img/femme3.png" /><img src="img/femme4.png" /></div>');
					setTimeout(introduction, 3500);
				});
			});
		},
		processScene = function(e, sceneNumber) {
			switch (sceneNumber) {
			case 'loading':
				loadThings();
				break;
			case 1:
				executeOne();
				break;
			case 2:
				executeTwo();
				break;
			case 3:
				executeThree();
				break;
			case 4:
				executeFour();
				break;
			case 5:
				executeFive();
				break;
			default:
				console.log("no scene number");
			}
		},
		resizing = function() {
			var ratio = 16 / 23,
				windowHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight,
				windowWidth = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
			if ((windowHeight / windowWidth) > ratio) {
				mainDiv.width(windowWidth);
				mainDiv.height(windowWidth * ratio - 5);
				mainDiv.offset({
					top: ((windowHeight - (windowWidth * ratio - 5)) / 2)
				});
			} else {
				mainDiv.height(windowHeight - 2);
				mainDiv.width(windowHeight / ratio);
				mainDiv.offset({
					top: 0
				});
			}
			$('#splashScreen').width(windowWidth - 2);
			$('#splashScreen').height(windowHeight - 2);
		},
		setBodyScale = function() {
			var scaleSource = mainDiv.width(),
				scaleFactor = 0.30,
				maxScale = 600,
				minScale = 30,
				fontSize = scaleSource * scaleFactor;

			fontSize = Math.max(minScale, Math.min(maxScale, fontSize));
			$('body').css('font-size', fontSize + '%');
		};

	$(window).resize(function() {
		/*
		$('#container').height(1200);
		*/
		window.scrollTo(0, 1);
		resizing();
		setBodyScale();
		/*
		setTimeout(function() {
			$('#container').height(0);
		}, 150);
		*/
	});

	$().ready(function() {

		if (window.orientation === 0) {
			$('#landscape').fadeOut(0);
			$('#portrait').fadeIn();
		} else {
			$('#portrait').fadeOut(0);
			$('#landscape').fadeIn();
		}

		document.body.onorientationchange = function() {
			window.scrollTo(0, 1);
			if (window.hasOwnProperty("orientation")) {
				if (window.orientation === 0) {
					$('#landscape').slideUp(0);
					$('#portrait').fadeIn();
				} else {
					$('#portrait').fadeOut(0);
					$('#landscape').fadeIn();
				}
			} else {
				console.log(window.orientation);
			}

			$('#container').height(1200);
			window.scrollTo(0, 1);
			resizing();
			setBodyScale();
			/*
			setTimeout(function() {
				$('#container').height(0);
			}, 150);
			*/
		};
		document.body.onorientationchange();

		mainDiv.bind('scene', processScene);

		document.getElementById('footer').addEventListener('touchstart', function(e) {

			console.log("footer touchstart" + e);
			sound.play();
		});

		window.sound = sound;

		setTimeout(introduction, 1500);
	});

thiswindow.opac = this;

}(window));