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
            parent: $parent.length? $parent: $('.soc'),
        },
        style: {
            display: 'flex',
            background: '#69abac',
            padding: '2px',
            color: '#fff',
            fontSize: '20px',
            position: 'absolute',
            border: '1px solid #d8e4e5',
            left: '0px',
            width: '32px',
            top: '-30px',
            height: '24px',
            'justify-content': 'center',
            'align-items': 'center',
        },
        listenSongChange: () => {
            let $currentSongNameContainer = $('.name')[ 0 ];
            let isSongChanged = false;

            $currentSongNameContainer.addEventListener( 'DOMSubtreeModified', function() {
                isSongChanged = true;
                ! isSongChanged && site.init();
            } );
        },
        getCurrentFile: () => {
            const currentSong = $('.playing')[ 0 ].dataset.content - 1;

            return MRPlaylists.files[ currentSong ].mp3;
        },
        tmpl: (currentFile) => {
            return (
                `<a href="${ currentFile }" id="downloadBtn" title="Завантажити">
                    <span class="download-icon"
                    style="background: url(https://cdnradio.obozrevatel.com/img/sprite.png?v=3)
                           -66px -58px / 656px 100px no-repeat;
                           width: 21px;display: block;height: 17px;"></span>
                </a>`
            )
        },
        download: (link, name) => {
            let a = document.createElement('a');

            a.href = link;
            a.download = name;
            a.click();

            return site;
        },
        click(e) {
            const nameContainers = $('.player > .name > a');
            let songName = `${ nameContainers[ 0 ].textContent } - ${ nameContainers[ 1 ].textContent } `;

            e.preventDefault();
            site.download( site.getCurrentFile(), `${ songName }.mp3`);
        },
        init: () => {
            site.el.btn.remove();
            const createTmpl = site.tmpl(site.getCurrentFile());
            site.el.btn = $(createTmpl)
                .css(site.style)
                .click(site.click)
                .appendTo(site.el.parent);
            site.listenSongChange();
        },
    };

    site.init();

})();
