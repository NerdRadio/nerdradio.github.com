(function() {
  var PadDigits, RenderCommentCounters, TimeString;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  PadDigits = function(n, totalDigits) {
    var i, pad, _ref;
    n = n.toString();
    pad = '';
    if (totalDigits > n.length) {
      for (i = 1, _ref = totalDigits - n.length; 1 <= _ref ? i <= _ref : i >= _ref; 1 <= _ref ? i++ : i--) {
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
  RenderCommentCounters = function() {
    var comment_count, count, count_array, digit, output, _i, _j, _len, _len2, _ref, _results;
    _ref = $('.episode .comment_count a');
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      comment_count = _ref[_i];
      count = PadDigits(parseInt($(comment_count).text()), 3);
      count_array = count.split('');
      output = '';
      for (_j = 0, _len2 = count_array.length; _j < _len2; _j++) {
        digit = count_array[_j];
        output += "<span class=\"count_" + digit + "\">" + digit + "</span>";
      }
      _results.push($(comment_count).html(output));
    }
    return _results;
  };
  $(function() {
    var audioElement, _i, _len, _ref;
    RenderCommentCounters();
    if (Modernizr.audio.mp3 === false) {
      $('.episode .audio').addClass('disabled');
      return $('.episode .audio_download').removeClass('disabled');
    } else {
      _ref = $('.episode audio');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        audioElement = _ref[_i];
        $(audioElement).bind('durationchange', function() {
          var totalTime;
          totalTime = TimeString($(audioElement)[0].duration);
          return $($($(audioElement)[0]).siblings('.data')).children('.total_time').html(totalTime);
        });
        $(audioElement).bind('timeupdate', function() {
          var currentTime;
          currentTime = TimeString(audioElement.currentTime);
          return $($($(audioElement)[0]).siblings('.data')).children('.playhead').html(currentTime);
        });
        $(audioElement).bind('play', function() {
          $($($(audioElement)[0]).siblings('.play')).addClass('on');
          return $($($(audioElement)[0]).siblings('.pause')).removeClass('on');
        });
        $(audioElement).bind('pause', function() {
          $($($(audioElement)[0]).siblings('.pause')).addClass('on');
          return $($($(audioElement)[0]).siblings('.play')).removeClass('on');
        });
        $(audioElement).bind('ended', function() {
          $($($(audioElement)[0]).siblings('.pause')).removeClass('on');
          return $($($(audioElement)[0]).siblings('.play')).removeClass('on');
        });
      }
      $('.episode .pause').click(__bind(function() {
        return alert('tada');
      }, this));
      return $('.episode .play').click(__bind(function() {}, this));
    }
  });
}).call(this);
