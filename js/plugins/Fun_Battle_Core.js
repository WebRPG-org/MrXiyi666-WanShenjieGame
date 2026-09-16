//=================================================================================================
// Fun_Battle_Core.js
//=================================================================================================
/*:
 * @target MZ
 * @plugindesc 战斗系统核心修改。
 * @author 希夷先生
 *
 * @help
 * 插件功能：战斗系统核心修改
 * 
 * 
*/
(() => {
    //敌人出现文本消息
	//=================== 保存原始的 BattleManager.displayStartMessages 方法==========================
	const _BattleManager_displayStartMessages = BattleManager.displayStartMessages;
    BattleManager.displayStartMessages = function() {
        // 移除敌人出现消息的循环
        // 移除先手/偷袭状态提示
		//战斗开始
        //if (this._preemptive) {
        //    $gameMessage.add(TextManager.preemptive.format($gameParty.name()));
        //} else if (this._surprise) {
        //    $gameMessage.add(TextManager.surprise.format($gameParty.name()));
        //}
    };
	//战斗结算文本消息
	//=================== 保存原始的 BattleManager.displayVictoryMessage 方法==========================
	const _BattleManager_displayVictoryMessage = BattleManager.displayVictoryMessage;
	BattleManager.displayVictoryMessage = function() {
        //$gameMessage.add(TextManager.victory.format($gameParty.name()));
		//console.log(TextManager.victory.format($gameParty.name()));
    };
	//战斗胜利 显示经验
	BattleManager.displayExp = function() {
        const exp = this._rewards.exp;
        if (exp > 0) {
            const text = TextManager.obtainExp.format(exp, TextManager.exp);
            //$gameMessage.add("\\." + text);
			
        }
    };
	//战斗失败 文本关闭
	const _BattleManager_displayDefeatMessage = BattleManager.displayDefeatMessage;
	BattleManager.displayDefeatMessage = function() {
        //$gameMessage.add(TextManager.defeat.format($gameParty.name()));
    };
	
	Scene_Map.prototype.encounterEffectSpeed = function() {
        return 10;
    };
	
	const _Scene_Map_prototype_updateEncounterEffect = Scene_Map.prototype.updateEncounterEffect;
	Scene_Map.prototype.updateEncounterEffect = function() {
        if (this._encounterEffectDuration > 0) {
            this._encounterEffectDuration--;
            const speed = this.encounterEffectSpeed();
            const n = speed - this._encounterEffectDuration;
            const p = n / speed;
            const q = ((p - 1) * 20 * p + 5) * p + 1;
            const zoomX = $gamePlayer.screenX();
            const zoomY = $gamePlayer.screenY() - 24;
            if (n === 2) {
                $gameScreen.setZoom(zoomX, zoomY, 1);
                this.snapForBattleBackground();
                //this.startFlashForEncounter(speed / 2);
            }
            //$gameScreen.setZoom(zoomX, zoomY, q);
            if (n === Math.floor(speed / 6)) {
                //this.startFlashForEncounter(speed / 2);
            }
            if (n === Math.floor(speed / 2)) {
                BattleManager.playBattleBgm();
                this.startFadeOut(this.fadeSpeed());
            }
        }
    };
	//战斗结束处理
	BattleManager.updateBattleEnd = function() {
        if (this.isBattleTest()) {
            AudioManager.stopBgm();
            SceneManager.exit();
        } else if (!this._escaped && $gameParty.isAllDead()) {
		    //战斗失败回到上一个界面 不结束游戏
            $gameParty.reviveBattleMembers();
            SceneManager.pop();
        } else {
            SceneManager.pop();
        }
        this._phase = "";
    };
	//去掉战斗状态窗口
	const _Scene_Battle_prototype_createAllWindows = Scene_Battle.prototype.createAllWindows;
	Scene_Battle.prototype.createAllWindows = function(){
		_Scene_Battle_prototype_createAllWindows.call(this);
		this._statusWindow.hide();
	};
	//角色出现坐标修改
	const _Sprite_Actor_prototype_moveToStartPosition = Sprite_Actor.prototype.moveToStartPosition;
	Sprite_Actor.prototype.moveToStartPosition = function() {
        this.startMove(300, 100, 0);
    };
    //角色坐标修改
    const _Sprite_Actor_prototype_setActorHome = Sprite_Actor.prototype.setActorHome;
    Sprite_Actor.prototype.setActorHome = function(index) {
        this.setHome(600 + index * 32, 480 + index * 48);
    };
	//帮助窗口 坐标 宽高 修改为 0 不显示
	const _Scene_Battle_prototype_helpWindowRect = Scene_Battle.prototype.helpWindowRect;
	Scene_Battle.prototype.helpWindowRect = function(){
		return new Rectangle(0, 0, 0, 0);
	};
	//日志窗口 坐标 宽高 修改为 0 不显示
	const _Scene_Battle_prototype_logWindowRect = Scene_Battle.prototype.logWindowRect;
	Scene_Battle.prototype.logWindowRect = function(){
		return new Rectangle(0, 0, 0, 0);
	};
	//去掉升级信息
	Game_Actor.prototype.shouldDisplayLevelUp = function() {
    return false;
    };
	//去掉掉落物品信息
	BattleManager.displayDropItems = function() {
  
    };
})();