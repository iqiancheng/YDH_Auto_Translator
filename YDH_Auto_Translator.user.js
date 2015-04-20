/*
 *  YDH Auto Translator => A javascript snippet to help you use the YDH System.
 *  YDH Auto Translator
 *  Copyright (C) 2015 千橙<im.qiancheng@gmail.com>
 *	http://www.dinghuo123.com
 * 
 */

// ==UserScript==  
// @name		YDH Auto Translator (zh_CN-->EN)
// @version		0.1.0
// @author		千橙<yanpeng@77ircloud.com>
// @namespace	https://github.com/iqiancheng
// @description	易订货自动翻译助手（中-英）。用于帮助海外用户更好的易订货系统。翻译引擎是由微软必应翻译提供支持，在易订货页面的翻译过程中引起的翻译错误和偏差在所难免，当您使用此助手时，视为您同意并接受，因此所造成的影响与易订货和深圳铱云云计算有限公司无关。	YDH Auto translation assistant (Chinese - English). to help overseas users use the YDH system better.Transation Engine is powered by Mricosoft Bing Transator.	Translation errors and deviations caused by the translation process is inevitable, if you start to use this assistant, you are deemed to agree to and accept, the resulting All disputes in any legal responsibility and has nothing to do YDH System and Shenzhen 77ircloud Cloud Computing Co.,LTD.	Author:千橙<yanpeng@77ircloud.com>
// @include		*://*.dinghuo123.com/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript== 


(function() {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'http://raw.githubusercontent.com/iqiancheng/YDH_Auto_Translator/master/bingTranslator.js';
    document.body.insertBefore(s, document.body.firstChild);
})();
