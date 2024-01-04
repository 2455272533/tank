import config from "../../config";
import canvasAbstract from "./canvasAbstract";
import model from '../model/play'
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
    protected createModels() {
        [{x:config.canvas.width/2+config.model.width*4,y:config.canvas.height-config.model.height*2}].forEach((position) => {
            const model = this.model() as ModelConstructor
            const instane = new model(position.x, position.y)
            this.models.push(instane)
        })
    }
})('water')
