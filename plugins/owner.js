export default {
    command: 'owner',
    category: 'general',
    description: 'Get owner information',
    usage: '.owner',
    async handler(sock, message) {
        const chatId = message.key.remoteJid;
        const ownerNumber = "254797510941";
        const vcard = 'BEGIN:VCARD\n' +
                      'VERSION:3.0\n' +
                      'FN:AURORA OWNER\n' +
                      'ORG:AURORA ELITE;\n' +
                      'TEL;type=CELL;type=VOICE;waid=' + ownerNumber + ':+' + ownerNumber + '\n' +
                      'END:VCARD';

        await sock.sendMessage(chatId, {
            contacts: {
                displayName: 'AURORA OWNER',
                contacts: [{ vcard }]
            }
        }, { quoted: message });
    }
};
