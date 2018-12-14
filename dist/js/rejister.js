var aSpan = document.querySelectorAll("input");
// console.log(aSpan)
        username.onblur = function(){
            var reg =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
            if(reg.test(username.value) != true){
                aSpan[1].style.color = "red";
            }else{
                aSpan[1].style.color = "green";
            }
        }
        mobile.onblur = function(){
            var reg = /^(156|158|188)[0-9]{8}$/
            if(reg.test(mobile.value)){
                aSpan[0].style.color = "green";
            }else{
                aSpan[0].style.color = "red";
                aSpan[0].innerHTML = "请填写正确的手机号码"
            }
        }
        email.onblur = function(){
            var reg = /^[1-9a-z][0-9a-z]{5,19}@(126|163|qq)(.com|.cn)$/;
            if(reg.test(email.value)){
                aSpan[4].style.color = "green";
            }else{
                aSpan[4].style.color = "red";
                aSpan[4].innerHTML = "请填写正确的邮箱地址"
            }
        }
        password.onblur = function(){
            var reg = /[a-zA-Z\d_]{6,18}/;
            if(reg.test(password.value)){
                aSpan[2].style.color = "green";
            }else{
                aSpan[2].style.color = "red";
                aSpan[2].innerHTML = "密码不能为纯字母"
            }
        }
        passWordAgain.onblur = function(){
            if(passWordAgain.value == password.value){
                aSpan[3].style.color = "green";
            }else{
                aSpan[3].style.color = "red";
                aSpan[3].innerHTML = "两次密码输入不一致"
            }
        }

        // var oInp1=document.getElementById("username");
        // var oInp2=document.getElementById("mobile");
        // var oInp3=document.getElementById("email");
        // var oInp4=document.getElementById("password");
        // var oInp5=document.getElementById("passWordAgain");
        // var oBtn=document.getElementById("PhoneReg");
        // oBtn.onclick=function(){
        //     var url="http://localhost:8888/proxy/localhost/1815phpnow/php/register.php";
        //     ajaxPost(url,`userName=${oInp1.value}&mobile=${oInp2.value}&email=${oInp3.value}&passWord=${oInp4.value}&passWordAgain=${oInp5.value}`)
        //     .then(function(res){
        //         alert(res)
        //     })
        // }
        // oBtn.onclick=function(){
        //     $.ajax({
        //         url:"http://localhost:8888/proxy/localhost/1815phpnow/php/register.php",
        //         type:"GET",
        //         data:`username=${oInp1.value}&mobile=${oInp2.value}&password=${oInp4.value}&passWordAgain=${oInp5.value}}`,
        //         datatype:"html",
        //         success:function(res){
        //             alert(res)
        //             console.log(res)
        //         }
        //     })

        // }

        $("#PhoneReg").on("click",function(){
            var username = $("#username").val();
            var password = $("#password").val();
            $.ajax({
                type:"POST",
                url:"http://localhost:8888/api/yiguoUsr/yiguoregister",
                data:`username=${username}&password=${password}`
            })
            .then((res)=>{
                if(res.statu === "success"){
                    location.href = "http://localhost:8888/login.html"
                    console.log(res)
                }else{
                    alert("用户名重复")
                }
            })
            
        })


       