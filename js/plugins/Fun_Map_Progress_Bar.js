//=================================================================================================
// Fun_Map_Progress_Bar.js
//=================================================================================================
/*:
 * @target MZ
 * @plugindesc 地图上显示进度条。
 * @author 希夷先生
 *
 * @help
 * 插件功能：地图上显示进度条
 * 
 * 插件命令：
 * 1. 打开进度条 几秒后消失
 * 
 * @command 打开进度条
 * @text 打开进度条
 * @desc 打开进度条
 * 
*/

(() => {
	//画出进度条
    function Progress_Bar_Window() {
        this.initialize(...arguments);
    };
 
    Progress_Bar_Window.prototype = Object.create(Window_Base.prototype);
    Progress_Bar_Window.prototype.constructor = Progress_Bar_Window;
 
    // 初始化窗口
    Progress_Bar_Window.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
		Progress_Bar_index=120;
	    this.jishi = 120;
    };
	Progress_Bar_Window.prototype.refresh = function(){
		if(Progress_Bar_index <=0){
			for(let child of _Scene_Map.children){
			    if (child instanceof Progress_Bar_Window) {
				    _Scene_Map.removeChild(child);
			    }
		    }
			_actor_move_bool = false;
			Progress_Bar_index=120;
			return;
		}
		Progress_Bar_index--;
		this.contents.clear();
		this.contents.fillAll(ColorManager.outlineColor());
		this.contents.fillRect(0, 0, this.width * (Progress_Bar_index / this.jishi), this.height, "rgba(0, 255, 255, 1)");
	};
    Progress_Bar_Window.prototype.update = function(){
		this.refresh();
	};
	const _Scene_Map_prototype_createAllWindows = Scene_Map.prototype.createAllWindows;
	Scene_Map.prototype.createAllWindows = function(){
		_Scene_Map_prototype_createAllWindows.call(this);
		_actor_move_bool = false;
	};
	//停止人物移动
	const _Game_Player_prototype_canMove = Game_Player.prototype.canMove;
	Game_Player.prototype.canMove = function() {
		if(_actor_move_bool){
			return false;
		}
        return _Game_Player_prototype_canMove.call(this);
    };
	
	PluginManager.registerCommand('Fun_Map_Progress_Bar', '打开进度条', () => {
		_actor_move_bool = true;
		for(let child of _Scene_Map.children){
			if (child instanceof Progress_Bar_Window) {
				_Scene_Map.removeChild(child);
			}
		}
        _Scene_Map.addChild(new Progress_Bar_Window(new Rectangle(270,400, 300,60)));
    });
})();
