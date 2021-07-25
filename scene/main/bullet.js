class Bullet extends CyjImage {
    constructor(game) {
        super(game, 'bullet');
        this.setup()
    }
    setup() {
        this.speed = 15
        this.name = 'bullet'
        this.alive = true
        this.life = 1
        // this.speed = config.bullet_speed

    }
    update() {
        this.y -= this.speed
        if (this.y < 0 || this.life < 1) {
            this.alive = false
        }
    }
    debug() {
        this.speed = config.bullet_speed
    }
}