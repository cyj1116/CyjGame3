class CyjImage {
    constructor(game, name, width, height) {
        // log('width', width)
        this.game = game
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = width || this.texture.width
        // this.h = height || this.texture.height
        if (height !== undefined) {
            this.h = height
        } else {
            this.h = this.texture.height
        }
        this.flipY = false
        this.rotation = 0

    }
    static new(game, name, width, height) {
        const i = new this(game, name, width, height)
        return i
    }
    draw() {
        this.game.drawImage(this)
    }
    update() {

    }
}

// 逻辑上来看不该继承 CyjImage , 但是先这样
// class Player extends CyjImage {
//     constructor(game, name) {
//         super(game, name)
//
//     }
// }