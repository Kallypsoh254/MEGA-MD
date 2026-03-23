import axios from 'axios';

export default {
    command: 'recon',
    category: 'security',
    description: 'Perform basic reconnaissance on a domain',
    usage: '.recon <domain>',
    async handler(sock, message, args) {
        const chatId = message.key.remoteJid;
        const domain = args[0];
        if (!domain) {
            return await sock.sendMessage(chatId, { text: '❌ Please provide a domain. Usage: .recon <domain>' }, { quoted: message });
        }

        await sock.sendMessage(chatId, { text: `🔍 Performing reconnaissance on *${domain}*...` }, { quoted: message });

        try {
            // Using a public API for recon data (subdomains, IP, etc.)
            const response = await axios.get(`https://api.hackertarget.com/hostsearch/?q=${domain}`);
            const result = response.data;

            const caption = `╔══════════════════════════╗\n` +
                            `  💀 DARKCORE RECON\n` +
                            `╚══════════════════════════╝\n\n` +
                            `🌐 *Target:* ${domain}\n\n` +
                            `📊 *Results:*\n${result.split('\n').slice(0, 15).join('\n')}\n\n` +
                            `_Showing top 15 results_`;

            await sock.sendMessage(chatId, { text: caption }, { quoted: message });
        } catch (error) {
            await sock.sendMessage(chatId, { text: `❌ Error performing recon: ${error.message}` }, { quoted: message });
        }
    }
};
