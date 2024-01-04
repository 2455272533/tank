import config from '../config'
import './style.scss'
import straw from './canvas/straw'
import wall from './canvas/wall'
import water from './canvas/water'
import steel from './canvas/steel'
import tank from './canvas/tank'
import bullet from './canvas/bullet'
import boss from './canvas/boss'
import play from './canvas/play'
import { promises } from './service/image'
import audio from './service/audio'
const app = document.querySelector<HTMLDivElement>('#app')!
app.style.width = config.canvas.width + 'px'
app.style.height = config.canvas.height + 'px'

export default {
    isStart: false,
    state: 9,
    interval: 0,
    bootstarap() {
        app.addEventListener('click', () => {
            if (!this.isStart) {
                this.start()
                this.interval = setInterval(() => {
                    if (tank.models.length == 0) this.state = 1
                    if (play.models.length == 0 || boss.models.length == 0) this.state = 2
                    if (this.state != 9) this.stop()
                }, 100) as unknown as any
            }
        })

    },
    async start() {
        this.isStart = true
        this.state = 9
        app.style.backgroundImage = 'none'
        audio.start()
        await Promise.all(promises)
        straw.render()
        wall.render()
        water.render()
        steel.render()
        tank.render()
        bullet.render()
        boss.render()
        play.render()
    },
    stop() {
        clearInterval(this.interval)
        tank.stop()
        bullet.stop()
        const el = document.createElement('canvas')
        el.width = config.canvas.width
        el.height = config.canvas.height
        const ctx = el.getContext('2d') as CanvasRenderingContext2D
        ctx.fillStyle = '#fff'
        ctx.font = '100px 宋体 bold'
        ctx.textAlign = 'center'
        ctx.fillText(this.state == 1 ? '你赢了！' : '你输了！', config.canvas.width / 2, config.canvas.height / 2)
        app.appendChild(el)
    }
}