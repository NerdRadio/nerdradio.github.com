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
	
CommentCount = ->
	console.log('test')
	for comment_count in $('.episode .comment_count a')
		count = PadDigits(parseInt($(comment_count).text()), 3)
		count_array = count.split('')
		output = ''
		for digit in count_array
			output += "<span class=\"count_#{digit}\">#{digit}</span>"
		$(comment_count).html(output)
	
$(document).ready ->
	console.log('ready')
	CommentCount()
	

