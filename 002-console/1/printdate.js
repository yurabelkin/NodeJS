#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const argv = yargs(hideBin(process.argv))
    .option('year', {
        alias: 'y',
        type: 'integer',
        description: 'Вывод текущего года либо сдвиг по году',
    })
    .option('month', {
        alias: 'm',
        type: 'integer',
        description: 'Вывод текущего месяца либо сдвиг по месяцу',
    })
    .option('date', {
        alias: 'd',
        type: 'integer',
        description: 'Вывод текущей даты(числа) либо сдвиг по дате(числу)',
    })
    .command('current', 'текущая дата', (yargs) => {
        return yargs.option('year', { alias: 'y', type: 'boolean' })
            .option('month', { alias: 'm', type: 'boolean' })
            .option('date', { alias: 'd', type: 'boolean' })
    }, (argv) => {
        let date = new Date()

        if (argv.year) {
            console.log(date.getFullYear())
        } else if (argv.month) {
            console.log(date.getMonth() + 1)
        } else if (argv.date) {
            console.log(date.getDate())
        } else {
            console.log(date.toISOString())
        }
    })
    .command('add', 'добавить время', (yargs) => {
        return yargs.option('year', { alias: 'y', type: 'number' })
            .option('month', { alias: 'm', type: 'number' })
            .option('date', { alias: 'd', type: 'number' })
    }, (argv) => {
        let date = new Date()

        if (argv.year) {
            date.setFullYear(date.getFullYear() + argv.year)
        }
        if (argv.month) {
            date.setMonth(date.getMonth() + argv.month)
        }
        if (argv.date) {
            date.setDate(date.getDate() + argv.date)
        }
        if (!argv.year && !argv.year && !argv.date) {
            console.log('Не введены параметры сдвига времени вперед')
        }
        else {
            console.log(date.toISOString())
        }

    })
    .command('sub', 'отнять время', (yargs) => {
        return yargs.option('year', { alias: 'y', type: 'number' })
            .option('month', { alias: 'm', type: 'number' })
            .option('date', { alias: 'd', type: 'number' })
    }, (argv) => {
        const date = new Date()

        if (argv.year) {
            date.setFullYear(date.getFullYear() - argv.year)
        }
        if (argv.month) {
            date.setMonth(date.getMonth() - argv.month)
        }
        if (argv.date) {
            date.setDate(date.getDate() - argv.date)
        }

        if (!argv.year && !argv.year && !argv.date) {
            console.log('Не введены параметры сдвига времени назад')
        }
        else {
            console.log(date.toISOString())
        }
    })
    .demandCommand(1, 'Введите корректную команду')
    .parse()
