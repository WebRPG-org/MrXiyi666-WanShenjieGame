(()=>{



    Scene_Status.prototype.createStatusWindow = function() {
        const rect = this.statusWindowRect();
        this._statusWindow = new New_Window_Status(rect);
        this._statusWindow.setHandler("cancel", this.popScene.bind(this));
        this._statusWindow.setHandler("pagedown", this.nextActor.bind(this));
        this._statusWindow.setHandler("pageup", this.previousActor.bind(this));
        this.addWindow(this._statusWindow);
    };
	Scene_Status.prototype.createStatusEquipWindow = function() {
        const rect = this.statusEquipWindowRect();
        this._statusEquipWindow = new Window_StatusEquip(rect);
        this.addWindow(this._statusEquipWindow);
	    this._statusEquipWindow.hide();
    };
	Scene_Status.prototype.createStatusParamsWindow = function() {
        const rect = this.statusParamsWindowRect();
        this._statusParamsWindow = new Window_StatusParams(rect);
        this.addWindow(this._statusParamsWindow);
	    this._statusParamsWindow.hide();
    };
	Scene_Status.prototype.statusWindowRect = function() {
        const wx = 0;
        const wy = 0;
        const ww = Graphics.boxWidth;
        const wh = Graphics.boxHeight;
        return new Rectangle(wx, wy, ww, wh);
    };
	
    function New_Window_Status() {
        this.initialize(...arguments);
    };

    New_Window_Status.prototype = Object.create(Window_StatusBase.prototype);
    New_Window_Status.prototype.constructor = New_Window_Status;

    New_Window_Status.prototype.initialize = function(rect) {
		rect.y = rect.y + 50;
        Window_StatusBase.prototype.initialize.call(this, rect);
        this._actor = null;
        this.refresh();
        this.activate();
		
    };
	New_Window_Status.prototype.setActor = function(actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
        }
    };
	New_Window_Status.prototype.refresh = function() {
        Window_StatusBase.prototype.refresh.call(this);
        if (this._actor) {
			
            //头像
			this.drawActorFace(this._actor, 12, 0);
			
			//名称
			this.changeTextColor(ColorManager.textColor(1));
			this.drawText("名字：", 160, 0, this.textWidth("名字："), "left");
			this.changeTextColor(ColorManager.textColor(0));
			this.drawActorName(this._actor, this.textWidth("名字：") + 160, 0, 168);
			
			//职业
			this.changeTextColor(ColorManager.textColor(1));
			this.drawText("境界：", 160, 110, this.textWidth("境界："), "left");
			this.changeTextColor(ColorManager.textColor(0));
			this.drawActorClass(this._actor, this.textWidth("职业：") + 160, 110, 168);
			
			//等级
			//this.drawActorLevel(this._actor, 160, 110);
			this.生命值文本();
			
			//经验值
			this.changeTextColor(ColorManager.textColor(1));
		    this.drawText("生命能量：", 0, 500, this.contents.width, "left");
		    this.changeTextColor(ColorManager.textColor(0));
		    this.drawText($gameParty.leader()._exp[1], 130, 500, this.contents.width, "left");
            this.属性文本();
		    this.装备文本();
			
		}
		
    };
	
	New_Window_Status.prototype.装备文本 = function(){
		//画出装备
		this.drawText("装备：", 360, 190, this.contents.width, "left");
		let equips = this._actor.equips();
        let item = equips[0];
        let slotName = this.actorSlotName(this._actor, 0) + "：  ";
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(slotName, 360, 230, this.contents.width, "left");
        this.drawItemName(item, 450, 230, this.contents.width);
		item = equips[1];
        slotName = this.actorSlotName(this._actor, 1) + "：  ";
	    this.changeTextColor(ColorManager.systemColor());
        this.drawText(slotName, 360, 270, this.contents.width, "left");
        this.drawItemName(item, 450, 270, this.contents.width);

	};
	
	New_Window_Status.prototype.属性文本 = function() {
		//画出属性值
		this.drawText("属性：", 12, 190, this.contents.width, "left");
		let name = TextManager.param(2) + "：  ";
        let value = this._actor.param(2);
		this.changeTextColor(ColorManager.textColor(1));
		this.drawText(name, 12, 230, this.contents.width, "left");
		this.changeTextColor(ColorManager.textColor(0));
		this.drawText(value, 120, 230, this.contents.width, "left");
		name = TextManager.param(3) + "：  ";
        value = this._actor.param(3);
		this.changeTextColor(ColorManager.textColor(1));
		this.drawText(name, 12, 270, this.contents.width, "left");
		this.changeTextColor(ColorManager.textColor(0));
		this.drawText(value, 120, 270, this.contents.width, "left");
		name = TextManager.param(6) + "：  ";
        value = this._actor.param(6);
		this.changeTextColor(ColorManager.textColor(1));
		this.drawText(name, 12, 310, this.contents.width, "left");
		this.changeTextColor(ColorManager.textColor(0));
		this.drawText(value, 120, 310, this.contents.width, "left");
		name = TextManager.param(7) + "：  ";
        value = this._actor.param(7);
		this.changeTextColor(ColorManager.textColor(1));
		this.drawText(name, 12, 350, this.contents.width, "left");
		this.changeTextColor(ColorManager.textColor(0));
		this.drawText(value, 120, 350, this.contents.width, "left");
	};
	
	New_Window_Status.prototype.生命值文本 = function(){
		this.changeTextColor(ColorManager.textColor(1));
		this.drawText("生命值：", 360, 0, 120, "left");
		this.contents.fillRect(360, 55, 420 * (this._actor.hp / this._actor.mhp), 50, "rgba(200,0,0,1)");
		this.changeTextColor(ColorManager.textColor(0));
		this.drawText(this._actor.hp + "/" + this._actor.mhp, 360, 62, 420, "center");
		
		
	};
})();