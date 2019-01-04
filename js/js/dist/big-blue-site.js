/**
* @source: https://github.com/BigBlueArms/BigBlueSite
*
* @licstart  The following is the entire license notice for the
*  JavaScript code in this page.
*
* Copyright © 2018 Léo Demicheli
* This work is free. You can redistribute it and/or modify it under the
* terms of the Do What The Fuck You Want To Public License, Version 2,
* as published by Sam Hocevar. See http://www.wtfpl.net/ for more details.
*
* @licend  The above is the entire license notice
* for the JavaScript code in this page.
*/
"use strict";var BigBlueColors={blue1:"#2361a7",blue2:"#11293b",blue3:"#2497d4",blue4:"#13344f",blue5:"#a0c6e8",blue6:"#010202",blueCount:2,color1:"#2361a7",color2:"#8fc156",color3:"#2497d4",color4:"#e4cb53",color5:"#ef763e",color6:"#010202",color7:"#961919",color8:"#d72330",color9:"#690f36",colorCount:9};try{module.exports=BigBlueColors}catch(e){}jQuery(function(){var e=Array.from(document.getElementsByClassName("bba-gallery-element"));if(0!==e.length)for(var t=e[0].parentNode,o=0;o<e.length;o+=3){var n=e[o];n.classList.add("big"),t.appendChild(n);var l=e[o+1];if(l){l.classList.add("small");var a=e[o+2];if(a){var i=document.createElement("div");i.classList.add("bba-gallery-small-container"),i.appendChild(l),i.appendChild(a),a.classList.add("small"),t.appendChild(i)}}}}),jQuery(function(){var t=null,e=null,o=2e3,n=null;function l(){t.style.transform="scale(1,1)"}function a(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:null;e||(e=o),clearTimeout(n),n=setTimeout(function(){t.style.transform="scale(0,0)"},e)}t=document.getElementById("bba-nav"),(e=document.getElementById("bba-logo")).addEventListener("mousemove",function(e){l(),a()}),e.addEventListener("pointerdown",function(e){l(),a()}),t.addEventListener("mouseover",function(e){l(),clearTimeout(n)}),t.addEventListener("mouseleave",function(e){a()}),e.ontouchstart=function(e){l(),a(3e3),e.stopPropagation(),e.preventDefault()},e.onclick=function(e){console.log("event type",e.type),document.location=BigBlueApp.siteUrl},e.ondblclick=function(e){console.log("event type",e.type),document.location=BigBlueApp.siteUrl},e=document.getElementById("bba-logo")});var BigBlueModal={modals:{},configPrez:{background:"/images/prez-full-container.svg",closeClass:"bba-modal-close prez",top:7,left:10,right:7,height:63},configTeam:{background:"/images/team-modal.svg",closeClass:"bba-modal-close team",top:23,left:20,right:36,height:37},createModal:function(t,e){var o=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null,n=3<arguments.length&&void 0!==arguments[3]?arguments[3]:BigBlueApp.assetsUrl;if(BigBlueModal.modals[t]){document.body.appendChild(BigBlueModal.modals[t].background),BigBlueModal.modals[t].shown=!0;var l=BigBlueModal.modals[t].modal;document.body.appendChild(BigBlueModal.modals[t].modal),setTimeout(function(){l.classList.remove("hidden")},0)}else{var a=document.createElement("div");a.classList.add("bba-modal-container"),a.style.top="".concat(window.scrollY,"px"),window.innerWidth<700&&o&&(e=o);var i=document.createElement("div");i.classList.add("bba-modal"),i.classList.add("hidden"),setTimeout(function(){i.classList.remove("hidden")},0),i.style.backgroundImage='url("'.concat(n).concat(e.background,'")'),i.style.top="calc(".concat(window.innerHeight/2,"px + ").concat(window.scrollY,"px)");var r=document.createElement("div");r.className=e.closeClass,i.appendChild(r),r.onclick=function(){BigBlueModal.hideModal(t)},a.onpointerdown=function(){BigBlueModal.hideModal(t)},window.addEventListener("keydown",function(e){"Escape"===e.key&&BigBlueModal.hideModal(t)});var s=document.createElement("div");s.style.height="".concat(e.top,"%");var d=document.createElement("div");d.style.height="".concat(e.height,"%"),d.style.marginLeft="".concat(e.left,"%"),d.style.marginRight="".concat(e.right,"%"),d.style.overflowY="auto";var c=document.createElement("div");c.classList.add("bba-modal-content"),c.innerHTML=document.getElementById(t).innerHTML;var u=c.getElementsByTagName("iframe")[0];u&&u.setAttribute("src",u.getAttribute("src")+"?autoplay=1"),i.appendChild(s),i.appendChild(d),d.appendChild(c),document.body.appendChild(a),document.body.appendChild(i),BigBlueModal.modals[t]={modal:i,background:a,shown:!0}}},hideModal:function(e){if(BigBlueModal.modals[e].shown){var t=BigBlueModal.modals[e].modal;document.body.removeChild(BigBlueModal.modals[e].background),t.classList.add("hidden"),setTimeout(function(){document.body.removeChild(BigBlueModal.modals[e].modal)},150),BigBlueModal.modals[e].shown=!1}}};jQuery(function(){var r=800,s=document.querySelectorAll(".bba-prez"),o=document.getElementById("masthead"),d=o.offsetHeight,i=window.innerHeight-o.offsetHeight,c=0,u=0,m=null;function e(){d=o.offsetHeight,i=window.innerHeight-o.offsetHeight;for(var e=function(e){var o=s[e];e<s.length-1&&(o.next=s[e+1]),0<e&&(o.prev=s[e-1]),o.isTile=!0;var n=d;0===e&&console.log("1st prez computed height",o.clientHeight),console.log("height",i),o.style.height="auto",setTimeout(function(){var e,t=o.getElementsByClassName("bba-prez-left")[0];e=t?Math.max(t.clientHeight,i):Math.max(o.clientHeight+n,i),o.style.height=e+"px",o.computedHeight=e},50)},t=0;t<s.length;t++)e(t)}function g(e){var t=e.top+window.scrollY-d;o.style.top!==t+"px"&&(o.style.opacity=0,setTimeout(function(){o.style.top=t+"px",o.style.opacity=1},300))}function p(e){var t=e.getBoundingClientRect().top+window.scrollY-d;setTimeout(function(){window.scroll(window.scrollX,t),c=window.scrollY},100),g(e.getBoundingClientRect()),u=Date.now()}e(),function(){for(var e=document.getElementsByClassName("bba-prez-to-appear"),t=0;t<e.length;t++)e[t].style.opacity=1}(),window.onresize=e,setTimeout(function(){e(),window.addEventListener("scroll",function(e){var t=Date.now()-u;!function a(i){clearTimeout(m),m=setTimeout(function(){var e,t=i-r;if(0<t)for(var o=0;o<s.length;o++){var n=s[o],l=n.getBoundingClientRect();if(0<(e=l).top&&e.top<e.bottom-e.top+d){g(l);break}}else setTimeout(function(){return a(1e9)},Math.max(-t-200,0))},200)}(t);var o=!0;window.scrollY<c&&(o=!1);for(var n=0;n<s.length;n++){var l=s[n],a=l.getBoundingClientRect();if(o&&l.next&&a.bottom<i&&a.top>-l.computedHeight&&r<t){console.log("UP"),console.log("bottom",a.bottom),console.log("top",a.top),p(l.next);break}if(!o&&l.prev&&a.top>d+50&&a.top<.5*l.computedHeight&&r<t){console.log("BOT"),console.log("bottom",a.bottom),console.log("top",a.top),p(l.prev);break}}c=window.scrollY})},2e3)});var BBASocialInfos=[{faClasses:["fab","fa-twitter"],url:"https://twitter.com/bigbluearms"},{faClasses:["fab","fa-facebook-f"],url:"https://www.facebook.com/bigbluearms"},{faClasses:["fab","fa-youtube"],url:"https://www.youtube.com/channel/UCmcNxsoycWKv7jMsHkEEmMw"}];jQuery(function(){var l=document.getElementsByClassName("bba-social")[0];BBASocialInfos.forEach(function(e){var t=document.createElement("a");t.href=e.url,t.target="_blank";var o=document.createElement("div");o.classList.add("bba-social-round");var n=document.createElement("i");e.faClasses.forEach(function(e){n.classList.add(e)}),o.appendChild(n),t.appendChild(o),l.appendChild(t)})});var ColorFirstLetters={colorizeWordsFirstLetterByClass:function(e,t){for(var o=document.getElementsByClassName(e),n=0;n<o.length;n++)ColorFirstLetters.colorizeWordsFirstLetterOfElement(o[n],t)},colorizeWordsFirstLetterOfElement:function(e,t){e.innerHTML=ColorFirstLetters.colorizeWordsFirstLetter(e.innerHTML,t)},colorizeWordsFirstLetter:function(e,t){for(var o=2<arguments.length&&void 0!==arguments[2]?arguments[2]:" ",n=(e=e.trim()).split(o),l=0;l<n.length;l++){var a=n[l];n[l]='<span style = "color:'.concat(t,'">').concat(a.charAt(0),"</span>").concat(a.substring(1))}return n.join(o)}};jQuery(function(){var o=document.getElementsByClassName("bba-team-video");if(0!==o.length){for(var e=function(e){var t=o[e];t.parentNode.addEventListener("mouseover",function(){t.paused&&t.play()}),t.parentNode.onmouseleave=function(){t.paused||t.pause()}},t=0;t<o.length;t++)e(t);var n=document.getElementsByClassName("bba-tile-wrap");for(t=0;t<n.length;t++){var l=(t+1)%BigBlueColors.colorCount,a=BigBlueColors["color".concat(l)],i=n[t];i.getElementsByClassName("bba-circle")[0].style.backgroundColor=a;var r=i.getElementsByClassName("bba-tile-name");ColorFirstLetters.colorizeWordsFirstLetterOfElement(r[0],a,"white"),ColorFirstLetters.colorizeWordsFirstLetterOfElement(r[1],a)}}}),jQuery(function(){jQuery.getJSON(BigBlueApp.themeUrl+"/data/cfg-video-headers.json").done(function(e){var t,o;e[BigBlueApp.postSlug]&&(t=e[BigBlueApp.postSlug],(o=document.createElement("div")).id="bba-header-video-container",o.innerHTML='<div id="bba-header-video-container">\n                <video autoplay muted loop id="bba-header-video" >\n                    <source src="'.concat(BigBlueApp.assetsUrl,"/videos/").concat(t,'" type="video/mp4">\n                </video>\n            </div>'),document.body.insertBefore(o,document.body.firstChild))})});