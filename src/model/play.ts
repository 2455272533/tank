import _ from "lodash";
import play from "../canvas/play";
import { image } from "../service/image";
import modelAbstract from "./modelAbstract";
import { directionEnum } from "../enum/direction";
import util from "../util/util";
import bullet from "../canvas/bullet";
import app from "../app";
export default class extends modelAbstract implements IModel {
    canvas: ICanvas = play
    name: string = 'play';
    bindEvent: boolean = false
    constructor(public x: number, public y: number) {
        super(x, y)
    }
    image(): HTMLImageElement {
        let direction = this.name + _.upperFirst(this.direction)
        return image.get(direction as any)!
    }
    render(): void {
        super.draw()
        if (!this.bindEvent) {
            this.bindEvent = true
            document.addEventListener('keydown', this.changeDirection.bind(this))
            document.addEventListener('keydown', (event: KeyboardEvent) => {
                if (event.code === 'Space') {
                    bullet.createPlayerBullet()
                }
            })
        }
    }

    changeDirection(event: KeyboardEvent) {
        if (app.state != 9) return
        let x = this.x
        let y = this.y
        let speed = 30
        switch (event.code) {
            case 'ArrowUp':
                this.direction = directionEnum.top
                y -= speed
                break;
            case 'ArrowRight':
                this.direction = directionEnum.right
                x += speed
                break;
            case 'ArrowDown':
                this.direction = directionEnum.bottom
                y += speed
                break;
            case 'ArrowLeft':
                this.direction = directionEnum.left
                x -= speed
                break;
        }
        if (util.isCanvasTouch(x, y) || util.isModelTouch(x, y)) {
            return
        }
        this.x = x
        this.y = y
        this.canvas.renderModels()
    }

}