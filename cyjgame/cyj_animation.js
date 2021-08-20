const warrior_config = {
    idle: 6,
    run: 8,
};

const bird_config = {
    bird: 3,
};

const d_config = {
    d: 1,
};
class CyjAnimation {
    // config是一个对象{
    //      animationName: numberOfFrames,
    // }
    constructor(game, config) {
        this.game = game;
        this.config = config;
        this.animations = {
            // idle: [],
            // run: [],
        };
        this.setup();
    }
    static new(game, config) {
        return new this(game, config);
    }
    setup() {
        for (const key in this.config) {
            this.animations[`${key}`] = [];
            this.setAnimation(key, this.config[`${key}`]);
        }
        for (const firstKey in this.config) {
            this.defaultAction = `${firstKey}`;
            break;
        }

        this.animationName = this.defaultAction;
        this.texture = this.frames()[0];
        this.w = this.texture.width;
        this.h = this.texture.height;
        this.frameIndex = 0;
        this.frameCount = 3;
        // 翻转
        this.flipX = false;
        // 旋转
        this.rotation = 0;
        //
        this.alpha = 1;
        // 重力和加速度
        this.gy = 5;
        this.vy = 0;
        this.jumpHeight = 4;
        this.y = 0
    }

    setAnimation(animationName, numberOfFrames) {
        for (let i = 1; i < numberOfFrames + 1; i++) {
            const name = `${animationName}${i}`;
            let t = this.game.textureByName(name);
            this.animations[`${animationName}`].push(t);
        }
    }
    jump() {
        this.vy = -this.jumpHeight;
    }
    draw() {
        let context = this.game.context;
        if (this.flipX) {
            context.save();

            let x = this.x + this.w / 2;
            context.translate(x, 0);
            context.scale(-1, 1);
            context.translate(-x, 0);
            context.drawImage(this.texture, this.x, this.y);

            context.restore();
        } else {
            context.drawImage(this.texture, this.x, this.y);
        }
    }
    frames() {
        return this.animations[this.animationName];
    }
    debug() {
        this.jumpHeight = config.height_of_jump.value;
        this.gy = config.gravity.value
    }
    update() {
        // 更新受力
        this.y += this.vy;
        this.vy += this.gy * 0.2;
        let h = 498;
        if (this.y > h) {
            this.y = h;
        }
        this.frameCount--;
        if (this.frameCount === 0) {
            this.frameCount = 6;
            // log(this.animations, 'this.animations')
            // log(this.frames(), 'this.frames()')
            this.frameIndex = (this.frameIndex + 1) % this.frames().length;
            this.texture = this.frames()[this.frameIndex];
        }
    }

    // need update
    move(x, keyStatus) {
        this.flipX = x < 0;
        this.x += x;
        // 表驱动法
        let animationNames = {
            down: "run",
            up: "idle",
        };
        let name = animationNames[keyStatus];
        this.changeAnimation(name);

        // if (keyStatus === 'down') {
        //     this.changeAnimation('run')
        // } else if (keyStatus === 'up') {
        //     this.changeAnimation('idle')
        // }
    }
    changeAnimation(name) {
        this.animationName = name;
    }
}

class BirdAnimation extends CyjAnimation {
    constructor(game, config) {
        super(game, config);
    }
    move(x, keyStatus) {
        this.flipX = x < 0;
        this.x += x;
    }
    draw() {
        let context = this.game.context;
        context.save();
        // 坐标系原点放到小鸟中心
        let w2 = this.w / 2;
        let h2 = this.h / 2;
        context.translate(this.x + w2, this.y + h2);
        if (this.flipX) {
            context.scale(-1, 1);
        }
        let alpha = context.globalAlpha;
        context.globalAlpha = this.alpha;

        context.rotate((this.rotation * Math.PI) / 180);
        context.translate(-w2, -h2);
        context.drawImage(this.texture, 0, 0);

        context.restore();
    }
    jump() {
        super.jump();
        this.rotation = -45;
    }
    update() {
        // 更新alpha
        if (this.alpha > 0) {
            this.alpha -= 0.05;
        }
        super.update();
        // 更新角度
        if (this.rotation < 45) {
            this.rotation += 5;
        }
    }
}
