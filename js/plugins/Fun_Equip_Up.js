//=================================================================================================
// Fun_Equip_Up.js
//=================================================================================================
/*:
 * @target MZ
 * @plugindesc 成长装备 提升属性。
 * @author 希夷先生
 *
 * @help
 * 插件功能：提升指定装备属性
 *
 * @command 提升攻击值
 * @text 提升攻击值
 * @desc 提升攻击值
 * 
 * @arg index
 * @type string
 * @min 0
 * @max 100
 * @default 0
 * @text 提升值
 * @desc 提升值
 *
 * @command 提升恢复能力
 * @text 提升恢复能力
 * @desc 提升恢复能力
 * 
 * @arg index
 * @type string
 * @min 0
 * @max 100
 * @default 0
 * @text 提升值
 * @desc 提升值
 *
 * @command 提升防御能力
 * @text 提升防御能力
 * @desc 提升防御能力
 * 
 * @arg index
 * @type string
 * @min 0
 * @max 100
 * @default 0
 * @text 提升值
 * @desc 提升值
*/

(() => {
    let _init_create = true;
	const _Scene_Map_prototype_create = Scene_Map.prototype.create;
    Scene_Map.prototype.create = function(){
	    _Scene_Map_prototype_create.call(this);
		const equips = $gameActors.actor(1)._equips;
		// 遍历装备数组
        if(_init_create){
			$dataWeapons[equips[0]._itemId].traits[0].value = $dataWeapons[equips[0]._itemId].traits[0].value + $gameSystem.Fun_Weapons;
			$dataArmors[equips[0]._itemId].traits[0].value = $dataArmors[equips[0]._itemId].traits[0].value + $gameSystem.Fun_Armor.Reply;
			$dataArmors[equips[0]._itemId].traits[1].value = $dataArmors[equips[0]._itemId].traits[1].value + $gameSystem.Fun_Armor.Defense
			_init_create = false;
		}
    };
    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this.Fun_Weapons= 0;
		this.Fun_Armor = {Reply : 0, Defense : 0};
    };

    PluginManager.registerCommand('Fun_Equip_Up', '提升攻击值', args => {
		if(!args){
			return;
		}
		const equips = $gameActors.actor(1)._equips;
	  	$gameSystem.Fun_Weapons = $gameSystem.Fun_Weapons + Number(args.index);
		$dataWeapons[equips[0]._itemId].traits[0].value = $dataWeapons[equips[0]._itemId].traits[0].value + Number(args.index);
    });
	
	PluginManager.registerCommand('Fun_Equip_Up', '提升恢复能力', args => {
		if(!args){
			return;
		}
		const equips = $gameActors.actor(1)._equips;
	  	$gameSystem.Fun_Armor.Reply = $gameSystem.Fun_Armor.Reply + Number(args.index);
		$dataArmors[equips[0]._itemId].traits[0].value = $dataArmors[equips[0]._itemId].traits[0].value + Number(args.index);
    });
	
	PluginManager.registerCommand('Fun_Equip_Up', '提升防御能力', args => {
		if(!args){
			return;
		}
		const equips = $gameActors.actor(1)._equips;
	  	$gameSystem.Fun_Armor.Defense = $gameSystem.Fun_Armor.Defense + Number(args.index);
		$dataArmors[equips[0]._itemId].traits[1].value = $dataArmors[equips[0]._itemId].traits[1].value + Number(args.index);
    });
})();