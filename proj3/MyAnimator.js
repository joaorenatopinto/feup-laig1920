class MyAnimator {
    constructor(scene, orchestrator, t) {
        this.scene = scene;
        this.orchestrator = orchestrator;
        this.currAnim = null;
        this.running = false;
        this.startTime = t;
        this.currTime;
        this.piece = null;
        console.log(t);
    }

    calculate_animation(piece, col1, row1, col2, row2) {
        this.piece = piece;
        this.piece.ongoingAnimation = true;
        var keyframes = [];
        keyframes.push(Keyframe(this.currTime, 0, 0, 0, 0, 0, 0, 0, 0, 0));
        keyframes.push(Keyframe(this.currTime+2*1000, 0, 2, 0, 0, 0, 0, 0, 0, 0));
        keyframes.push(Keyframe(this.currTime+5*1000, col2-col1, 2, row2-row1, 0, 0, 0, 0, 0, 0));
        keyframes.push(Keyframe(this.currAnim+7*1000, col2-col1, 0, row2-row1, 0, 0, 0, 0, 0, 0));
        this.currAnim = new KeyframeAnimation(this.scene, 'move', keyframes);
    }

    apply() {
        if(this.currAnim!=null) this.currAnim.apply();
    }

    update(t) {
        this.currTime = t;
        if(this.currAnim!=null) this.currAnim.update(t);
        if(this.currAnim.running==false) {this.currAnim = null; this.piece = null; this.running = false;}
    }

    setAnimation(piece) {
        piece.animation = this;
    }
}