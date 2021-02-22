const STEP_CROSS = 'cross'
const STEP_CIRCLE = 'circle'

const USER_CROSS = 'Ход крестика'
const USER_CIRCLE = 'Ход кружочка'

const WINNER_CROSS = 'Победил крестик'
const WINNER_CIRCLE = 'Победил кружочек'

class TicTacToe {
    game // Игровое поле
    gameWinner // Победитель
    fields // Игровые клетки
    btnStart // Кнопка старта игры
    step // Чей ход
    circle // SVG кружка
    cross // SVG крестика
    matrix // Матрица игрового поля
    winnerMatrix // матрица поля для победы

    constructor() {
        this.game = document.querySelector('.tic_tac_toe__game')
        this.fields = document.querySelectorAll('.tic_tac_toe__field')
        this.btnStart = document.querySelector('.tic_tac_toe__button')
        this.infoGame = document.querySelector('.tic_tac_toe__info')

        this.step = STEP_CROSS
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
    }

    // Навешиваем события
    addListeners = () => {
        this.btnStart.addEventListener('click', this.startGame)
    }

    // Начало игры
    startGame = () => {
        console.log('startGame')
        // Обнуляем значения с прошлой игры
        this.clearGame()

        this.infoGame.textContent = `Игра началась. ${USER_CROSS}`
        this.game.addEventListener('click', this.stepGamer)
    }

    // Метод реализующий логику хода игрока
    stepGamer = (event) => {
        if (this.step === STEP_CROSS) this.stepCross(event.target)
        else this.stepCircle(event.target)
    }

    // Метод хода кружка
    stepCircle = (target) => {
        // Проверяем, использовалилось это поле для хода
        if (target.classList.contains('cross') || target.classList.contains('circle')) return

        // Если нет - добавляем класс
        target.classList.add('circle')
        target.innerHTML = this.circle

        // Проверка наличие победителя
        const winner = this.checkWinner(STEP_CIRCLE)
        if (winner) return
        // Передаём ход крестику
        this.infoGame.textContent = USER_CROSS
        this.step = STEP_CROSS
    }

    // Метод хода крестика
    stepCross = (target) => {
        // Проверяем, использовалилось это поле для хода
        if (target.classList.contains('cross') || target.classList.contains('circle')) return

        // Если нет - добавляем класс
        target.classList.add('cross')
        target.innerHTML = this.cross

        // Проверка наличие победителя
        const winner = this.checkWinner(STEP_CROSS)
        if (winner) return
        // Передаём ход кружочку
        this.infoGame.textContent = USER_CIRCLE
        this.step = STEP_CIRCLE
    }

    // Метод проверяет наличие победителя после каждого хода
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

                step === STEP_CROSS
                    ? (this.infoGame.textContent = `Игра окончена. ${WINNER_CROSS}`)
                    : (this.infoGame.textContent = `Игра окончена. ${WINNER_CIRCLE}`)
                win = true
            }
        })

        if (win) this.game.removeEventListener('click', this.stepGamer)
        return win
    }

    // Обнуляем результаты прошлой игры
    clearGame = () => {
        this.fields.forEach((field) => {
            field.innerHTML = ``
            field.classList = `tic_tac_toe__field`
        })

        this.gameWinner = ``
        this.step = STEP_CROSS
    }
}

const ticTacToe = new TicTacToe()
ticTacToe.addListeners()
