//=============================================================================
// Fun_Enemy_Battler_Information.js
//=============================================================================
/*:
* @target MZ
* @plugindesc 战斗场景显示敌人详细信息
* @author 希夷先生
*/
(() => {
	//定义精灵
    function Enemy_Battler_Information() {
        this.initialize.apply(this, arguments)
    }
    Enemy_Battler_Information.prototype = Object.create(Sprite.prototype);
    Enemy_Battler_Information.prototype.constructor = Enemy_Battler_Information;
	//==============================
    //初始化设置
    Enemy_Battler_Information.prototype.initialize = function(width, height) {
	    Sprite.prototype.initialize.call(this);
		this.width = width;
		this.height=height;
		this.frome_height=48;
		this.bitmap = new Bitmap(this.width, this.height);
		this.bitmap.fontFace = $gameSystem.mainFontFace();
        this.bitmap.fontSize = 18;//$gameSystem.mainFontSize();
		this.bitmap.outlineColor = ColorManager.outlineColor();
		this.bitmap.textColor = ColorManager.normalColor();
		this.bitmap.smooth = true;
		this.bitmap.outlineWidth = 3;
		this.bitmap.paintOpacity = 255;
		this._enemy=null;
		this.isClear = false;
    }
	Enemy_Battler_Information.prototype.refresh = function() {
		this.isClear=false;
		this.bitmap.clear();
		this.bitmap.fillAll(ColorManager.outlineColor());
		if(!this._enemy){
			return;
		}
		this.datas = this._enemy.enemy().note.split("\n"); //敌人信息备注
		this.bitmap.drawText(this._enemy.name(), 0, 0, this.width-10, this.frome_height, "center");
		this.bitmap.drawText("生命值：" + this._enemy.hp + "/" + this._enemy.mhp, 5, this.bitmap.fontSize*2, this.width - 10, this.frome_height, "left");
		this.bitmap.drawText("灵力值：" + this._enemy.mp + "/" + this._enemy.mmp, 5, this.bitmap.fontSize*3, this.width-10, this.frome_height, "left");
		let y_id = 4;
		for(let i=0; i < this.datas.length; i++){
			this.bitmap.drawText(this.datas[i], 5, this.bitmap.fontSize*y_id, this.width-10, this.frome_height, "left");
			y_id++;
		}
		this.move(0-this.width/2, 0-this.height);
	}

	Enemy_Battler_Information.prototype.setEnemy = function(_enemy) {
			this._enemy = _enemy;
	}
	Enemy_Battler_Information.prototype.setSize = function(width, height){
			this.width = width;
			this.height = height;
			this.bitmap.resize(this.width, this.height);
	}
	Enemy_Battler_Information.prototype.clear = function() {
		if(!this.isClear){
			this.bitmap.clear();
		}
		this.isClear = true;
	    
	}
	
	let _Window_BattleEnemy=null;
	//=============================添加敌人======================================
	const _Sprite_Enemy_prototype_setBattler = Sprite_Enemy.prototype.setBattler;
	Sprite_Enemy.prototype.setBattler = function(battler) {
        _Sprite_Enemy_prototype_setBattler.call(this, battler);
		for (const child of this.children) {
            if (child instanceof Enemy_Battler_Information) {
                this.removeChild(child);
           }
        }
		this.addChild(new Enemy_Battler_Information(0, 0));
		for (const child of this.children) {
		    if (child instanceof Enemy_Battler_Information) {
			    child.setEnemy(battler);
			}
		}
    };
	//=============================更新可见区域 实时更新======================================
	const _Sprite_Enemy_prototype_updateFrame = Sprite_Enemy.prototype.updateFrame;
	Sprite_Enemy.prototype.updateFrame = function() {
        _Sprite_Enemy_prototype_updateFrame.call(this);
		for (const child of this.children) {
            if (child instanceof Enemy_Battler_Information) {
                if(!_Window_BattleEnemy.active){
			        child.clear();
		            return;
		        }
				child.setSize(this.bitmap.width, this.bitmap.height);
		        child.refresh();
            }
        }	
    };
	
	const _Window_BattleEnemy_prototype_initialize = Window_BattleEnemy.prototype.initialize;
	Window_BattleEnemy.prototype.initialize = function(rect) {
        _Window_BattleEnemy_prototype_initialize.call(this, rect);
		_Window_BattleEnemy=this;
    };
})();