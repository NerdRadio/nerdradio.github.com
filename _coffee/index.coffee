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
	for comment_count in $('.episode .comment_count a')
		count = PadDigits(parseInt($(comment_count).text()), 3)
		count_array = count.split('')
		output = ''
		for element in count_array
			output += '<span class="count_'+element+'">'+element+'</span>'
		$(this).html(comment_count)

