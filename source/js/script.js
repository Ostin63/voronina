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
/*
$(document).ready(function () {
  $('.toggle-menu__list').on('click', function () {
    $('.toggle-top').toggle('show');
    $('.toggle-middle').toggle('show');
    $('.toggle-bottom').toggle('show');
    $('.main-nav__list').toggle('show');
    $('.overlay').toggle('show');
  })
});
*/
const toggleMenu = document.querySelector('.toggle-menu__list');
const siteList = document.querySelector('.site-list');
const overlay = document.querySelector('.overlay');
const toggleTop = document.querySelector('.toggle-top');
const toggleMiddle = document.querySelector('.toggle-middle');
const toggleBottom = document.querySelector('.toggle-bottom');

toggleMenu.addEventListener("click", function () {
  toggleTop.classList.toggle("show-top");
  toggleMiddle.classList.toggle("show-middle");
  toggleBottom.classList.toggle("show-bottom");
  siteList.classList.toggle("active");
  overlay.classList.toggle("active");
});
