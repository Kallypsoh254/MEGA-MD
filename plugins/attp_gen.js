import axios from 'axios';

export default {
    command: 'attp',
    category: 'sticker',
    description: 'Generate a text-to-sticker (animated)',
    usage: '.attp <text>',
    async handler(sock, message, args) {
        const chatId = message.key.remoteJid;
        const text = args.join(' ');
        if (!text) {
            return await sock.sendMessage(chatId, { text: '❌ Please provide text. Usage: .attp <text>' }, { quoted: message });
        }

        await sock.sendMessage(chatId, { text: `🎨 Generating text-to-sticker for *"${text}"*...` }, { quoted: message });

        try {
            // Using a public API for ATTP
            const response = await axios.get(`https://api.lolhuman.xyz/api/attp?apikey=85faf717d0545d14074659ad&text=${encodeURIComponent(text)}`, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(response.data, 'binary');

            await sock.sendMessage(chatId, { 
                sticker: buffer,
                packname: 'DARKCORE BOT',
                author: '+254797510941'
            }, { quoted: message });
        } catch (error) {
            await sock.sendMessage(chatId, { text: `❌ Error generating ATTP: ${error.message}` }, { quoted: message });
        }
    }
};
