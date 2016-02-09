

var MenuLayer = cc.Layer.extend({
    ctor : function(){
        //1. call super class's ctor function
        this._super();

    },
    init:function(){
        //call super class's super function
        this._super();

        //2. get the screen size of your game canvas
        var winsize = cc.director.getWinSize(); 

        //3. calculate the center point
        var centerpos = cc.p(winsize.width / 2, winsize.height / 2);

        //4. create a background image and set it's position at the center of the screen
        var background = new cc.Sprite(res.HelloWorld_png);
        background.setPosition(centerpos);
        this.addChild(background);

        //5.
        cc.MenuItemFont.setFontSize(60);

        //6.create a menu and assign onPlay event callback to it
        //var menuItemPlay = new cc.MenuItemSprite(new cc.Sprite(res.startOff_png), new cc.Sprite(res.startOn_png), this.onPlay, this);
        var menuItemPlay = new cc.MenuItemFont("Start", this.onPlay, this);
        var menuItemTest = new cc.MenuItemFont("TestButton", this.test, this);
        var menu = new cc.Menu(menuItemPlay, menuItemTest);  //7. create the menu
        menu.setPosition(centerpos);
        menu.alignItemsVerticallyWithPadding(30);
        this.addChild(menu);
    },

    onPlay : function(){
        cc.log("==onplay clicked");
        var scene = new PlayScene();
        cc.director.runScene(new cc.TransitionFade (1.3, scene));
    },

    test : function(){
        cc.log("==test button is working");
    }
});

var MenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MenuLayer();
        layer.init();
        this.addChild(layer);
    }
});
