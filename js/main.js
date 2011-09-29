---
---
function PadDigits(n, totalDigits) 
    { 
        n = n.toString(); 
        var pd = ''; 
        if (totalDigits > n.length) 
        { 
            for (i=0; i < (totalDigits-n.length); i++) 
            { 
                pd += '0'; 
            } 
        } 
        return pd + n.toString(); 
    }

function timeString (time) {
	var min = Math.floor(time/60);
	var sec = Math.floor(60 * ((time/60) - Math.floor(time/60)));
	sec = PadDigits(sec, 2);
	var timeString = min + ":" + sec;
	return timeString;
}



$(document).ready(function() {
	$('.episode audio').each(function(index){
		$(this).bind('durationchange', function(){
			var totalTime = timeString($(this)[0].duration);
			$($($(this)[0]).siblings('.data')).children('.total_time').html(totalTime);
		});
		$(this).bind('timeupdate', function(){
			var currentTime = timeString(this.currentTime);
			$($($(this)[0]).siblings('.data')).children('.playhead').html(currentTime);
		});
		$(this).bind('play', function(){
			$($($(this)[0]).siblings('.play')).addClass('on');
			$($($(this)[0]).siblings('.pause')).removeClass('on');
		});
		$(this).bind('pause', function(){
			$($($(this)[0]).siblings('.pause')).addClass('on');
			$($($(this)[0]).siblings('.play')).removeClass('on');
		});
		$(this).bind('ended', function(){
			$($($(this)[0]).siblings('.pause')).removeClass('on');
			$($($(this)[0]).siblings('.play')).removeClass('on');
		});
	});
	$('.episode .pause').click(function() {
		$(this).siblings('audio')[0].pause();
	});
	$('.episode .play').click(function() {
		$(this).siblings('audio')[0].play();
	});
});