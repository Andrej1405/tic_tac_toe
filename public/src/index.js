import TicTacToe from './game'

const menu = document.querySelector('.menu')
const selectMode = document.querySelector('.menu__select-mode')
const nameOpponents = document.querySelectorAll('input')

/*
 *  Основная функция запуска приложения
 * */
function start() {
    selectMode.addEventListener('click', startTicTacToe)
}

/*
 *  Функция запуска игры крестики-нолики
 * */
export function startTicTacToe() {
    let mode = undefined

    nameOpponents.forEach((item) => {
        if (item.checked) {
            mode = item.value
            const tic_tac_toe = new TicTacToe(mode)
            tic_tac_toe.addListeners()

            menu.classList.add('hide')
            console.log(`GameStart. Соперник: ${mode}`)
        }
    })

    if (!mode) console.error('Что-то пошло не так. Попробуйте обновить страницу')
}

start()
