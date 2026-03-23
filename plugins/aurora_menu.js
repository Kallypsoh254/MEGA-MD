export default {
    command: 'menu',
    aliases: ['help', 'h'],
    category: 'general',
    description: 'Show the AURORA bot menu',
    usage: '.menu',
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
  
  ✨ AURORA BOT v1.0.0
  🛡️ Elite Cybersecurity Edition
  👤 Owner: +254797510941
  
  ╔══════════════════════════╗
  🛡️ SECURITY TOOLS:
  ║ ➤ .menu pentest ← Full security menu
  ║ ➤ .recon <domain>
  ║ ➤ .whois <domain>
  ║ ➤ .dns <domain>
  ║ ➤ .ip <ip>
  ║ ➤ .portscan <ip>
  ║ ➤ .ssl <domain>
  ║ ➤ .headers <url>
  ║ ➤ .subdomain <domain>
  ║ ➤ .shodan <ip>
  ║ ➤ .cve <CVE-ID>
  ║ ➤ .pwned <email>
  ║ ➤ .hash gen/crack/id
  ║ ➤ .xss payloads/tips
  ║ ➤ .sqli payloads/tips
  ║ ➤ .osint user/github/dork
  ║ ➤ .wayback <url>
  ║ ➤ .robots <domain>
  ║ ➤ .urlscan <url>
  ║ ➤ .traceroute <host>
  ║ ➤ .encode / .decode
  ║ ➤ .bugbounty programs
  ╚══════════════════════════╝
  
  ╔══════════════════════════╗
  🌐 GENERAL:
  ║ ➤ .alive
  ║ ➤ .ping
  ║ ➤ .owner
  ║ ➤ .weather <city>
  ║ ➤ .translate <lang> <text>
  ║ ➤ .ss <url>
  ║ ➤ .github <user>
  ╚══════════════════════════╝
  
  ╔══════════════════════════╗
  👮 GROUP ADMIN:
  ║ ➤ .ban / .kick @user
  ║ ➤ .promote / .demote @user
  ║ ➤ .mute / .unmute
  ║ ➤ .warn @user
  ║ ➤ .tagall <msg>
  ║ ➤ .antilink on/off
  ║ ➤ .welcome on/off
  ╚══════════════════════════╝
  
  ╔══════════════════════════╗
  🎨 STICKER / IMAGE:
  ║ ➤ .sticker
  ║ ➤ .simage
  ║ ➤ .blur
  ║ ➤ .removebg
  ║ ➤ .attp <text>
  ╚══════════════════════════╝
  
  ╔══════════════════════════╗
  🤖 AI:
  ║ ➤ .gpt <question>
  ║ ➤ .gemini <question>
  ║ ➤ .imagine <prompt>
  ╚══════════════════════════╝
  
  ╔══════════════════════════╗
  📥 DOWNLOADERS:
  ║ ➤ .play <song>
  ║ ➤ .tiktok <link>
  ║ ➤ .instagram <link>
  ║ ➤ .facebook <link>
  ║ ➤ .spotify <query>
  ╚══════════════════════════╝
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
