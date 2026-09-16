//=================================================================================================
// Fun_Task_Window.js
//=================================================================================================
/*:
 * @target MZ
 * @plugindesc 地图上显示任务窗口。
 * @author 希夷先生
 *
 * @help
 * 插件功能：地图上显示任务窗口
 * 
 * 使用方法：
 * 1. 在事件中插入脚本命令调用插件功能
 * 2. 可通过插件命令控制名字的显示与隐藏
 * 
 * 插件命令：
 * 1. 打开窗口 - 打开当前事件的名字显示

 * 
 * @command 打开窗口
 * @text 打开窗口
 * @desc 打开任务窗口查看信息
 *
 * @command 添加任务
 * @text 添加任务
 * @desc 添加任务的名称
 * 
 * @arg name
 * @text 任务的名称
 * @desc 要添加任务的名称
 * @type string
 * @min 
 * @default 
 *
 * @arg show
 * @text 任务的介绍说明
 * @desc 任务的介绍说明
 * @type string
 * @min 
 * @default 
 *
 * @command 移除任务
 * @text 移除任务
 * @desc 移除任务的名称
 * 
 * @arg name
 * @text 任务的名称
 * @desc 要移除任务的名称
 * @type string
 * @min 
 * @default 
 * 
*/


(() => {
	
    // 自定义窗口 名字为_Name_Window
    function _Name_Window() {
        this.initialize(...arguments);
    };
 
    _Name_Window.prototype = Object.create(Window_Command.prototype);
    _Name_Window.prototype.constructor = _Name_Window;
 
    // 初始化窗口
    _Name_Window.prototype.initialize = function(rect) {
        Window_Command.prototype.initialize.call(this, rect);
		// 绑定取消事件（按 ESC 或取消键时触发）
        this.setHandler("cancel", () => {
            for(let child of _Scene_Map.children){
			    if (child instanceof _Name_Window) {
				    _Scene_Map.removeChild(child);
			    }	
		    }
			for(let child of _Scene_Map.children){
			    if (child instanceof _Show_Window) {
				    _Scene_Map.removeChild(child);
			    }	
		    }
			fun_show = false;
        });
    };
	_Name_Window.prototype.makeCommandList = function() {
		for(let _list of $gameSystem._task.list){
			this.addCommand(_list.name, _list.name);
		}
    };
	
	_Name_Window.prototype.update = function(){
		Window_Command.prototype.update.call(this);
		for(let _data of $gameSystem._task.list){
			if(_data.name === this.commandName(this.index())){
				_show_data = _data.show;
			}
		}
	};
	// 自定义窗口 名字为_Show_Window
    function _Show_Window() {
        this.initialize(...arguments);
    };
 
    _Show_Window.prototype = Object.create(Window_Base.prototype);
    _Show_Window.prototype.constructor = _Show_Window;
 
    // 初始化窗口
    _Show_Window.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
	    
    };
	_Show_Window.prototype.refresh = function(){
		this.contents.clear();
		let _list = _show_data.split("分割");
		let Y=0;
		for(let _data of _list){
			this.drawText(_data, 0, Y*35, this.contents.width, "left");
			Y++;
		}
		
	};
    _Show_Window.prototype.update = function(){
		this.refresh();
	};
    let _Scene_Map;
	let _show_data="";
	let fun_show = false;
	const _Scene_Map_prototype_createSpriteset = Scene_Map.prototype.createSpriteset;
    Scene_Map.prototype.createSpriteset = function() {
        _Scene_Map_prototype_createSpriteset.call(this);
		_Scene_Map = this;
		_show_data="";
		fun_show=false;
    };
	
	//存档功能
	const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this._task= { list:[], shows:[] };
    };
	PluginManager.registerCommand('Fun_Task_Window', '打开窗口', () => {
		fun_show = true;
        _Scene_Map.addChild(new _Name_Window(new Rectangle(180,160, 200,290)));
		_Scene_Map.addChild(new _Show_Window(new Rectangle(360, 163, 400, 400)));
    });
	PluginManager.registerCommand('Fun_Task_Window', '添加任务', args => {
		if(!args){
			return;
		}
		for(let _data of $gameSystem._task.list){
			if(_data.name === args.name){
				return;
			}
		}
		$gameSystem._task.list.push({name:args.name, show:args.show});
    });
	PluginManager.registerCommand('Fun_Task_Window', '移除任务', args => {
		if(args && args.name){
			let _list = [];
			for(let _data of $gameSystem._task.list){
				if(_data.name !== args.name){
					_list.push(_data)
				}
			}
			$gameSystem._task.list = _list;
		}
    });
	//停止人物移动
	const _Game_Player_prototype_canMove = Game_Player.prototype.canMove;
	Game_Player.prototype.canMove = function() {
		if(fun_show){
			return false;
		}
        return _Game_Player_prototype_canMove.call(this);
    };

})();
    function 任务判断(_name){
		let _bool = false;
		for(let _data of $gameSystem._task.list){
			if(_data.name === _name){
				_bool = true;
			}
		}
		return _bool;
	};