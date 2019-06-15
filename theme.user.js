// ==UserScript==
// @name         Stack Exchange 90's theme
// @namespace    http://tampermonkey.net/
// @version      1.4
// @updateURL    https://github.com/a-stone-arachnid/Time-Travel-Mode/raw/master/theme.user.js
// @downloadURL  https://github.com/a-stone-arachnid/Time-Travel-Mode/raw/master/theme.user.js
// @description  Go back in time!
// @author       a stone arachnid
// @match        https://*.stackexchange.com/questions/*
// @match        https://*.askubuntu.com/questions/*
// @match        https://*.stackoverflow.com/questions/*
// @match        https://*.serverfault.com/questions/*
// @match        https://*.superuser.com/questions/*
// @match        https://*.stackapps.com/questions/*
// @match        https://*.mathoverflow.net/questions/*
// @exclude      https://chat.*
// @grant        none
// ==/UserScript==

(function($,se){
    "use strict";
    const styles=`
.ff-comic {
    font-family: "Comic Sans MS", "Comic Sans", cursive, sans-serif !important;
}
.ff-times {
    font-family: 'Times New Roman', Times, serif !important;
}

.fc-fuschia {
    color: #9013FE !important;
}
body {
    background-image: url("https://i.stack.imgur.com/q0kDW.png");
    font-family: 'Times New Roman', Times, serif;
}
#content {
    border-width: 0 4px 0px 4px;
    border-style: solid;
    border-color: #32E830;
}

.container h2, .container h4, .bulletin-title {
    font-family: "Comic Sans MS", "Comic Sans", cursive, sans-serif;
    color: #9013FE !important;
}

.container h5 {
    font-family: "Comic Sans MS", "Comic Sans", cursive, sans-serif;
    font-style: uppercase;
}

.container .bulletin-item-content a {
    text-decoration: underline;
}

.container .favicon {
    background-image: url("https://i.stack.imgur.com/v7beF.png");
    background-position: 0px;
}

.tm-unicorn-front {
    position: absolute;
    top: 200px;
    left: -195px;
}

.tm-unicorn-back {
    position: absolute;
    top: 330px;
    right: -198px;
}

@media  (max-width: 1700px) {
    .tm-unicorn-front, .tm-unicorn-back {
        display: none;
    }
}



.tm-toggle {
    width: 20px;
    height: 20px;
}



#question-header .question-hyperlink {
    font-family: "Comic Sans MS", "Comic Sans", cursive, sans-serif;
    text-decoration: none;
}

#question-header a.s-btn {
    border-radius: 0;
    background: blue;
    color: #fff;
    text-decoration: none;
    border: 3px outset blue;
    cursor: pointer;
}

.question-hyperlink {
    font-family: "Comic Sans MS", "Comic Sans", cursive, sans-serif;
}

#tm-header {
    border-bottom: 4px solid #32E830;
}

#tm-scroll {
    -moz-transform: translateX(100%);
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
    -moz-animation: marquee 15s linear infinite;
    -webkit-animation: marquee 15s linear infinite;
    animation: marquee 15s linear infinite;
}


@-moz-keyframes marquee {
    0%   { -moz-transform: translateX(100%); }
    100% { -moz-transform: translateX(-100%); }
}
@-webkit-keyframes marquee {
    0%   { -webkit-transform: translateX(100%); }
    100% { -webkit-transform: translateX(-100%); }
}
@keyframes marquee {
    0% {
        -moz-transform: translateX(100%);
        -webkit-transform: translateX(100%);
        transform: translateX(100%);
    }
    100% {
        -moz-transform: translateX(-100%);
        -webkit-transform: translateX(-100%);
        transform: translateX(-100%);
    }
}



#left-sidebar {
    background: linear-gradient(0deg, #4395CF 0%, #9A54E3 100%);
    border-left: 4px solid #32E830;
}

#left-sidebar a {;
    color: #F8E71C;
    text-decoration: underline;
}

#left-sidebar li, .fc-medium {
    color: #fff !important;
}

.tm-globe {
    width: 15px;
    height: 15px;
    margin-right: 5px;
}



#mainbar a {
    color: blue;
    text-decoration: underline;
}

.post-text {
    font-family: 'Times New Roman', Times, serif;
}

.user-details, .comment-copy, .post-tag {
    font-family: "Comic Sans MS", "Comic Sans", cursive, sans-serif;
}

.question-page #answers .answer, .wmd-container {
    border: 5px groove;
}

#wmd-preview {
    font-family: "Comic Sans MS", "Comic Sans", cursive, sans-serif;
}



.community-bulletin {
    border: 5px groove #EDE8E7 !important;
}

#tm-views {
    display: inline-block;
    background: #000;
    color: #7FFF00;
    padding: 5px 0px 5px 5px;
    letter-spacing: 5px;
    font-weight: bold;
    font-family: "Consolas";
}

.tm-fire {
    width: 15px;
    height: 20px;
}

#tm-footer {
    background-image: url("https://i.stack.imgur.com/Uc10K.png");
}

#tm-footer-top {
    background-image: url("https://i.stack.imgur.com/g1Bsl.png");
    height: 30px;
    margin-bottom: 75px;
}

#tm-footer-bottom {
    background-image: url("https://i.stack.imgur.com/Iuako.gif");
    height: 30px;
    margin-top: 75px;
}

.tm-form-container {
    background: #9013FE;
    border: 3px inset #fcfcfc;
}

.tm-comments {
    border: 3px inset #fcfcfc;
    height: 350px;
}

.tm-comment-input {
    height: 150px;
}

#tm-guestbook input, #tm-guestbook textarea {
    width: 100%;
}


.site-footer .-link {
    text-decoration: underline;
}
`;
    $("<style>").text(styles).appendTo("head");
    if(document.querySelector("#tm-header")==null){
se.ready(function () {

    injectMarkup();
    initSidebar();
    initGuestbook();
    initPopover();

    function injectMarkup() {
        if ($("#content").css('backgroundColor') === 'rgba(0, 0, 0, 0)' && $("body").css('backgroundColor') !== 'rgba(0, 0, 0, 0)') {
            $("#content").css('backgroundColor', $("body").css('backgroundColor'));
        }

        // Header
        var _h = '';
        _h += '<div id="tm-header" class="bg-black-900 ta-center py24 overflow-hidden">';
        _h += '<div id="tm-scroll">';
        _h += '<img src="https://i.stack.imgur.com/TFzLS.gif" alt="Welcome to Stack Overflow" />';
        _h += '</div>';
        _h += '</div>';
        $("body").prepend(_h);

        // Unicorns?
        $("#left-sidebar").prepend('<img class="tm-unicorn-front" src="https://i.stack.imgur.com/lrSWK.png" alt="UNI..."/>');
        $(".container").append('<img class="tm-unicorn-back" src="https://i.stack.imgur.com/Pe85Z.png" alt="...CORN"/>');

        // Left sidebar link
        var _l = '';
        _l += '<div class="w100 ta-center fc-white ff-comic mt32">';
        _l += '<img class="w100 mb24" src="https://i.stack.imgur.com/1c2Mk.png" />';
        _l += '<p class="tt-uppercase fw-bold fs3 mb24">~Under Construction~</p>';
        _l += '<p class="mb0">Big changes for Y2K!</p>';
        _l += '<a href="#" class="js-tm-sidebar-toggle s-btn s-btn__primary d-inline-block fc-white td-none mt24">Go to the future</a>';
        _l += '<img class="w100 mt24" src="https://i.stack.imgur.com/1c2Mk.png" />';
        _l += '</div>';
        $("#left-sidebar nav").append(_l);

        // View Counter
        var __3 = $("#qinfo tr:nth-child(2) td:last-child .label-key b").text();
        console.log(__3);
        var __6 = __3.split(" ");
        var __9 = '<span id="tm-views">'+__6[0].replace(/,/g,"")+'</span> '+__6[1];
        $("#qinfo tr:nth-child(2) td:last-child b").html(__9);

        var _f = ''; // Injected footer
        _f += '<div id="tm-footer">';
        _f += '<div id="tm-footer-top"></div>';
        _f += '<h1 class="ta-center"><img class="wmx100" src="https://i.stack.imgur.com/UtpOa.png" alt="Guestbook"></h1>';
        _f += '<div class="grid mx-auto wmx8 ff-comic fc-white md:fd-column">';
        _f += '<div class="js-tm-form-container tm-form-container grid--cell5 grid--cell12 p12 fc-white">';
        _f += '<form id="js-tm-form">';
        _f += '<p class="mb4"><label for="guestbook-name">Name:</label></p>';
        _f += '<input class="js-tm-name-input mb16 w100" type="text" name="guestbook-name" required />';
        _f += '<p class="mb4"><label for="guestbook-name">Comment:</label></p>';
        _f += '<textarea class="js-tm-comment-input w100 hs1 mb16" name="guestbook-comment" required></textarea>';
        _f += '<input id="js-tm-submit" class="w100" type="submit" value="Sign our guestbook!" />';
        _f += '</form>';
        _f += '</div>';
        _f += '<div class="js-tm-comments tm-comments grid--cell7 grid--cell12 p12 overflow-y-scroll bg-white">';
        _f += '</div>';
        _f += '</div>';
        _f += '<div id="tm-footer-bottom"></div>';
        _f += '</div>';
        $("#footer").prepend(_f);

        // Site footer
        $(".site-footer--copyright p")
            .before('<p class="fw-bold fc-white mb0 ff-comic fs-body1">Proudly built in Notepad</p>')
            .after('<p class="fw-bold fc-white ff-comic tt-uppercase fs-body1">Best viewed in <img class="d-inline-block" src="https://i.stack.imgur.com/9e5RT.png" alt="Netscape 3.0"></p>');


        // Gif injections
        var globe = '<img src="https://i.stack.imgur.com/Txh9N.gif" class="tm-globe" />';
        $("svg.svg-icon.iconGlobe").before(globe).remove();

        var yourAnswer = $("#post-form > .space");
        if(yourAnswer.length) {
            var answer_img = '<img src="https://i.stack.imgur.com/2TdH8.png" alt="Your Answer" />';
            yourAnswer.html(answer_img);
        }

        var $hnqHeadline = $("#hot-network-questions h4");
        if ($hnqHeadline.length) {
            var flame = '<img src="https://i.stack.imgur.com/74roz.gif" class="tm-fire" />';
            $hnqHeadline.append(flame).prepend(flame);
        }

        if(document.querySelector(".js-cursor-container") == null)
        {
            $("<span>").addClass("js-cursor-container").prependTo("#content > div");
        }
    }

    function initSidebar() {
        $(".js-tm-sidebar-toggle").click(function(e) {
            e.preventDefault();
            se.helpers.showFancyOverlay({message:"To return to the future, disable the \"Stack Exchange 90's Theme\" userscript."});
        })
    }

    function initGuestbook() {
        populateGuestbook();
        bindGuestbook();

        // Randomly add items
        setInterval(function () {
            if (Math.floor(Math.random() * 3) === 0) {
                addRandomComment();
            }
        }, 300);
    }

    function initPopover() {
        var $popover = $(".js-toggle-popover");
        setTimeout(function () {
            $popover.insertBefore(".js-time-machine-button").removeClass("d-none").addClass("is-visible");
        }, 1000 * 4);

        $(document).on("click touchstart", ".js-time-machine-button, .js-toggle-popover-close", function () {
            $popover.remove();
            $.cookie("tm2019d", "1", { path: '/', expires: 2 });
        });
    }

    function populateGuestbook() {
        for (var i = 0; i < 10; i++) {
            addRandomComment();
        }
    }

    function bindGuestbook() {
        $("#js-tm-form").submit(function (e) {
            e.preventDefault();

            var $name = $(".js-tm-name-input");
            var $comment = $(".js-tm-comment-input");

            if ($name.val().length === 0 || $comment.val().length === 0) return;

            addComment($name.val(), $comment.val());

            $name.val(null);
            $comment.val(null);
        })
    }

    function addRandomComment() {
        var names = [
            "adam",
            "jane",
            "meg",
            "jon",
            "josh",
            "lisa",
            "brian"
        ];
        var comments = [
            "Is this an April Fool's joke?",
            "this is for april 1",
            "april fools :)",
            "Where's the webring? :(",
            "check out this song! http://myspace.com/soeb__42345",
            "FIIIIIIIRRRSSSSTTTTTTT",
            "...",
            "lol",
            "lol jk",
            "testing.",
            "the unicorns are genius",
            "did they kill sparkles???",
            "fireballs would have been better",
            "I forgot about <marquee> lol",
            "<marquee> !!!",
            "What about <blink>?",
            "testing...",
            "test test test",
            "does this wor",
            "OMG HAHAHA",
            "omg",
            "heh.",
            "hehehe",
            "I think they got haxxxed",
            "There are so many better things for the devs to do.",
            "I guess it's April :P",
            "f",
            "it's almost Y2K!!!",
            "what browser are you using?",
            "netscape 4.05",
            "ff",
            "DHTML!",
            "Flash"
        ];

        addComment(names[Math.floor(Math.random()*names.length)], comments[Math.floor(Math.random()*comments.length)])
    }

    function escapeHtml(text) {
        var map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };

        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }

    function addComment(name, comment) {

        var content = '<div class="ff-comic fc-fuschia bb bbw2 bc-black-3 fs-body3 p12">';
        content += '<p class="mb4">' + escapeHtml(comment) + '</p>';
        content += '<p class="tm-comment-info ff-times fs-caption">@' + escapeHtml(name) + ' - 2019/04/01</p>'
        content += '</div>';

        $(".js-tm-comments").prepend(content);
    }

    /*!
             * Fairy Dust Cursor.js
             * - 90's cursors collection
             * -- https://github.com/tholman/90s-cursor-effects
             * -- https://codepen.io/tholman/full/jWmZxZ/
             */

    (function fairyDustCursor() {

        var possibleColors = ["#D61C59", "#E7D84B", "#1B8798"]
        var width = window.innerWidth;
        var height = window.innerHeight;
        var cursor = {x: width/2, y: width/2};
        var particles = [];

        function init() {
            bindEvents();
            loop();
        }

        // Bind events that are needed
        function bindEvents() {
            document.addEventListener('mousemove', onMouseMove);
            window.addEventListener('resize', onWindowResize);
        }

        function onWindowResize(e) {
            width = window.innerWidth;
            height = window.innerHeight;
        }

        function onMouseMove(e) {
            cursor.x = e.clientX;
            cursor.y = e.clientY;

            addParticle( cursor.x, cursor.y, possibleColors[Math.floor(Math.random()*possibleColors.length)]);
        }

        function addParticle(x, y, color) {
            var particle = new Particle();
            particle.init(x, y, color);
            particles.push(particle);
        }

        function updateParticles() {

            // Updated
            for( var i = 0; i < particles.length; i++ ) {
                particles[i].update();
            }

            // Remove dead particles
            for( var j = particles.length -1; j >= 0; j-- ) {
                if( particles[j].lifeSpan < 0 ) {
                    particles[j].die();
                    particles.splice(j, 1);
                }
            }

        }

        function loop() {
            setInterval(function() {
                updateParticles();
            }, 1000/60);
        }

        // Particles!

        function Particle() {
            this.character = "*";
            this.lifeSpan = 120; //ms
            this.initialStyles ={
                "position": "fixed",
                "display": "inline-block",
                "top": "0px",
                "left": "0px",
                "pointerEvents": "none",
                "touch-action": "none",
                "z-index": "10000000",
                "fontSize": "25px",
                "will-change": "transform"
            };

            // Init, and set properties
            this.init = function(x, y, color) {

                this.velocity = {
                    x:  (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
                    y: 1
                };

                this.position = {x: x + 10, y: y + 10};
                this.initialStyles.color = color;

                this.element = document.createElement('span');
                this.element.innerHTML = this.character;
                applyProperties(this.element, this.initialStyles);
                this.update();

                document.querySelector('.js-cursor-container').appendChild(this.element);
            };

            this.update = function() {
                this.position.x += this.velocity.x;
                this.position.y += this.velocity.y;
                this.lifeSpan--;

                this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px, 0) scale(" + (this.lifeSpan / 120) + ")";
            }

            this.die = function () {
                this.element.parentNode.removeChild(this.element);
            }

        }

        /**
                   * Utils
                   */

        // Applies css `properties` to an element.
        function applyProperties( target, properties ) {
            for( var key in properties ) {
                target.style[ key ] = properties[ key ];
            }
        }

        if (!('ontouchstart' in window || navigator.msMaxTouchPoints)) init();
    })();
});
    }
})(window.jQuery,window.StackExchange);
