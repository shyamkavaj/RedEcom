jQuery(window).scroll(function() {
  if (jQuery(this).scrollTop() > 50) {
    jQuery("#header").addClass('affix .navbar-image');
    jQuery(".navbar-brand img").attr('src','images/logo2.png');
    
  } else {
    jQuery("#header").removeClass('affix .navbar-image');
    jQuery(".navbar-brand img").attr('src','images/logo.png');
    
  }
  
});


$(document).ready(function(){
  $('#testimonial').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    dots:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
  })

// dashboard carousel
$('#dashboard').owlCarousel({
  loop:true,
  margin:10,
  nav:false,
  dots:true,
  responsive:{
      0:{
          items:1
      },
      600:{
          items:1
      },
      1000:{
          items:1
      }
  }
})

$('#service').owlCarousel({
  loop:true,
  margin:7,
  padding:10,
  nav:false,
  dots:true,
  responsive:{
      0:{
          items:1
      },
      600:{
          items:1
      },
      1000:{
          items:2,
          padding:10,
      }
  }
})
  
});




// $(document).on('click', 'li', function(){
//   $('li').removeClass('active');
//   $('ul').toggleClass('expanded');
//   $(this).addClass('active');
//   var tab_id = $(this).attr('data-tab');
//   $('.tab-content').removeClass('current');
//   $(this).addClass('current');
//   $('#'+tab_id).addClass('current');
// });





var inputs = document.querySelectorAll('.file-input')

for (var i = 0, len = inputs.length; i < len; i++) {
  customInput(inputs[i])
}

function customInput (el) {
  const fileInput = el.querySelector('[type="file"]')
  const label = el.querySelector('[data-js-label]')
  
  fileInput.onchange =
  fileInput.onmouseout = function () {
    if (!fileInput.value) return
    
    var value = fileInput.value.replace(/^.*[\\\/]/, '')
    el.className += ' -chosen'
    label.innerText = value
  }
}