class SceneTitle extends CyjScene {
    constructor(game) {
        super(game)
        let label = CyjLabel.new(game, 'hello')
        this.addElement(label)

        // bg
        let bg = CyjImage.new(game, 'sky')
        this.addElement(bg)

        let w = CyjAnimation.new(game)
        w.x = 100
        w.y = 400
        this.w = w
        this.addElement(w)

        this.setupInputs()
    }

    setupInputs() {
        this.game.registerAction('a', (keyStatus) => {
            this.w.move(-2, keyStatus)
        })
        this.game.registerAction( 'd', (keyStatus) => {
            this.w.move(2, keyStatus)
        })
    }
}
