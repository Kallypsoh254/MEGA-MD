export default {
    command: 'menu',
    aliases: ['help', 'h'],
    category: 'general',
    description: 'Show the DARKCORE bot menu',
    usage: '.menu',
    async handler(sock, message) {
        const chatId = message.key.remoteJid;
        const menu = `╔══════════════════════════╗\n` +
                     `  💀 DARKCORE BOT\n` +
                     `  Elite Cybersecurity Edition\n` +
                     `  v1.0.0 | Owner: +254797510941\n` +
                     `╚══════════════════════════╝\n\n` +
                     `╔══════════════════════════╗\n` +
                     `🛡️ SECURITY TOOLS:\n` +
                     `║ ➤ .menu pentest ← Full security menu\n` +
                     `║ ➤ .recon <domain>\n` +
                     `║ ➤ .whois <domain>\n` +
                     `║ ➤ .dns <domain>\n` +
                     `║ ➤ .ip <ip>\n` +
                     `║ ➤ .portscan <ip>\n` +
                     `║ ➤ .ssl <domain>\n` +
                     `║ ➤ .headers <url>\n` +
                     `║ ➤ .subdomain <domain>\n` +
                     `║ ➤ .shodan <ip>\n` +
                     `║ ➤ .cve <CVE-ID>\n` +
                     `║ ➤ .pwned <email>\n` +
                     `║ ➤ .hash gen/crack/id\n` +
                     `║ ➤ .xss payloads/tips\n` +
                     `║ ➤ .sqli payloads/tips\n` +
                     `║ ➤ .osint user/github/dork\n` +
                     `║ ➤ .wayback <url>\n` +
                     `║ ➤ .robots <domain>\n` +
                     `║ ➤ .urlscan <url>\n` +
                     `║ ➤ .traceroute <host>\n` +
                     `║ ➤ .encode / .decode\n` +
                     `║ ➤ .bugbounty programs\n` +
                     `╚══════════════════════════╝\n\n` +
                     `╔══════════════════════════╗\n` +
                     `🌐 GENERAL:\n` +
                     `║ ➤ .alive\n` +
                     `║ ➤ .ping\n` +
                     `║ ➤ .owner\n` +
                     `║ ➤ .weather <city>\n` +
                     `║ ➤ .translate <lang> <text>\n` +
                     `║ ➤ .ss <url>\n` +
                     `║ ➤ .github <user>\n` +
                     `╚══════════════════════════╝\n\n` +
                     `╔══════════════════════════╗\n` +
                     `👮 GROUP ADMIN:\n` +
                     `║ ➤ .ban / .kick @user\n` +
                     `║ ➤ .promote / .demote @user\n` +
                     `║ ➤ .mute / .unmute\n` +
                     `║ ➤ .warn @user\n` +
                     `║ ➤ .tagall <msg>\n` +
                     `║ ➤ .antilink on/off\n` +
                     `║ ➤ .welcome on/off\n` +
                     `╚══════════════════════════╝\n\n` +
                     `╔══════════════════════════╗\n` +
                     `🎨 STICKER / IMAGE:\n` +
                     `║ ➤ .sticker\n` +
                     `║ ➤ .simage\n` +
                     `║ ➤ .blur\n` +
                     `║ ➤ .removebg\n` +
                     `║ ➤ .attp <text>\n` +
                     `╚══════════════════════════╝\n\n` +
                     `╔══════════════════════════╗\n` +
                     `🤖 AI:\n` +
                     `║ ➤ .gpt <question>\n` +
                     `║ ➤ .gemini <question>\n` +
                     `║ ➤ .imagine <prompt>\n` +
                     `╚══════════════════════════╝\n\n` +
                     `╔══════════════════════════╗\n` +
                     `📥 DOWNLOADERS:\n` +
                     `║ ➤ .play <song>\n` +
                     `║ ➤ .tiktok <link>\n` +
                     `║ ➤ .instagram <link>\n` +
                     `║ ➤ .facebook <link>\n` +
                     `║ ➤ .spotify <query>\n` +
                     `╚══════════════════════════╝`;

        await sock.sendMessage(chatId, { 
            text: menu,
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
