const express = require('express');
const router = express.Router();
const fs = require('fs');

function counter(id, incr = false) {
    let data = {};
    data[id] = 0;
    try {
        data = JSON.parse(fs.readFileSync('counter.json', 'utf-8'));
    }
    catch (err) {
        if (err.code === 'ENOENT') { let data = {}; }
    }
    let count = 0;
    if (id != 0) {
        if (data[id] >= 0) {
            count = data[id];
        }
    }
    if (incr == true) {
        count ++;
        data[id] = count;
        fs.writeFileSync('counter.json', JSON.stringify(data), 'utf-8');
    }
    let countObj = {
        count: count
    };

    return countObj;

}


router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.status(200);
    res.json(counter(id));
});

router.post('/:id/incr', (req, res) => {
    const { id } = req.params;
    res.status(200);
    res.json(counter(id, true));
});

module.exports = router