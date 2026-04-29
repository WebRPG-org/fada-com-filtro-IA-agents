//=============================================================================
// MOG_TitlePictureCom.js
//=============================================================================

/*:
 * @plugindesc (v1.1) Adiciona comandos em imagens no lugar da janela.
 * @author Moghunter
 *
 * @param New Game X-Axis
 * @desc Definição X-axis do comando novo jogo.
 * @default 0
 *
 * @param New Game Y-Axis
 * @desc Definição Y-axis do comando novo jogo.
 * @default 0
 *
 * @param Continue X-Axis
 * @desc Definição X-axis do comando continue.
 * @default 0
 *
 * @param Continue Y-Axis
 * @desc VDefinição Y-axis do comando continue.
 * @default 32
 *
 * @param Options X-Axis
 * @desc Definição X-axis do comando opção.
 * @default 0
 *
 * @param Options Y-Axis
 * @desc Definição Y-axis do comando opção.
 * @default 64
 * 
 * @param Title Sprite
 * @desc Ativar o nome do título em sprite.
 * É necessário ter o arquivo Title.png na pasta img/titles2/
 * @default false
 * 
 * @param Title Sprite X-Axis
 * @desc Definição X-axis do texto do título.
 * @default 0
 *
 * @param Title Sprite Y-Axis
 * @desc Definição Y-axis do texto do título.
 * @default 0
 *
 * @help  
 * =============================================================================
 * +++ MOG - Title Picture Commands (v1.1) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Adiciona comandos em imagens no lugar da janela.
 * É necessário ter os arquivos:
 *
 * Command_0.png, Command_1.png e Command_2.png 
 *
 * Grave as imagens na pasta:
 *
 * img/titles2/
 *
 * =============================================================================
 * ** Histórico **
 * =============================================================================
 * v1.1 - Corrigido o glich de poder clicar no comando durante o fade.
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_Picture_Command = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_TitlePictureCom');
    Moghunter.title_pic_com_1_x = Number(Moghunter.parameters['New Game X-Axis'] || 0);
    Moghunter.title_pic_com_1_y = Number(Moghunter.parameters['New Game Y-Axis'] || 0);
    Moghunter.title_pic_com_2_x = Number(Moghunter.parameters['Continue X-Axis'] || 0);
    Moghunter.title_pic_com_2_y = Number(Moghunter.parameters['Continue Y-Axis'] || 32);
	Moghunter.title_pic_com_3_x = Number(Moghunter.parameters['Options X-Axis'] || 0);
	Moghunter.title_pic_com_3_y = Number(Moghunter.parameters['Options Y-Axis'] || 64);
	Moghunter.title_sprite = (Moghunter.parameters['Title Sprite'] || false);
	Moghunter.title_x = Number(Moghunter.parameters['Title Sprite X-Axis'] || 0);
	Moghunter.title_y = Number(Moghunter.parameters['Title Sprite Y-Axis'] || 0);
	
//=============================================================================
// ** Window_TitleCommand
//=============================================================================	

//==============================
// * updatePlacement
//==============================
var _alias_mog_title_picture_commands_updatePlacement = Scene_Title.prototype.updatePlacement;
Window_TitleCommand.prototype.updatePlacement = function() {
   this.x = -Graphics.boxWidth;
   this.y = -Graphics.boxheight;
   this.visible = false;
};

//=============================================================================
// ** Scene Title
//=============================================================================	

//==============================
// * Create
//==============================
var _alias_mog_title_picture_commands_create = Scene_Title.prototype.create;
Scene_Title.prototype.create = function() {
    _alias_mog_title_picture_commands_create.call(this);
    this.create_picture_commands();
};

//==============================
// * Update
//==============================
var _alias_mog_title_picture_commands_update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function() {
    _alias_mog_title_picture_commands_update.call(this);
	this.update_picture_commands();
};

//==============================
// * Create Picture Commands
//==============================
Scene_Title.prototype.create_picture_commands = function() {	
	var _com_index_old = -2;
	this._csel = false;
	this._com_pictures = [];
	this._com_sprites = [];	
	this._com_pictures_data = [];
	for (i = 0; i < this._commandWindow._list.length; i++){
    	this._com_pictures.push(ImageManager.loadTitle2("Command_" + i));
		this._com_sprites.push(new Sprite(this._com_pictures[i]));		
	    this.addChild(this._com_sprites[i]);	
	};
}

//==============================
// * Refresh Picture Command
//==============================
Scene_Title.prototype.refresh_picture_command = function() {
	this._com_index_old = this._commandWindow._index;
	for (i = 0; i < this._com_sprites.length; i++){
		if (this._commandWindow._index != i) {
        var ch = this._com_pictures[i].height / 2;
		}
		else {
		var ch = 0;
      	}
		if (i == 0) {this.cpsx = [Moghunter.title_pic_com_1_x ,Moghunter.title_pic_com_1_y];}
		else if (i == 1) {this.cpsx = [Moghunter.title_pic_com_2_x ,Moghunter.title_pic_com_2_y];}
		else {this.cpsx = [Moghunter.title_pic_com_3_x, Moghunter.title_pic_com_3_y];};
		if (this._commandWindow._list[i].symbol === 'continue' && !this._commandWindow.isContinueEnabled()) {this._com_sprites[i].opacity = 160};
		this._com_sprites[i].setFrame(0, ch, this._com_pictures[i].width, this._com_pictures[i].height / 2);
		this._com_sprites[i].x = ((Graphics.boxWidth / 2) - (this._com_pictures[i].width / 2)) + this.cpsx[0];
		this._com_sprites[i].y = ((Graphics.boxHeight / 2) + (this._com_pictures[i].height / 2)) + this.cpsx[1];
		this._com_pictures_data[i] = [this._com_sprites[i].x,this._com_pictures[i].width ,this._com_sprites[i].y,this._com_pictures[i].height / 2 ];
	}; 
}
  
//==============================
// * Update Picture Commands
//==============================
Scene_Title.prototype.update_picture_commands = function() {
	if (this._com_index_old != this._commandWindow._index) { this.refresh_picture_command()};
	if (TouchInput.isTriggered(true)) {
		for (i = 0; i < this._com_sprites.length; i++){
			if (this.on_picture_com(i) && !this._csel ) {				
				this._commandWindow._index = i;	 this._commandWindow.processOk();
	            if (this._commandWindow.isCommandEnabled(i)) {this._csel = true};
		   }			
		}
	}
}

//==============================
// * On Picture Com
//==============================
Scene_Title.prototype.on_picture_com = function(index) {
	 if (TouchInput.x < this._com_pictures_data[index][0]) { return false};
	 if (TouchInput.x > this._com_pictures_data[index][0] + this._com_pictures_data[index][1]) { return false};
	 if (TouchInput.y < this._com_pictures_data[index][2]) { return false};
	 if (TouchInput.y > this._com_pictures_data[index][2] + this._com_pictures_data[index][3]) { return false};
	 return true;	 
}

if (Moghunter.title_sprite == "true") {
//==============================
// * Create Foreground
//==============================
Scene_Title.prototype.createForeground = function() {
    this._gameTitleSprite = new Sprite(ImageManager.loadTitle2("Title"));
    this.addChild(this._gameTitleSprite);
	this._gameTitleSprite.x = Moghunter.title_x;
	this._gameTitleSprite.y = Moghunter.title_y;
};
};