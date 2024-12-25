import { nanoid } from "nanoid";
import URL from '../models/url.js';

const handleGenerateNewShortURL = async (req, res) => {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'URL is required' });
    const shortID = await nanoid(8);
    await URL.create({
        shortID: shortID,
        redirectURL: body.url,
        visitHistory: []
    });
    return res.json({ id: shortID });
};
const handleGetAnalytics =async (req,res)=>{
    const shortId = req.params.shortId;
    const result = await URL.findOne({
        shortID:shortId,
    });
    res.json({
        webURL: result.redirectURL,
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
};
export { handleGenerateNewShortURL , handleGetAnalytics};