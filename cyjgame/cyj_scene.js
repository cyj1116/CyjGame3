class CyjScene {
    constructor(game) {
        this.game = game
        this.debugModeEnabled = true
        this.elements = []
    }
    static new(game) {
        const i = new this(game)
        return i
    }
    addElement(img) {
        img.scene = this
        this.elements.push(img)
    }

    removeElement() {
        for (let i = 0; i < this.elements.length; i++) {
            const e = this.elements[i];
            if (e.alive === false) {
                log('删除的元素', this.elements[i])
                this.elements.splice(i, 1)
            }
        }
    }

    draw() {
        for (let i = 0; i < this.elements.length; i++) {
            const e = this.elements[i];
            // this.game.drawImage(e)
            e.draw()
        }
    }
    update() {
        this.debug && this.debug()
        if (this.debugModeEnabled) {
            for (let i = 0; i < this.elements.length; i++) {
                const e = this.elements[i];
                e.debug && e.debug()
            }
        }
        for (let i = 0; i < this.elements.length; i++) {
            const e = this.elements[i];
            e.update()
        }
        // log(this)
    }
}

