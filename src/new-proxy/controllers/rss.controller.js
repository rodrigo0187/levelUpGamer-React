const axios = require("axios");

exports.getRSS = async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "Missing URL" });

  try {
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/rss+xml, application/xml;q=0.9, */*;q=0.8",
      },
    });
    res.json({ contents: response.data });
  } catch {
    res.status(500).json({ error: "RSS fetch failed" });
  }
};
