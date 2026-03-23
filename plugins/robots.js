import axios from 'axios';

export default {
    command: 'robots',
    category: 'security',
    description: 'Fetch robots.txt for a domain',
    usage: '.robots <domain>',
    async handler(sock, message, args) {
        const chatId = message.key.remoteJid;
        const domain = args[0];
        if (!domain) {
            return await sock.sendMessage(chatId, { text: '❌ Please provide a domain. Usage: .robots <domain>' }, { quoted: message });
        }

        await sock.sendMessage(chatId, { text: `🔍 Fetching robots.txt for *${domain}*...` }, { quoted: message });

        try {
            const response = await axios.get(`https://api.hackertarget.com/httpheaders/?q=${domain}/robots.txt`);
            const result = response.data;

            const caption = `╔══════════════════════════╗\n` +
                            `  💀 DARKCORE ROBOTS.TXT\n` +
                            `╚══════════════════════════╝\n\n` +
                            `🌐 *Target:* ${domain}/robots.txt\n\n` +
                            `📊 *Results:*\n${result.split('\n').slice(0, 20).join('\n')}\n\n` +
                            `_Showing robots.txt content_`;

            await sock.sendMessage(chatId, { text: caption }, { quoted: message });
        } catch (error) {
            await sock.sendMessage(chatId, { text: `❌ Error fetching robots.txt: ${error.message}` }, { quoted: message });
        }
    }
};
