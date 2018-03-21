/* Created by BowenWu
 * in 20161105
 * Sort all table for all website
 */
 (function() {
	// var jQuery = document.createElement("script");
	// jQuery.type = "text/javascript";
	// jQuery.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.js";
	// document.getElementsByTagName('head')[0].appendChild(jQuery);
	// jQuery.onload = distributeEvent;
	window.onload = distributeEvent;
})();

var className = {
	ascend : "ascend",
	descend : "descend"
}
function distributeEvent() {
	$("table").delegate("th", "click", function() {
		console.log($(this).html());
		/* 检查自身是否已经是排序项 */
		if ($(this).attr("class") == className.ascend) {
			$(this).removeClass().addClass(className.descend);
			sortTable(this, false);
		} else if ($(this).attr("class") == className.descend){
			$(this).removeClass().addClass(className.ascend);
			sortTable(this, true);
		} else {
			$(this).addClass(className.ascend);
			sortTable(this, true);
		}
		/* 清空所有sibling的class */
		/* excellent jQuery! */
		$(this).siblings().removeClass();
	}); 
}
function swap(ele1, ele2) {
	var temp = ele1.html();
	ele1.html(ele2.html());
	ele2.html(temp);
}
function isNumber(s) {
	return !isNaN(s);
}
function gatherFlagHtml(object, index) {
	return object.children().eq(index).html();
}
function compare(ele1, ele2, sortMethod, index) {
	var content1 = gatherFlagHtml(ele1, index);
	var content2 = gatherFlagHtml(ele2, index);
	if (isNumber(content1) && isNumber(content2))
		return compareNumber(content1, content2, sortMethod);
	else
		return compareString(content1, content2, sortMethod);
}
function compareNumber(content1, content2, sortMethod) {
	if (sortMethod) {
			return parseFloat(content1) > parseFloat(content2);
	} else {
			return parseFloat(content1) < parseFloat(content2);
	}
}
function compareString(content1, content2, sortMethod) {
	if (sortMethod) {
			return content1 > content2;
	} else {
			return content1 < content2;
	}	
}
/* @sortMethod
 * true for ascend
 * false for descend
 * @object
 * th element
 */
function sortTable(object, sortMethod) {
	var index = $(object).index();
	console.log(index);
	var tbody = $(object).closest("table").children("tbody");
	var tr = tbody.children("tr");
	for (var i = 0; i < tr.length; ++i) {
		for (var j = i + 1; j < tr.length; ++j) {
			if (compare(tr.eq(i), tr.eq(j), sortMethod, index))
				swap(tr.eq(i), tr.eq(j));
		}
	}
	for (var i = 0; i < tr.length; ++i) {
		tbody.append(tr.eq(i))
	}
}

