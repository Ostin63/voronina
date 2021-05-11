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

const toggleMenu = document.querySelector('.toggle-menu__wrapper');
const siteList = document.querySelector('.toggle-menu__nav-list');
const overlay = document.querySelector('.overlay');
const toggleTop = document.querySelector('.toggle-menu__item--top');
const toggleMiddle = document.querySelector('.toggle-menu__item--middle');
const toggleBottom = document.querySelector('.toggle-menu__item--bottom');

toggleMenu.onclick = () => {
  toggleTop.classList.toggle("show-top");
  toggleMiddle.classList.toggle("show-middle");
  toggleBottom.classList.toggle("show-bottom");
  toggleMenu.classList.toggle("toggle-menu__wrapper--show");
  siteList.classList.toggle("active");
};

siteList.onclick = () => {
  toggleTop.classList.remove("show-top");
  toggleMiddle.classList.remove("show-middle");
  toggleBottom.classList.remove("show-bottom");
  toggleMenu.classList.remove("toggle-menu__wrapper--show");
  siteList.classList.remove("active");
}
