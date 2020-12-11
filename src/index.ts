import app from './app';
import './database';

// starting the server
// app.listen(app.get('port'), () => {
//     console.log('server listening on port', app.get('port'));
// });

app.httpServer.listen(app.port, () => {
    console.log('server listening on port', app.port); 
});