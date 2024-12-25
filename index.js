import express from 'express';
import urlRoute from './routes/url.js';
import { connectToDB } from './connect.js';
import URL from './models/url.js';
const app = express();
const PORT = 8001;
connectToDB('mongodb://127.0.0.1:27017/short-url')
    .then(() => console.log("MongoDB Connected!!"))
    .catch((err) => console.log("Error in connecting with DB ", err));
app.use(express.json());

app.use("/url", urlRoute);
app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortID: shortId,
    },
    {
        $push: {
            visitHistory: {timestamp : Date.now()},
        }
    },);
    res.redirect(entry.redirectURL);
});
app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));