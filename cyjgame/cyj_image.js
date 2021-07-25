class CyjImage {
    constructor(game, name, width, height) {
        // log('width', width)
        this.game = game
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        // if (width !== undefined) {
        //     log('width', width)
        //     this.w = width
            // log(this, 'haha')
        //     log('width', this.w)
        // } else {
            this.w = width || this.texture.width
        // }
        if (height !== undefined) {
            // log('hello')
            this.h = height

        } else {
            this.h = this.texture.height
        }
        // this.w = this.texture.width
        // this.h = height || this.texture.height
        // log(this, 'end')
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