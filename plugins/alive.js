export default {
    command: 'alive',
    category: 'general',
    description: 'Check if the bot is active',
    usage: '.alive',
    async handler(sock, message) {
        const chatId = message.key.remoteJid;
        const caption = `╔══════════════════════════╗\n` +
                        `  💀 DARKCORE BOT IS ALIVE\n` +
                        `╚══════════════════════════╝\n\n` +
                        `👤 *Owner:* +254797510941\n` +
                        `🚀 *Version:* 1.0.0\n` +
                        `🛡️ *Status:* Elite Cybersecurity Edition\n\n` +
                        `_Type .menu to see all commands_`;

        await sock.sendMessage(chatId, { 
            text: caption,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363319098372999@newsletter',
                    newsletterName: 'DARKCORE ELITE',
                    serverMessageId: -1
                }
            }
        }, { quoted: message });
    }
};
