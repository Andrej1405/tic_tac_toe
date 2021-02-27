import * as constants from './types/constants'

export default class TicTacToe {
    game // Игровое поле
    gameWinner // Победитель
    gameOpponent // Оппонент в игре (Компьютер, друг с этого компьютера, друг с другого компьютера)
    fields // Игровые клетки
    btnStart // Кнопка старта игры
    step // Чей ход
    circle // SVG кружка
    cross // SVG крестика
    matrix // Матрица игрового поля
    winnerMatrix // матрица поля для победы

    constructor(opponent) {
        this.game = document.querySelector('.tic_tac_toe__game')
        this.gameOpponent = opponent
        this.fields = document.querySelectorAll('.tic_tac_toe__field')
        this.btnStart = document.querySelector('.tic_tac_toe__button-new-game')
        this.infoGame = document.querySelector('.tic_tac_toe__info')

        this.step = constants.STEP_CROSS
        this.circle = `<svg viewBox="0 0 120 120" class="circle">
                        	<circle r="50" cx="58" cy="58" stroke="blue" stroke-width="8" fill="none" stroke-linecap="round"/>
                       </svg>`
        this.cross = `<svg viewBox="0 0 120 120" class="cross">
                       		<line class="first" x1="110" y1="11" x2="10" y2="110" stroke="red" stroke-width="8" stroke-linecap="round"/>
                       		<line class="second" x1="110" y1="110" x2="10" y2="10" stroke="red" stroke-width="8" stroke-linecap="round"/>
                      </svg>`

        this.gameWinner = ``
        this.matrix = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
        ]

        this.winnerMatrix = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]

        document.querySelector('.container').classList.add('show')
    }

    /*
     *  Прикрепляем события
     * */
    addListeners = () => {
        this.btnStart.addEventListener('click', this.startGame)
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
     *  Метод, реализующий логику хода игроков
     * */
    stepCurrentGamer = (event) => {
        let winner = false

        switch (this.step) {
            case constants.STEP_CROSS:
                this.stepCross(event.target)

                // Проверка на наличие победителя после текущего хода
                winner = this.checkWinner(constants.STEP_CROSS)
                if (winner) return

                // Передаём ход игроку-кружочку
                this.infoGame.textContent = constants.USER_CIRCLE
                this.step = constants.STEP_CIRCLE
                break
            case constants.STEP_CIRCLE:
                this.stepCircle(event.target)

                // Проверка на наличие победителя после текущего хода
                winner = this.checkWinner(constants.STEP_CIRCLE)
                if (winner) return

                // Передаём ход игроку-крестику
                this.infoGame.textContent = constants.USER_CROSS
                this.step = constants.STEP_CROSS
                break
            default:
                console.error('Ошибка хода текущего игрока')
        }
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
     *  Метод проверяет наличие победителя после каждого хода
     * */
    checkWinner = (step) => {
        let win = false

        this.winnerMatrix.forEach((massFields) => {
            if (
                this.fields[massFields[0]].classList.contains(step) &&
                this.fields[massFields[1]].classList.contains(step) &&
                this.fields[massFields[2]].classList.contains(step)
            ) {
                this.gameWinner = step

                this.fields[massFields[0]].classList.add('winner')
                this.fields[massFields[1]].classList.add('winner')
                this.fields[massFields[2]].classList.add('winner')

                step === constants.STEP_CROSS
                    ? (this.infoGame.textContent = `Игра окончена. ${constants.WINNER_CROSS}`)
                    : (this.infoGame.textContent = `Игра окончена. ${constants.WINNER_CIRCLE}`)
                win = true
            }
        })

        if (win) this.game.removeEventListener('click', this.stepCurrentGamer)
        return win
    }

    /*
     *  Обнуляем результаты прошлой игры
     * */
    clearGame = () => {
        this.fields.forEach((field) => {
            field.innerHTML = ''
            field.classList = 'tic_tac_toe__field'
        })

        this.gameWinner = ''
        this.step = constants.STEP_CROSS
    }
}
