(function() {
  var DurationUpdateEpisodeHandler, EndEpisodeAudioHandler, GlobalPlay, PadDigits, PauseEpisodeAudioHandler, PlayEpisodeAudioHandler, RenderCommentCounter, TimeString, TimeUpdateEpisodeHandler, VolumeChange;
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
    min = PadDigits(min, 2);
    sec = Math.floor(60 * ((time / 60) - Math.floor(time / 60)));
    sec = PadDigits(sec, 2);
    return min + ":" + sec;
  };
  RenderCommentCounter = function(commentCount) {
    var count, count_array, digit, output, _i, _len;
    count = PadDigits(parseInt($(commentCount).text()), 3);
    count_array = count.split('');
    output = '';
    for (_i = 0, _len = count_array.length; _i < _len; _i++) {
      digit = count_array[_i];
      output += "<span class=\"count_" + digit + "\">" + digit + "</span>";
    }
    return $(commentCount).html(output);
  };
  PlayEpisodeAudioHandler = function(event) {
    $(event.currentTarget).siblings('.play').addClass('on');
    return $(event.currentTarget).siblings('.pause').removeClass('on');
  };
  PauseEpisodeAudioHandler = function(event) {
    $(event.currentTarget).siblings('.pause').addClass('on');
    return $(event.currentTarget).siblings('.play').removeClass('on');
  };
  EndEpisodeAudioHandler = function(event) {
    $(event.currentTarget).siblings('.pause').removeClass('on');
    return $(event.currentTarget).siblings('.play').removeClass('on');
  };
  TimeUpdateEpisodeHandler = function(event) {
    var currentTime;
    currentTime = TimeString(event.currentTarget.currentTime);
    return $(event.currentTarget).siblings('.data').children('.playhead').html(currentTime);
  };
  DurationUpdateEpisodeHandler = function(event) {
    var totalTime;
    totalTime = TimeString(event.currentTarget.duration);
    return $(event.currentTarget).siblings('.data').children('.total_time').html(totalTime);
  };
  VolumeChange = function(value) {
    var audio, volumeElement, _i, _j, _len, _len2, _ref, _ref2, _results;
    _ref = $('audio');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      audio = _ref[_i];
      audio.volume = value;
    }
    _ref2 = $('.episode .volume');
    _results = [];
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      volumeElement = _ref2[_j];
      $(volumeElement).children('.left').css('width', value * 100);
      _results.push($(volumeElement).children('.right').css('width', 100 - (value * 100)));
    }
    return _results;
  };
  GlobalPlay = function(audioElement) {
    var audio, _i, _len, _ref, _results;
    _ref = $('audio');
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      audio = _ref[_i];
      _results.push(audioElement === audio ? audio.play() : audio.pause());
    }
    return _results;
  };
  $(function() {
    var audioElement, commentCount, volumeDiv, _i, _j, _k, _len, _len2, _len3, _ref, _ref2, _ref3, _results;
    _ref = $('.episode .comment_count a');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      commentCount = _ref[_i];
      RenderCommentCounter(commentCount);
    }
    if (Modernizr.audio.mp3 === false) {
      $('.episode .audio').addClass('disabled');
      return $('.episode .audio_download').removeClass('disabled');
    } else {
      _ref2 = $('.episode audio');
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        audioElement = _ref2[_j];
        $(audioElement).bind('play', PlayEpisodeAudioHandler);
        $(audioElement).bind('pause', PauseEpisodeAudioHandler);
        $(audioElement).bind('ended', EndEpisodeAudioHandler);
        $(audioElement).bind('timeupdate', TimeUpdateEpisodeHandler);
        $(audioElement).bind('durationchange', DurationUpdateEpisodeHandler);
      }
      $('.episode .pause').click(function(event) {
        return $(event.target).siblings('audio')[0].pause();
      });
      $('.episode .play').click(function(event) {
        return GlobalPlay($(event.target).siblings('audio')[0]);
      });
      _ref3 = $('.episode .volume');
      _results = [];
      for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
        volumeDiv = _ref3[_k];
        _results.push($(volumeDiv).click(function(event) {
          var clickPosition, offset;
          offset = $(event.currentTarget).offset();
          clickPosition = event.pageX - offset.left + 1;
          return VolumeChange(clickPosition / 100);
        }));
      }
      return _results;
    }
  });
}).call(this);
