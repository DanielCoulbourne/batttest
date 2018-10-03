const util = require('util');
const exec = util.promisify(require('child_process').exec);
const axios = require('axios');

if (process.argv.length < 3) console.error('Usage: batt <url of webhook>');

async function reportBatteryPercent() {
    const { stdout, err } = await exec('pmset -g batt | egrep "([0-9]+%).*" -o');
    let payload = {
        percentage: stdout,
        time: new Date()
    };

    axios.post(process.argv[2], payload).then(() => console.log('reporting:' + payload.percentage));
}

function getSqrtOfCurrentTimestamp() {
    Math.sqrt(+new Date());
}

setInterval(getSqrtOfCurrentTimestamp, 1);
setInterval(reportBatteryPercent, 10000);
