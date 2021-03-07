import OpponentFriend from './opponent/man_vs_man'
import OpponentComputer from './opponent/man_vs_computer'
import ComputerVSComputer from './opponent/computer_vs_computer'
import * as constants from './types/constants'

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
            case constants.MAN_VS_COMPUTER:
                tic_tac_toe = new OpponentComputer()
                break
            case constants.MAN_VS_MAN:
                tic_tac_toe = new OpponentFriend()
                break
            case constants.COMPUTER_VS_COMPUTER:
                tic_tac_toe = new ComputerVSComputer()
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
