import express from "express";
import cors from "cors";
import ytdlp from "yt-dlp-exec";

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.get("/download", async (req, res) => {
    const videoUrl = req.query.url;
    
    const customName = req.query.name || "audio"; // Default name if not provided
    const safeName = customName.replace(/[^a-z0-9]/gi, '_').toLowerCase(); // Sanitize filename

    if (!videoUrl) {
        return res.status(400).send("URL is required");
    }

    try {
        // Correct headers for MP3
        res.header('Content-Disposition', `attachment; filename="${safeName}.mp3"`);
        res.header('Content-Type', 'audio/mpeg');

        // Call ytdlp directly, not as a constructor
        const subprocess = ytdlp.exec(videoUrl, {
            output: '-',
            format: 'bestaudio',
            extractAudio: true, // This is key!
            audioFormat: 'mp3',
            audioQuality: 0,
        });

        // Pipe the stdout of the process to the response
        subprocess.stdout.pipe(res);

        subprocess.on('error', (err) => {
            console.error("YT-DLP Error:", err);
            if (!res.headersSent) res.status(500).send("Error downloading");
        });

    } catch (err) {
        console.error("Catch Error:", err);
        res.status(500).send("Server Error");
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});