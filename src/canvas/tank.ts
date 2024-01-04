import config from "../../config";
import canvasAbstract from "./canvasAbstract";
import model from '../model/tank'
import position from "../service/position";
export default new (class extends canvasAbstract implements ICanvas {
    interval = 0
    num(): number {
        return config.tank.num
    }
    model(): ModelConstructor {
        return model
    }
    render(): void {
        this.createModels()
        this.renderModels()
        this.interval = setInterval(() => this.renderModels(), config.timeout) as unknown as any
    }
    stop() {
        clearInterval(this.interval)
    }
    protected createModels() {
        for (let index = 0; index < this.num(); index++) {
            let { x } = position.position()
            const model = this.model()
            const instane = new model(x, config.model.height)
            this.models.push(instane)
        }
    }
    public renderModels() {
        super.renderModels()
    }

})('tank')