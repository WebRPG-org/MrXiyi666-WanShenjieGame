    var _actor_move_bool = false; // false 人物可以移动
	var Progress_Bar_index = 120; //进度条时间
	var _Scene_Map;
	const _Scene_Map_prototype_initialize = Scene_Map.prototype.initialize;
	Scene_Map.prototype.initialize = function(){
		_Scene_Map_prototype_initialize.call(this);
		_Scene_Map = this;
		Progress_Bar_index=120;
		_actor_move_bool=false;
	};
	
    //地图名字坐标修改为0 不显示
    const _Scene_Map_prototype_mapNameWindowRect = Scene_Map.prototype.mapNameWindowRect;
	Scene_Map.prototype.mapNameWindowRect = function(){
		return new Rectangle(0, 0, 0, 0);
	};
    
    function 人物暂停移动(){
	    return _actor_move_bool;
    }