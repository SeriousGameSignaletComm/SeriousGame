var AnimationLayer = cc.Layer.extend({

    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super();

        var size = cc.winSize;

        var luz = new cc.Sprite(res.luz_png);
        luz.setAnchorPoint(cc.p(1,1));
        luz.setPosition(cc.p(size.width, size.height));
        this.addChild(luz, 0);

        //teste do mauricio branch, tentando causar geral

        var luz_apagando = cc.FadeOut.create(0.1);
        var luz_acendendo = cc.FadeIn.create(0.1);

        luz.runAction(luz_apagando);
        cc.delayTime(1);

        /*
        var umTurno = new cc.Sequence.create(luz_apagando, luz_acendendo);

        var infinitosTurnos = new cc.RepeatForever.create(umTurno);

        luz.runAction(infinitosTurnos);
        */

        /*
        m --
        o ---
        r .-.
        s ...
        e .
        */
        
        var spaceLetter = new cc.delayTime(1);
        var spaceWord = new cc.delayTime(3);
        var M = new cc.sequence(luz_acendendo, cc.delayTime(2), luz_apagando, cc.delayTime(0.5), luz_acendendo, cc.delayTime(2), luz_apagando);
        var O = new cc.sequence(luz_acendendo, cc.delayTime(2), luz_apagando, cc.delayTime(0.5), luz_acendendo, cc.delayTime(2), luz_apagando, cc.delayTime(0.5), luz_acendendo, cc.delayTime(2), luz_apagando);
        var R = new cc.sequence(luz_acendendo, cc.delayTime(1), luz_apagando, cc.delayTime(0.5), luz_acendendo, cc.delayTime(2), luz_apagando, cc.delayTime(0.5), luz_acendendo, cc.delayTime(1), luz_apagando);
        var S = new cc.sequence(luz_acendendo, cc.delayTime(1), luz_apagando, cc.delayTime(0.5), luz_acendendo, cc.delayTime(1), luz_apagando, cc.delayTime(0.5), luz_acendendo, cc.delayTime(1), luz_apagando);
        var E = new cc.sequence(luz_acendendo, cc.delayTime(1), luz_apagando);

        var morse = new cc.sequence(M, spaceLetter, O, spaceLetter, R, spaceLetter, S, spaceLetter, E, spaceWord);
        var infiniteMorse = new cc.RepeatForever(morse);

        luz.runAction(infiniteMorse);
        
        
    }
});