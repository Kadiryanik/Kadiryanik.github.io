consoleName = document.getElementById('console-name');
consoleInfo = document.getElementById('console-info');

var textLength = 0;
var text = '';

$(document).ready(function() {
    setInterval ('cursorAnimation()', 600);
    cName = $('#c-name');
    cInfo = $('#c-info');
});

function type(cType) {
    if(cType == 0) {
        text = 'Kadir Yanık';
    } else {
        text = 'Computer Engineer';
    }
    typeStep(cType);
}

function typeStep(cType) {
    if(cType == 0) {
        cName.html(text.substr(0, textLength++));
    } else {
        cInfo.html(text.substr(0, textLength++));
    }
    if(textLength < text.length+1) {
        setTimeout('typeStep(' + cType + ')', 100);
    } else {
        textLength = 0;
        text = '';
        if(cType == 0) {
            $('span[id^="cursor"]').remove();
            $("#console-info").append('<span id="cursor">_</span>');
            type(1);
        }
    }
}

function cursorAnimation() {
    $('#cursor').animate({
        opacity: 0
    }, 'fast', 'swing').animate({
        opacity: 1
    }, 'fast', 'swing');
}

setTimeout(function() { type(0); }, 300);