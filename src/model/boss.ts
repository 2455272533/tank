import config from "../../config";
import boss from "../canvas/boss";
import { image } from "../service/image";
import modelAbstract from "./modelAbstract";
export default class extends modelAbstract implements IModel {
    canvas: ICanvas = boss
    name: string = 'boss';
    constructor(x:number,y:number){
        super(x,y)
        this.width=config.model.width*3
        this.height=config.model.height*3
    }
    image(): HTMLImageElement {
        return image.get('boss')!
    }
    render(): void {
        this.draw()
    }
    protected draw() {
        this.canvas.ctx.drawImage(this.image(), this.x, this.y, config.model.width*3, config.model.height*3)
    }
}