import axios from 'axios';

export default {
    command: 'cve',
    category: 'security',
    description: 'Get details for a specific CVE ID',
    usage: '.cve <CVE-ID>',
    async handler(sock, message, args) {
        const chatId = message.key.remoteJid;
        const cveId = args[0];
        if (!cveId) {
            return await sock.sendMessage(chatId, { text: '❌ Please provide a CVE ID. Usage: .cve <CVE-ID>' }, { quoted: message });
        }

        await sock.sendMessage(chatId, { text: `🔍 Fetching details for *${cveId}*...` }, { quoted: message });

        try {
            const response = await axios.get(`https://cve.circl.lu/api/cve/${cveId}`);
            const data = response.data;

            if (!data || data.error) {
                return await sock.sendMessage(chatId, { text: `❌ CVE ID *${cveId}* not found.` }, { quoted: message });
            }

            const caption = `╔══════════════════════════╗\n` +
                            `  💀 DARKCORE CVE INFO\n` +
                            `╚══════════════════════════╝\n\n` +
                            `🆔 *CVE ID:* ${data.id}\n` +
                            `📅 *Published:* ${data.Published}\n` +
                            `📊 *CVSS:* ${data.cvss || 'N/A'}\n\n` +
                            `📝 *Summary:* ${data.summary}\n\n` +
                            `🔗 *References:* ${data.references ? data.references.slice(0, 3).join('\n') : 'None'}`;

            await sock.sendMessage(chatId, { text: caption }, { quoted: message });
        } catch (error) {
            await sock.sendMessage(chatId, { text: `❌ Error fetching CVE info: ${error.message}` }, { quoted: message });
        }
    }
};
