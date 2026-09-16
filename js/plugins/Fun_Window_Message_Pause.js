
    var message_auto = false;     //是否启用自动跳过
    var message_time = 60;       //自动跳过计时
	const _Window_Message_prototype_update = Window_Message.prototype.update;
    Window_Message.prototype.update = function(){
		_Window_Message_prototype_update.call(this);
		if(!message_auto){
			return;
		}
		if(!this.pause){
			return;
		}
		if(Input.isPressed("up") || Input.isPressed("down") || Input.isPressed("right") || Input.isPressed("left") || TouchInput.isTriggered()){
			message_time = 0;
		}
		message_time = message_time - 1;
		if(message_time > 0){
			return;
		}
		
        this.pause = false;
		this.terminateMessage();
    };
	
	const _Window_Message_prototype_terminateMessage = Window_Message.prototype.terminateMessage;
	Window_Message.prototype.terminateMessage = function() {
        _Window_Message_prototype_terminateMessage.call(this);
		message_auto = false;
		message_time = 60;
    };
	const _Message_Scene_Map_prototype_createAllWindows = Scene_Map.prototype.createAllWindows;
	Scene_Map.prototype.createAllWindows = function(){
		_Message_Scene_Map_prototype_createAllWindows.call(this);
	    message_auto = false;
		message_time = 60;
	};
    function 启用文本自动(){
		message_time = 60;
	    message_auto = true;
    };