//=================================================================================================
// Fun_Map_Title.js
//=================================================================================================
/*:
 * @target MZ
 * @plugindesc 地图上显示名字和坐标。
 * @author 希夷先生
 *
 * @help
 * 插件功能：地图上显示名字和坐标
 * 
 * 
*/

(() => {
	
    // 自定义窗口 名字为_New_Window
    function _New_Window() {
        this.initialize(...arguments);
    };
 
    _New_Window.prototype = Object.create(Window_Base.prototype);
    _New_Window.prototype.constructor = _New_Window;
 
    // 初始化窗口
    _New_Window.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
    };
	//画出内容
	_New_Window.prototype.refresh = function(item_data){
		this.contents.clear();
		this.drawText($gameMap.displayName() , 0, 0, this.contents.width, "left");
		this.drawText("X: "+$gamePlayer.x , 0, 35, this.contents.width, "left");
		this.drawText("Y: "+$gamePlayer.y , 0, 70, this.contents.width, "left");
	};
	
	_New_Window.prototype.update = function(){
		this.refresh();
	};	
    const _Scene_Map_prototype_createSpriteset = Scene_Map.prototype.createSpriteset;
    Scene_Map.prototype.createSpriteset = function() {
        _Scene_Map_prototype_createSpriteset.call(this);
		this.addChild(new _New_Window(new Rectangle(0,0, 816,624)));
    };
	
})();