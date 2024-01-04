import canvasAbstract from "./canvasAbstract";
import model from '../model/bullet'
import tank from "./tank";
import bullet from "../model/bullet";
import config from "../../config";
import play from "./play";
import audio from "../service/audio";
import app from "../app";
export default new (class extends canvasAbstract implements ICanvas {
    interval = 0
    num(): number {
        return 0
    }
    model(): BulletModelConstructor {
        return model
    }
    render(): void {
        this.interval = setInterval(this.creteBullet.bind(this), config.timeout) as unknown as any
    }
    stop() {
        clearInterval(this.interval)
    }
    creteBullet() {
        tank.models.forEach(tank => {
            const isExists = this.models.some(m => m.tank == tank)
            if (!isExists) {
                this.models.push(new bullet(tank))
            }
        });
        super.renderModels()
    }
    createPlayerBullet() {
        this.models.push(new bullet(play.models[0]))
        if (app.state != 9) return
        audio.fire()
    }

})('bullet')