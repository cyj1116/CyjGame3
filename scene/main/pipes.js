class Pipes {
    constructor(game, ) {
        this.game = game
        this.setup()
        this.setupPipes()
    }
    static new(...args) {
        return new this(...args)
    }
    setup() {
        this.pipes = []
        this.pipeSpaceX = 200
        this.pipeSpaceY = 150
        this.columsOfPipe = 3
        this.pipeHeight = 300
        this.pipeWidth = 60
        this.pipeSpeed = 3
    }
    setupPipes() {
        for (let i = 0; i < this.columsOfPipe; i++) {
            let p1 = CyjImage.new(this.game, 'pipe',this.pipeWidth, this.pipeHeight)
            p1.flipY = true
            p1.x = 500 + i * this.pipeSpaceX
            let p2 = CyjImage.new(this.game, 'pipe', this.pipeWidth, this.pipeHeight)
            p2.x = p1.x
            this.resetPipesPosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }
    resetPipesPosition(p1, p2) {
        p1.y = randomBetween(-200, 0)
        p2.y = p1.y + p1.h + this.pipeSpaceY
        p1.w = this.pipeWidth
        p2.w = this.pipeWidth
    }
    debug() {
        this.pipeWidth = config.pipe_width.value
        this.pipeSpaceY = config.pipe_space_y.value
        this.pipeSpeed = config.pipe_speed.value
        // window.fps = config.fps.value
    }
    update() {
        this.updatePipes()
    }
    updatePipes() {
        for (let i = 0; i < this.pipes.length; i += 2) {
            let p1 = this.pipes[i]
            let p2 = this.pipes[i + 1]
            p1.x -= this.pipeSpeed
            p2.x -= this.pipeSpeed
            if (p1.x < -100) {
                p1.x += this.pipeSpaceX * this.columsOfPipe
            }
            if (p2.x < -100) {
                p2.x += this.pipeSpaceX * this.columsOfPipe
                this.resetPipesPosition(p1, p2)
            }
        }
    }
    draw() {
        let context = this.game.context
        for (const p of this.pipes) {
            context.save()
            let w2 = p.w / 2
            let h2 = p.h / 2
            context.translate(p.x + w2, p.y + h2)
            let scaleX = p.flipX ? -1 : 1
            let scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY)
            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2, -h2)
            context.drawImage(p.texture, 0, 0, p.w, p.h)
            context.restore()
        }
    }
}