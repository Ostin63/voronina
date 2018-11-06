var navli = $('.nav li a');
var waypoints = $('.tracked').waypoint(function (dir) {
  var hash = this.element.id;
  if(dir === 'up') {
    var id = parseInt(hash.split('-')[1]);
    if(id > 1) id--;
    hash = [hash.split('-')[0], id].join('-');
  }

  navli.removeClass('show');

  $.each(navli, function () {
    if ($(this).attr('href').slice(1) == hash) {
      $(this).addClass('show')
    }
  });
});
waypoints[0].options.offset = -1;