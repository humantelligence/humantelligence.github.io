var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1j0p_hCpdKR5kZSozy3rPSzdLqLT4E13lzL5PqlPzWv0/pubhtml';

function init() {
  Tabletop.init( { key: public_spreadsheet_url,
                   callback: showInfo,
                   simpleSheet: true } )
}

function showInfo(data, tabletop) {
  var home_left = '<div class="section green active-left visible" style=width:'+ww/2+'px id="home">';
  home_left += '<h1>Welcome to Agthia Code of Business Conduct ToolKit</h1>';
  home_left += '</div>';
  $('.content').prepend(home_left);
  $('.content').prepend('<div class="back-nav"></div>');
  $(data).each(function(index, value){
    if(value.parent == 'home'){
      var hhome = document.createElement('h2');
      $(hhome).html(value.question);
      var uhome = document.createElement('ul');
      $(uhome).addClass('nav');
      var dhome = document.createElement('div');
      $(dhome).addClass('section')
          .addClass(value.id)
          .addClass('active-right')
          .addClass('visible')
          .attr('id', value.id)
          .html(hhome)
          .append(uhome)
          .appendTo($('.content'))
    }else if(value.parent == 'to-do'){
      var itodo = document.createElement('li');
      var iatodo = document.createElement('a');
      var satodo = document.createElement('span');
      $(satodo).addClass('next');
      $(iatodo).text(value.question)
        .addClass('btn-a')
        .attr('href', '#'+value.son)
      $(itodo).appendTo($('.to-do .nav'))
        .append(iatodo)
        .append(satodo)
    }else{
      if(value.type == 'question'){
        var hhome = document.createElement('h2');
        $(hhome).html(value.question);
        var uhome = document.createElement('ul');
        $(uhome).addClass('nav');
        var dhome = document.createElement('div');
        $(dhome).addClass('section')
            .addClass(value.id)
            .attr('id', value.id)
            .html(hhome)
            .append(uhome)
            .appendTo($('.content'))
      }else if(value.type == 'list'){
        var itodo = document.createElement('li');
        var iatodo = document.createElement('a');
        var satodo = document.createElement('span');
        $(satodo).addClass('next');
        $(iatodo).text(value.question)
          .addClass('btn-a')
          .attr('href', '#'+value.son)
        $(itodo).appendTo($('.'+value.parent+' .nav'))
          .append(iatodo)
          .append(satodo)
      }else if(value.type == 'text'){
        var htitle = document.createElement('h2');
          $(htitle).html(value.question);
        var himg = document.createElement('img');
          $(himg).css('width', '120px');
          $(himg).attr('src', 'img/'+value.image+'.png');
        var hfig = document.createElement('figure')
          $(hfig).append(himg);
        var htext = document.createElement('p');
          $(htext).text(value.contents);
        var hsec = document.createElement('div');
          $(hsec).addClass('section')
              .addClass(value.id)
              .attr('id', value.id)
              .html(htitle)
              .append(hfig)
              .append(htext)
              .appendTo($('.content'))
      }
    }
  });
  resizePanel();

  $( ".nav" ).on( "click", '.btn-a', function(event){ 
    var dir = 'right';

    var activeBox = $(this).parent().parent().parent();

    if(activeBox.hasClass('active-right')){

    //get destination div
    var dt = $(this).attr('href');
    //get current left value of destination div
    var cl = $(dt).css('left');
    //get div to hide
    var dh = $('.active-left').attr('id');
    dh = '#'+dh;
    console.log(dh);
    //get div to move
    var dm = $('.active-right').attr('id');
    dm = '#'+dm;

    //$(this).closest('.nav').find('li').css('background-color', '#f2f2f2');
    $(this).parent('li').css('background-color', '#f2f2f2');

    showPanel(dt, ww/2, dir);

    hidePanel(dh, (ww/2)*-1, dir);

    movePanel(dm, 0, dir);

    setBackBtn(dh);
    }else{

    //get showing panel
    var dm = $(this).attr('href');
    //get hiding panel
    var dh = $('.active-right').attr('id');
    dh = '#'+dh;

    $(this).parent().parent().find('li').css('background-color', 'transparent');
    $(this).parent('li').css('background-color', '#f2f2f2');

    switchPanel(dh, dm, ww, ww/2);

    }

    event.preventDefault();

  });

}

function showPanel(panel, loc, dir) {
  $(panel).css('left', loc);
  $(panel).fadeIn();
  if(dir == 'right'){
    $(panel).addClass('active-right');
  }else{
    $(panel).addClass('active-left');
  }
}

function hidePanel(panel, loc, dir) {
  console.log(panel+', '+loc+', '+dir);
  $(panel).css('left', loc);
  $(panel).fadeOut();
  if(dir == 'right'){
    $('.past-inactive').removeClass('past-inactive');
    $('.inactive').addClass('past-inactive');
    $('.inactive').removeClass('inactive');
    $(panel).removeClass('active-left');
    $(panel).addClass('inactive');
  }else{
    $(panel).removeClass('active-right');
  }
}

function movePanel(panel, loc, dir) {
  $(panel).css('left', loc);
  if(dir == 'right'){
    $(panel).removeClass('active-right');
    $(panel).addClass('active-left');
  }else{
    //$(panel).find('.nav').find('li').css('opacity', 1);
    $('.past-inactive').removeClass('past-inactive');
    $('.inactive').removeClass('inactive');
    $(panel).removeClass('active-left');
    $(panel).addClass('active-right');
  }
}

function switchPanel(panel, panel2, loc, loc2){
  $(panel).removeClass('active-right');
  $(panel).css('left', loc);
  $(panel).fadeOut();
  $(panel2).addClass('active-right');
  $(panel2).css('left', loc2);
  $(panel2).fadeIn();
}

function setBackBtn(panel) {
  $('.back-nav .btn-back:last-child').hide();
  var newBack = '<a class="btn-back" href="'+panel+'">Back</a>'
  $('.back-nav').append(newBack);
}

function rmvBackBtn(){
  $('.back-nav .btn-back:last-child').prev().show();
  $('.back-nav .btn-back:last-child').remove();
}

function resizePanel() {
  //get the browser width and height
  ww = $(window).width();
  //height = $(window).height();

  //resize
  $('.section').css('width', ww/2);
  var ts = $('.content').children('.section').length;
  for(var i=0; i<ts; i++){
    $(".section").eq(i).css('left', (i*ww)/2);
  }

}
$(document).ready(function() {

  init();
  //global width
  var ww = $(window).width();

  //nav button
  
  //btn back behavior
  $('.back-nav').on('click', '.btn-back', function(event){
    
    //set direction
    var dir = 'left';
    //get destination 
    var dt = $(this).attr('href');
    //get current left value of destination div
    var cl = $(dt).css('left');
    //get div to hide
    var dh = $('.active-left').attr('id');
    dh = '#'+dh;
    //get div to move
    var dm = $('.active-right').attr('id');
    dm = '#'+dm;
    //get div to record in back btn
    var pi = $('.past-inactive').attr('id');
    pi = '#'+pi;

    $('.active-left').find('li').css('background-color', 'transparent');

    showPanel(dt, 0, dir);

    hidePanel(dm, ww, dir);

    movePanel(dh, ww/2, dir);

    rmvBackBtn();

    event.preventDefault();
  });

  
  //resize all the items according to the new browser size
  $(window).resize(function () {
    resizePanel();
  });

  resizePanel();

});