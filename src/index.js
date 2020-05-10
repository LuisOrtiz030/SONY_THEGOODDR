const spreadSheet = require("./spreadsheet")
const admin = require('firebase-admin')
const serviceAcount = require('./credentialFireBase.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAcount),
    databaseURL: 'https://sheetbots.firebaseio.com/'

})

const db = admin.database();



module.exports = async function App(context) {

    const respuestas = await spreadSheet.data;

    var idPayload = () => {
        if (context.event.isPayload) {
            let obj_action = {
                accion: "PAYLOAD",
                valor: context.event.payload
            }
            return obj_action
        }
        if (context.event.isText) {

            let obj_action = {
                accion: "TEXT",
                valor: context.event.text
            }
            return obj_action
        }
    }

    var idPayload = idPayload();

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


    if (idPayload.accion == "TEXT") {
        console.log(idPayload.accion)
    }


    if (idPayload.valor === respuesta("C", 5) && context.state.step == 1) {

        let col = "E";
        let titles = [16, 20, 24];
        let contentTypes = titles.map(function(x) { return x - 1 });
        let payloads = titles.map(function(x) { return x + 1 });
        let len = titles.length

        console.log({
            __PasoActual: `${context.state.step}`,
            __BtnAnterior: `${respuesta("C",4)}`,
            __Payload: `${respuesta("C",5)}`,
        });

        let step = context.state.step + 1;
        context.setState({
            step,
        });

        var opciones = [];
        for (var i = 0; i < len; i++) {
            var prop_contentType = `${respuesta(col,contentTypes[i])}`
            var prop_title = `${respuesta(col,titles[i])}`
            var prop_payload = `${respuesta(col,payloads[i])}`;

            let obj_opciones = {
                contentType: prop_contentType,
                title: prop_title,
                payload: prop_payload
            };
            opciones.push(obj_opciones)
        }


        await context.sendText(`${respuesta(col,7)}`); {
            await context.sendText(`${respuesta(col,12)}`, {
                quickReplies: opciones,
            });
        };

        console.log({ __PasoSiguiente: `${step}` })
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