#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const argv = yargs(hideBin(process.argv))
    .option('year', {
        alias: 'y',
        type: 'integer',
        description: 'Вывод года',
        default: 0
    })
    .option('month', {
        alias: 'm',
        type: 'integer',
        description: 'Вывод месяца',
        default: 0
    })
    .option('date', {
        alias: 'd',
        type: 'integer',
        description: 'Вывод даты(числа)',
        default: 0
    })
    .parse()
console.log(argv)
if (argv._ == 'current') date = new Date()

if (argv._ == 'add') {
    date = new Date()
    date.setFullYear(date.getFullYear() + argv.year, date.getMonth() + argv.month, date.getDate() + argv.date)
}

if (argv._ == 'sub') {
    date = new Date()
    date.setFullYear(date.getFullYear() - argv.year)
}

if (argv._ == 'current' && argv.date) result = date.getDate()
if (argv._ == 'current' && argv.month) result = date.getMonth() + 1
if (argv._ == 'current' && argv.year) result = date.getFullYear()
if ((argv._ == 'current' && !(argv.year || argv.month || argv.date)) || argv._ == 'sub' || argv._ == 'add') result = date.toISOString()
console.log(result)