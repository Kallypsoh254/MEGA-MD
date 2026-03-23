import axios from 'axios';

export default {
    command: 'imagine',
    category: 'ai',
    description: 'Generate an image from a prompt',
    usage: '.imagine <prompt>',
    async handler(sock, message, args) {
        const chatId = message.key.remoteJid;
        const prompt = args.join(' ');
        if (!prompt) {
            return await sock.sendMessage(chatId, { text: '❌ Please provide a prompt. Usage: .imagine <prompt>' }, { quoted: message });
        }

        await sock.sendMessage(chatId, { text: `🎨 Generating image for *"${prompt}"*...` }, { quoted: message });

        try {
            // Using a public API for image generation
            const response = await axios.get(`https://api.lolhuman.xyz/api/dall-e?apikey=85faf717d0545d14074659ad&text=${encodeURIComponent(prompt)}`, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(response.data, 'binary');

            const caption = `╔══════════════════════════╗\n` +
                            `  💀 DARKCORE IMAGINE AI\n` +
                            `╚══════════════════════════╝\n\n` +
                            `🎨 *Prompt:* ${prompt}`;

            await sock.sendMessage(chatId, { 
                image: buffer,
                caption: caption 
            }, { quoted: message });
        } catch (error) {
            await sock.sendMessage(chatId, { text: `❌ Error generating image: ${error.message}` }, { quoted: message });
        }
    }
};
