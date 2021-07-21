const config = {
    player_speed: 10,
    cloud_speed: 1,
    enemy_speed: 5,
    bullet_speed: 6,
    fire_cooldown: 9,
    fps: window.fps,
}

class Scene extends CyjScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setUpInputs()
    }
    setup() {
        this.duration = 50
        this.numberOfEnemies = 10
        this.bg = CyjImage.new(this.game, 'sky')
        this.cloud = Cloud.new(this.game, 'cloud')

        this.player = Player.new(this.game, 'player')
        this.player.x = 100
        this.player.y = 500

        this.addElement(this.bg)
        this.addElement(this.cloud)

        this.addElement(this.player)
        //
        this.addEnemies()
    }
    addEnemies() {

        let es = []
        for (let i = 0; i < this.numberOfEnemies; i++) {
            log('loop')
            const e = Enemy.new(this.game, 'enemy');
            es.push(e)
            this.addElement(e)
        }
        // log(es, 'es')
        this.enemies = es
    }

    setUpInputs() {
        let g = this.game
        let s = this
        g.registerAction('a', () => {
            s.player.moveLeft()
        })
        g.registerAction('d', () => {
            s.player.moveRight()
        })
        g.registerAction('w', () => {
            s.player.moveUp()
        })
        g.registerAction('s', () => {
            s.player.moveDown()
        })
        g.registerAction('j', () => {
            s.player.fire()
        })
    }

    update() {
        super.update()
        // 子弹击中敌机
        let bullet = this.player.b
        let lastEle = Array.from(this.elements.slice(-1))
        log(lastEle, 'lastEle')
        if (lastEle[0].name === 'bullet') {
            log(bullet, 'b')
            for (let i = 0; i < this.enemies.length; i++) {
                const e = this.enemies[i];
                if (e.collide(bullet)) {
                    let ps = CyjParticleSystem.new(this.game, bullet.x, bullet.y)
                    this.addElement(ps)
                    e.kill()
                    bullet.life--
                }
            }
        }

        // 撞机
        for (let i = 0; i < this.enemies.length; i++) {
            const e = this.enemies[i];
            if (e.collide(this.player)) {
                // log('撞机')
                // block.kill()
                // ball.反弹()
                // score += 100
            }
        }

        this.removeElement()

        if (this.elements.length === 3) {
            this.addEnemies()
        }
    log(this.elements, 'ele')

    }
}
