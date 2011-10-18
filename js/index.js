(function() {
  var PadDigits, RenderCommentCounter, TimeString;
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
  RenderCommentCounter = function(comment_count) {
    var count, count_array, digit, output, _i, _len;
    count = PadDigits(parseInt($(comment_count).text()), 3);
    count_array = count.split('');
    output = '';
    for (_i = 0, _len = count_array.length; _i < _len; _i++) {
      digit = count_array[_i];
      output += "<span class=\"count_" + digit + "\">" + digit + "</span>";
    }
    return $(comment_count).html(output);
  };
  $(function() {
    var audioElement, comment_count, volumeDiv, _i, _j, _k, _len, _len2, _len3, _ref, _ref2, _ref3, _results;
    _ref = $('.episode .comment_count a');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      comment_count = _ref[_i];
      RenderCommentCounter(comment_count);
    }
    if (Modernizr.audio.mp3 === false) {
      $('.episode .audio').addClass('disabled');
      return $('.episode .audio_download').removeClass('disabled');
    } else {
      _ref2 = $('.episode audio');
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        audioElement = _ref2[_j];
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
      $('.episode .pause').click(function(event) {
        return $(event.target).siblings('audio')[0].pause();
      });
      $('.episode .play').click(function(event) {
        return $(event.target).siblings('audio')[0].play();
      });
      _ref3 = $('.episode .volume');
      _results = [];
      for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
        volumeDiv = _ref3[_k];
        _results.push($(volumeDiv).click(function(event) {
          var audio, clickPosition, offset;
          offset = $(event.currentTarget).offset();
          clickPosition = event.pageX - offset.left + 1;
          audio = $(event.currentTarget).parent().siblings('audio')[0];
          audio.volume = clickPosition / 100;
          $(event.currentTarget).children('.left').css('width', clickPosition);
          return $(event.currentTarget).children('.right').css('width', 100 - clickPosition);
        }));
      }
      return _results;
    }
  });
}).call(this);
