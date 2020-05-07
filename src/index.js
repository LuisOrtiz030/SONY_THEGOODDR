const spreadSheet = require("./spreadsheet")




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





    if (context.event.isText && context.state.step !== "STEP_UNDEFINED") {

        var step = respuesta("AE", 1)

        context.setState({
            step,
        });

        await context.sendText('Iniciando texto');


        await context.sendText(respuesta("AE", 12));
        await context.sendText(context.state.step);

    }

    if (context.event.isText && context.state.step == "STEP_UNDEFINED") {


        await context.sendText('Continuando texto');

        await context.sendText(respuesta("AE", 12));
        await context.sendText(context.state.step);

        var step = respuesta("B", 1)

        context.setState({
            step,
        });


    }




    if (context.event.isPayload) {
        await context.sendText('Iniciando payload');
        console.log("Enviaron un {payload}")
    }
}