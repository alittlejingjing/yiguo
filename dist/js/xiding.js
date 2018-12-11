$(window).scroll(function(){
    if($(document).scrollTop()>150){
        $(".header_fixed").show()
    }else{
        $(".header_fixed").hide()
    }
    if($(document).scrollTop()>500){
        $(".goTop").fadeIn()
    }else{
        $(".goTop").fadeOut()
    }
})

$(".goTop").on("click",function(){
    $('body,html').animate({
        scrollTop:0
    },1000);
    return false;
})

$(".floor-guide a").on("mouseenter",function(){
    $("em").fadeIn()
})

