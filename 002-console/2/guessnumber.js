const readline = require('node:readline');
num = Math.floor(Math.random() * 100)
const { stdin: input, stdout: output } = require('node:process')
const rl = readline.createInterface({ input, output })
console.log('Загадано число в диапазоне от 0 до 100')

rl.on('line', (ans) => {
    if (num > ans) console.log('Больше')
    if (num < ans) console.log('Меньше')
    if (ans == num) {
        console.log('Отгадано число ' + String(num))
        rl.close()
    }
}); 