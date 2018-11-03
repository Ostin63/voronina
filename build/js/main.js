var navli = $('.nav li a');
$('.tracked').waypoint(function () {
  var hash = $(this).attr('id');

  navli.removeClass('show');

  $.each(navli, function () {
    if ($(this).attr('href').slice(1) == hash) {
      $(this).addClass('show')
    }
  });
}, {
    offset: '1%'
  });