import config from "../../config"
type positionType = {
    x: number, y: number
}
class position {
    public cellection: positionType[] = []
    public getCellection(num: number) {
        const cellection = [] as { x: number, y: number }[]
        for (let index = 0; index < num; index++) {
            while (true) {
                const position = this.position()
                const exisit = this.cellection.some(item => item.x == position.x && item.y == position.y)
                if (!exisit) {
                    cellection.push(position)
                    this.cellection.push(position)
                    break
                }
            }
        }
        return cellection
    }
    public position() {
        return {
            x: Math.floor(Math.random() * (config.canvas.width / config.model.width)) * config.model.width,
            y: Math.floor(Math.random() * ((config.canvas.height / config.model.height) - 5)) * config.model.height + config.model.height * 2,
        }
    }
}
export default new position()