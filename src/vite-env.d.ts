/// <reference types="vite/client" />
interface ModelConstructor {
    new(x: number, y: number): IModel
}
interface BulletModelConstructor {
    new(tank: IModel): IModel
}
interface IModel {
    destroy(): void
    direction: string
    render(): void,
    x: number,
    y: number,
    width: number,
    height: number,
    name:string,
    image(): HTMLImageElement,
    tank?: IModel
}

interface ICanvas {
    num(): number,
    model(): ModelConstructor | BulletModelConstructor
    ctx: CanvasRenderingContext2D,
    removeModel(model: IModel): void
    renderModels(): void
} 