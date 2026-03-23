import axios from 'axios';

export default {
    command: 'ssl',
    category: 'security',
    description: 'Check SSL certificate for a domain',
    usage: '.ssl <domain>',
    async handler(sock, message, args) {
        const chatId = message.key.remoteJid;
        const domain = args[0];
        if (!domain) {
            return await sock.sendMessage(chatId, { text: '❌ Please provide a domain. Usage: .ssl <domain>' }, { quoted: message });
        }

        await sock.sendMessage(chatId, { text: `🔍 Checking SSL certificate for *${domain}*...` }, { quoted: message });

        try {
            const response = await axios.get(`https://api.hackertarget.com/sslcheck/?q=${domain}`);
            const result = response.data;

            const caption = `╔══════════════════════════╗\n` +
                            `  💀 DARKCORE SSL CHECK\n` +
                            `╚══════════════════════════╝\n\n` +
                            `🌐 *Target:* ${domain}\n\n` +
                            `📊 *Results:*\n${result}\n\n` +
                            `_Showing SSL certificate details_`;

            await sock.sendMessage(chatId, { text: caption }, { quoted: message });
        } catch (error) {
            await sock.sendMessage(chatId, { text: `❌ Error checking SSL: ${error.message}` }, { quoted: message });
        }
    }
};
