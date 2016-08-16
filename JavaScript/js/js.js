function flow(mh, mv) {//参数mh和mv是定义数据块之间的间距，mh是水平距离，mv是垂直距离 
	var w = document.documentElement.offsetWidth;//计算页面宽度 
	var ul = document.getElementById("flow-box"); 
	var li = ul.getElementsByTagName("li"); 
	var iw = li[0].offsetWidth + mh;//计算数据块的宽度 
	var c = Math.floor(w / iw);//计算列数 
	ul.style.width = iw * c - mh + "px";//设置ul的宽度至适合便可以利用css定义的margin把所有内容居中 

	var liLen = li.length; 
	var lenArr = []; 
	for (var i = 0; i < liLen; i++) {//遍历每一个数据块将高度记入数组 
	lenArr.push(li[i].offsetHeight); 
	} 



	var oArr = []; 
	for (var i = 0; i < c; i++) {//把第一行排放好，并将每一列的高度记入数据oArr 
	li[i].style.top = "0"; 
	li[i].style.left = iw * i + "px"; 
	li[i].style.opacity = "1"; 
	li[i].style["-moz-opacity"] = "1"; 
	li[i].style["filter"] = "alpha(opacity=100)"; 
	oArr.push(lenArr[i]); 
	} 

	for (var i = c; i < liLen; i++) {//将其他数据块定位到最短的一列后面，然后再更新该列的高度 
	var x = _getMinKey(oArr);//获取最短的一列的索引值 
	li[i].style.top = oArr[x] + mv + "px"; 
	li[i].style.left = iw * x + "px"; 
	li[i].style.opacity = "1"; 
	oArr[x] = lenArr[i] + oArr[x] + mv;//更新该列的高度 
	} 
function scroll() { //滚动加载数据 

		var st = oArr[_getMinKey(oArr)];
        var scrollTop = document.body.scrollTop;
        var parent = document.querySelector('#flow-box');
        if (scrollTop >= st - document.documentElement.clientHeight) {
        	var parent = document.querySelector('#flow-box');
        	var liLength = json.length;
        	for(var i = 0; i<liLength; i++){
        		var li = document.createElement('li');
        		var str ='<img src="'+json[i].img+'"><a href="#">插进来的</a>';
        		li.innerHTML = str;
        		parent.appendChild(li);
        	}
        	flow(10, 10);

        }

}
	document.getElementById("loadimg").style.top = _getMaxValue(oArr) + 50 + "px";//将loading移到下面 

		console.log(oArr);
	window.onscroll = scroll
} 




//改变窗口大小时重新布局 
var re; 
window.onresize = function() { 
clearTimeout(re); 
re = setTimeout(function() {flow(10, 10);}, 200); 
} 

//获取数字数组的最大值 
function _getMaxValue(arr) { 
var a = arr[0]; 
for (var k in arr) { 
if (arr[k] > a) { 
a = arr[k]; 
} 
} 
return a; 
} 

//获取数字数组最小值的索引 
function _getMinKey(arr) { 
	var a = arr[0]; 
	var b = 0; 
	for (var k in arr) { 
	if (arr[k] < a) { 
	a = arr[k]; 
	b = k; 
	} 
	} 
	return b; 
} 

var json = [
	{img:"./images/1.jpg"},
	{img:"./images/2.jpg"},
	{img:"./images/3.jpg"},
	{img:"./images/4.jpg"},
	{img:"./images/5.jpg"},
	{img:"./images/6.jpg"},
	{img:"./images/7.jpg"},
	{img:"./images/8.jpg"},
	{img:"./images/9.jpg"},
	{img:"./images/10.jpg"},
	{img:"./images/11.jpg"},
	{img:"./images/12.jpg"},
	{img:"./images/13.jpg"},
	{img:"./images/14.jpg"},
	{img:"./images/15.jpg"}

];


//图片加载完成后执行 
window.onload = function() {
	flow(10, 10);

}; 




