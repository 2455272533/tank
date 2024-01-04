import config from "../../config";
import { directionEnum } from "../enum/direction";
import audio from "../service/audio";
export default abstract class straw {
    abstract name: string
    abstract canvas: ICanvas
    abstract render(): void
    abstract image(): HTMLImageElement
    public direction: directionEnum = directionEnum.top
    public width: number = config.model.width
    public height: number = config.model.height
    constructor(public x: number, public y: number) {
        this.randomDirection()
    }
    protected draw() {
        this.canvas.ctx.drawImage(this.image(), this.x, this.y, config.model.width, config.model.height)
    }
    protected randomDirection() {
        this.direction = Object.keys(directionEnum)[Math.floor(Math.random() * 4)] as directionEnum
    }
    public destroy() {
        this.canvas.removeModel(this)
        this.canvas.renderModels()
    }
    protected blast(model: IModel) {
        audio.blast()
        Array(...Array(8).keys()).reduce((promise, index) => {
            return promise.then(() => {
                new Promise(resolve => {
                    setTimeout(() => {
                        const img = new Image()
                        img.src = `/src/static/images/blasts/blast${index}.gif`
                        this.canvas.ctx.drawImage(img, model.x, model.y, model.width, model.height)
                        resolve(promise)
                    }, 100);
                })
            })

        }, Promise.resolve())

    }

}