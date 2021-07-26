class Pipes {
    constructor(game, ) {
        this.game = game
        this.pipes = []
        this.pipeSpaceX = 200
        this.pipeSpaceY = 150
        this.columsOfPipe = 3
        for (let i = 0; i < this.columsOfPipe; i++) {
            let p1 = CyjImage.new(game, 'pipe',60, 400)
            p1.flipY = true
            p1.x = 500 + i * this.pipeSpaceX
            let p2 = CyjImage.new(game, 'pipe', 60, 400)
            p2.x = p1.x
            this.resetPipesPosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }
    static new(game) {
        return new this(game)
    }
    resetPipesPosition(p1, p2) {
        p1.y = randomBetween(-300, 0)
        p2.y = p1.y + p1.h + this.pipeSpaceY
    }
    debug() {
        this.pipeSpaceX = config.pipe_space_x.value
        this.pipeSpaceY = config.pipe_space_y.value
        window.fps = config.fps.value
    }
    update() {
        this.debug()
        for (let i = 0; i < this.pipes.length; i += 2) {
            let p1 = this.pipes[i]
            let p2 = this.pipes[i + 1]
            p1.x -= 5
            p2.x -= 5
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
            // 坐标系原点放到小鸟中心
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

class SceneTitle extends CyjScene {
    constructor(game) {
        super(game)
        // bg
        let bg = CyjImage.new(game, 'bg',400, 600)
        bg.y = -80
        this.addElement(bg)
        // 加入水管
        let pipes = Pipes.new(game)
        this.addElement(pipes)
        // 循环移动地面
        this.grounds = []
        for (let i = 0; i < 30; i++) {
            const g = CyjImage.new(game, 'ground', 25, 80)
            g.x = i * 25
            g.y = 520
            this.addElement(g)
            this.grounds.push(g)
        }

        this.skipCount = 4

        // Warrior
        // let w = WarriorAnimation.new(game, warrior_config)
        // w.x = 180
        // w.y = 200
        // this.w = w
        // this.addElement(w)
        // this.setupInputs()
        // bird
        let b = BirdAnimation.new(game, bird_config)
        b.x = 180
        b.y = 200
        this.b = b
        this.addElement(b)
        this.setupInputs()

        // let d = BirdAnimation.new(game, d_config)
        // d.x = 180
        // d.y = 400
        // this.d = d
        // this.addElement(d)
        // this.setupInputs()

    }

    setupInputs() {
        // warrior
        // this.game.registerAction('a', (keyStatus) => {
        //     this.w.move(-2, keyStatus)
        // })
        // this.game.registerAction( 'd', (keyStatus) => {
        //     this.w.move(2, keyStatus)
        // })
        // this.game.registerAction( 'j', (keyStatus) => {
        //     this.w.move(2, keyStatus)
        // })

        // bird
        let b = this.b
        // let d = this.d
        this.game.registerAction('a', (keyStatus) => {
            b.move(-2, keyStatus)
            // d.move(-2, keyStatus)
        })
        this.game.registerAction( 'd', (keyStatus) => {
            b.move(2, keyStatus)
            // d.move(2, keyStatus)
        })
        this.game.registerAction( 'j', (keyStatus) => {
            b.jump()
            // d.jump()
        })


    }
    debug() {
    }
    update() {
        super.update();
        // 地面移动
        this.skipCount--
        let offset = -5
        if (this.skipCount === 0) {
            this.skipCount = 4
            offset = 15
        }
        for (let i = 0; i < 30; i++) {
            const g = this.grounds[i];
            g.x += offset
        }
    }
}
