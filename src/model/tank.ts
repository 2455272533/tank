import _ from "lodash";
import { directionEnum } from "../enum/direction";
import { image, mapType } from "../service/image";
import modelAbstract from "./modelAbstract";
import tank from "../canvas/tank";
import util from "../util/util";
export default class extends modelAbstract implements IModel {
    canvas: ICanvas = tank
    name: string = 'tank';
    image(): HTMLImageElement {
        return this.renderImage()!
    }
    render(): void {
        this.move()
        let random = Math.floor(Math.random() * 1000)
        if (random % 300 == 0) {
            this.direction = directionEnum.bottom
        }
    }
    protected move() {
        while (true) {
            let x = this.x
            let y = this.y
            let speed = 2
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
            if (util.isCanvasTouch(x, y) || util.isModelTouch(x, y)) {
                this.randomDirection()
            } else {
                this.x = x
                this.y = y
                break
            }
        }
        super.draw()
    }

    renderImage() {
        let direction = this.name + _.upperFirst(this.direction)
        return image.get(direction as mapType)
    }

}