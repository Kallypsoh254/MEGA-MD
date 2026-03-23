import axios from 'axios';

export default {
    command: 'tiktok',
    category: 'downloader',
    description: 'Download a TikTok video',
    usage: '.tiktok <link>',
    async handler(sock, message, args) {
        const chatId = message.key.remoteJid;
        const link = args[0];
        if (!link) {
            return await sock.sendMessage(chatId, { text: '❌ Please provide a TikTok link. Usage: .tiktok <link>' }, { quoted: message });
        }

        await sock.sendMessage(chatId, { text: `📥 Downloading TikTok video from *${link}*...` }, { quoted: message });

        try {
            // Using a public API for TikTok downloading
            const response = await axios.get(`https://api.lolhuman.xyz/api/tiktok?apikey=85faf717d0545d14074659ad&url=${encodeURIComponent(link)}`);
            const result = response.data.result;

            if (!result || !result.link) throw new Error('No video found');

            const caption = `╔══════════════════════════╗\n` +
                            `  💀 DARKCORE TIKTOK DL\n` +
                            `╚══════════════════════════╝\n\n` +
                            `🌐 *Link:* ${link}\n` +
                            `👤 *Author:* ${result.author.nickname || 'Unknown'}\n` +
                            `📝 *Description:* ${result.description || 'No description'}`;

            await sock.sendMessage(chatId, { 
                video: { url: result.link },
                caption: caption 
            }, { quoted: message });
        } catch (error) {
            await sock.sendMessage(chatId, { text: `❌ Error downloading TikTok: ${error.message}` }, { quoted: message });
        }
    }
};
