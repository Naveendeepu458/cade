const { GoogleGenAI, Type } = require("@google/genai");

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            trainNumber: { type: Type.STRING },
            trainName: { type: Type.STRING },
            departureStation: { type: Type.STRING },
            departureTime: { type: Type.STRING, description: "Format: HH:MM (24-hour)" },
            arrivalStation: { type: Type.STRING },
            arrivalTime: { type: Type.STRING, description: "Format: HH:MM (24-hour)" },
            duration: { type: Type.STRING, description: "Format: Xh Ym" },
            fare: { type: Type.NUMBER, description: "Fare in local currency" },
            seatsAvailable: { type: Type.INTEGER, description: "Number of available seats" },
        },
        required: ["trainNumber", "trainName", "departureStation", "departureTime", "arrivalStation", "arrivalTime", "duration", "fare", "seatsAvailable"],
    },
};

/**
 * @desc    Fetch trains from Gemini API
 * @route   GET /api/trains
 * @access  Public
 */
const getTrains = async (req, res) => {
    const { from, to, date } = req.query;

    if (!from || !to || !date) {
        return res.status(400).json({ message: 'Please provide from, to, and date query parameters.' });
    }
    
    const prompt = `Generate a list of 5 to 8 plausible but fictional trains running from ${from} to ${to} on ${date}. Include train number, train name, departure and arrival stations/times, duration, fare, and seat availability. Ensure departure station is ${from} and arrival station is ${to}.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.7,
            },
        });
        
        const jsonText = response.text.trim();
        const trainData = JSON.parse(jsonText);

        // Sort trains by departure time
        const sortedTrains = trainData.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
        
        res.status(200).json(sortedTrains);

    } catch (error) {
        console.error("Error fetching train data from Gemini API:", error);
        res.status(500).json({ message: "Failed to generate train schedule. The model might be unavailable or the request could not be processed." });
    }
};

module.exports = { getTrains };
