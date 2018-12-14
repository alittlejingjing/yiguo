var $wrap = $(".wrap1")[0]
// console.log($wrap)
var GLOABLE = {
    loading_flag:false
}
var goodsJson = [];

// 利用ajax获取数据
function getMsg(){
    $.ajax("../json/yiguo.json",
    {
        //   dataType:"jsonp"
    })
    .then(function(res){
        //   console.log(res)
        goodsJson = res;
        renderPage(goodsJson)
    })
}
getMsg();

//渲染页面，瀑布流
function renderPage(json){
    var html = "";
    for(var i=0;i<json.length;i++){
        html += `
                <li class="p_item">
                    <div class="p_img clearfix">
                        <a href="#">
                            <img src="${json[i].img}" data-id=${json[i].id} width="290" height="290">
                        </a>
                    </div>
                    <div class="p_info clearfix">
                        <div class="p_name">
                            <a href="#">${json[i].title}</a>
                        </div>
                        <div class="p_price">
                            <i class="price">
                                <strong>${json[i].price}</strong>
                            </i>                       
                        </div>
                    </div>
                    <div class="p-buy">
                        <a class="btn-buy" data-id=${json[i].id} href="javascript:;">加入购物车</a>
                    </div>
                </li> 
            `
    }
    $wrap.innerHTML += html;
    return html;
}

//滚动事件
onscroll=function(){
    if(!isLoad()|| GLOABLE.loading_flag) return false ;
    loading_flag = true;
    $.ajax("../json/yiguo.json",
    {
        //   dataType:"jsonp"
    })
    .then(function(res){
        loading_flag = false;
        var goodsJSON = res;
        renderPage(goodsJSON)
    })
}

//无限加载
function isLoad(){
    var lastBox = $(".wrap1").children(":last");
    // console.log($wrap)
    // console.log(lastBox)
    var st = document.body.scrollTop || document.documentElement.scrollTop;
    var ch = document.documentElement.clientHeight;
    // console.log(ch)
    if(ch+st>lastBox.offset().top){
        return true;
    }else{
        return false;
    }
}

//购物车
$(".wrap1").on("click",".p-buy",handleCarClick);
// $(".wrap1").on("click",".p_img",handledetailClick);

//绑定购物车
function handleCarClick(event){
    var e = event || window.event;
    var target = e.target || e.srcElement;
    // console.log(target)
    var id = $(target).attr("data-id");
    // console.log(id)
    var nowMsg = findJSON(id)[0]
    // console.log(nowMsg)
    addCar(nowMsg,id)
}

function addCar(nowMsg,id){
    $.extend(nowMsg,{count:1});
    var sNowMsg = JSON.stringify(nowMsg)
    
    if(!localStorage.cart){
        localStorage.setItem("cart",`[${sNowMsg}]`)
        // console.log(sNowMsg);
        return false;
    }

    var aMsg = JSON.parse(localStorage.cart);
    if(!hasId(aMsg,id)){
        aMsg.push(nowMsg);
    }

    localStorage.setItem("cart",JSON.stringify(aMsg));
    // console.log(JSON.parse(localStorage.cart));
}

function hasId(aMsg,id){
    for(var i=0;i<aMsg.length;i++){
        if(aMsg[i].id === id){
            aMsg[i].count ++;
            //商品数量
            console.log(aMsg[i].count);
            //把该商品的数量放到页面中;
            $(".shu").html(aMsg[i].count)
            return true;
        }
    }
    return false;
}

function findJSON(id){
    return goodsJson.filter(function(item){
        return item.id === id
    })
}

$(".gou").on("mouseenter",function(){
    $(".gou_list").show();
    console.log(getCart())
    $(".gou_list ul").html(renderCart());
})

$(".gou").on("mouseleave",function(){
    $(".gou_list").hide();
})

function getCart(){
    if(!localStorage.cart) return 0;
    var aMsg = JSON.parse(localStorage.cart);
    return aMsg;
}

function renderCart(){
    var html = "";
    var cart_json = getCart();
    if(!cart_json) return 0;
    for(var i=0;i<cart_json.length;i++){
        html+=`
        <li>
            <img src="${cart_json[i].img}"> 
            <i class="title">${cart_json[i].title}</i>
            <i class="price">${cart_json[i].price} </i> 
            <i>*</i>
            <i>${cart_json[i].count}</i>
            <i id="clear">删除</i>
        </li>`
    }
    return html;
}


