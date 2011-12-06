(function(){
 try{
	 var jq=document.createElement('script');
	 jq.type='text/javascript';
	 jq.async=false;
	 jq.src='http://google-analytics.com/ga.js';
	 var s=document.getElementsByTagName('script')[0];
	 s.parentNode.insertBefore(jq,s);
 }
 catch(err){
	 alert('problem');
 }
 })();


/////////////////////////

 var jq=document.createElement('script');
	 jq.type='text/javascript';
	 jq.async=false;
	 jq.src='http://google-analytics.com/ga.js';
document.body.appendChild(jq);
console.log(_gat);



var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-27513053-1']);
_gaq.push(['_setDomainName', window.document.domain]);
_gaq.push(['_setAllowLinker', true]);
_gaq.push(['_trackPageview']);


//////


var jq=document.createElement('script');
jq.type='text/javascript';
jq.async=false;
jq.src='http://google-analytics.com/ga.js';
jq.onload = function(){
	console.log("LOADED");
	var _tracker = _gat._getTracker("UA-27513053-1");
	_tracker._trackPageview();
	_tracker._trackEvent("Logger", "domain", window.document.domain);
	_tracker._trackEvent("Logger", "url", window.document.URL);
	
};
