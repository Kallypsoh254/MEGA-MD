import axios from 'axios';

export default {
    command: 'instagram',
    aliases: ['ig'],
    category: 'downloader',
    description: 'Download an Instagram video or image',
    usage: '.instagram <link>',
    async handler(sock, message, args) {
        const chatId = message.key.remoteJid;
        const link = args[0];
        if (!link) {
            return await sock.sendMessage(chatId, { text: '❌ Please provide an Instagram link. Usage: .instagram <link>' }, { quoted: message });
        }

        await sock.sendMessage(chatId, { text: `📥 Downloading Instagram media from *${link}*...` }, { quoted: message });

        try {
            // Using a public API for Instagram downloading
            const response = await axios.get(`https://api.lolhuman.xyz/api/instagram?apikey=85faf717d0545d14074659ad&url=${encodeURIComponent(link)}`);
            const result = response.data.result;

            if (!result || result.length === 0) throw new Error('No media found');

            const caption = `╔══════════════════════════╗\n` +
                            `  💀 DARKCORE INSTAGRAM DL\n` +
                            `╚══════════════════════════╝\n\n` +
                            `🌐 *Link:* ${link}`;

            for (const media of result) {
                if (media.includes('.mp4')) {
                    await sock.sendMessage(chatId, { video: { url: media }, caption: caption }, { quoted: message });
                } else {
                    await sock.sendMessage(chatId, { image: { url: media }, caption: caption }, { quoted: message });
                }
            }
        } catch (error) {
            await sock.sendMessage(chatId, { text: `❌ Error downloading Instagram: ${error.message}` }, { quoted: message });
        }
    }
};
