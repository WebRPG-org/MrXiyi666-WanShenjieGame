(() =>{
    
	Scene_Menu.prototype.statusWindowRect = function() {
        return new Rectangle(0, 0, 424, 500);
    };
	
	Scene_Menu.prototype.createStatusWindow = function() {
        const rect = this.statusWindowRect();
        this._statusWindow = new New_Window_Status(rect);
        this.addWindow(this._statusWindow);
    };
	
	function New_Window_Status() {
        this.initialize(...arguments);
    };

    New_Window_Status.prototype = Object.create(Window_StatusBase.prototype);
    New_Window_Status.prototype.constructor = New_Window_Status;

    New_Window_Status.prototype.initialize = function(rect) {
		rect.y = rect.y + 50;
		rect.width = rect.width + 100;
        Window_StatusBase.prototype.initialize.call(this, rect);
		this.actor_bitmap = ImageManager.loadPicture("Actor");
        this._actor = null;
        this.refresh();
		
    };
	New_Window_Status.prototype.setActor = function(actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
        }
    };
	New_Window_Status.prototype.refresh = function(){
		this.contents.clear();
		this.contents.blt(this.actor_bitmap, 0, 0, 424, 428, 0, 0, 324, 328);
		this.生命值文本();
		//经验值
		this.changeTextColor(ColorManager.textColor(1));
		this.drawText("生命能量：", 0, 430, this.contents.width, "left");
		this.changeTextColor(ColorManager.textColor(0));
		this.drawText($gameParty.leader()._exp[1], 130, 430, this.contents.width, "left");
		this.changeTextColor(ColorManager.textColor(1));
		this.drawText("名字：", 290, 0, 200, "left");
		this.changeTextColor(ColorManager.textColor(0));
		this.drawText($gameParty.leader()._name, 370, 0, 200, "left");
		const leader = $gameParty.leader();
        const classId = leader._classId;
		this.changeTextColor(ColorManager.textColor(1));
		this.drawText("境界：", 290, 50, 200, "left");
		this.changeTextColor(ColorManager.textColor(0));
		this.drawText($dataClasses[classId].name, 370, 50, 200, "left");
	
	};
	
	New_Window_Status.prototype.生命值文本 = function(){
		this.changeTextColor(ColorManager.textColor(1));
		this.drawText("生命值：", 0, 328, 120, "left");
		this.contents.fillRect(0, 373, 420 * ($gameActors.actor(1).hp / $gameActors.actor(1).mhp), 50, "rgba(200,0,0,1)");
		this.changeTextColor(ColorManager.textColor(0));
		this.drawText($gameActors.actor(1).hp + "/" + $gameActors.actor(1).mhp, 0, 380, 420, "center");
	};

})();