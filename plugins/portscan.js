import axios from 'axios';

export default {
    command: 'portscan',
    category: 'security',
    description: 'Scan common ports on an IP or domain',
    usage: '.portscan <ip/domain>',
    async handler(sock, message, args) {
        const chatId = message.key.remoteJid;
        const target = args[0];
        if (!target) {
            return await sock.sendMessage(chatId, { text: '❌ Please provide an IP or domain. Usage: .portscan <ip/domain>' }, { quoted: message });
        }

        await sock.sendMessage(chatId, { text: `🔍 Scanning common ports on *${target}*...` }, { quoted: message });

        try {
            const response = await axios.get(`https://api.hackertarget.com/nmap/?q=${target}`);
            const result = response.data;

            const caption = `╔══════════════════════════╗\n` +
                            `  💀 DARKCORE PORTSCAN\n` +
                            `╚══════════════════════════╝\n\n` +
                            `🌐 *Target:* ${target}\n\n` +
                            `📊 *Results:*\n${result}\n\n` +
                            `_Showing Nmap scan results_`;

            await sock.sendMessage(chatId, { text: caption }, { quoted: message });
        } catch (error) {
            await sock.sendMessage(chatId, { text: `❌ Error performing portscan: ${error.message}` }, { quoted: message });
        }
    }
};
