// window.fps = 30
const config = {
    // player_speed: 10,
    // cloud_speed: 1,
    // enemy_speed: 5,
    // bullet_speed: 6,
    // fire_cooldown: 9,
    // fps: window.fps,
    fps: {
        _comment: 'fps',
        value: window.fps = 30,
    },
    pipe_space_y: {
        _comment: '水管垂直间距',
        value: 150,
    },
    pipe_space_x: {
        _comment: '水管水平间距',
        value: 200,
    },
    height_of_jump: {
        _comment: '跳跃高度',
        value: 10,
    },
}