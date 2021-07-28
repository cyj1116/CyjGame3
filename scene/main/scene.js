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
            // log('loop')
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

    bulletHitEnemy(enemy, array) {
        // log(enemy, 'enemy')
        let arr = Array.from(array)
        for (const eElement of arr) {
            if (eElement.name === 'bullet') {
                let bullet = eElement
                if (enemy.collide(bullet)) {
                    let ps = CyjParticleSystem.new(this.game, enemy.x, enemy.y)
                    this.addElement(ps)
                    enemy.kill()
                    bullet.life--
                }
            }
        }
    }

    collideEnemy(enemy) {
        if (enemy.collide(this.player)) {
            log('撞机')
            let ps = CyjParticleSystem.new(this.game, enemy.x, enemy.y)
            this.addElement(ps)
            enemy.kill()
        }
    }

    hit() {
        for (let i = 0; i < this.enemies.length; i++) {
            const enemy = this.enemies[i];
            let e = this.elements
            this.bulletHitEnemy(enemy, e)
            this.collideEnemy(enemy)
        }
    }

    update() {
        super.update()
        this.hit()

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
    // log(this.elements, 'te')
    }
}
