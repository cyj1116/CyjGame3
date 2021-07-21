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
        // img.scene = this
        for (let i = 0; i < this.elements.length; i++) {
            const e = this.elements[i];
            if (e.alive === false && e.name === 'enemy') {
                this.elements.splice(i, 1)
                log('飞机')

            } else if (e.duration < 0 && e.name === 'ParticleSystem') {
                this.elements.splice(i, 1)
                log('烟花')
            } else if ((e.y < 0 || e.life < 1) && e.name === 'bullet') {
                this.elements.splice(i, 1)
                log('子弹')
            }
        }
    }

    removeBullet() {
        for (let i = 0; i < this.elements.length; i++) {
            const e = this.elements[i];
            if (e.name === 'bullet') {
                this.elements.splice(i, 1)
                log('子弹')
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

