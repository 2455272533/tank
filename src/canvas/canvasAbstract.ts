import config from "../../config";
import position from "../service/position";
export default abstract class canvasAbstract {
    abstract render(): void
    abstract num(): number
    abstract model(): ModelConstructor | BulletModelConstructor
    public models: IModel[] = []
    constructor(
        protected name: string,
        protected app = document.querySelector<HTMLDivElement>('#app')!,
        protected el = document.createElement('canvas')!,
        public ctx = el.getContext('2d')!,
    ) {
        this.createCanvas()
    }
    protected createCanvas() {
        this.el.width = config.canvas.width
        this.el.height = config.canvas.height
        this.el.setAttribute('name', this.name)
        this.app.insertAdjacentElement('afterbegin', this.el)
    }
    protected createModels() {
        position.getCellection(this.num()).forEach(position => {
            const model = this.model() as ModelConstructor
            const instane = new model(position.x, position.y)
            this.models.push(instane)
        })
    }
    public renderModels() {
        this.ctx.clearRect(0, 0, config.canvas.width, config.canvas.height)
        this.models.forEach(model => model.render())
    }
    public removeModel(model: IModel) {
        this.models = this.models.filter(m => m != model)
    }
}