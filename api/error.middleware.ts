import type { ErrorRequestHandler } from "express"

const handleError : ErrorRequestHandler = (error,_request,response,_next) => {
    console.log(error);

    response.status(500).json({error:{
        sttatus:500,
        message: 'não foi possível concluir operação.'

    }});
};

export default handleError;