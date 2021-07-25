class Enemy extends CyjImage {
    constructor(game) {
        let type = randomBetween(0, 4)
        let name = 'enemy' + type
        super(game, name);
        this.setup()
    }
    setup() {
        this.name = 'enemy'
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
        this.alive = true
        this.lives = 1
    }

    kill() {
        let lives = this.lives
        lives--
        if (lives < 1) {
            this.alive = false
        }
    }

    collide(b) {
        // AB两矩形相交
        // b 在 a 中
        // b 左上角的 x 在 a 的里面
        // b 的 y 在 a 的里面
        // if (b.y > o.y && b.y < o.y + o.image.height) {
        //     if (b.x > o.x && b.x < o.x + o.image.width ) {
        //         log('相撞')
        //         return true
        //     }
        // }
        // return false
        // return o.alive && (rectIntersects(this, b) || rectIntersects(b, this))
        // let res = (rectIntersects(this, b) || rectIntersects(b, this))
        let res = this.alive && (rectIntersects(this, b) || rectIntersects(b, this))
        return res
    }
    update() {
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }
    }
}