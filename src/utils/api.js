import OpenAI from "openai";

export const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

export async function getCurrentWeather({ location }) {
    console.log('Fetching weather for:', location);
    try {
        const weatherUrl = new URL("https://api.openweathermap.org/data/2.5/weather");
        weatherUrl.searchParams.append("q", location);
        weatherUrl.searchParams.append("units", "metric");
        weatherUrl.searchParams.append("appid", import.meta.env.VITE_WEATHER_API_KEY);
        const res = await fetch(weatherUrl);
        if (!res.ok) {
            throw new Error(`Weather API error: ${res.statusText}`);
        }
        const data = await res.json();
        console.log('Weather data:', data);
        return data;
    } catch(err) {
        console.error('Weather API error:', err.message);
        throw err;
    }
}

export async function suggestTravelPlan({ from, to, startDate, endDate, budget, travelers }) {
    console.log('Generating travel plan with params:', { from, to, startDate, endDate, budget, travelers });
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4-1106-preview",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful travel agent. Provide specific travel suggestions based on the destination and budget. Format your response in two clear sections: 1. Flight suggestion 2. Hotel suggestion"
                },
                {
                    role: "user",
                    content: `Plan a trip from ${from} to ${to} for ${travelers} traveler(s).
                    Dates: ${startDate} to ${endDate}
                    Budget: $${budget}
                    
                    Please provide:
                    1. A specific flight suggestion with airline and route
                    2. A specific hotel recommendation in the destination city`
                }
            ]
        });
        
        const suggestions = response.choices[0].message.content;
        const [flightSection, hotelSection] = suggestions.split('2.');
        
        return {
            flight: flightSection.replace('1.', '').trim(),
            hotel: hotelSection.trim()
        };
    } catch(err) {
        console.error('Travel plan error:', err.message);
        throw err;
    }
}
