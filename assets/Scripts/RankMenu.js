var GameState = require('GameState');
var InputConfig = require('InputConfig');

cc.Class({
    extends: cc.Component,

    properties: {
        btns: [cc.Button]
    },

    onLoad: function () {
        this.gameManager = cc.find("GameManager").getComponent("GameManager");
        this.audioManager = cc.find("AudioManager").getComponent("AudioManager");
        this.curBtnIndex = 0;
        this.btnCount = 2;
        this.sprites = [];
        this.btns.forEach(btn => {
            this.sprites.push(btn.node.getComponent(cc.Sprite));
        });
        this.node.active = false;
    },
    
    onEnable:function() {
        this.curBtnIndex = 0;
        this.gameManager.BtnHighLight.position =  this.btns[this.curBtnIndex].node.position;
    },

    processKeyDown: function (event) {
        switch (event.keyCode) {
            case InputConfig.dpadCenter:
                this.audioManager.playButton();
                this.sprites[this.curBtnIndex].spriteFrame = this.btns[this.curBtnIndex].pressedSprite;
                this.gameManager.BtnHighLight.active = false;
                break;
        }
    },


    processKeyUp: function (event) {
        switch (event.keyCode) {
            case InputConfig.dpadCenter:
                this.sprites[this.curBtnIndex].spriteFrame = this.btns[this.curBtnIndex].normalSprite;
                this.gameManager.BtnHighLight.active = true;
                if (this.curBtnIndex == 0) {//开始按钮
                    if (this.backState == GameState.title) {
                        GameState.current = GameState.help;
                        this.gameManager.BtnHighLight.position = new cc.Vec2(242,-422);
                        this.gameManager.showTut()
                    }
                    else {
                        this.gameManager.GameStats.node.active = false;
                        this.gameManager.loadMainScene();
                        this.gameManager.setPlayedTrue();
                    }
                }
                else if (this.curBtnIndex == 1) {//关闭
                    GameState.current = this.backState;
                    this.gameManager.RankMenuNode.active = false;
                    this.backUI.initHighLight();
                }
                break;
            case InputConfig.dpadRight:
                this.curBtnIndex++;
                if (this.curBtnIndex == this.btnCount) {
                    this.curBtnIndex = 0
                }
                this.gameManager.BtnHighLight.position =  this.btns[this.curBtnIndex].node.position;
                break;
            case InputConfig.dpadLeft:
                this.curBtnIndex--;
                if (this.curBtnIndex == -1) {
                    this.curBtnIndex = this.btnCount - 1
                }
                this.gameManager.BtnHighLight.position =  this.btns[this.curBtnIndex].node.position;
                break;
            default:
                break;
        }
    },
});
