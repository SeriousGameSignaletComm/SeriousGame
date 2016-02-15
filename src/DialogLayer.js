var DialogLayer = cc.Layer.extend({

textField : null,
centerpos : null,
cont : 0,
	
	ctor:function()
	{
		this._super();
		this.init();

		//ici on va créer le méthode de réponse au clavier

		if ( cc.sys.capabilities.hasOwnProperty( 'keyboard' ) ) 
		{
			p = this; //ce ligne est important pour garder l'objet <<cc.Layer.extend>> dans la variable p.
					  //on fait cela parce que, une fois dans <<cc.eventManager.addListener>> on est dans un autre objet
					  //et on ne peut plus récuperer les paramètres globaux qui sont dehors.
		    cc.eventManager.addListener(
		    {
		        event: cc.EventListener.KEYBOARD,
		        
		        onKeyPressed: function( key, event )
		        {
		            /*cc.log( "Key Pressed: " + key.toString( ) );
		            
		            if(p.cont == 0){ //regarde comme on doit bien utiliser p.cont pour récuperer le conteur
		            	cc.log("ok, nice");
		            }*/
		            if(key.toString() == 13){
		            	p.dialog(p.cont); //là, quand on pressione 'enter', la touche 13 selon l'ASCII, on vas appeler la fonction dialog, avec paramètre 'cont' 
		            }
		        },
		        
		        onKeyReleased: function( key, event )
		        {
		           // cc.log( "Key Released: " + key.toString( ) );
		           // i'm adding this line here to test
		        }
		    }, this );
		}
	},
	

	init:function()
	{
		this._super();

		var size = cc.director.getWinSize();
		this.centerpos = cc.p(size.width / 2, size.height / 2);
		this.cont = 0;

		this.scheduleOnce(this.introduction, 3);
	},

	introduction:function(){

		var dialogBox = new cc.Sprite(res.dialogBox_png);
		dialogBox.setAnchorPoint(cc.p(0,0));
		dialogBox.setPosition(cc.p(160,10));
		dialogBox.setTag(-1);
		this.addChild(dialogBox);

		var size = cc.director.getWinSize();

		var intro0 = new cc.LabelTTF("Oh, bonjour! Vous paraître nouveau ici.", "American Typewriter", 16);
	    intro0.setPosition(cc.p(240, 80));
	    intro0.setTag(0);
	    this.addChild(intro0);

	},

	dialog:function(cont){

	var size = cc.director.getWinSize();

		switch(cont){
			case 0:
				this.removeChildByTag(this.cont, true);
				var intro = new cc.LabelTTF("Je suis un peu occupé. Le phare me paraître un peu bizarre.", "American Typewriter", 16);
		        intro.setPosition(cc.p(240, 80));
		        intro.setTag(0);
		        this.addChild(intro);
		        this.cont = cont + 1;
		        cc.log(this.cont);

		        break;

		    case 1:
		    	this.removeChildByTag(this.cont-1, true);
		    	var intro = new cc.LabelTTF("Est-ce que tu pense qu'il veut dire quelque chose? Une message peut-être.", "American Typewriter", 16);
		        intro.setPosition(cc.p(240, 80));
		        intro.setTag(1);
		        this.addChild(intro);
		        this.cont = cont + 1;
		        cc.log(this.cont);

		        break;

		    case 2:
		    	this.removeChildByTag(this.cont-1, true);
		    	var intro = new cc.LabelTTF("Tappez c'est que tu pense que le phare veut dire (tout minuscule).", "American Typewriter", 16);
		        intro.setPosition(cc.p(240, 80));
		        intro.setTag(2);
		        this.addChild(intro);
		        this.cont = cont + 1;
		        cc.log(this.cont);

		        this.textField = new ccui.TextField();
				cc.log("textField was created");
				this.textField.setTouchEnabled( true );
				this.textField.fontName = "American Typewriter";
				this.textField.placeHolder = "Réponse";
				this.textField.fontSize = 20;
				this.textField.setPosition(cc.p(240, 50)),
				this.textField.addEventListener(this.textFieldEvent, this);
				this.textField.setTag(2);
				this.addChild(this.textField);

		        break;

		    case 3:
		    	this.removeChildByTag(this.cont-1, true);
		    	this.removeChild(this.textField);
		    	var intro = new cc.LabelTTF("Non, je ne pense pas que sois ça.", "American Typewriter", 16);
		        intro.setPosition(cc.p(240, 80));
		        intro.setTag(1);
		        this.addChild(intro);
		        this.cont = cont - 1;
		        cc.log(this.cont);

		        break;

		    case 4:
		    	this.removeChildByTag(this.cont-2, true);
		    	this.removeChild(this.textField);
		    	var intro = new cc.LabelTTF("Putain, t'as raison! Comment j'ai pas vu ça?", "American Typewriter", 16);
		        intro.setPosition(cc.p(240, 80));
		        intro.setTag(4);
		        this.addChild(intro);
		        this.cont = cont + 1;
		        cc.log(this.cont);

		        break;

		    default: 
		    	cc.log("le cont ne marche pas");
		}
	},

	textFieldEvent: function( sender, type )
	{
    switch ( type )
    {
        // keyboard is activated
        case ccui.TextField.EVENT_ATTACH_WITH_IME:
        	cc.log("Activate");

            break;

        // keyboard is deactivated
        case ccui.TextField.EVENT_DETACH_WITH_IME:
        	cc.log("Deactivate");
        	
        	
        	if(this.textField.string == "morse"){
				cc.log("right! good one, the answer is " + this.textField.string);
				this.cont = this.cont + 1;
				cc.log(this.cont);
			} else {
				cc.log("that's not exactly that. You tapped " + this.textField.string);
			}

            break;
        
        // character insertion
        case ccui.TextField.EVENT_INSERT_TEXT:
        	//cc.log("Insert character");
            cc.log( "%s", this.textField.string );

            break;

        // character deletion
        case ccui.TextField.EVENT_DELETE_BACKWARD:
        	//cc.log("Delete character");
            cc.log( "%s", this.textField.string );

            break;
    }
	}
});