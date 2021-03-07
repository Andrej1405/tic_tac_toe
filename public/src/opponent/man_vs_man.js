import TicTacToe from '../game'
import * as constants from '../types/constants'
import imgUser from '../img/man.png'

export default class OpponentFriend extends TicTacToe {
    constructor() {
        super()

        this.imgOpponent.src = imgUser
        this.imgUser.src = imgUser
    }

    /*
     *  Прикрепляем события
     * */
    addListeners = () => {
        this.btnStart.addEventListener('click', this.startGame)
        this.btnNewOpponent.addEventListener('click', this.newOpponent)
    }

    /*
     *  Начало игры
     * */
    startGame = () => {
        // Обнуляем результаты прошлой игры
        this.clearGame()

        this.infoGame.textContent = `Игра началась. ${constants.USER_CROSS}`
        this.game.addEventListener('click', this.stepCurrentGamer)
    }

    /*
     *  Смена мода игры
     * */
    newOpponent = () => {
        // Обнуляем результаты прошлой игры
        this.clearGame()

        this.game.removeEventListener('click', this.stepCurrentGamer)
        this.btnStart.removeEventListener('click', this.startGame)
        this.btnNewOpponent.removeEventListener('click', this.newOpponent)
        this.infoGame.textContent = ''

        document.querySelector('.container').classList.toggle('show')
        document.querySelector('.menu').classList.toggle('hide')
    }

    /*
     *  Метод хода игрока, играющего за кружок
     * */
    stepCircle = (target) => {
        // Проверяем, использовалилось это поле для хода
        if (target.classList.contains('cross') || target.classList.contains('circle')) return

        // Если нет - добавляем класс
        target.classList.add('circle')
        target.innerHTML = this.circle
    }

    /*
     *  Метод хода игрока, играющего за крестик
     * */
    stepCross = (target) => {
        // Проверяем, использовалилось это поле для хода
        if (target.classList.contains('cross') || target.classList.contains('circle')) return

        // Если нет - добавляем класс
        target.classList.add('cross')
        target.innerHTML = this.cross
    }

    /*
     *  Метод, реализующий логику хода игроков
     * */
    stepCurrentGamer = (event) => {
        this.turn++
        let winner = false
        let standoff = false

        switch (this.step) {
            case constants.STEP_CROSS:
                this.stepCross(event.target)

                // Проверка на ничью
                standoff = this.checkStandoff()
                // Проверка на наличие победителя после текущего хода
                winner = this.checkWinner(constants.STEP_CROSS)
                if (standoff || winner) {
                    this.game.removeEventListener('click', this.stepCurrentGamer)
                    return
                }

                // Передаём ход игроку-кружочку
                this.infoGame.textContent = constants.USER_CIRCLE
                this.step = constants.STEP_CIRCLE
                break
            case constants.STEP_CIRCLE:
                this.stepCircle(event.target)

                // Проверка на ничью
                standoff = this.checkStandoff()
                // Проверка на наличие победителя после текущего хода
                winner = this.checkWinner(constants.STEP_CIRCLE)
                if (standoff || winner) {
                    this.game.removeEventListener('click', this.stepCurrentGamer)
                    return
                }

                // Передаём ход игроку-крестику
                this.infoGame.textContent = constants.USER_CROSS
                this.step = constants.STEP_CROSS
                break
            default:
                console.error('Ошибка хода текущего игрока')
        }
    }
}
