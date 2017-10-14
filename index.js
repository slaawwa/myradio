// ==UserScript==
// @name         Скачать пісню з radio.obozrevatel.com
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       Slaawwa
// @match        http://radio.obozrevatel.com/ua/share/*
// @match        http://radio.obozrevatel.com/ua/newplayer/file/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let $parent = $('.thumbs');

    let site = {
        el: {
            btn: $('#downloadBtn'),
            parant: $parent.length? $parent: $('.soc'),
        },
        style: {
            background  : '#69abac',
            padding     : '2px',
            color       : '#fff',
            fontSize    : '20px',
        },
        tmpl: `<a href="${MRPlaylists.files[0].mp3}" id="downloadBtn" title="Завантажити">&#x1f4be;</a>`,
        download: (link, name) => {
            let a = document.createElement('a');
            a.href = link;
            a.download = name;
            a.click();
            return site;
        },
        click(e) {
            e.preventDefault();
            let name = $('.ttl b').text().trim().replace(/\s+/g, ' ');
            name = name || $('.ttl').text().trim();
            site.download(MRPlaylists.files[0].mp3, `${name}.mp3`);
        },
        init: () => {
            site.el.btn.remove();

            site.el.btn = $(site.tmpl)
                .css(site.style)
                .click(site.click)
                .appendTo(site.el.parant);
        },
    };

    site.init();

})();
