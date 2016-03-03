$('#close_window').click(function(){
	$(this).css('color','#ddd');
	windowClose();
});

function windowClose(){
	if(typeof(window.js_interface) == "undefined"){
        history.go(-1);
    }else{
		window.js_interface.closeWindow();
	}
}


function openWindow(url){
	if(typeof(window.js_interface) == "undefined"){
        location.href=url;
    }else{
		window.js_interface.jumpToDetail(url);
	}
}

function takeSamplesForEmployee(){
	if(typeof(window.js_interface) == "undefined"){
        return
    }else{
		window.js_interface.takeSamplesForEmployee();
	}
}