export default {
    command: 'tagall',
    category: 'admin',
    description: 'Tag all members in the group',
    usage: '.tagall <message>',
    groupOnly: true,
    adminOnly: true,
    async handler(sock, message, args) {
        const chatId = message.key.remoteJid;
        const groupMetadata = await sock.groupMetadata(chatId);
        const participants = groupMetadata.participants;
        const msg = args.join(' ') || 'No message';

        let tagMsg = `╔══════════════════════════╗\n` +
                     `  💀 DARKCORE TAG ALL\n` +
                     `╚══════════════════════════╝\n\n` +
                     `📢 *Message:* ${msg}\n\n` +
                     `👥 *Members:*\n`;

        const mentions = [];
        for (const participant of participants) {
            tagMsg += `║ ➤ @${participant.id.split('@')[0]}\n`;
            mentions.push(participant.id);
        }

        tagMsg += `╚══════════════════════════╝`;

        await sock.sendMessage(chatId, { 
            text: tagMsg,
            mentions: mentions 
        }, { quoted: message });
    }
};
