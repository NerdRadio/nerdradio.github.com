PadDigits = (n, totalDigits) ->
	n = n.toString()
	pad = ''
	if totalDigits > n.length
		for i in [0..(totalDigits-n.length)]
			pad += '0'
	pad + n.toString()

TimeString = (time) ->
	min = Math.floor(time/60)
	sec = Math.floor(60 * ((time/60) - Math.floor(time/60)))
	sec = PadDigits(sec, 2)
	min + ":" + sec
	
$(document).ready ->
	for comment_count in $('.comment_count a')
		console.log(parseInt($(comment_count).text()))
		count = PadDigits(parseInt($(this).text()), 3)
		
