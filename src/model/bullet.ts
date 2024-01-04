import config from "../../config";
import boss from "../canvas/boss";
import bullet from "../canvas/bullet";
import play from "../canvas/play";
import steel from "../canvas/steel";
import tank from "../canvas/tank";
import wall from "../canvas/wall";
import water from "../canvas/water";
import { directionEnum } from "../enum/direction";
import { image } from "../service/image";
import util from "../util/util";
import modelAbstract from "./modelAbstract";
export default class extends modelAbstract implements IModel {
    canvas: ICanvas = bullet
    name: string = 'bullet'
    constructor(public tank: IModel) {
        super(tank.x + config.model.width / 2, tank.y + config.model.height / 2)
        this.direction = tank.direction as unknown as directionEnum
    }
    image(): HTMLImageElement {
        return image.get('bullet')!
    }
    render(): void {
        this.draw()
        this.move()
    }

    protected move() {
        let x = this.x
        let y = this.y
        let speed = this.tank.name == 'play' ? 10 : 5
        switch (this.direction) {
            case directionEnum.top:
                y -= speed
                break;
            case directionEnum.right:
                x += speed
                break;
            case directionEnum.bottom:
                y += speed
                break;
            case directionEnum.left:
                x -= speed
                break;
        }
        let size = config.bullet.size
        const touchModel = util.isModelTouch(x, y, size, size,
            [...wall.models, ...water.models, ...steel.models, ...boss.models,...play.models,...tank.models])
        if (util.isCanvasTouch(x, y, size, size)) {
            this.destroy(  )
        } else if (touchModel&&touchModel.name!==this.tank.name) {
            this.destroy()
            if (touchModel.name != 'steel') touchModel.destroy()
            this.blast(touchModel)
        } else {
            this.x = x
            this.y = y
            this.draw()
        }
    }
    draw() {
        this.canvas.ctx.drawImage(this.image(), this.x, this.y, config.bullet.size, config.bullet.size)
    }
}