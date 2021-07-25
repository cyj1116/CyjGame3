const loadLevel = (game, n) => {
    n = n - 1
    let level = levels[n]
    var blocks = []
    for (let i = 0; i < level.length; i++) {
        // position
        const p = level[i]
        let b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

// 为了调试, 两个全局变量
// window.paused = false
// 初始化 blocks
// let blocks = []

const enableDebugMode = function (game, enable) {
    if (!enable) {
        return
    }
    // window.paused = false
    // window.blocks = loadLevel(1)
    // for debug
    window.addEventListener('keydown', (event) => {
        let k = event.key
        if (k === 'p') {
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            // blocks = loadLevel(game, Number(k))
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', (event) => {
        let input = event.target
        window.fps = Number(input.value)
    })
}

const __main = () => {
    const images = {
        bullet: 'img/bullet.png',
        cloud: 'img/cloud.png',
        player: 'img/player.png',
        sky: 'img/sky.png',
        enemy0: 'img/enemy0.png',
        enemy1: 'img/enemy1.png',
        enemy2: 'img/enemy2.png',
        enemy3: 'img/enemy3.png',
        enemy4: 'img/enemy4.png',
        fire: 'img/fire.png',
        // 跑步动画
        run1: 'img/run/Warrior_Run_1.png',
        run2: 'img/run/Warrior_Run_2.png',
        run3: 'img/run/Warrior_Run_3.png',
        run4: 'img/run/Warrior_Run_4.png',
        run5: 'img/run/Warrior_Run_5.png',
        run6: 'img/run/Warrior_Run_6.png',
        run7: 'img/run/Warrior_Run_7.png',
        run8: 'img/run/Warrior_Run_8.png',
        // idle
        idle1: 'img/idle/Warrior_Idle_1.png',
        idle2: 'img/idle/Warrior_Idle_2.png',
        idle3: 'img/idle/Warrior_Idle_3.png',
        idle4: 'img/idle/Warrior_Idle_4.png',
        idle5: 'img/idle/Warrior_Idle_5.png',
        idle6: 'img/idle/Warrior_Idle_6.png',
        // flappy bird images
        bg: 'img/bird/background.png',
        ground: 'img/bird/ground.png',
        bird1: 'img/bird/bird-01.png',
        bird2: 'img/bird/bird-02.png',
        bird3: 'img/bird/bird-03.png',
        // d
        d1: 'img/bird/d-01.png',
        // d2: 'img/bird/d-02.png',
        // d3: 'img/bird/d-03.png',
    }


const game = CyjGame.instance(30, images, (g) => {
    // let s = Scene.new(g)
    let s = SceneTitle.new(g)
    g.runWithScene(s)
})

    enableDebugMode(game, true)
}

__main()
