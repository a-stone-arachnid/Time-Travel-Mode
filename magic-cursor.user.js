// ==UserScript==
// @name         Decorated Cursor
// @version      2
// @description  Get the fancy mouse found in the 2019 April Fools theme network-wide!
// @author       a stone arachnid
// @include      https://*stackoverflow.com/*
// @include      https://*superuser.com/*
// @include      https://*serverfault.com/*
// @include      https://*stackapps.com/*
// @include      https://*askubuntu.com/*
// @include      https://*mathoverflow.net/*
// @include      https://*stackexchange.com/*
// @exclude      http*://chat.*/
// @grant        none
// ==/UserScript==
(function($,se){
    "use strict";
    const style = `
.js-cursor-container{
    font: 25px "Times New Roman", Times, serif;
}
`;
    $("<style>").text(style).appendTo("head");
se.ready(()=>{
    if(document.querySelector(".js-cursor-container") == null)
    {
        $("<span>").addClass("js-cursor-container").prependTo("#content > div:first-of-type");
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

        function loop(){
            setInterval(function(){
                updateParticles()
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
        // Applies css `properties` to an element.
        function applyProperties( target, properties ) {
            for( var key in properties ) {
                target.style[ key ] = properties[ key ];
            }
        }

        if (!('ontouchstart' in window || navigator.msMaxTouchPoints)) init();
    })();
});
})(window.jQuery,window.StackExchange);
