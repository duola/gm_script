// ==UserScript==
// @name		    Jump to Top/Bottom of page with hotkeys
// @author		    哆啦B梦的弟弟
// @downloadURL     https://github.com/duola/gm_script/blob/master/Jump_to_top_bottom_of_page_with_hotkeys/jumptotopbottomofpagewithhotkeys.user.js
// @description		为网页增加向页尾、页首的按钮及快捷键，2014.5.11更新。
// @require     	http://js-addon.googlecode.com/files/autoupdatehelper.js?v=1
// @updateURL       http://userscripts.org/scripts/source/108242.meta.js
// @version     	2014.5.11
// @icon			https://raw.githubusercontent.com/duola/gm_script/master/icon.png
// @include     	*
// @exclude     	https://mail.google.com/*
// @exclude     	http://dzh.mop.com/*
// @exclude     	http://www.douban.com/photos/*
// ==/UserScript==

/* ************************ 页面效果 ************************ */
//top按钮
function create_top_button() {
	var a = document.createElement('span');
	var c = 'opacity:0.3;-moz-transition-duration:0.2s;-webkit-transition-duration:0.2s;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUBAMAAAByuXB5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAbUExURf///6qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpshoL4AAAAIdFJOUwARM2aImczuGAB4owAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAEZJREFUGNNj6IABBgQLB2BME4CyxDoSIQymio52BTBLHaixCMRgrgCy2g2ALAuwac0MDCxQgx0YIqCsVhTbOIBUA9gUslkA7dcxR/3Xli8AAAAASUVORK5CYII=") no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7);border-radius:5px 5px 5px 5px;cursor:pointer;position:fixed;bottom:50%;width:40px;height:40px;right:0px;z-index:9999';
	a.style.cssText = c;
	a.addEventListener('mouseover', function(){ a.style.opacity = 1;}, false);
	a.addEventListener('mouseout', function(){ a.style.opacity = 0.3; }, false);
	a.addEventListener('click', function(){ window.scrollTo(0,0); }, false );
	document.body.appendChild(a);
};
if(self == top) create_top_button();
//bottom按钮
function create_bottom_button() {
    var newHeight = document.body.scrollHeight + 9999999999;
	var b = document.createElement('span');
	var c = 'opacity:0.3;-moz-transition-duration:0.2s;-webkit-transition-duration:0.2s;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUBAMAAAByuXB5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAbUExURf///6qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpshoL4AAAAIdFJOUwARM2aImczuGAB4owAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAE1JREFUGNNjYGDg6OjoaGAAAfJZHTDAEAFltDKwQFkODAwWYEYzUCFzBZDRbgDSqw5kFYFNYaroaFcAsxjEOhIhDAbGNAEGHABhG5wFAH6qMUfw6SaOAAAAAElFTkSuQmCC") no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7);border-radius:5px 5px 5px 5px;cursor:pointer;position:fixed;top:51%;width:40px;height:40px;right:0px;z-index:9999';
	b.style.cssText = c;
	b.addEventListener('mouseover', function(){ b.style.opacity = 1; }, false);
	b.addEventListener('mouseout', function(){ b.style.opacity = 0.3; }, false);
	b.addEventListener('click', function(){ window.scrollTo(0,document.body.scrollHeight); }, false);
	document.body.appendChild(b);
};
if(self==top) create_bottom_button();

//翻页快捷键
(function () {
    var newHeight = document.body.scrollHeight + 9999999999;
    var scroll = {
        'j' : function() { scrollBy(0,  40) },
		'J'	: function() { scrollBy(0,  40) }, 						// 往下翻一点点
        'n' : function() { scrollBy(0,  150) },
		'N' : function() { scrollBy(0,  150) }, 					// 往下翻多一点
		'd' : function() { scrollBy(0,  window.innerHeight / 2) },
		'D' : function() { scrollBy(0,  window.innerHeight / 2) },  // 往下翻（最多）
		
		'k' : function() { scrollBy(0, -40) },
		'K' : function() { scrollBy(0, -40) }, 						// 往上翻一点点
        'm' : function() { scrollBy(0, -150) },
		'M' : function() { scrollBy(0, -150) }, 					// 往上翻多一点
		'a' : function() { scrollBy(0, -window.innerHeight / 2) },
		'A' : function() { scrollBy(0, -window.innerHeight / 2) },  // 往上翻（最多）
		
		'w' : function() { scrollTo(0, 0) },
		'W' : function() { scrollTo(0, 0) },						// 回页首
		
		's' : function() { scrollTo(0,document.body.scrollHeight) },
		'S' : function() { scrollTo(0,document.body.scrollHeight) },// 回页尾
    };
    var formElement = { 'input':true, 'button':true, 'select':true, 'textarea':true };
    window.addEventListener('keypress',
        function(e) {
            if (e.metaKey || e.ctrlKey || e.altKey ||
                formElement[e.target.tagName.toLowerCase()] || e.target.isContentEditable || document.designMode ==="on") {
                return; }
            var key = (e.shiftKey? 'S-' : '') + String.fromCharCode(e.charCode);
            if (scroll[key]) {
                scroll[key]();
                e.preventDefault();
                e.stopPropagation();
            }
        }, false);
})();

/* 
//快速跳转至Firefox吧
var Firefox = /tieba\.baidu\.com/i.test(location.href);
!Firefox && openFirefoxBar();// 判断是否为贴吧页面
function openFirefoxBar(){
	var k=[];
	document.addEventListener('keydown', function(e){
		k.push(e.keyCode);
		if(k.toString().indexOf('70,73,82,69,70,79,88')>=0){
		   GM_openInTab('http://tieba.baidu.com/f?kw=firefox');
		   k=[];
		}
	}, false); 
};
*/

//自动更新
new Updater({name: 'Jump to Top/Bottom of page with hotkeys',id: '108242',version: '1.9.6'}).check();