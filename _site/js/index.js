(function() {
  var PadDigits, TimeString;
  PadDigits = function(n, totalDigits) {
    var i, pad, _ref;
    n = n.toString();
    pad = '';
    if (totalDigits > n.length) {
      for (i = 0, _ref = totalDigits - n.length; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
        pad += '0';
      }
    }
    return pad + n.toString();
  };
  TimeString = function(time) {
    var min, sec;
    min = Math.floor(time / 60);
    sec = Math.floor(60 * ((time / 60) - Math.floor(time / 60)));
    sec = PadDigits(sec, 2);
    return min + ":" + sec;
  };
  $(document).ready(function() {
    var comment_count, count, count_array, element, output, _i, _j, _len, _len2, _ref, _results;
    _ref = $('.episode .comment_count a');
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      comment_count = _ref[_i];
      count = PadDigits(parseInt($(comment_count).text()), 3);
      count_array = count.split('');
      output = '';
      for (_j = 0, _len2 = count_array.length; _j < _len2; _j++) {
        element = count_array[_j];
        output += '<span class="count_' + element + '">' + element + '</span>';
      }
      _results.push($(this).html(comment_count));
    }
    return _results;
  });
}).call(this);
