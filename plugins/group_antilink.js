import fs from 'fs';
import path from 'path';

const antilinkPath = path.join(process.cwd(), 'data', 'antilink.json');

export default {
    command: 'antilink',
    category: 'admin',
    description: 'Enable or disable antilink in the group',
    usage: '.antilink on/off',
    groupOnly: true,
    adminOnly: true,
    async handler(sock, message, args) {
        const chatId = message.key.remoteJid;
        const action = args[0]?.toLowerCase();

        if (!action || (action !== 'on' && action !== 'off')) {
            return await sock.sendMessage(chatId, { text: '❌ Please provide an action. Usage: .antilink on/off' }, { quoted: message });
        }

        let antilinkData = {};
        if (fs.existsSync(antilinkPath)) {
            antilinkData = JSON.parse(fs.readFileSync(antilinkPath, 'utf-8'));
        }

        if (action === 'on') {
            antilinkData[chatId] = true;
            await sock.sendMessage(chatId, { text: '✅ Antilink has been enabled for this group.' }, { quoted: message });
        } else {
            antilinkData[chatId] = false;
            await sock.sendMessage(chatId, { text: '✅ Antilink has been disabled for this group.' }, { quoted: message });
        }

        fs.writeFileSync(antilinkPath, JSON.stringify(antilinkData, null, 2));
    }
};
