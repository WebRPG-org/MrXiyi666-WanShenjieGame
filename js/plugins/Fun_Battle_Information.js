//=================================================================================================
// Fun_Battle_Information.js
//=================================================================================================
/*:
 * @target MZ
 * @plugindesc 战斗显示信息。
 * @author 希夷先生
 *
 * @help
 * 插件功能：战斗显示信息
 * 
 * 
*/

(() => {
	
    function Inform_Window() {
        this.initialize(...arguments);
    };
 
    Inform_Window.prototype = Object.create(Window_Base.prototype);
    Inform_Window.prototype.constructor = Inform_Window;
 
    // 初始化窗口
    Inform_Window.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
	    this._enemy=null;
    };
	Inform_Window.prototype.refresh = function(){
		if(!this._enemy){
			return;
		}
		this.contents.clear();
		this.contents.fillAll(ColorManager.outlineColor());
		let _Data_zero = this._enemy.name();
		if(this._enemy._classId){
			const classId = this._enemy._classId;
			_Data_zero = _Data_zero + "-" + $dataClasses[classId].name;		
		}
		console.log(_Data_zero);
		let result = "";
        for (const char of _Data_zero) {
            result += char;
            if (char === "兽") break;
        }
        _Data_zero = result;
		console.log(_Data_zero);
		this.drawText(_Data_zero, 0, 0, this.width, "center");
		this.contents.fillRect(110, 35, (this.width-145) * (this._enemy.hp/this._enemy.mhp), 35, "rgba(255, 0, 0, 1)");
		this.drawText("生命值：" + this._enemy.hp + " : " + this._enemy.mhp, 10, 35, this.width, "left");
		
	};
    Inform_Window.prototype.update = function(){
		this.refresh();
	};
	let _Enemy_Window;
	let _Actor_Window;
	let _Scene_Battle;
	//=============================添加敌人======================================
	const _Sprite_Enemy_prototype_setBattler = Sprite_Enemy.prototype.setBattler;
	Sprite_Enemy.prototype.setBattler = function(battler) {
        _Sprite_Enemy_prototype_setBattler.call(this, battler);
		if(!battler){
			return;
		}
		_Enemy_Window._enemy = battler;

    };
	//=============================添加角色======================================
	const _Sprite_Actor_prototype_setBattler = Sprite_Actor.prototype.setBattler;
	Sprite_Actor.prototype.setBattler = function(battler) {
        _Sprite_Actor_prototype_setBattler.call(this, battler);
		if(!battler){
			return;
		}
        _Actor_Window._enemy = battler;
    };
	
	const _Scene_Battle_prototype_initialize = Scene_Battle.prototype.initialize;
	Scene_Battle.prototype.initialize = function(){
		_Enemy_Window = new Inform_Window(new Rectangle(0, 20, 406, 100));
		_Actor_Window = new Inform_Window(new Rectangle(410, 20, 407, 100));
		_Scene_Battle_prototype_initialize.call(this);
		_Scene_Battle = this;
	};
	const _Scene_Battle_prototype_createAllWindows = Scene_Battle.prototype.createAllWindows;
	Scene_Battle.prototype.createAllWindows = function(){
		_Scene_Battle_prototype_createAllWindows.call(this);
		for(let child of this.children){
			if (child instanceof Inform_Window) {
				this.removeChild(child);
			}	
		}
		for(let child of this.children){
			if (child instanceof Inform_Window) {
				this.removeChild(child);
			}	
		}
		this.addChild(_Enemy_Window);
		this.addChild(_Actor_Window);
		
	}
	
	//战斗失败
	const _BattleManager_updateBattleEnd = BattleManager.updateBattleEnd;
	BattleManager.updateBattleEnd = function() {
		for(let child of _Scene_Battle.children){
			if (child instanceof Inform_Window) {
				_Scene_Battle.removeChild(child);
			}	
		}
		for(let child of _Scene_Battle.children){
			if (child instanceof Inform_Window) {
				_Scene_Battle.removeChild(child);
			}	
		}
        _BattleManager_updateBattleEnd.call(this);
    };
})();