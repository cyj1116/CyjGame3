class CyjImage {
    constructor(game, name) {
        this.game = game
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
    }
    static new(game, name) {
        const i = new this(game, name)
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