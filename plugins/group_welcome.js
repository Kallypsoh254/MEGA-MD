import fs from 'fs';
import path from 'path';

const welcomePath = path.join(process.cwd(), 'data', 'welcome.json');

export default {
    command: 'welcome',
    category: 'admin',
    description: 'Enable or disable welcome message in the group',
    usage: '.welcome on/off',
    groupOnly: true,
    adminOnly: true,
    async handler(sock, message, args) {
        const chatId = message.key.remoteJid;
        const action = args[0]?.toLowerCase();

        if (!action || (action !== 'on' && action !== 'off')) {
            return await sock.sendMessage(chatId, { text: '❌ Please provide an action. Usage: .welcome on/off' }, { quoted: message });
        }

        let welcomeData = {};
        if (fs.existsSync(welcomePath)) {
            welcomeData = JSON.parse(fs.readFileSync(welcomePath, 'utf-8'));
        }

        if (action === 'on') {
            welcomeData[chatId] = true;
            await sock.sendMessage(chatId, { text: '✅ Welcome message has been enabled for this group.' }, { quoted: message });
        } else {
            welcomeData[chatId] = false;
            await sock.sendMessage(chatId, { text: '✅ Welcome message has been disabled for this group.' }, { quoted: message });
        }

        fs.writeFileSync(welcomePath, JSON.stringify(welcomeData, null, 2));
    }
};
