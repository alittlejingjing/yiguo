// $(".wrap1").append("<ul>"+html+"</ul>")
// $("li").addClass(".p_item")
// $(".p_item").on("mouseenter",showBuy)
// $(".p_item").on("mouseleave",hideBuy)

// function showBuy(){
//     $(".p-buy").show()
// }
// function hideBuy(){
//     $(".p-buy").hide()
// }


//选中元素
var container = _(".wrap1");
var GLOABLE = {
    ch : document.documentElement.clientHeight,
    loading_flag : false
}

//发送ajax请求;
_jsonp("https://list.mogujie.com/search")
.then(function(res){
    // console.log(res.result.wall.list)
    var goodsJSON = res.result.wall.list
    randerPage(goodsJSON);
    eleSort(container.children)
})

//渲染页面
function randerPage(json){
    var html = "";
    for(var i = 0;i<json.length;i++){
        html+=`
                <li class="p_item">
                    <div class="p_img clearfix">
                        <a href="#">
                            <img class="pacture" src="${json[i].show.img}" data-iid="${json[i].iid}" alt="">
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
                        <a class="btn-buy" data-iid="${json[i].iid}" href="javascript:;">加入购物车</a>
                    </div>
                </li> 
        `
    }
    container.innerHTML += html;
    return html;
}

//排列数据(不等高)
function eleSort(eles){
    var heightArray = [];
    // console.log(eles)
    eles = _slice(eles)
    // console.log(eles)
    eles.forEach(function(ele,index){
        if(index<=3){
            // console.log(ele,"第一行")
            heightArray.push(ele.offsetHeight)
        }
        else{
            // var min = Math.min.apply(false,heightArray);
            // ele.style.position = "absolute";
            // ele.style.top = min + 20 + "px";
            // var minIndex = heightArray.indexOf(min);
            // ele.style.left = eles[minIndex].offsetLeft -20 + "px";
            // heightArray[minIndex]+=ele.offsetHeight +20
        }
    });
    GLOABLE.heightArray = heightArray;
}

//滚动事件
onscroll=function(){
    if(!isLoad() || GLOABLE.loading_flag) return false;
    loading_flag = true;
    _jsonp("https://list.mogujie.com/search")
    .then(function(res){
    loading_flag = false;
    var goodsJSON = res.result.wall.list;
    randerPage(goodsJSON);
    eleSort(container.children)
})
}

//无限加载
function isLoad(){
    var st = document.body.scrollTop || document.documentElement.scrollTop;
    // var mh = Math.min.apply(false,GLOABLE.heightArray);
    if(GLOABLE.ch+st>3000){
        return true;
    }else{
        return false;
    }
}










//购物车

// 1. 获取数据;

function getMsg(){

    $.ajax("https://list.mogujie.com/search",
    {
          dataType:"jsonp"
    })
    .then(function(res){
          // console.log(res);
          renderPage(res.result.wall.list);
    })

}

var goodsJson = [];

function renderPage(json){
    goodsJson = json;
    var html = "";
    // 根据比例计算图片高度;
    json.forEach(function(ele){
          // console.log(ele);
          html += `   <div class="goods-box">
                            <div class="good-image">
                                  <img src="${ele.show.img}" width=${ 262 } height=${ parseInt(262 / ele.show.w * ele.show.h) } alt="">
                            </div>
                            <div class="good-title">
                                  <p>${ele.title}</p>
                            </div>
                            <div class="line"></div>
                            <div class="good-detail">
                                  <span class="detail-price">
                                        ${ele.price}
                                  </span>
                                  <div class="detail-start">
                                        <i>★</i>
                                        <span>${ele.itemMarks.split(" ")[0]}</span>
                                  </div>
                            </div>
                            <button class="btn-car" data-iid="${ele.iid}">加入购物车</button>
                      </div> `
    });
    
    // console.log(html);
    $(".container-goodslist").html(html);
}
getMsg();


// 购物车;

// 1. 所有的按钮绑定事件; 

$(".wrap1").on("click",".p-buy",handleCarClick);
$(".wrap1").on("click",".p_img",handledetailClick);

function handleCarClick(event){
    var e = event || window.event;
    var target = e.target || e.srcElement;
    console.log(target)
    var iid = $(target).attr("data-iid");
    var nowMsg = findJson(iid)[0];
    addCar(nowMsg,iid);
}


function handledetailClick(event){
    var e = event || window.event;
    var target = e.target || e.srcElement;
    console.log(target)
    var iid = $(target).attr("data-iid");
    var nowMsg = findJson(iid)[0];
    // console.log(nowMsg)
    localStorage.setItem("detail",JSON.stringify(nowMsg))
    // addCar(nowMsg,iid);
    location.href = "http://localhost:8888/detail.html"
}
// localStroage =>

// 1. 增删改查 ; setItem getItem length key() clear();
// 2. 遵循同源策略; 
// 3. 只能存储纯字符;


function addCar(nowMsg , iid){
    // 存数据;
    // 1. 因为我们要存的数据是对象,但是localstroage可以存储的数据只有字符;
    // object => string;
    $.extend(nowMsg , {count : 1});
    var sNowMsg = JSON.stringify(nowMsg);
    // console.log(sNowMsg);
    // 2. 如果直接进行存储的话会导致购物车里只有一个数据。如果要储存多个，那么购物车里的数据应该以数组为数据类型;
    
    // 3. 还是覆盖是为什么，因为如果已经有了数据,那么这时候我们会覆盖之前的数据;
    // 先把结构取出来 查看一下是否存在，如果存在，我就向里面拼接,如果不存在我再建立结构;
    console.log(sNowMsg)
    if(!localStorage.cart){
          localStorage.setItem("cart",`[${sNowMsg}]`);
          console.log(sNowMsg)
          return false;
    }
    // 如果存在对结构进行插入;

    // aMsg 变成数组了; localStorage 字符串转换成数组的数据;
    // console.log(0)
    var aMsg = JSON.parse(localStorage.cart);

    // 如果存在数据就不push ， 而是增加 count 值;
    if(!hasIid(aMsg,iid)){
          aMsg.push(nowMsg);
    }

    //localStorage 重新设置；
    localStorage.setItem("cart",JSON.stringify(aMsg));

    console.log(JSON.parse(localStorage.cart));
}



function hasIid(aMsg,iid){
    for(var i = 0 ; i < aMsg.length ; i ++){
          if(aMsg[i].iid === iid){
                aMsg[i].count ++;
                console.log(aMsg[i].count)
                (aMsg[i].count).append($(".shu"))
                return true;
                
          }
    }
    return false;
}
function findJson(iid){
    return  goodsJson.filter(function(item){
          return  item.iid === iid
    })
}

// 购物车获取;;

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
    for(var i = 0 ; i < cart_json.length ; i ++){
          html += ` <li>
                        <img src="${cart_json[i].show.img}"> 
                        <i class="title">${cart_json[i].title}</i>
                        <i class="price">${cart_json[i].price} </i> 
                        <i> * ${cart_json[i].count}</i>
                        <i id="clear">删除</i>
                    </li>`
    }
    return html;
}
$("#clear").on("click",function(){
    localStorage.clear("cart");
})





