import axios from 'axios';

export default {
    command: 'subdomain',
    category: 'security',
    description: 'Find subdomains for a domain',
    usage: '.subdomain <domain>',
    async handler(sock, message, args) {
        const chatId = message.key.remoteJid;
        const domain = args[0];
        if (!domain) {
            return await sock.sendMessage(chatId, { text: '❌ Please provide a domain. Usage: .subdomain <domain>' }, { quoted: message });
        }

        await sock.sendMessage(chatId, { text: `🔍 Finding subdomains for *${domain}*...` }, { quoted: message });

        try {
            const response = await axios.get(`https://api.hackertarget.com/hostsearch/?q=${domain}`);
            const result = response.data;

            const caption = `╔══════════════════════════╗\n` +
                            `  💀 DARKCORE SUBDOMAINS\n` +
                            `╚══════════════════════════╝\n\n` +
                            `🌐 *Target:* ${domain}\n\n` +
                            `📊 *Results:*\n${result.split('\n').slice(0, 20).join('\n')}\n\n` +
                            `_Showing top 20 subdomains_`;

            await sock.sendMessage(chatId, { text: caption }, { quoted: message });
        } catch (error) {
            await sock.sendMessage(chatId, { text: `❌ Error finding subdomains: ${error.message}` }, { quoted: message });
        }
    }
};
