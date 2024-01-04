import config from "../../config";
import canvasAbstract from "./canvasAbstract";
import model from '../model/boss'
export default new (class extends canvasAbstract implements ICanvas {
    num(): number {
        return 0
    }
    model(): ModelConstructor {
        return model
    }
    render(): void {
        this.createModels()
        super.renderModels()
    }
    createModels() {
        [{ x: config.canvas.width / 2 - config.model.width, y: config.canvas.height - config.model.height * 2 }].forEach(item => {
            const model = this.model()
            let instance = new model(item.x, item.y)
            this.models.push(instance)
        })
    }
})('water')
