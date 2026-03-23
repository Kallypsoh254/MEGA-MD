import axios from 'axios';

export default {
    command: 'wayback',
    category: 'security',
    description: 'Get the latest archived version of a URL from Wayback Machine',
    usage: '.wayback <url>',
    async handler(sock, message, args) {
        const chatId = message.key.remoteJid;
        const url = args[0];
        if (!url) {
            return await sock.sendMessage(chatId, { text: '❌ Please provide a URL. Usage: .wayback <url>' }, { quoted: message });
        }

        await sock.sendMessage(chatId, { text: `🔍 Searching Wayback Machine for *${url}*...` }, { quoted: message });

        try {
            const response = await axios.get(`https://archive.org/wayback/available?url=${url}`);
            const data = response.data;

            if (!data.archived_snapshots || !data.archived_snapshots.closest) {
                return await sock.sendMessage(chatId, { text: `❌ No archived snapshots found for *${url}*.` }, { quoted: message });
            }

            const snapshot = data.archived_snapshots.closest;
            const caption = `╔══════════════════════════╗\n` +
                            `  💀 DARKCORE WAYBACK\n` +
                            `╚══════════════════════════╝\n\n` +
                            `🌐 *Target:* ${url}\n` +
                            `📅 *Timestamp:* ${snapshot.timestamp}\n` +
                            `🔗 *Snapshot URL:* ${snapshot.url}\n\n` +
                            `_Showing the closest archived version_`;

            await sock.sendMessage(chatId, { text: caption }, { quoted: message });
        } catch (error) {
            await sock.sendMessage(chatId, { text: `❌ Error searching Wayback Machine: ${error.message}` }, { quoted: message });
        }
    }
};
