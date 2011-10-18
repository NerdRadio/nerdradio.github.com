PadDigits = (n, totalDigits) ->
	n = n.toString()
	pad = ''
	if totalDigits > n.length
		for i in [1..(totalDigits-n.length)]
			pad += '0'
	pad + n.toString()

TimeString = (time) ->
	min = Math.floor(time/60)
	min = PadDigits(min, 2)
	sec = Math.floor(60 * ((time/60) - Math.floor(time/60)))
	sec = PadDigits(sec, 2)
	min + ":" + sec

RenderCommentCounter = (commentCount) ->
	count = PadDigits(parseInt($(commentCount).text()), 3)
	count_array = count.split('')
	output = ''
	for digit in count_array
		output += "<span class=\"count_#{digit}\">#{digit}</span>"
	$(commentCount).html(output)

PlayEpisodeAudioHandler = (event) ->
	$(event.currentTarget).siblings('.play').addClass('on')
	$(event.currentTarget).siblings('.pause').removeClass('on')

PauseEpisodeAudioHandler = (event) ->
	$(event.currentTarget).siblings('.pause').addClass('on')
	$(event.currentTarget).siblings('.play').removeClass('on')

EndEpisodeAudioHandler = (event) ->
	$(event.currentTarget).siblings('.pause').removeClass('on')
	$(event.currentTarget).siblings('.play').removeClass('on')
	
TimeUpdateEpisodeHandler = (event) ->
	currentTime = TimeString(event.currentTarget.currentTime)
	$(event.currentTarget).siblings('.data').children('.playhead').html(currentTime)

DurationUpdateEpisodeHandler = (event) ->
	totalTime = TimeString(event.currentTarget.duration)
	$(event.currentTarget).siblings('.data').children('.total_time').html(totalTime)

VolumeChange = (value) ->
	for audio in $('audio')
		audio.volume = value
	for volumeElement in $('.episode .volume')
		$(volumeElement).children('.left').css('width', value * 100);
		$(volumeElement).children('.right').css('width', 100 - (value * 100));
		
GlobalPlay = (audioElement) ->
	for audio in $('audio')
		if audioElement == audio
			audio.play()
		else
			audio.pause()

$ ->
	RenderCommentCounter commentCount for commentCount in $('.episode .comment_count a')
	if Modernizr.audio.mp3 == false
		$('.episode .audio').addClass('disabled')
		$('.episode .audio_download').removeClass('disabled')
	else
		for audioElement in $('.episode audio')
			$(audioElement).bind 'play', PlayEpisodeAudioHandler
			$(audioElement).bind 'pause', PauseEpisodeAudioHandler
			$(audioElement).bind 'ended', EndEpisodeAudioHandler
			$(audioElement).bind 'timeupdate', TimeUpdateEpisodeHandler
			$(audioElement).bind 'durationchange', DurationUpdateEpisodeHandler
		$('.episode .pause').click (event) ->
			$(event.target).siblings('audio')[0].pause()
		$('.episode .play').click (event) ->
			GlobalPlay $(event.target).siblings('audio')[0]
		for volumeDiv in $('.episode .volume')
			$(volumeDiv).click (event) ->
				offset = $(event.currentTarget).offset()
				clickPosition = event.pageX - offset.left + 1
				VolumeChange clickPosition/100

