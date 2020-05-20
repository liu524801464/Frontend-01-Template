
class StateMachine {
    constructor() {
        this.end = 'end'
    }
    macth(str) {
        this.state = this.firstA
        for (let c of str) {
            this.state = this.state(c);
            if (this.state === this.end) {
                break;
            }
        }
        return this.state === this.end
    }
    firstA(c) {
        if (c === 'a') {
            return this.firstB;
        } else {
            return this.firstA
        }
    }
    firstB(c) {
        if (c === 'b') {
            return this.secondA
        } else {
            return this.firstA
        }
    }
    secondA(c) {
        if (c === 'a') {
            return this.secondB
        }
        else {
            return this.firstA
        }
    }
    secondB(c) {
        if (c === 'b') {
            return this.thirdA
        } else {
            return this.firstA
        }
    }
    thirdA(c) {
        if (c === 'a') {
            return this.thirdB
        } else {
            return this.firstA
        }
    }
    thirdB(c) {
        if (c === 'b') {
            return this.endX
        } else {
            return this.firstA
        }
    }
    endX(c) {
        if (c === 'x') {
            return this.end
        } else if (c === 'a') {
            return this.thirdA
        } else {
            return this.endX
        }
    }

}

let cc = new StateMachine();
console.log(cc.macth('aabb'))//false
console.log(cc.macth('abababx'))//true
console.log(cc.macth('ababax'))//false
console.log(cc.macth('ababxabababx'))//true