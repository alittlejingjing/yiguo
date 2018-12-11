//鼠标进入让列表显示
$(".my1").on("mouseenter",showlist)
//鼠标移出让列表隐藏
$(".my1").on("mouseleave",hidelist)
// //鼠标进入让列表显示
$(".phone1").on("mouseenter",showlist)
//鼠标移出让列表隐藏
$(".phone1").on("mouseleave",hidelist)


function showlist(event){
    var e = event || window.event;
    var target = e.currentTarget;
    // console.log(target)
    $(target).children("ul").stop().show()
}
function hidelist(){
    var e = event || window.event;
    var target = e.currentTarget;
    // console.log(target)
    $(target).children("ul").stop().hide()
}