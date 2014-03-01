

document.ready = function() {
	var content = document.getElementById('content');
	var menu = document.getElementById('menu');
if (content) {
	var showmMenu = false;
	document.getElementById('open_menu').onclick = function(event) {
		if (!showmMenu) {
			showmMenu = true;
			this.classList.add('active');
			menu.classList.add('active');
		}
		else {
			showmMenu = false;
			this.classList.remove('active');
			menu.classList.remove('active');
		};
	}
	content.onclick = function() {
		if (showmMenu) {
			document.getElementById('open_menu').classList.remove('active');
			menu.classList.remove('active');
			showmMenu = false;
		}
	}
}


	function setStyles() {
		homeContent = document.getElementById('homeContent');
		if (homeContent) {
			var a = 1;
			if (alertHeight() < 350) a = 51;
			homeContent.style.marginTop = (alertHeight() - homeContent.offsetHeight)/2+a+'px';
		}
	}

	setStyles();
	window.onresize = function() {setStyles();};

function getBodyScrollTop() {
	var scrollHeight =  self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
	return scrollHeight;
}

function alertWidth() {
	if( typeof( window.innerWidth ) == 'number' ) {
		myWidth = window.innerWidth;
	}
	else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
		myWidth = document.documentElement.clientWidth;
	}
	else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
		myWidth = document.body.clientWidth;
	}
	return myWidth;
}
function navbarW () {
	return document.getElementById('navbar').offsetWidth;
}
function alertHeight() {
	if( typeof( window.innerWidth ) == 'number' ) {
		myHeight = window.innerHeight;
	}
	else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
		myHeight = document.documentElement.clientHeight;
	}
	else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
		myHeight = document.body.clientHeight;
	}
	return myHeight;
}

function linearFunction(k,x,b) {
	var result = k * x + b;
	return result;
}

function getElementComputedStyle(elem, prop) {
	if (typeof elem!="object") elem = document.getElementById(elem);
  
	if (document.defaultView && document.defaultView.getComputedStyle) {
		if (prop.match(/[A-Z]/)) prop = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
			return document.defaultView.getComputedStyle(elem, "").getPropertyValue(prop);
	}
  
	if (elem.currentStyle) {
		var i;
		while ((i=prop.indexOf("-"))!=-1) prop = prop.substr(0, i) + prop.substr(i+1,1).toUpperCase() + prop.substr(i+2);
		return elem.currentStyle[prop];
	}
	return "";
}


/*
function hookEvent(hElem, eventName, callback) {
  if (typeof(hElem) == 'string') {
    hElem = document.getElementById(hElem);
  }
  if (!hElem) { return false; }
 
  if (hElem.addEventListener) {
    if (eventName == 'mousewheel') {
      hElem.addEventListener('DOMMouseScroll', callback, false);
    }
    hElem.addEventListener(eventName, callback, false);
  }
  else if (hElem.attachEvent) {
    hElem.attachEvent('on' + eventName, callback);
  }
  else { return false; }
  return true;
}


function unhookEvent(hElem, eventName, callback) {
  if (typeof(hElem) == 'string') {
    hElem = document.getElementById(hElem);
  }
  if (!hElem) { return false; }
 
  if (hElem.removeEventListener) {
    if (eventName == 'mousewheel') {
      hElem.removeEventListener('DOMMouseScroll', callback, false);
    }
    hElem.removeEventListener(eventName, callback, false);
  }
  else if (hElem.detachEvent) {
    hElem.detachEvent('on' + eventName, callback);
  }
  else { return false; }
  return true;
}


function cancelEvent(e) {
  e = e ? e : window.event;
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.cancelBubble = true;
  e.cancel = true;
  e.returnValue = false;
  return false;
}


function setHook(obj, act, fun) {
  act ? hookEvent(obj.id, 'mousewheel', fun) : unhookEvent(obj.id, 'mousewheel', fun);
}

function MouseWheelFunction(e) {
  e = e ? e : window.event;
  var wheelElem = e.target ? e.target : e.srcElement;
  var wheelData = e.detail ? e.detail * -1 : e.wheelDelta / 40;
  if (Math.abs(wheelData)>100) { wheelData=Math.round(wheelData/100); }
  documentScroll(wheelData/-3);
  return cancelEvent(e);
}*/

function quad(progress, pow) {
	var a = pow;
	function delta(progress) {
		return Math.pow(progress, a)
	}

	if (progress <= 0.5) return delta(2*progress) / 2;
	else return (2 - delta(2*(1-progress))) / 2;
}

function animate(id, attribute, attrNow, attrEnd, time, func) {
	attribute = attribute;
	var elem = document.getElementById(id);
	if (!attrNow) {
		var attrNow = getElementComputedStyle(id, attribute);
		attrNow = attrNow.substr(0,attrNow.length-2);
		attrNow = +attrNow;
	}
	else {
		var cssNow = attribute+':'+attrNow+'px';
		document.getElementById(id).style.cssText += cssNow;
	}
	var start = new Date;


	var timer = setInterval(function(){

		var progress = (new Date - start)/time;
		if (progress > 1) progress = 1;
		if (func == 'quad') var res = attrNow + (attrEnd - attrNow)*quad(progress, 2);
		else if (func == 'pow') var res = attrNow + (attrEnd - attrNow)*quad(progress, 5);
		else if (func == 'linear') var res = attrNow + (attrEnd - attrNow)*progress;

		var hope;
		if (attribute == 'opacity') hope = attribute+':'+res;
		else if (attribute == 'translateX') {
			hope = '-moz-transform: translateX('+res+'px); ';
			hope += '-ms-transform: translateX('+res+'px); ';
			hope += '-webkit-transform: translateX('+res+'px); ';
			hope += '-o-transform: translateX('+res+'px); ';
			hope += 'transform: translateX('+res+'px)';
		}
		else hope = attribute+':'+res+'px';

		document.getElementById(id).style.cssText += hope;
 		
		if (progress == 1) {
			clearInterval(timer);
		}

	}, 10)

}

}
