class SceneTitle extends CyjScene {
    constructor(game) {
        super(game)
        // let label = CyjLabel.new(game, 'hello')
        // this.addElement(label)

        // bg
        let bg = CyjImage.new(game, 'bg',400, 600)
        bg.y = -80
        this.addElement(bg)
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
        let d = this.d
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
