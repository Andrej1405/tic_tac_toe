import * as constants from './types/constants'

export default class TicTacToe {
    game // Игровое поле
    gameWinner // Победитель
    turn // Номер текущего хода
    fields // Игровые клетки
    btnStart // Кнопка старта игры
    step // Чей ход
    circle // SVG кружка
    cross // SVG крестика
    matrix // Матрица игрового поля
    currentGameMatrix // Матрица игрового поля на текущей стадии игры
    winnerMatrix // матрица поля для победы

    constructor() {
        this.game = document.querySelector('.tic_tac_toe__game')
        this.fields = document.querySelectorAll('.tic_tac_toe__field')
        this.infoGame = document.querySelector('.tic_tac_toe__info')

        this.btnStart = document.querySelector('.tic_tac_toe__button-new-game')
        this.btnNewOpponent = document.querySelector('.tic_tac_toe__button-new-opponent')

        this.circle = `<svg viewBox="0 0 120 120" class="circle">
                        	<circle r="50" cx="58" cy="58" stroke="blue" stroke-width="8" fill="none" stroke-linecap="round"/>
                       </svg>`
        this.cross = `<svg viewBox="0 0 120 120" class="cross">
                       		<line class="first" x1="110" y1="11" x2="10" y2="110" stroke="red" stroke-width="8" stroke-linecap="round"/>
                       		<line class="second" x1="110" y1="110" x2="10" y2="10" stroke="red" stroke-width="8" stroke-linecap="round"/>
                      </svg>`

        this.gameWinner = ''
        this.turn = constants.FIRST_TURN
        this.step = constants.STEP_CROSS

        this.matrix = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
        ]

        this.currentGameMatrix = [
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
    }

    /*
     *   Метод проверяет на ничью после хода
     * */
    checkStandoff = () => {
        let standoff = false

        if (this.turn === constants.MAX_TURN) {
            standoff = true
            this.infoGame.textContent = `Игра окончена. ${constants.WINNER_NOBODY}`
        }

        return standoff
    }

    /*
     *  Метод проверяет наличие победителя после каждого хода
     * */
    checkWinner = (step) => {
        let win = false

        // Проверка на побед
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
        this.turn = constants.FIRST_TURN
        this.step = constants.STEP_CROSS
        this.currentGameMatrix = [
            0, 1, 2,
            3, 4, 5,
            6, 7, 8,
        ]
    }
}
