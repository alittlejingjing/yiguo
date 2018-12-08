//定义当前下标
var index = 0;
//定义即将消失的图片的下标
var prve_index = 0;
//定义图片
var $slides = $(".slide")

// console.log($slides)
//定义按钮
var $pagewarp = $(".pagination");
//定义最大的下标
var maxIndex = $slides.length-1;

//选中左右按钮
$("#left").on("click",prve)
$("#right").on("click",next)

function prve(){
    prve_index = index;
    if(index == 0){
        index = maxIndex
    }else{
        index --;
    }
    changeClass()
}

function next(){
    prve_index = index;
    if(index == maxIndex){
        index = 0
    }else{
        index ++;
    }
    changeClass();
    // changestyle();
}

function changeClass(){
    $slides.eq(prve_index).addClass("slide-willhide")
    .siblings(".slide")
    .removeClass("slide-willhide")
    $slides.eq(index).addClass("slide-show")
    .siblings(".slide")
    .removeClass("slide-show")
    .end()
    .hide()
    .fadeIn()
    
    $pagewarp.children().eq(index).addClass("active")
    .siblings("span").removeClass("active")
//    $slides.children.style.transform="scaleX(1.1) scaleY(1.1)";

   console.log($slides.img);
   

}
// function changestyle(){
    
// }
//创建按钮
function initPagination(){
    for(var i = 0;i<$slides.length;i++){
        var $span = $("<span>");
        if(i == index){
            $span.addClass("active")
        }
        $pagewarp.append($span)
    }
}
initPagination()

$pagewarp.on("mouseover","span",toIndex)
function toIndex(event){
    var e = event || window.event;
    var target = e.target || e.srcElement;

    prve_index = index;
    index = $pagewarp.children().index(target)
    changeClass()
}

var banner_timer = setInterval('$("#right").trigger("click")',3000)
    $(".banner").hover(function(){
        clearInterval(banner_timer)
    },function(){
        banner_timer = setInterval('$("#right").trigger("click")',3000)
    })
