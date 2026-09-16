(() => {
	//物品栏变为三个选项
    Window_ItemCategory.prototype.maxCols = function() {
        return 1;
    };
	Scene_Menu.prototype.createCommandWindow = function() {
        const rect = this.commandWindowRect();
        const commandWindow = new Window_MenuCommand(rect);
        commandWindow.setHandler("item", this.commandItem.bind(this));
        commandWindow.setHandler("skill", this.commandPersonal.bind(this));
        commandWindow.setHandler("equip", this.commandPersonal.bind(this));
        commandWindow.setHandler("status", this.commandPersonal.bind(this));
        commandWindow.setHandler("formation", this.commandFormation.bind(this));
        commandWindow.setHandler("options", this.commandOptions.bind(this));
        commandWindow.setHandler("save", this.commandSave.bind(this));
        //commandWindow.setHandler("gameEnd", this.commandGameEnd.bind(this));
        commandWindow.setHandler("cancel", this.popScene.bind(this));
        this.addWindow(commandWindow);
        this._commandWindow = commandWindow;
    };
	Window_MenuCommand.prototype.addGameEndCommand = function() {
        //const enabled = this.isGameEndEnabled();
        //this.addCommand(TextManager.gameEnd, "gameEnd", enabled);
    };
	
    Scene_Menu.prototype.createStatusWindow = function() {
        const rect = this.statusWindowRect();
        this._statusWindow = new Window_MenuStatus(rect);
        this.addWindow(this._statusWindow);
		this._statusWindow.hide();
    };
	Scene_Menu.prototype.commandPersonal = function() {
        SceneManager.push(Scene_Status);
    };
	Scene_Menu.prototype.commandWindowRect = function() {
        const ww = this.mainCommandWidth();
        const wh = this.mainAreaHeight() - this.goldWindowRect().height;
        const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
        const wy = this.mainAreaTop() + 130;
        return new Rectangle(wx, wy, ww, wh);
    };
	Sprite_Button.prototype.buttonData = function() {
        const buttonTable = {
        cancel: { x: 0, w: 2 },
        pageup: { x: 0, w: 0 },
        pagedown: { x: 0, w: 0 },
        down: { x: 0, w: 0 },
        up: { x: 0, w: 0 },
        down2: { x: 0, w: 0 },
        up2: { x: 0, w: 0 },
        ok: { x: 8, w: 2 },
        menu: { x: 10, w: 1 }
        };
        return buttonTable[this._buttonType];
    };
})();