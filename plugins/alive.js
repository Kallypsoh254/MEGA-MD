export default {
    command: 'alive',
    category: 'general',
    description: 'Check if the bot is active',
    usage: '.alive',
    async handler(sock, message) {
        const chatId = message.key.remoteJid;
        const banner = `
   ▄▄▄▄▄▄▄ ▄▄   ▄▄ ▄▄▄▄▄▄   ▄▄▄▄▄▄▄ ▄▄▄▄▄▄   ▄▄▄▄▄▄▄ 
  █       █  █ █  █   ▄  █ █       █   ▄  █ █       █
  █   ▄   █  █ █  █  █ █ █ █   ▄   █  █ █ █ █   ▄   █
  █  █▄█  █  █▄█  █   █▄▄█▄█  █ █  █   █▄▄█▄█  █▄█  █
  █       █       █    ▄▄  █  █▄█  █    ▄▄  █       █
  █   ▄   █       █   █  █ █       █   █  █ █   ▄   █
  █▄▄█ █▄▄█▄▄▄▄▄▄▄█▄▄▄█  █▄█▄▄▄▄▄▄▄█▄▄▄█  █▄█▄▄█ █▄▄█
  
  ✨ AURORA BOT IS ALIVE
  🛡️ Elite Cybersecurity Edition
  🚀 Version: 1.0.0
  👤 Owner: +254797510941
  
  _Type .menu to see all commands_
  `.trim();

        await sock.sendMessage(chatId, { 
            text: banner,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363319098372999@newsletter',
                    newsletterName: 'AURORA ELITE',
                    serverMessageId: -1
                }
            }
        }, { quoted: message });
    }
};
