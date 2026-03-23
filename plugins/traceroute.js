import axios from 'axios';

export default {
    command: 'traceroute',
    category: 'security',
    description: 'Perform traceroute to a host',
    usage: '.traceroute <host>',
    async handler(sock, message, args) {
        const chatId = message.key.remoteJid;
        const host = args[0];
        if (!host) {
            return await sock.sendMessage(chatId, { text: '❌ Please provide a host. Usage: .traceroute <host>' }, { quoted: message });
        }

        await sock.sendMessage(chatId, { text: `🔍 Performing traceroute to *${host}*...` }, { quoted: message });

        try {
            const response = await axios.get(`https://api.hackertarget.com/mtr/?q=${host}`);
            const result = response.data;

            const caption = `╔══════════════════════════╗\n` +
                            `  💀 DARKCORE TRACEROUTE\n` +
                            `╚══════════════════════════╝\n\n` +
                            `🌐 *Target:* ${host}\n\n` +
                            `📊 *Results:*\n${result}\n\n` +
                            `_Showing traceroute (MTR) results_`;

            await sock.sendMessage(chatId, { text: caption }, { quoted: message });
        } catch (error) {
            await sock.sendMessage(chatId, { text: `❌ Error performing traceroute: ${error.message}` }, { quoted: message });
        }
    }
};
