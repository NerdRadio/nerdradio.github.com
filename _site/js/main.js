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
	$('.comment_count a').each(function(index){
		var count = PadDigits(parseInt($(this).text()), 3);
		var count_array = count.split('');
		var output = '';
		for (var i=0; i < count_array.length; i++) {
			output += '<span class="count_'+count_array[i]+'">'+count_array[i]+'</span>';
		}
		$(this).html(output);
	});
	if (Modernizr.audio.mp3 == false) {
		$('.episode .audio').addClass('disabled');
		$('.episode .audio_download').removeClass('disabled');
	} else {
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
		$('.episode .volume').each(function(index){
			$(this).click(function(e){
				var offset = $(this).offset();
				var clickPosition = e.pageX - offset.left + 1;
				var audio = $(this).parent().siblings('audio')[0];
				audio.volume = clickPosition/100;
				$(this).children('.left').css('width', clickPosition);
				$(this).children('.right').css('width', 100 - clickPosition);
				
			});
		});
		$('.episode .pause').click(function() {
			$(this).siblings('audio')[0].pause();
		});
		$('.episode .play').click(function() {
			$(this).siblings('audio')[0].play();
		});
	}
});