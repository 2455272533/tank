export default {
    el(id: string) {
        return document.querySelector<HTMLAudioElement>(id)!
    },
    start() {
        this.el("#start").play()
    },
    add() {
        this.el("#add").play()
    },
    blast() {
        this.el("#blast").play()
    },
    fire() {
        this.el("#fire").play()
    },
}