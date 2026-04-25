const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
    // 1. Get the prompt from the URL (e.g., /get-response?prompt=hello)
    const code = req.body.code;

    // 2. Safety check: make sure the user actually sent a prompt
    if (!code) {
        return res.status(400).send("Code is required");
    }

    // 3. Call your Gemini 3 service
    const response = await aiService(code);

    // 4. Send the AI's text back to the user
    res.send(response);
};