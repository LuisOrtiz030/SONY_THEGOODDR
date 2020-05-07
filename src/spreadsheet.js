const { google } = require('googleapis');
const credentials = require('./credentials.json');

const client = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key, ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize(async(err, token) => {
    if (err) {
        console.log(err);
        return;
    } else {
        //console.log(`${"Conectado"}`);
        await gsrun(client);

    };
});

async function gsrun(cl) {
    const gsapi = google.sheets({ version: 'v4', auth: cl });
    const opt = {
        spreadsheetId: '1jtB3pb7CoBVgVHsscnMm7UporOJf3r122DsrzUSADSk',
        range: 'flow_bot!A1:AE25'
    }
    let data = await gsapi.spreadsheets.values.get(opt);
    let respuestas = await data.data.values

    return respuestas;
}



module.exports = {


    data: gsrun(client)

}