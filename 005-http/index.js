#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const https = require('https')
require('dotenv').config()

const apiKey = process.env.apiKey
const url = `https://api.weatherbit.io/v2.0/current?key=${apiKey}`
const argv = yargs(hideBin(process.argv))
    .option('city', {
        alias: 'c',
        type: 'string',
        description: 'Наименование города на английском языке',
    })
    .command('current', 'текущая погода', (yargs) => {
        return yargs.option('city', { alias: 'c', type: 'string' })

    }, (argv) => {
        https.get(url + '&city=' + argv.city , (res) => {
            const { statusCode } = res
            if (statusCode !== 200) {
                console.log(`statusCode: ${statusCode}`)
                return
            }

            res.setEncoding('utf8')
            let rowData = ''
            res.on('data', (chunk) => rowData += chunk)
            res.on('end', () => {
                let weather = JSON.parse(rowData).data[0]
                console.log (`Текущая погода в городе: ${weather.city_name} , ${weather.country_code}`)
                console.log (`Температура: ${weather.temp} oC, ветер ${weather.wind_spd} м\с`)
            })
        }).on('error', (err) => {
            console.error(err)
        })
    })
    .demandCommand(1, 'Введите корректную команду')
    .parse()
