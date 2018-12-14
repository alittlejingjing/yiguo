var msg = JSON.parse(localStorage.detail)
// console.log(msg)
$("#bigImg").attr({src: msg.show.img})
$("#smallImg").attr({src: msg.show.img})
$(".summary-name h1").html(msg.title)
$("#ttt-price").html(msg.price)


