/**
* MyInterface class, creating a GUI interface.
*/
class MyInterface extends CGFinterface {
    /**
     * @construcr
     */
    constructor() {
        super();
    }

    /**
     * Initializes the interface.
     * @param {CGFapplication} application
     */
    init(application) {
        super.init(application);
        // init GUI. For more information on the methods, check:
        //  http://workshop.chromeexperiments.com/examples/gui

        this.gui = new dat.GUI(); 

        // add a group of controls (and open/expand by defult)

        this.initKeys();
        this.inited = false;

        return true;
    }

    /**
     * initKeys
     */
    initKeys() {
        this.scene.gui=this;
        this.processKeyboard=function(){};
        this.activeKeys={};
    }

    processKeyDown(event) {
        this.activeKeys[event.code]=true;
    };

    processKeyUp(event) {
        this.activeKeys[event.code]=false;
        if(event.code=="KeyM") {
            this.scene.gameOrchestrator.chooseBoost();
        } else if (event.code=="KeyJ")
            this.scene.gameOrchestrator.chooseReprogram();
    };

    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }

    /**
     * Interface functions
     */
    createViewsInterface() {
        this.inited = true;
        this.selectedView = this.scene.graph.defaultViewID;
        //this.selectedSecurityView = this.scene.graph.defaultViewID;
        var folder = this.gui.addFolder("views");
        folder.add(this, 'selectedView', this.scene.graph.viewsIDs).name('Camera').onChange(id => this.scene.setCamera(id));
    }

    createLightsInterface() {
        var i=0;
        var lightDictKeys = Object.keys(this.scene.lights);
        var folder = this.gui.addFolder("lights");
        for(var key of lightDictKeys) {
            folder.add(this.scene.lights[key], 'enabled').name(this.scene.graph.lightsIDs[key]);
            i++;
            if(i>=this.scene.graph.lightsIDs.length) 
                break;
        }
    }

    createGameInterface() {
        this.undo = function(){
            this.scene.gameOrchestrator.undo();
        }

        this.restart = function(){
            this.scene.gameOrchestrator.restart(this.playerTypeA, this.playerTypeB);
        }

        this.start = function(){
            this.scene.gameOrchestrator.start(this.playerTypeA, this.playerTypeB);
            folder.remove(start);
            folder.remove(end);
            folder.add(this,'restart');
            folder.add(this, 'endTurn');
        }

        this.endTurn = function(){
            this.scene.gameOrchestrator.nextTurn();
        }

        this.theme = this.scene.gameOrchestrator.themes.Space;
        this.playerTypeA = 0;
        this.playerTypeB = 0;
        var folder = this.gui.addFolder("Game");
        folder.open();
        folder.add(this, 'playerTypeA', this.scene.gameOrchestrator.playerType).name('PlayerA');
        folder.add(this, 'playerTypeB', this.scene.gameOrchestrator.playerType).name('PlayerB');
        folder.add(this, 'theme', this.scene.gameOrchestrator.themes).name('Theme').onChange(theme => this.scene.setTheme(theme));
        folder.add(this,'undo');
        var start = folder.add(this,'start');
        var end = folder.add(this, 'endTurn');
        
    }
     /*
    createDisplay(){
        this.display.add()
    }*/
}