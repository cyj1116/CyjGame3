class SceneTitle extends CyjScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup() {
        let s = this
        // bg
        let bg = CyjImage.new(s.game, 'bg',400, 600)
        bg.y = -80
        this.addElement(bg)
        // 加入水管
        let pipes = Pipes.new(s.game)
        this.addElement(pipes)
        // 循环移动地面
        this.grounds = []
        for (let i = 0; i < 30; i++) {
            const g = CyjImage.new(s.game, 'ground', 25, 80)
            g.x = i * 25
            g.y = 520
            this.addElement(g)
            this.grounds.push(g)
        }

        this.skipCount = 4
        this.birdSpeed = 2

        let b = BirdAnimation.new(s.game, bird_config)
        b.x = 180
        b.y = 200
        this.b = b
        this.addElement(b)
    }
    setupInputs() {
        // bird
        let b = this.b
        this.game.registerAction('a', (keyStatus) => {
            b.move(-this.birdSpeed, keyStatus)
        })
        this.game.registerAction( 'd', (keyStatus) => {
            b.move(this.birdSpeed, keyStatus)
        })
        this.game.registerAction( 'j', (keyStatus) => {
            b.jump()
        })
    }
    debug() {
        this.birdSpeed = config.bird_speed.value
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
