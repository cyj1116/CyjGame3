class CyjGame {
    constructor(fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback
        //
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas = document.querySelector('#id-canvas')
        log(this.canvas, 'this.canvas')
        this.context = this.canvas.getContext('2d')
        // events
        let self = this
        window.addEventListener('keydown', (event) => {
            this.keydowns[event.key] = 'down'
        })
        window.addEventListener('keyup', function (event) {
            self.keydowns[event.key] = 'up'
        })
        this.init()
    }
    // 创建单例
    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }
    drawImage(cyjImage) {
        this.context.drawImage(cyjImage.texture, cyjImage.x, cyjImage.y, cyjImage.w, cyjImage.h)
    }
    // update
    update = () => {
        this.scene.update()
    }
    // draw
    draw = () => {
        this.scene.draw()
    }
    //
    registerAction = (key, callback) => {
        this.actions[key] = callback
    }
    // 递归 动态调试
    runLoop = () => {
        // log(window.fps, 'window.fps')
        // events
        let actions = Object.keys(this.actions)
        for (let i = 0; i < actions.length; i++) {
            const key = actions[i];
            let status = this.keydowns[key]
            if (status === 'down') {
                // 如果按键被按下, 调用注册的 actions
                this.actions[key]('down')
            } else if (status === 'up') {
                this.actions[key]('up')
                // 删除 key 的状态
                this.keydowns[key] = null
            }
        }
        //update
        this.update()
        //clear
        this.context.clearRect(0 ,0 ,this.canvas.width ,this.canvas.height)
        //draw
        this.draw()
        // next run loop
        setTimeout(() => {
            this.runLoop()
        }, 1000/window.fps)
    }

    textureByName = (name) => {
        let img = this.images[name]
        // let image = {
        //     w: width,
        //     h: height,
        //     img: this.images[name],
        // }
        return img
    }

    runWithScene = (scene) => {
        this.scene = scene
        // 开始运行
        setTimeout(() => {
            this.runLoop()
        }, 1000/window.fps)
    }

    replaceScene = (scene) => {
        this.scene = scene
    }

    __start = (scene) => {
        this.runCallback(this)
    }

    init = () => {
        //
        let loads = []
        // 预先载入所有图片
        // log(this.images, 'this.images')
        let names = Object.keys(this.images)
        for (let i = 0; i < names.length; i++) {
            const name = names[i];
            const path = this.images[name];
            const img = new Image()
            img.src = path
            img.onload = () => {
                // 存入 g.images 中
                this.images[name] = img
                // 所有图片都载入成功后, 调用run
                log('hello 载入图片', loads.length, this.images.length)
                loads.push(1)
                if (loads.length === names.length) {
                    log('hello 载入图片')
                    this.__start()
                }
            }
        }
    }

}