class CyjAnimation {
    constructor(game) {
        this.game = game
        // 偷懒, hard code 一套动画
        this.animations = {
            idle: [],
            run: [],
        }
        for (let i = 1; i < 8; i++) {
            const name = `run${i}`
            let t = game.textureByName(name)
            this.animations['run'].push(t)
        }
        for (let i = 1; i < 6; i++) {
            const name = `idle${i}`
            let t = game.textureByName(name)
            this.animations['idle'].push(t)
        }
        this.animationName = 'idle'
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height
        this.frameIndex = 0
        this.frameCount = 6
    }
    static new(game) {
        return new this(game)
    }
    draw() {
        let context = this.game.context
        if (this.flipX) {
            context.save()

            let x = this.x + this.w / 2
            context.translate(x, 0)
            context.scale(-1, 1)
            context.translate(-x, 0)
            // log('draw x -x', x, -x, this.y)
            context.drawImage(this.texture, this.x, this.y)

            context.restore()

        } else {
            context.drawImage(this.texture, this.x, this.y)
        }

    }

    frames() {
        return this.animations[this.animationName]
    }

    update() {
        this.frameCount--
        if (this.frameCount === 0) {
            this.frameCount = 6
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }
    move(x, keyStatus) {
        this.flipX = x < 0
        this.x += x
        // log('keyStatus', keyStatus)
        let animationNames = {
            down: 'run',
            up: 'idle',
        }
        let name = animationNames[keyStatus]
        this.changeAnimation(name)

        // if (keyStatus === 'down') {
        //     this.changeAnimation('run')
        // } else if (keyStatus === 'up') {
        //     this.changeAnimation('idle')
        // }
    }
    changeAnimation(name) {
        this.animationName = name
    }
}