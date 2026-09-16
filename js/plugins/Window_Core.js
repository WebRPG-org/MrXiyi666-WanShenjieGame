//=================================================================================================
// Fun_Event_Title_Show.js
//=================================================================================================
/*:
 * @target MZ
 * @plugindesc 窗口核心修改
 * @author 希夷先生
 *
 * @help
 * 插件功能：窗口核心修改
*/

(() => {
	const _Window_prototype__updatePauseSign = Window.prototype._updatePauseSign;
	Window.prototype._updatePauseSign = function() {
        //取消暂停标记
    };
	const _Window_Base_prototype_initialize = Window_Base.prototype.initialize;
	Window_Base.prototype.initialize = function(rect) {
		_Window_Base_prototype_initialize.call(this, rect);
		this.backOpacity=0;
		this.opacity = 0;
		this.frameVisible = false;
		this.文字速度缓冲 = 0;
	};
	Window_Base.prototype.processCharacter = function(textState) {
		this.文字速度缓冲 = this.文字速度缓冲 +0.1;
		if(this.文字速度缓冲 < 0.3){
			return;
		}
		this.文字速度缓冲 = 0;
        const c = textState.text[textState.index++];
        if (c.charCodeAt(0) < 0x20) {
            this.flushTextState(textState);
            this.processControlCharacter(textState, c);
        } else {
            textState.buffer += c;
        }
    };
	
	const _Window_Scrollable_prototype_updateArrows = Window_Scrollable.prototype.updateArrows;
	Window_Scrollable.prototype.updateArrows = function() {
        this.downArrowVisible = false;
        this.upArrowVisible = false;
    };
	const _Window_Selectable_prototype_drawBackgroundRect = Window_Selectable.prototype.drawBackgroundRect;
	Window_Selectable.prototype.drawBackgroundRect = function(rect) {
        
    };
	const _Scene_MenuBase_prototype_createBackground = Scene_MenuBase.prototype.createBackground;
	Scene_MenuBase.prototype.createBackground = function() {
		_Scene_MenuBase_prototype_createBackground.call(this);
        this._backgroundSprite.filters = null;
		this.setBackgroundOpacity(100);
    };
	
	const _Window_Message_prototype_initialize = Window_Message.prototype.initialize;
	Window_Message.prototype.initialize = function(rect) {
		_Window_Message_prototype_initialize.call(this, rect);
		this.backOpacity=100;
	};
	
    
	//保存数量
	const _DataManager_maxSavefiles = DataManager.maxSavefiles;
	DataManager.maxSavefiles = function() {
        return 3;
    };
	const _Scene_Status_prototype_createProfileWindow = Scene_Status.prototype.createProfileWindow; 
	Scene_Status.prototype.createProfileWindow = function() {
		_Scene_Status_prototype_createProfileWindow.call(this);
		this._profileWindow.hide();
	};
})();


function 计算公式(a, b){
	
	let 使用者攻击力 = a.atk;
	let 敌人防御力 = b.def;
	使用者攻击力 = 使用者攻击力 + (a.atk * (a.hp / a.mhp));
	幸运值倍率(使用者攻击力, a.luk);
	if(a.level !== undefined && a.level !== null && a.level > 0 ){
	    使用者攻击力 = 使用者攻击力 + a.level;
	}
	if(b.level !== undefined && b.level !== null && b.level > 0 ){
	    敌人防御力 = 敌人防御力 + b.level;
	}
	敌人防御力 = 敌人防御力 + (b.def * (b.hp / b.mhp));
	幸运值倍率(敌人防御力, b.luk);
	return Math.max(使用者攻击力 - 敌人防御力, 1);
}

function 幸运值倍率(值, luk){
	if(luk >= 999 && luk< 1998){
		 值 = 值 * 2;
	}
	if(luk >= 1998 && luk < 2997){
		值 = 值 * 3;
	}
	if(luk >= 2997 && luk < 3996){
		值 = 值 * 4;
	}
	if(luk > 3996 && luk < 4995){
		值 = 值 * 5;
	}
	if(luk > 4995 && luk < 5994){
		值 = 值 * 6;
	}
	if(luk > 5994 && luk < 6993){
		值 = 值 * 7;
	}
	if(luk > 6993 && luk < 7992){
		值 = 值 * 8;
	}
	if(luk > 7992 && luk < 8991){
		
	}
	if(luk > 9990){
		使用者攻击力 = 使用者攻击力 * 10;
	}
};