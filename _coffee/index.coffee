PadDigits = (n, totalDigits) ->
	n = n.toString()
	pad = ''
	if totalDigits > n.length
		for i in [1..(totalDigits-n.length)]
			pad += '0'
	pad + n.toString()

TimeString = (time) ->
	min = Math.floor(time/60)
	sec = Math.floor(60 * ((time/60) - Math.floor(time/60)))
	sec = PadDigits(sec, 2)
	min + ":" + sec

RenderCommentCounters = ->
	for comment_count in $('.episode .comment_count a')
		count = PadDigits(parseInt($(comment_count).text()), 3)
		count_array = count.split('')
		output = ''
		for digit in count_array
			output += "<span class=\"count_#{digit}\">#{digit}</span>"
		$(comment_count).html(output)
	
$ ->
	RenderCommentCounters()
	
	if Modernizr.audio.mp3 == false
		$('.episode .audio').addClass('disabled')
		$('.episode .audio_download').removeClass('disabled')
	else
		for audioElement in $('.episode audio')
			$(audioElement).bind 'durationchange', ->
				totalTime = TimeString($(audioElement)[0].duration)
				$($($(audioElement)[0]).siblings('.data')).children('.total_time').html(totalTime)
			$(audioElement).bind 'timeupdate', ->
				currentTime = TimeString(audioElement.currentTime)
				$($($(audioElement)[0]).siblings('.data')).children('.playhead').html(currentTime)
			$(audioElement).bind 'play', ->
				$($($(audioElement)[0]).siblings('.play')).addClass('on')
				$($($(audioElement)[0]).siblings('.pause')).removeClass('on')
			$(audioElement).bind 'pause', ->
				$($($(audioElement)[0]).siblings('.pause')).addClass('on')
				$($($(audioElement)[0]).siblings('.play')).removeClass('on')
			$(audioElement).bind 'ended', ->
				$($($(audioElement)[0]).siblings('.pause')).removeClass('on')
				$($($(audioElement)[0]).siblings('.play')).removeClass('on')
		$('.episode .pause').click =>
			alert 'tada'
			# $(this).siblings('audio')[0].pause()
		$('.episode .play').click =>
			# $(this).siblings('audio')[0].play();

