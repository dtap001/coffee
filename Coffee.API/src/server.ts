import express from "express";

export class Server {
    constructor() {

        const app = express();
        const port = 3000;
        app.get('/', (req, res) => {
            res.send('The sedulous hyena ate the antelope!');
        });
        app.listen(port, err => {
            if (err) {
                return console.error(err);
            }
            return console.log(`server is listening on ${port}`);
        });
    }
}