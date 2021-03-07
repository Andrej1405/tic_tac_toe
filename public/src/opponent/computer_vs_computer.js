import TicTacToe from '../game'
import * as constants from '../types/constants'
import imgComputer from '../img/computer.jpg'

export default class ComputerVSComputer extends TicTacToe {
    constructor() {
        super()
        this.event = new MouseEvent('click', { bubbles: true })

        this.imgOpponent.src = imgComputer
        this.imgUser.src = imgComputer
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

        // Вызываем логику хода компьютера
        this.computerLogic()
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
     *  Метод хода игрока, играющего за крестик
     * */
    stepCross = (target) => {
        // Проверяем, использовалилось это поле для хода
        if (target.classList.contains('cross') || target.classList.contains('circle')) return

        // Если нет - добавляем класс
        target.classList.add('cross')
        target.innerHTML = this.cross

        const seqNumber = target.getAttribute('seqNumber')
        this.currentGameMatrix[Number(seqNumber)] = constants.VALUE_CROSS
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

        const seqNumber = target.getAttribute('seqNumber')
        this.currentGameMatrix[Number(seqNumber)] = constants.VALUE_CIRCLE
    }

    /*
     *  Логика игры игрока-компьютера
     * */
    computerLogic = () => {
        let isCompletedTurn = false

        // Проверяет на наличие выигрышных комбинаций у компьютера и оппонента
        for (let massFields of this.winnerMatrix) {
            const oneValueField = this.currentGameMatrix[massFields[0]]
            const twoValueField = this.currentGameMatrix[massFields[1]]
            const threeValueField = this.currentGameMatrix[massFields[2]]

            switch (true) {
                case oneValueField === twoValueField &&
                    threeValueField !== constants.VALUE_CIRCLE &&
                    threeValueField !== constants.VALUE_CROSS:
                    this.fields[threeValueField].dispatchEvent(this.event)
                    isCompletedTurn = true
                    break
                case twoValueField === threeValueField &&
                    oneValueField !== constants.VALUE_CIRCLE &&
                    oneValueField !== constants.VALUE_CROSS:
                    this.fields[oneValueField].dispatchEvent(this.event)
                    isCompletedTurn = true
                    break
                case oneValueField === threeValueField &&
                    twoValueField !== constants.VALUE_CIRCLE &&
                    twoValueField !== constants.VALUE_CROSS:
                    this.fields[twoValueField].dispatchEvent(this.event)
                    isCompletedTurn = true
                    break
            }

            if (isCompletedTurn) return
        }

        // Занимает любое другое оставшееся свободное место
        for (let indexElement of this.currentGameMatrix) {
            if (indexElement !== constants.VALUE_CIRCLE && indexElement !== constants.VALUE_CROSS) {
                this.fields[indexElement].dispatchEvent(this.event)
                isCompletedTurn = true
                break
            }
        }
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
                if (standoff) {
                    this.game.removeEventListener('click', this.stepCurrentGamer)
                    return
                }

                // Проверка на наличие победителя после текущего хода
                winner = this.checkWinner(constants.STEP_CROSS)
                if (winner) {
                    this.game.removeEventListener('click', this.stepCurrentGamer)
                    return
                }

                // Передаём ход игроку-кружочку
                this.infoGame.textContent = constants.USER_CIRCLE
                this.step = constants.STEP_CIRCLE

                setTimeout(this.computerLogic, 1500)
                break
            case constants.STEP_CIRCLE:
                this.stepCircle(event.target)

                // Проверка на ничью
                standoff = this.checkStandoff()
                if (standoff) {
                    this.game.removeEventListener('click', this.stepCurrentGamer)
                    return
                }

                // Проверка на наличие победителя после текущего хода
                winner = this.checkWinner(constants.STEP_CIRCLE)
                if (winner) {
                    this.game.removeEventListener('click', this.stepCurrentGamer)
                    return
                }

                // Передаём ход игроку-крестику
                this.infoGame.textContent = constants.USER_CROSS
                this.step = constants.STEP_CROSS

                setTimeout(this.computerLogic, 1500)
                break
            default:
                console.error('Ошибка хода текущего игрока')
        }
    }
}