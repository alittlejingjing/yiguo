var oBtn=document.getElementById("btn");
        var oUser=document.getElementById("username");
        var oPwd=document.getElementById("password");
        // oBtn.onclick=function(){
        //     url="http://localhost/proxy/localhost/1815phpnow/php/login.php";
        //     ajaxPost(url,`username=${oUser.value}&password=${oPwd.value}`)
        //     .then(function(res){
        //         alert(res)
        //     })     
        // }
        oBtn.onclick=function(){
            $.ajax({
                url:"http://localhost:8888/proxy/localhost/1815phpnow/php/login.php",
                type:"GET",
                data:`username=${oUser.value}&password=${oPwd.value}}`,
                datatype:"html",
                success:function(res){
                    alert(res)
                    console.log(res)
                }
            })

        }
