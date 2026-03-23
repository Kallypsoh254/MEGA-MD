import axios from 'axios';

export default {
    command: 'weather',
    category: 'general',
    description: 'Get weather information for a city',
    usage: '.weather <city>',
    async handler(sock, message, args) {
        const chatId = message.key.remoteJid;
        const city = args.join(' ');
        if (!city) {
            return await sock.sendMessage(chatId, { text: '❌ Please provide a city. Usage: .weather <city>' }, { quoted: message });
        }

        await sock.sendMessage(chatId, { text: `🌤️ Fetching weather for *${city}*...` }, { quoted: message });

        try {
            // Using a public API for weather
            const response = await axios.get(`https://api.lolhuman.xyz/api/weather/${encodeURIComponent(city)}?apikey=85faf717d0545d14074659ad`);
            const result = response.data.result;

            if (!result) throw new Error('City not found');

            const caption = `╔══════════════════════════╗\n` +
                            `  💀 DARKCORE WEATHER\n` +
                            `╚══════════════════════════╝\n\n` +
                            `📍 *Location:* ${result.name}, ${result.country}\n` +
                            `🌡️ *Temperature:* ${result.temp}°C\n` +
                            `☁️ *Condition:* ${result.weather}\n` +
                            `💧 *Humidity:* ${result.humidity}%\n` +
                            `💨 *Wind Speed:* ${result.wind_speed} km/h\n` +
                            `🌅 *Sunrise:* ${result.sunrise}\n` +
                            `🌇 *Sunset:* ${result.sunset}`;

            await sock.sendMessage(chatId, { text: caption }, { quoted: message });
        } catch (error) {
            await sock.sendMessage(chatId, { text: `❌ Error fetching weather: ${error.message}` }, { quoted: message });
        }
    }
};
