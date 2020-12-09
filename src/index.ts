import app from './app';
import './database';

// starting the server
app().httpServer.listen(app().port, () => {
    console.log('server listening on port', app().port);
});
