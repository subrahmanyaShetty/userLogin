require('express-async-errors');
const winston = require('winston');
//require('winston-mongodb');
module.exports=function(){
   winston.exceptions.handle(
     new winston.transports.Console({colorize:true,prettyPrint:true }),
     new winston.transports.File({ filename: 'exceptions.log' })
  );

  process.on('unhandledRejection', (ex) => {
    throw ex;
  });
  winston.add(new winston.transports.Console());
  winston.add(new winston.transports.File ({ filename: 'logfile.log',level:"error" }));
  //winston.add(new winston.transports.MongoDB({db:'mongodb://localhost/vidly',options:{useUnifiedTopology: true },metaKey:'meta'}));
  // process.on("uncaughtException",(ex)=>{
  //   console.log("we got an uncaughtException");
  //   winston.error(ex.message,{meta:ex});
  // }
  // );
  //
  // process.on("unhandledRejection",(ex)=>{
  //   console.log("we got an unhandledRejection");
  //   winston.error(ex.message,ex);
  //
  // }
  // );
  // winston.exceptions.handle(
  //   new winston.transports.File({ filename: 'exceptions.log' })
  // );

  // winston.rejections.handle(
  //   new winston.transports.File({ filename: 'rejections.log' })
  // );

  //winston.add(new winston.transports.File({"filename":"logFile.log"}))
    //      logger.add(new winston.transports.MongoDB({db:'mongodb://localhost/vidly',options:{useUnifiedTopology: true },metaKey:'meta'}));
    // const logger = winston.createLogger({
    //   transports: [
    //     new winston.transports.File({ filename: 'logFile.log' })
    //   ],
    //   exceptionHandlers: [
    //    new winston.transports.File({ filename: 'exceptions.log' })
    //  ],
    //  rejectionHandlers: [
    //    new winston.transports.File({ filename: 'rejections.log' })
    //  ]
    // });
    // logger.exceptions.handle(
    //   new winston.transports.File({ filename: 'exceptions.log' })
    // );
    // logger.rejections.handle(
    //   new winston.transports.File({ filename: 'rejections.log' })
    // );
}
