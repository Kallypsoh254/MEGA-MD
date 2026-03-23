import axios from 'axios';

export default {
    command: 'facebook',
    aliases: ['fb'],
    category: 'downloader',
    description: 'Download a Facebook video',
    usage: '.facebook <link>',
    async handler(sock, message, args) {
        const chatId = message.key.remoteJid;
        const link = args[0];
        if (!link) {
            return await sock.sendMessage(chatId, { text: '❌ Please provide a Facebook link. Usage: .facebook <link>' }, { quoted: message });
        }

        await sock.sendMessage(chatId, { text: `📥 Downloading Facebook video from *${link}*...` }, { quoted: message });

        try {
            // Using a public API for Facebook downloading
            const response = await axios.get(`https://api.lolhuman.xyz/api/facebook?apikey=85faf717d0545d14074659ad&url=${encodeURIComponent(link)}`);
            const result = response.data.result;

            if (!result) throw new Error('No video found');

            const caption = `╔══════════════════════════╗\n` +
                            `  💀 DARKCORE FACEBOOK DL\n` +
                            `╚══════════════════════════╝\n\n` +
                            `🌐 *Link:* ${link}`;

            await sock.sendMessage(chatId, { 
                video: { url: result },
                caption: caption 
            }, { quoted: message });
        } catch (error) {
            await sock.sendMessage(chatId, { text: `❌ Error downloading Facebook: ${error.message}` }, { quoted: message });
        }
    }
};
