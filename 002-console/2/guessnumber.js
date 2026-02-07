#!/usr/bin/env node
'use strict'
const readline = require('node:readline');
let num = Math.floor(Math.random() * 100)
const { stdin: input, stdout: output } = require('node:process')
const rl = readline.createInterface({ input, output })
console.log('Загадано число в диапазоне от 0 до 100')

rl.on('SIGINT', () => {
    console.log('\nИгра завершена');
    rl.close();
});

rl.on('line', (ans) => {
    if (isNaN(ans) || parseInt(ans) < 0 || parseInt(ans) > 100) {
        console.log('Пожалуйста, введите число от 0 до 100');
        return;
    }

    if (num > parseInt(ans)) console.log('Больше')
    if (num < parseInt(ans)) console.log('Меньше')
    if (parseInt(ans) == num) {
        console.log('Отгадано число ' + String(num))
        rl.close()
    }
}); 