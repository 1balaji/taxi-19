

document.ready = function() {
	var content = document.getElementById('content');
	var homeContent = document.getElementById('homeContent');
	var menu = document.getElementById('menu');
	var bd = document.getElementById('body');
	var home = document.getElementById('home');

	var showmMenu = false;
if (content) {
	content.onclick = function() {
		hideMenu();
	}
}
if (homeContent) {
	home.onclick = function() {
		hideMenu();
	}
}

	document.getElementById('open_menu').onclick = function(event) {
		if (!showmMenu) {
			showmMenu = true;
			this.classList.add('active');
			menu.classList.add('active');
		}
		else {
			hideMenu();
		};
	}


	function setStyles() {
		homeContent = document.getElementById('homeContent');
		if (homeContent) {
			var a = 1;
			if (alertHeight() < 350) a = 51;
			homeContent.style.paddingTop = (alertHeight() - 280)/2+a+'px';
			home.style.height = alertHeight()+'px';
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


	function hideMenu() {
		if (showmMenu) {
			document.getElementById('open_menu').classList.remove('active');
			menu.classList.remove('active');
			showmMenu = false;
		}
	}

}
