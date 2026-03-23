export default {
    command: 'ban',
    aliases: ['kick'],
    category: 'admin',
    description: 'Ban or kick a user from the group',
    usage: '.ban @user',
    groupOnly: true,
    adminOnly: true,
    async handler(sock, message, args) {
        const chatId = message.key.remoteJid;
        const user = args[0]?.replace('@', '') + '@s.whatsapp.net';

        if (!user || !args[0]) {
            return await sock.sendMessage(chatId, { text: '❌ Please mention a user to ban. Usage: .ban @user' }, { quoted: message });
        }

        await sock.sendMessage(chatId, { text: `👮 Banning user *${args[0]}*...` }, { quoted: message });

        try {
            await sock.groupParticipantsUpdate(chatId, [user], 'remove');
            await sock.sendMessage(chatId, { text: `✅ User *${args[0]}* has been banned from the group.` }, { quoted: message });
        } catch (error) {
            await sock.sendMessage(chatId, { text: `❌ Error banning user: ${error.message}` }, { quoted: message });
        }
    }
};
