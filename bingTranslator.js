window._mstAppId = 'TfMk4dqD4fi9u0eQDWHlhd1lUOurcIXR4TfLsPrt1O2fSwwMnJWh484rP94ZNi9E5';
window._mstToLang = 'en';
?
var sAppId = window._mstAppId || '';
var sToLang = window._mstToLang || 'en';

var sDocText = document.body.innerText || document.body.textContent || '';
var aDetectText = [];

for (var i = 10; i >= 0; --i)
{
	var sTextChunk = sDocText.substr((i * sDocText.length) / 10, 100);
	if (sTextChunk && sTextChunk.indexOf('{') == -1 && sTextChunk.indexOf('}') == -1)
	{
		aDetectText.push(sTextChunk.replace(/\s+/g, ' '));
	}
}

var sDetectTextEnc = encodeURIComponent(aDetectText.join(' '));
if (sDetectTextEnc.length > 1600)
{
	sDetectTextEnc = sDetectTextEnc.substr(0, 1600);
}

window._mstondetectcomplete = function (sDetectedLanguage)
{
	sDetectedLanguage = sDetectedLanguage || 'en';

	var eWidgetDiv = document.getElementById('MicrosoftTranslatorWidget');
	if (!eWidgetDiv)
	{
		var eWidgetDiv = document.createElement('div');
		eWidgetDiv.id = 'MicrosoftTranslatorWidget';
		eWidgetDiv.style.display = 'none';
		document.body.insertBefore(eWidgetDiv, document.body.firstChild);
	}

	var eWidgetScript = document.createElement('script');
	eWidgetScript.type = 'text/javascript';
	eWidgetScript.src = 'https://ssl.microsofttranslator.com/ajax/v2/widget.aspx?from=_' + sDetectedLanguage + '&toolbar=thin';
	document.body.insertBefore(eWidgetScript, document.body.firstChild);

	var nLoadTries = 0;
	var oLoadLoop = setInterval(function ()
	{
		++nLoadTries
		if (window.Microsoft && window.Microsoft.Translator)
		{
			clearInterval(oLoadLoop);
			Microsoft.Translator.translate(document.body, sDetectedLanguage, sDetectedLanguage == sToLang ? (sToLang == 'en' ? 'es' : 'en') : sToLang);
		}
		else if (nLoadTries > 10)
		{
			clearInterval(oLoadLoop);
		}
	}, 1000);
}

var eDetectScript = document.createElement('script');
eDetectScript.type = 'text/javascript';
eDetectScript.src = 'https://api.microsofttranslator.com/v2/ajax.svc/Detect?appId=' + sAppId + '&text=' + sDetectTextEnc + '&oncomplete=_mstondetectcomplete';
document.body.insertBefore(eDetectScript, document.body.firstChild);