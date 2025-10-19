
import { GoogleGenAI, Type } from "@google/genai";
import type { Train } from '../types';

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

export const fetchTrains = async (from: string, to: string, date: string): Promise<Train[]> => {
    const prompt = `Generate a list of 5 to 8 plausible but fictional trains running from ${from} to ${to} on ${date}. Include train number, train name, departure and arrival stations/times, duration, fare, and seat availability. Ensure departure station is ${from} and arrival station is ${to}.`;

    try {
     
        const trainData = [
  {
    "trainNumber": "12002",
    "trainName": "Shatabdi Express",
    "departureStation": "Bhopal (BPL)",
    "departureTime": "14:40",
    "arrivalStation": "New Delhi (NDLS)",
    "arrivalTime": "22:10",
    "duration": "7h 30m",
    "fare": 1450.00,
    "seatsAvailable": 78
  },
  {
    "trainNumber": "22691",
    "trainName": "Rajdhani Express",
    "departureStation": "Bengaluru (SBC)",
    "departureTime": "20:00",
    "arrivalStation": "H. Nizamuddin (NZM)",
    "arrivalTime": "05:30",
    "duration": "33h 30m",
    "fare": 4750.50,
    "seatsAvailable": 15
  },
  {
    "trainNumber": "12953",
    "trainName": "August Kranti Raj",
    "departureStation": "Mumbai Central (MMCT)",
    "departureTime": "17:10",
    "arrivalStation": "H. Nizamuddin (NZM)",
    "arrivalTime": "09:43",
    "duration": "16h 33m",
    "fare": 2870.00,
    "seatsAvailable": 0
  },
  {
    "trainNumber": "12301",
    "trainName": "Howrah Rajdhani",
    "departureStation": "Howrah (HWH)",
    "departureTime": "16:50",
    "arrivalStation": "New Delhi (NDLS)",
    "arrivalTime": "10:05",
    "duration": "17h 15m",
    "fare": 3120.00,
    "seatsAvailable": 210
  }
];

        // Sort trains by departure time
        return trainData.sort((a: Train, b: Train) => a.departureTime.localeCompare(b.departureTime));

    } catch (error) {
        console.error("Error fetching train data from Gemini API:", error);
        throw new Error("Failed to generate train schedule. The model might be unavailable or the request could not be processed.");
    }
};
