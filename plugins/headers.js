import axios from 'axios';

export default {
    command: 'headers',
    category: 'security',
    description: 'Get HTTP headers for a URL',
    usage: '.headers <url>',
    async handler(sock, message, args) {
        const chatId = message.key.remoteJid;
        const url = args[0];
        if (!url) {
            return await sock.sendMessage(chatId, { text: '❌ Please provide a URL. Usage: .headers <url>' }, { quoted: message });
        }

        await sock.sendMessage(chatId, { text: `🔍 Fetching HTTP headers for *${url}*...` }, { quoted: message });

        try {
            const response = await axios.get(`https://api.hackertarget.com/httpheaders/?q=${url}`);
            const result = response.data;

            const caption = `╔══════════════════════════╗\n` +
                            `  💀 DARKCORE HTTP HEADERS\n` +
                            `╚══════════════════════════╝\n\n` +
                            `🌐 *Target:* ${url}\n\n` +
                            `📊 *Results:*\n${result}\n\n` +
                            `_Showing HTTP response headers_`;

            await sock.sendMessage(chatId, { text: caption }, { quoted: message });
        } catch (error) {
            await sock.sendMessage(chatId, { text: `❌ Error fetching headers: ${error.message}` }, { quoted: message });
        }
    }
};
