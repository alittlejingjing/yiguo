$("#btnLogin").on("click",function(){
    var username = $("#username").val();
    var password = $("#password").val();
    $.ajax({
        type:"GET",
        url:"http://localhost:8888/api/yiguoUsr/yiguologin",
        data:`username=${username}&password=${password}`
    })
    .then((res)=>{
        console.log(res)
    })
})