class CyjParticle extends CyjImage{
    constructor(game) {
        super(game, 'fire');
        this.setup()
    }
    setup() {
        this.life = 20
    }
    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
        let factor = 0.01
        this.v += factor * this.vx
        this.y += factor * this.vy
    }
}

class CyjParticleSystem {
    constructor(game, x, y) {
        this.game = game
        this.x = x
        this.y = y
        this.alive = true
        this.setup()

    }

    static new(game, x, y) {
        return new this(game, x, y)
    }

    setup() {
        this.duration = 50
        this.name = 'ParticleSystem'
        this.numberOfParticles = 50
        this.particles = []
    }

    draw() {
        // if (this.duration < 0) {
        //     // todo, 临时方案
        //     // 应该从 scene 中删除自己才对
        //     return
        // }
        for (const p of this.particles) {
            p.draw()
            // log('draw')
        }
    }

    update() {
        this.duration--
        if (this.duration < 0) {
            this.alive = false
        }
        // 添加小火花
        if (this.particles.length < this.numberOfParticles) {
            let p = CyjParticle.new(this.game)
            // 设置初始化坐标
            let speed = 2
            let vx = randomBetween(-speed, speed)
            let vy = randomBetween(-speed, speed)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }
        // 更新所有的小火花
        for (const p of this.particles) {
            p.update()
        }
        // 删除死掉的小火花
        this.particles = this.particles.filter(p => p.life > 0)
    }
}