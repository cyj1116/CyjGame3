class Player extends CyjImage {
    constructor(game, name, width, height) {
        super(game, name, width, height);
        this.setup()

    }
    setup() {
        this.speed = 5
        this.cooldown = 0
    }
    update() {
        // this.speed = config.player_speed
        if (this.cooldown > 0) {
            this.cooldown--
        }

    }
    fire() {
        if (this.cooldown === 0) {
            this.cooldown = config.fire_cooldown
            let x = this.x + this.w / 2
            let y = this.y
            this.b = Bullet.new(this.game)
            this.b.x = x
            this.b.y = y
            this.scene.addElement(this.b)
        }
    }
    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }
    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }
    debug() {
        this.speed = config.player_speed
    }
}
