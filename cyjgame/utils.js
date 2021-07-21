// const log = (s) => {
//     e('#id-text-log').value += '\n' + s
// }

const log = console.log.bind(console, '---Log:')

const e = sel => document.querySelector(sel)

const es = sel => Array.from(document.querySelectorAll(sel))

const imageFromPath = (path) => {
    const img = new Image()
    img.src = path
    return img
}

const bindAll = (sel, eventName, callback) => {
    let l = es(sel)
    for (let i = 0; i < l.length; i++) {
        const input = l[i];
        input.addEventListener(eventName, (event) => {
            callback(event)
        })
    }
}

const imageByName = (name) => {
}

// 矩形相交
const rectIntersects = (a, b) => {
    // log(a.y, b.y, 'ab')
    // AB两矩形相交
    // b 在 a 中
    // b 左上角的 x 在 a 的里面
    // b 的 y 在 a 的里面
    // 还要考虑一次 a 在 b 中
    // 有bug
    if (b.y > a.y && b.y < a.y + a.h) {
        if (b.x > a.x && b.x < a.x + a.w ) {
            // log('相撞')
            return true
        }
    }
    return false
}

const randomBetween = (start, end) => {
    let n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}

