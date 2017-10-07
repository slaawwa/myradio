// ==UserScript==
// @name         Скачать пісню з radio.obozrevatel.com
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://radio.obozrevatel.com/ua/newplayer/file/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let site = {
        el: {
            btn: $('#downloadBtn'),
            parant: $('.thumbs'),
        },
        style: {
            background  : '#69abac',
            padding     : '2px',
            color       : '#fff',
            fontSize    : '20px',
        },
        tmpl: `<a href="#" id="downloadBtn" title="Завантажити">&#x1f4be;</a>`,
        download: (link, name) => {
            let a = document.createElement('a');
            a.href = link;
            a.download = name;
            a.click();
            return site;
        },
        click(e) {
            e.preventDefault();
            let name = $('.name:first').text().trim().replace(/\s+/g, ' ');
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
