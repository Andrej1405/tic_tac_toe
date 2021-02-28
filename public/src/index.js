import OpponentFriend from './opponent/friend'
import OpponentComputer from './opponent/computer'

const menu = document.querySelector('.menu')
const selectMode = document.querySelector('.menu__select-mode')
const nameOpponents = document.querySelectorAll('input')
const containerGame = document.querySelector('.container')

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
    let tic_tac_toe = undefined

    nameOpponents.forEach((item) => {
        if (item.checked && item.value) {
            mode = item.value
        }
    })

    if (mode) {
        switch (mode) {
            case 'computer':
                tic_tac_toe = new OpponentComputer()
                break
            case 'friend':
                tic_tac_toe = new OpponentFriend()
                break
            default:
                tic_tac_toe = new OpponentFriend()
        }
        menu.classList.add('hide')
        containerGame.classList.add('show')
        tic_tac_toe.addListeners()
        
        console.log(`GameStart. Соперник: ${mode}`)
    } else console.error('Что-то пошло не так. Попробуйте обновить страницу')
}

start()
