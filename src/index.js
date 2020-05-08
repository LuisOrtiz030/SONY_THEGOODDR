const spreadSheet = require("./spreadsheet")
const admin = require('firebase-admin')


const serviceAcount = require('./credentialFireBase.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAcount),
    databaseURL: 'https://sheetbots.firebaseio.com/'

})

const db = admin.database();

module.exports = async function App(context) {

    var respuestas = await spreadSheet.data;

    function respuesta(col, fila) {
        if (respuestas) {
            let col_abc;
            col_abc = 'A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,AA,AB,AC,AD,AE';
            col_abc = col_abc.split(',');
            let num_col = col_abc.indexOf(col)
            return respuestas[fila - 1][num_col]
        } else {
            return "Ups, error."
        }
    }


    if (context.event.payload === respuesta("C", 5) && context.state.step == 1) {

        db.ref('Registros').push(context.event.payload)
            //TEXTO "Empezar" -- PAYLOAD "GET_STARTED"
        console.log(`____Paso actual:${context.state.step}
        ____Presionaron el botón: ${respuesta("C",4)}
        ___Payload del botón: ${respuesta("C",5)}`);


        let step = context.state.step + 1;
        context.setState({
            step,
        });
        console.log(`___Vamos al Paso:${step}`);
    }

    if (context.event.payload === respuesta("E", 17) && context.state.step == 2) {
        console.log(`Presionaron el botón: ${respuesta("E",16)}`);
        console.log(`Payload: ${respuesta("E",17)}`);
        let step = context.state.step + 1;
        context.setState({
            step,
        });
        console.log(`Vamos al Paso:${step}`);
    }







}