import steel from "../canvas/steel";
import { image } from "../service/image";
import modelAbstract from "./modelAbstract";
export default class extends modelAbstract implements IModel {
    canvas: ICanvas=steel
    image(): HTMLImageElement {
       return image.get('steel')!
    }
    name: string='steel';
    render(): void {
        super.draw()
    }

}