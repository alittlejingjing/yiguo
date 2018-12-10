$(window).scroll(function(){
    if($(document).scrollTop()>150){
        $(".header_fixed").show()
    }else{
        $(".header_fixed").hide()
    }
})


