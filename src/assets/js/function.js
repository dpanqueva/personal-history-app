$(document).ready(function() {
    $('.counter').counterUp({
        delay: 10,
        time: 2000
      });
      $('.counter').addClass('animated fadeInDownBig');
      $('h3').addClass('animated fadeIn');

      $('#searchPersonBtn').on('click',function(){
        $('#searchPeople').modal('hide');
      });

      $('#searchPeopleJudicialBtn').on('click',function(){
        $('#searchPeopleJudicial').modal('hide');
      });
});