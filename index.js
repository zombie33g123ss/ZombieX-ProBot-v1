const express = require("express");
const app = express();

app.listen(() => console.log("Server started"));

app.use('/ping', (req, res) => {
  res.send(new Date());
});


const Discord = require('discord.js');
const client = new Discord.Client();
const cmd = require("node-cmd");
const ms = require("ms");
const fs = require('fs');
const ytdl = require("ytdl-core");
const canvas = require("canvas");
const convert = require("hh-mm-ss")
const fetchVideoInfo = require("youtube-info");
const simpleytapi = require('simple-youtube-api')
const util = require("util")
const gif = require("gif-search");
const jimp = require("jimp");
const guild = require('guild');
const hastebins = require('hastebin-gen');
const getYoutubeID = require('get-youtube-id');
const pretty = require("pretty-ms");
const moment = require('moment');
const request = require('request');
const dateFormat = require('dateformat');

////////////

client.on("ready", () => {
console.log(`${client.user.username} is oneline `);
client.user.setActivity(` ${prefix}help`, { type : "PLAYING"  });
});


const prefix = ""
const developers = ""

//help command
client.on('message', msg =>{
    if(msg.content === prefix + "help"){
    const embed = new Discord.RichEmbed()
    .setColor('RED')
    .setThumbnail(client.user.avatarURL)
    .setTitle("All Commands")
    .setDescription(`
    ╭━━━╮╱╱╱╱╭━━╮╱╱╱╭╮
    ┃╭━╮┃╱╱╱╱┃╭╮┃╱╱╭╯╰╮
    ┃╰━╯┣━┳━━┫╰╯╰┳━┻╮╭╯
    ┃╭━━┫╭┫╭╮┃╭━╮┃╭╮┃┃
    ┃┃╱╱┃┃┃╰╯┃╰━╯┃╰╯┃╰╮
    ╰╯╱╱╰╯╰━━┻━━━┻━━┻━╯
    ${prefix}user : يعرض معلومات، مثل تاريخ دخول السيرفر وتاريخ التسجيل في الديسكورد عنك او عن مستخدم آخر
    ${prefix}server : يظهر معلومات حول السيرفر
    ${prefix}avatar : الحصول على الصورة الرمزية للمستخدمين
    ${prefix}top : عرض الأعضاء الذين لديهم أكثر نقاط في السيرفر
    ${prefix}setnick : تغيير لقب العضو
    ${prefix}roles : احصل على قائمة برولات السيرفر وعدد الأعضاء
    ${prefix}warnings : لاظهار تحذيرات  

    ${prefix}credits : يظهر رصيدك أو رصيد شخص ما
    ${prefix}daily : الحصول على راتبك اليومي
    ------------------------------------
    ${prefix}kick : طرد عضو
    ${prefix}ban : تبنيد عضو 
    ${prefix}mute : ميوت كتابي
    ${prefix}unmute : لازاله ميوت كتابي 
    ${prefix}lock : قفل الشات
    ${prefix}unlcok : فتح شات
    ${prefix}clear : مسح الشات
    ${prefix}setLog : لتعيين لوق
    ${prefix}temp on/off : لتفعيل واغلاق روم صوتي مؤقت
    ${prefix}warn : تحذير عضو 
    ${prefix}removewarn : لحذف تحذير 
    ${prefix}role : لاعطاء رتب 
    `)

    msg.channel.sendEmbed(embed)
    
    }
    
    });


let log = JSON.parse(fs.readFileSync('./log.json', 'utf8'));
client.on('message', message => {
           if (!message.channel.guild) return;

    let room = message.content.split(" ").slice(1);
    let findroom = message.guild.channels.find('name', `${room}`)
    if(message.content.startsWith(prefix + "setLog")) {
        if(!message.channel.guild) return;
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
if(!room) return message.channel.send('Please Type The Channel Name')
if(!findroom) return message.channel.send('Please Type The Log Channel Name')
let embed = new Discord.RichEmbed()
.setTitle('**Done The Log Code Has Been Setup**')
.addField('Channel:', `${room}`)
.addField('Requested By:', `${message.author}`)
.setThumbnail(message.author.avatarURL)
.setFooter(`${client.user.username}`)
message.channel.sendEmbed(embed)
log[message.guild.id] = {
channel: room,
onoff: 'On'
}
fs.writeFile("./log.json", JSON.stringify(log), (err) => {
if (err) console.error(err)
})
    }})
         
client.on('message', message => {
  
    if(message.content.startsWith(prefix + "toggleLog")) {
        if(!message.channel.guild) return;
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
        if(!log[message.guild.id]) log[message.guild.id] = {
          onoff: 'Off'
        }
          if(log[message.guild.id].onoff === 'Off') return [message.channel.send(`**The log Is __𝐎𝐍__ !**`), log[message.guild.id].onoff = 'On']
          if(log[message.guild.id].onoff === 'On') return [message.channel.send(`**The log Is __𝐎𝐅𝐅__ !**`), log[message.guild.id].onoff = 'Off']
          fs.writeFile("./log.json", JSON.stringify(log), (err) => {
            if (err) console.error(err)
            .catch(err => {
              console.error(err);
          });
            });
          }
          
        })


client.on('message', message => { 
           if (message.content.startsWith(prefix + "س")) {
     var args = message.content.split(" ").slice(1);
     let user = message.mentions.users.first();
     var men = message.mentions.users.first();
        var heg;
        if(men) {
            heg = men
        } else {
            heg = message.author
        }
      var mentionned = message.mentions.members.first();
         var h;
        if(mentionned) {
            h = mentionned
        } else {
            h = message.member
        }
               moment.locale('ar-TN');
      var id = new  Discord.RichEmbed()
      .setAuthor(message.author.username, message.author.avatarURL) 
    .setColor("#707070")
    .addField(': دخولك لديسكورد قبل', `${moment(heg.createdTimestamp).format('YYYY/M/D HH:mm:ss')} **\n** \`${moment(heg.createdTimestamp).fromNow()}\`` ,true) 
    .addField(': انضمامك لسيرفر قبل', `${moment(h.joinedAt).format('YYYY/M/D HH:mm:ss')} \n \`${moment(h.joinedAt).fromNow()}\``, true)               
    .setFooter(`Probot`, 'https://images-ext-2.discordapp.net/external/JpyzxW2wMRG2874gSTdNTpC_q9AHl8x8V4SMmtRtlVk/https/orcid.org/sites/default/files/files/ID_symbol_B-W_128x128.gif')                                 
    .setThumbnail(heg.avatarURL);
    message.channel.send(id)
}       });

client.on('messageDelete', message => {

	if(message.author.bot) return;
	if(message.channel.type === 'dm') return;
	if(!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;
				        if(!log[message.guild.id]) log[message.guild.id] = {
          onoff: 'Off'
        }
    if(log[message.guild.id].onoff === 'Off') return;
	var logChannel = message.guild.channels.find(c => c.name === `${log[message.guild.id].channel}`);
	if(!logChannel) return;

	let messageDelete = new Discord.RichEmbed()
	.setTitle('**[MESSAGE DELETE]**')
	.setColor('RED')
	.setThumbnail(message.author.avatarURL)
	.setDescription(`**\n**:wastebasket: Successfully \`\`DELETE\`\` **MESSAGE** In ${message.channel}\n\n**Channel:** \`\`${message.channel.name}\`\` (ID: ${message.channel.id})\n**Message ID:** ${message.id}\n**Sent By:** <@${message.author.id}> (ID: ${message.author.id})\n**Message:**\n\`\`\`${message}\`\`\``)
	.setTimestamp()
	.setFooter(message.guild.name, message.guild.iconURL)

	logChannel.send(messageDelete);
});
client.on('messageUpdate', (oldMessage, newMessage) => {

	if(oldMessage.author.bot) return;
	if(!oldMessage.channel.type === 'dm') return;
	if(!oldMessage.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!oldMessage.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;
				        if(!log[oldMessage.guild.id]) log[oldMessage.guild.id] = {
          onoff: 'Off'
        }
    if(log[oldMessage.guild.id].onoff === 'Off') return;
	var logChannel = oldMessage.guild.channels.find(c => c.name === `${log[oldMessage.guild.id].channel}`);
	if(!logChannel) return;

	if(oldMessage.content.startsWith('https://')) return;

	let messageUpdate = new Discord.RichEmbed()
	.setTitle('**[MESSAGE EDIT]**')
	.setThumbnail(oldMessage.author.avatarURL)
	.setColor('BLUE')
	.setDescription(`**\n**:wrench: Successfully \`\`EDIT\`\` **MESSAGE** In ${oldMessage.channel}\n\n**Channel:** \`\`${oldMessage.channel.name}\`\` (ID: ${oldMessage.channel.id})\n**Message ID:** ${oldMessage.id}\n**Sent By:** <@${oldMessage.author.id}> (ID: ${oldMessage.author.id})\n\n**Old Message:**\`\`\`${oldMessage}\`\`\`\n**New Message:**\`\`\`${newMessage}\`\`\``)
	.setTimestamp()
	.setFooter(oldMessage.guild.name, oldMessage.guild.iconURL)

	logChannel.send(messageUpdate);
});


client.on('roleCreate', role => {

	if(!role.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!role.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
	        if(!log[role.guild.id]) log[role.guild.id] = {
          onoff: 'Off'
        }
    if(log[role.guild.id].onoff === 'Off') return;
	var logChannel = role.guild.channels.find(c => c.name === `${log[role.guild.id].channel}`);
	if(!logChannel) return;

	role.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		let roleCreate = new Discord.RichEmbed()
		.setTitle('**[ROLE CREATE]**')
		.setThumbnail(userAvatar)
		.setDescription(`**\n**:white_check_mark: Successfully \`\`CREATE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setColor('GREEN')
		.setTimestamp()
		.setFooter(role.guild.name, role.guild.iconURL)

		logChannel.send(roleCreate);
	})
});
client.on('roleDelete', role => {

	if(!role.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!role.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
	        if(!log[role.guild.id]) log[role.guild.id] = {
          onoff: 'Off'
        }
    if(log[role.guild.id].onoff === 'Off') return;
	var logChannel = role.guild.channels.find(c => c.name === `${log[role.guild.id].channel}`);
	if(!logChannel) return;

	role.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		let roleDelete = new Discord.RichEmbed()
		.setTitle('**[ROLE DELETE]**')
		.setThumbnail(userAvatar)
		.setDescription(`**\n**:white_check_mark: Successfully \`\`DELETE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setColor('RED')
		.setTimestamp()
		.setFooter(role.guild.name, role.guild.iconURL)

		logChannel.send(roleDelete);
	})
});
client.on('roleUpdate', (oldRole, newRole) => {

	if(!oldRole.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!oldRole.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
	        if(!log[oldRole.guild.id]) log[oldRole.guild.id] = {
          onoff: 'Off'
	        }
    if(log[oldRole.guild.id].onoff === 'Off') return;
	var logChannel = oldRole.guild.channels.find(c => c.name === `${log[oldRole.guild.id].channel}`);
	if(!logChannel) return;

	oldRole.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if(oldRole.name !== newRole.name) {
            if(log[oldRole.guild.id].onoff === 'Off') return;
			let roleUpdateName = new Discord.RichEmbed()
			.setTitle('**[ROLE NAME UPDATE]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` Role Name.\n\n**Old Name:** \`\`${oldRole.name}\`\`\n**New Name:** \`\`${newRole.name}\`\`\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(oldRole.guild.name, oldRole.guild.iconURL)

			logChannel.send(roleUpdateName);
		}
		if(oldRole.hexColor !== newRole.hexColor) {
			if(oldRole.hexColor === '#000000') {
				var oldColor = '`Default`';
			}else {
				var oldColor = oldRole.hexColor;
			}
			if(newRole.hexColor === '#000000') {
				var newColor = '`Default`';
			}else {
				var newColor = newRole.hexColor;
            }
            if(log[oldRole.guild.id].onoff === 'Off') return;
			let roleUpdateColor = new Discord.RichEmbed()
			.setTitle('**[ROLE COLOR UPDATE]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` **${oldRole.name}** Role Color.\n\n**Old Color:** ${oldColor}\n**New Color:** ${newColor}\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(oldRole.guild.name, oldRole.guild.iconURL)

			logChannel.send(roleUpdateColor);
		}
	})
});

client.on('channelCreate', channel => {

	if(!channel.guild) return;
	if(!channel.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!channel.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
	        if(!log[channel.guild.id]) log[channel.guild.id] = {
          onoff: 'Off'
        }
    if(log[channel.guild.id].onoff === 'Off') return;
	var logChannel = channel.guild.channels.find(c => c.name === `${log[channel.guild.id].channel}`);
	if(!logChannel) return;

	if(channel.type === 'text') {
		var roomType = 'Text';
	}else
	if(channel.type === 'voice') {
		var roomType = 'Voice';
	}else
	if(channel.type === 'category') {
		var roomType = 'Category';
	}

	channel.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		let channelCreate = new Discord.RichEmbed()
		.setTitle('**[CHANNEL CREATE]**')
		.setThumbnail(userAvatar)
		.setDescription(`**\n**:white_check_mark: Successfully \`\`CREATE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setColor('GREEN')
		.setTimestamp()
		.setFooter(channel.guild.name, channel.guild.iconURL)

		logChannel.send(channelCreate);
	})
});
client.on('channelDelete', channel => {
	if(!channel.guild) return;
	if(!channel.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!channel.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
	        if(!log[channel.guild.id]) log[channel.guild.id] = {
          onoff: 'Off'
        }
    if(log[channel.guild.id].onoff === 'Off') return;
	var logChannel = channel.guild.channels.find(c => c.name === `${log[channel.guild.id].channel}`);
	if(!logChannel) return;

	if(channel.type === 'text') {
		var roomType = 'Text';
	}else
	if(channel.type === 'voice') {
		var roomType = 'Voice';
	}else
	if(channel.type === 'category') {
		var roomType = 'Category';
	}

	channel.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		let channelDelete = new Discord.RichEmbed()
		.setTitle('**[CHANNEL DELETE]**')
		.setThumbnail(userAvatar)
		.setDescription(`**\n**:white_check_mark: Successfully \`\`DELETE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setColor('RED')
		.setTimestamp()
		.setFooter(channel.guild.name, channel.guild.iconURL)

		logChannel.send(channelDelete);
	})
});


client.on('guildBanAdd', (guild, user) => {

	if(!guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
	        if(!log[user.guild.id]) log[guild.guild.id] = {
          onoff: 'Off'
        }
    if(log[user.guild.id].onoff === 'Off') return;
	var logChannel = guild.channels.find(c => c.name === `${log[guild.guild.id].channel}`);
	if(!logChannel) return;

	guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if(userID === client.user.id) return;

		let banInfo = new Discord.RichEmbed()
		.setTitle('**[BANNED]**')
		.setThumbnail(userAvatar)
		.setColor('DARK_RED')
		.setDescription(`**\n**:airplane: Successfully \`\`BANNED\`\` **${user.username}** From the server!\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setTimestamp()
		.setFooter(guild.name, guild.iconURL)

		logChannel.send(banInfo);
	})
});
client.on('guildBanRemove', (guild, user) => {
	if(!guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
	        if(!log[guild.guild.id]) log[guild.guild.id] = {
          onoff: 'Off'
        }
    if(log[guild.guild.id].onoff === 'Off') return;
	var logChannel = guild.channels.find(c => c.name === `${log[guild.guild.id].channel}`);
	if(!logChannel) return;

	guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if(userID === client.user.id) return;

		let unBanInfo = new Discord.RichEmbed()
		.setTitle('**[UNBANNED]**')
		.setThumbnail(userAvatar)
		.setColor('GREEN')
		.setDescription(`**\n**:unlock: Successfully \`\`UNBANNED\`\` **${user.username}** From the server\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setTimestamp()
		.setFooter(guild.name, guild.iconURL)

		logChannel.send(unBanInfo);
	})
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
	if(!oldMember.guild) return;
		        if(!log[oldMember.guild.id]) log[oldMember.guild.id] = {
          onoff: 'Off'
        }
    if(log[oldMember.guild.id].onoff === 'Off') return;
	var logChannel = oldMember.guild.channels.find(c => c.name === `${log[oldMember, newMember.guild.id].channel}`);
	if(!logChannel) return;

	oldMember.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;
		var userTag = logs.entries.first().executor.tag;

		if(oldMember.nickname !== newMember.nickname) {
			if(oldMember.nickname === null) {
				var oldNM = '`His Orginal Name`';
			}else {
				var oldNM = oldMember.nickname;
			}
			if(newMember.nickname === null) {
				var newNM = '`His Orginal Name`';
			}else {
				var newNM = newMember.nickname;
			}

			let updateNickname = new Discord.RichEmbed()
			.setTitle('**[UPDATE MEMBER NICKNAME]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:spy: Successfully \`\`CHANGE\`\` Member Nickname.\n\n**User:** ${oldMember} (ID: ${oldMember.id})\n**Old Nickname:** ${oldNM}\n**New Nickname:** ${newNM}\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(oldMember.guild.name, oldMember.guild.iconURL)

			logChannel.send(updateNickname);
		}
		if(oldMember.roles.size < newMember.roles.size) {
			let role = newMember.roles.filter(r => !oldMember.roles.has(r.id)).first();
					        if(!log[oldMember.guild.id]) log[oldMember.guild.id] = {
          onoff: 'Off'
        }
            if(log[oldMember.guild.id].onoff === 'Off') return;
			let roleAdded = new Discord.RichEmbed()
			.setTitle('**[ADDED ROLE TO MEMBER]**')
			.setThumbnail(oldMember.guild.iconURL)
			.setColor('GREEN')
			.setDescription(`**\n**:white_check_mark: Successfully \`\`ADDED\`\` Role to **${oldMember.user.username}**\n\n**User:** <@${oldMember.id}> (ID: ${oldMember.user.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			logChannel.send(roleAdded);
		}
		if(oldMember.roles.size > newMember.roles.size) {
			let role = oldMember.roles.filter(r => !newMember.roles.has(r.id)).first();
					        if(!log[oldMember.guild.id]) log[oldMember.guild.id] = {
          onoff: 'Off'
        }
            if(log[oldMember, newMember.guild.id].onoff === 'Off') return;
			let roleRemoved = new Discord.RichEmbed()
			.setTitle('**[REMOVED ROLE FROM MEMBER]**')
			.setThumbnail(oldMember.guild.iconURL)
			.setColor('RED')
			.setDescription(`**\n**:negative_squared_cross_mark: Successfully \`\`REMOVED\`\` Role from **${oldMember.user.username}**\n\n**User:** <@${oldMember.user.id}> (ID: ${oldMember.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			logChannel.send(roleRemoved);
		}
	})
	if(oldMember.guild.owner.id !== newMember.guild.owner.id) {
	  		        if(!log[oldMember.guild.id]) log[oldMember.guild.id] = {
          onoff: 'Off'
        }
        if(log[oldMember, newMember.guild.id].onoff === 'Off') return;
        let newOwner = new Discord.RichEmbed()
		.setTitle('**[UPDATE GUILD OWNER]**')
		.setThumbnail(oldMember.guild.iconURL)
		.setColor('GREEN')
		.setDescription(`**\n**:white_check_mark: Successfully \`\`TRANSFER\`\` The Owner Ship.\n\n**Old Owner:** <@${oldMember.user.id}> (ID: ${oldMember.user.id})\n**New Owner:** <@${newMember.user.id}> (ID: ${newMember.user.id})`)
		.setTimestamp()
		.setFooter(oldMember.guild.name, oldMember.guild.iconURL)

		logChannel.send(newOwner);
	}
});


client.on('voiceStateUpdate', (voiceOld, voiceNew) => {

	if(!voiceOld.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!voiceOld.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
			        if(!log[voiceOld.guild.id]) log[voiceOld.guild.id] = {
          onoff: 'Off'
        }
    if(log[voiceOld, voiceOld.guild.id].onoff === 'Off') return;
	var logChannel = voiceOld.guild.channels.find(c => c.name === `${log[voiceOld, voiceNew.guild.id].channel}`);
	if(!logChannel) return;

	voiceOld.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userTag = logs.entries.first().executor.tag;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if(voiceOld.serverMute === false && voiceNew.serverMute === true) {
			let serverMutev = new Discord.RichEmbed()
			.setTitle('**[VOICE MUTE]**')
			.setThumbnail('https://images-ext-1.discordapp.net/external/pWQaw076OHwVIFZyeFoLXvweo0T_fDz6U5C9RBlw_fQ/https/cdn.pg.sa/UosmjqDNgS.png')
			.setColor('RED')
			.setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			logChannel.send(serverMutev);
		}
		if(voiceOld.serverMute === true && voiceNew.serverMute === false) {
		  			        if(!log[voiceOld.guild.id]) log[voiceOld.guild.id] = {
          onoff: 'Off'
        }
            if(log[voiceOld, voiceOld.guild.id].onoff === 'Off') return;
			let serverUnmutev = new Discord.RichEmbed()
			.setTitle('**[VOICE UNMUTE]**')
			.setThumbnail('https://images-ext-1.discordapp.net/external/u2JNOTOc1IVJGEb1uCKRdQHXIj5-r8aHa3tSap6SjqM/https/cdn.pg.sa/Iy4t8H4T7n.png')
			.setColor('GREEN')
			.setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			logChannel.send(serverUnmutev);
		}
		if(voiceOld.serverDeaf === false && voiceNew.serverDeaf === true) {
		  			        if(!log[voiceOld.guild.id]) log[voiceOld.guild.id] = {
          onoff: 'Off'
        }
            if(log[voiceOld, voiceOld.guild.id].onoff === 'Off') return;
			let serverDeafv = new Discord.RichEmbed()
			.setTitle('**[VOICE DEAF]**')
			.setThumbnail('https://images-ext-1.discordapp.net/external/7ENt2ldbD-3L3wRoDBhKHb9FfImkjFxYR6DbLYRjhjA/https/cdn.pg.sa/auWd5b95AV.png')
			.setColor('RED')
			.setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			logChannel.send(serverDeafv);
		}
		if(voiceOld.serverDeaf === true && voiceNew.serverDeaf === false) {
		  			        if(!log[voiceOld.guild.id]) log[voiceOld.guild.id] = {
          onoff: 'Off'
        }
            if(log[voiceOld, voiceOld.guild.id].onoff === 'Off') return;
			let serverUndeafv = new Discord.RichEmbed()
			.setTitle('**[VOICE UNDEAF]**')
			.setThumbnail('https://images-ext-2.discordapp.net/external/s_abcfAlNdxl3uYVXnA2evSKBTpU6Ou3oimkejx3fiQ/https/cdn.pg.sa/i7fC8qnbRF.png')
			.setColor('GREEN')
			.setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			logChannel.send(serverUndeafv);
		}
	})
	
	if(voiceOld.voiceChannelID !== voiceNew.voiceChannelID && voiceNew.voiceChannel && voiceOld.voiceChannel != null) {
	  			        if(!log[voiceOld.guild.id]) log[voiceOld.guild.id] = {
          onoff: 'Off'
        }
        if(log[voiceOld, voiceOld.guild.id].onoff === 'Off') return;
		let voiceLeave = new Discord.RichEmbed()
		.setTitle('**[CHANGED VOICE ROOM]**')
		.setColor('GREEN')
		.setThumbnail(voiceOld.user.avatarURL)
		.setDescription(`**\n**:repeat: Successfully \`\`CHANGED\`\` The Voice Channel.\n\n**From:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannelID})\n**To:** \`\`${voiceNew.voiceChannel.name}\`\` (ID: ${voiceNew.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`)
		.setTimestamp()
		.setFooter(voiceOld.user.tag, voiceOld.user.avatarURL)

		logChannel.send(voiceLeave);
	}
});


///warn code
let warning = JSON.parse(fs.readFileSync('./warning.json' , 'utf8'));
client.on('message',message=>{
if(message.author.bot || message.channel.type == "dm"||!message.channel.guild) return;
if (!message.content.startsWith(prefix)) return;
let command = message.content.split(" ")[0];
command = command.slice(prefix.length);
if(command == 'warn'){if(!message.member.hasPermission('MANAGE_GUILD')) return;
if(!warning[message.guild.id]) warning[message.guild.id] = {warns:[]}
let T = warning[message.guild.id].warns;
let user = message.mentions.users.first();if(!user)return message.channel.send(`**:rolling_eyes: I can't find this member**`)
let reason = message.content.split(" ").slice(2).join(" ");if(!reason) return message.channel.send(`**:rolling_eyes: Please specify a reason.**`)
let W = warning[message.guild.id].warns;
let ID = 0;let leng = 0;
W.forEach(w =>{ID++;
if(w.id !== undefined) leng++;
})
if(leng === 90) return message.channel.send(`** You Can't Give More than \`90\` Warns**, please reset the warn list.`)
T.push({user:user.id,by:message.author.id,reason:reason,time:moment(Date.now()).format('llll'),id:ID+1})
message.channel.send(`**✅ @${user.username} warned!**`);
fs.writeFile("./warning.json", JSON.stringify(warning),(err)=>{if(err)console.error(err)});
fs.writeFile("./warning.json", JSON.stringify(warning),(err)=>{if(err)console.error(err)});
user.send(new Discord.RichEmbed().addField('**:warning: You were warned!**',reason)
.setFooter(message.guild.name,message.guild.iconURL).setTimestamp().setColor('#fffe62'));return;}
if(command == 'warnings') {
if(!message.member.hasPermission('MANAGE_GUILD')) return;
if(!warning[message.guild.id]) warning[message.guild.id] = {warns:[]}
let count = 0;let page = message.content.split(" ")[1];if(!page || isNaN(page)) page = 1;if(page > 4) return message.channel.send('**Warnings are only recorded on 4 pages!**')
let embed = new Discord.RichEmbed().setFooter(message.author.username,message.author.avatarURL)
let W = warning[message.guild.id].warns;
W.forEach(w =>{if(!w.id) return;count++;
if(page == 1) {if(count > 24) return null
let reason = w.reason;let user = w.user;let ID = w.id;let By = w.by;let time = w.time;
embed.addField(`⏱ ${time}`,`Warn ID (**${ID}**) - By <@${By}>
User: <@${user}>\n\`\`\`${reason}\`\`\``);
if(count == 24) embed.addField('**:sparkles: More ?**',`${message.content.split(" ")[0]} 2`);
}if(page == 2) {if(count <= 24) return null;if(count > 45) return null
let reason = w.reason;let user = w.user;let ID = w.id;let By = w.by;let time = w.time;
embed.addField(`⏱ ${time}`,`Warn ID (**${ID}**) - By <@${By}>
User: <@${user}>\n\`\`\`${reason}\`\`\``);
if(count == 45) embed.addField('**:sparkles: More ?**',`${message.content.split(" ")[0]} 3`);
}if(page == 3) {if(count <= 45) return null;if(count > 69) return null
let reason = w.reason;let user = w.user;let ID = w.id;let By = w.by;let time = w.time;
embed.addField(`⏱ ${time}`,`Warn ID (**${ID}**) - By <@${By}>
User: <@${user}>\n\`\`\`${reason}\`\`\``);
if(count == 69) embed.addField('**:sparkles: More ?**',`${message.content.split(" ")[0]} 4`);
}if(page == 4) {if(count <= 69) return null;if(count > 92) return null
let reason = w.reason;let user = w.user;let ID = w.id;let By = w.by;let time = w.time;
embed.addField(`⏱ ${time}`,`Warn ID (**${ID}**) - By <@${By}>
User: <@${user}>\n\`\`\`${reason}\`\`\``);
if(count == 64) embed.addField('**FULL**',`** **`);}});
embed.setTitle(`**${count} Warnings** [ ${page}/4 ]`)
message.channel.send(embed)};
if(command == 'removewarn' || command == 'rm') {
if(!message.member.hasPermission('MANAGE_GUILD')) return;
if(!warning[message.guild.id]) warning[message.guild.id] = {warns:[]};
let args = message.content.split(" ")[1];if(!args) return message.channel.send(
`**:rolling_eyes: Please specify warning number or user mention or (all) to delete all warnings.**`);
let user = message.mentions.members.first();
if(user) {
let C = 0;let a = warning[message.guild.id].warns
a.forEach(w=>{
if(w.user !== user.id) return
delete w.user;delete w.reason;delete w.id;delete w.by;delete w.time;
C++;
})
if(C === 0) return message.channel.send(`**:mag: I can't find the warning that you're looking for.**`)
return message.channel.send('**✅ '+C+' warnings has been removed.**');
};
if(args == 'all') {
let c = 0;let W = warning[message.guild.id].warns;  
W.forEach(w =>{if(w.id !== undefined) c++;})
warning[message.guild.id] = {warns:[]};
fs.writeFile("./warning.json", JSON.stringify(warning),(err)=>{if(err)console.error(err)})
fs.writeFile("./warning.json", JSON.stringify(warning),(err)=>{if(err)console.error(err)})
return message.channel.send('**✅ '+c+' warnings has been removed.**')
}if(isNaN(args)) return message.channel.send(
    `**:rolling_eyes: Please specify warning number or user mention or (all) to delete all warnings.**`); 
let W = warning[message.guild.id].warns;
let find = false;
W.forEach(w =>{
if(w.id == args) {
delete w.user;delete w.reason;delete w.id;delete w.by;delete w.time;
find = true;return message.channel.send('**✅ 1 warnings has been removed.**')
}});if(find == false) return message.channel.send(`**:mag: I can't find the warning that you're looking for.**`)}});













client.on('message', message => {
if(!message.channel.guild) return;
if(message.content.startsWith(prefix + 'move')) {
 if (message.member.hasPermission("MOVE_MEMBERS")) {
 if (message.mentions.users.size === 0) {
 return message.channel.send("``لاستخدام الأمر اكتب هذه الأمر : " +prefix+ "move [USER]``")
}
if (message.member.voiceChannel != null) {
 if (message.mentions.members.first().voiceChannel != null) {
 var authorchannel = message.member.voiceChannelID;
 var usermentioned = message.mentions.members.first().id;
var embed = new Discord.RichEmbed()
 .setTitle("Succes!")
 .setColor("#000000")
 .setDescription(`لقد قمت بسحب <@${usermentioned}> الى الروم الصوتي الخاص بك✅ `)
var embed = new Discord.RichEmbed()
.setTitle(`You are Moved in ${message.guild.name}`)
 .setColor("RANDOM")
.setDescription(`**<@${message.author.id}> Moved You To His Channel!\nServer --> ${message.guild.name}**`)
 message.guild.members.get(usermentioned).setVoiceChannel(authorchannel).then(m => message.channel.send(embed))
message.guild.members.get(usermentioned).send(embed)
} else {
message.channel.send("``لا تستطيع سحب "+ message.mentions.members.first() +" `يجب ان يكون هذه العضو في روم صوتي`")
}
} else {
 message.channel.send("**``يجب ان تكون في روم صوتي لكي تقوم بسحب العضو أليك``**")
}
} else {
message.react("❌")
}
 }
});

client.on("message", message => {
  let roleembed = new Discord.RichEmbed()
.setDescription(`
أمثله على الأوامر :
-role @mention rolename : لأعطاء رتبة لعضو معين
-role all rolename : لأعطاء رتبة للجميع
-role humans rolename : لأعطاء رتبة للاشخاص فقط
-role bots rolename : لأعطاء رتبة لجميع البوتات`)
.setFooter('Requested by '+message.author.username, message.author.avatarURL)
var args = message.content.split(' ').slice(1);
var msg = message.content.toLowerCase();
if( !message.guild ) return;
if( !msg.startsWith( prefix + 'role' ) ) return;
if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(' **__ليس لديك صلاحيات__**');
if( msg.toLowerCase().startsWith( prefix + 'roleembed' ) ){
    if( !args[0] ) return message.channel.sendEmbed(roleembed)
    if( !args[1] ) return message.channel.sendEmbed(roleembed)
    var role = msg.split(' ').slice(2).join(" ").toLowerCase();
    var role1 = message.guild.roles.filter( r=>r.name.toLowerCase().indexOf(role)>-1 ).first();
    if( !role1 ) return message.reply( '**:x: يرجى وضع الرتبة المراد اعطاءها الى الشخص**' );if( message.mentions.members.first() ){
        message.mentions.members.first().addRole( role1 );
        return message.reply('**:white_check_mark: [ '+role1.name+' ] رتبة [ '+args[0]+' ] تم اعطاء الى **');
    }
    if( args[0].toLowerCase() == "all" ){
        message.guild.members.forEach(m=>m.addRole( role1 ))
        return  message.reply('**:white_check_mark: [ '+role1.name+' ] تم اعطاء الى الكل رتبة**');
    } else if( args[0].toLowerCase() == "bots" ){
        message.guild.members.filter(m=>m.user.bot).forEach(m=>m.addRole(role1))
        return  message.reply('**:white_check_mark: [ '+role1.name+' ] تم اعطاء الى البوتات رتبة**');
    } else if( args[0].toLowerCase() == "humans" ){
        message.guild.members.filter(m=>!m.user.bot).forEach(m=>m.addRole(role1))
        return  message.reply('**:white_check_mark: [ '+role1.name+' ] تم اعطاء الى البشريين رتبة**');
    }  
} else {
    if( !args[0] ) return message.reply( '**:x: يرجى وضع الشخص المراد اعطائها الرتبة**' );
    if( !args[1] ) return message.reply( '**:x: يرجى وضع الرتبة المراد اعطائها للشخص**' );
    var role = msg.split(' ').slice(2).join(" ").toLowerCase();
    var role1 = message.guild.roles.filter( r=>r.name.toLowerCase().indexOf(role)>-1 ).first();
    if( !role1 ) return message.reply( '**:x: يرجى وضع الرتبة المراد اعطائها للشخص**' );if( message.mentions.members.first() ){
        message.mentions.members.first().addRole( role1 );
        return message.reply('**:white_check_mark: [ '+role1.name+' ] رتبة [ '+args[0]+' ] تم اعطاء **');
    }
    if( args[0].toLowerCase() == "all" ){
        message.guild.members.forEach(m=>m.addRole( role1 ))
        return  message.reply('**:white_check_mark: [ '+role1.name+' ] تم اعطاء الكل رتبة**');
    } else if( args[0].toLowerCase() == "bots" ){
        message.guild.members.filter(m=>m.user.bot).forEach(m=>m.addRole(role1))
        return  message.reply('**:white_check_mark: [ '+role1.name+' ] تم اعطاء البوتات رتبة**');
    } else if( args[0].toLowerCase() == "humans" ){
        message.guild.members.filter(m=>!m.user.bot).forEach(m=>m.addRole(role1))
        return  message.reply('**:white_check_mark: [ '+role1.name+' ] تم اعطاء البشريين رتبة**');
    }
}
});


client.on("message", message => {
  if (message.author.bot) return;

  let command = message.content.split(" ")[0];

  if (command === prefix + "mute") {
    if (message.author.bot) return;
    if (!message.member.hasPermission("MANAGE_ROLES"))
      return message
        .reply("** لا يوجد لديك برمشن 'Manage Roles' **")
        .catch(console.error);
    let user = message.mentions.users.first();
    let modlog = client.channels.find(gg => gg.name === "log");
    let muteRole = client.guilds
      .get(message.guild.id)
      .roles.find(gg => gg.name === "Muted");
    if (!muteRole)
      return message
        .reply("** لا يوجد رتبة الميوت 'Muted' **")
        .catch(console.error);
    if (message.mentions.users.size < 1)
      return message
        .reply("** يجب عليك منشنت شخص اولاً**")
        .catch(console.error);

    const embed = new Discord.RichEmbed()
      .setColor(0x00ae86)
      .setTimestamp()
      .addField("الأستعمال:", "اسكت/احكي")
      .addField(
        "تم ميوت:",
        `${user.username}#${user.discriminator} (${user.id})`
      )
      .addField(
        "بواسطة:",
        `${message.author.username}#${message.author.discriminator}`
      );

    if (
      !message.guild
        .member(client.user)
        .hasPermission("MANAGE_ROLES_OR_PERMISSIONS")
    )
      return message
        .reply("** لا يوجد لدي برمشن Manage Roles **")
        .catch(console.error);

    if (message.guild.member(user).roles.has(muteRole.id)) {
      return message
        .reply("**:white_check_mark: .. تم اعطاء العضو ميوت**")
        .catch(console.error);
    } else {
      message.guild
        .member(user)
        .addRole(muteRole)
        .then(() => {
          return message
            .reply("**:white_check_mark: .. تم اعطاء العضو ميوت كتابي**")
            .catch(console.error);
        });
    }
  }
  
  
});



client.on("message", message => {
  if(!message.channel.guild) return;  
   if (message.author.bot) return;
  
   let command = message.content.split(" ")[0];
  
   if (message.content.split(" ")[0].toLowerCase() === prefix + "unmute") {
         if (!message.member.hasPermission('MANAGE_ROLES')) return;
   let user = message.mentions.users.first();
   let modlog = client.channels.find('name', 'log');
   let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');
   if (!muteRole) return message.reply(" I Can’t Find 'Muted' Role ").catch(console.error).then(message => message.delete(4000))
   if (message.mentions.users.size < 1) return message.reply(' Error : ``Mention a User``').catch(console.error).then(message => message.delete(4000))
   if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return;
  
   if (message.guild.member(user).removeRole(muteRole.id)) {
       return message.reply("User Has Been UnMuted.").catch(console.error).then(message => message.delete(4000))
   } else {
     message.guild.member(user).removeRole(muteRole).then(() => {
       return message.reply("User Has Been UnMuted.").catch(console.error).then(message => message.delete(4000))
     });
   }
  
 };
  
 });

 client.on("message", function(message) {
  if (!message.channel.guild) return;
  if (message.author.bot) return;
  if (message.author.id === client.user.id) return;
  if (message.author.equals(client.user)) return;
  if (!message.content.startsWith(prefix)) return;

  var args = message.content.substring(prefix.length).split(" ");
  switch (args[0].toLocaleLowerCase()) {
    case "clear":
      message.delete();
      if (!message.channel.guild) return;
      if (message.member.hasPermission(0x2000)) {
        if (!args[1]) {
          message.channel.fetchMessages().then(messages => {
            message.channel.bulkDelete(messages);
            var messagesDeleted = messages.array().length;
            message.channel
              .send(
                " " +
                  "**```fix\n" +
                  messagesDeleted +
                  " " +
                  ": عدد الرسائل التي تم مسحها" +
                  "```**"
              )
              .then(m => m.delete(5000));
          });
        } else {
          let messagecount = parseInt(args[1]);
          message.channel
            .fetchMessages({ limit: messagecount })
            .then(messages => message.channel.bulkDelete(messages));
          message.channel
            .send(
              " " +
                "**```fix\n" +
                args[1] +
                " " +
                ": عدد الرسائل التي تم مسحها" +
                "```**"
            )
            .then(m => m.delete(5000));
          message.delete(60000);
        }
      } else {
        var manage = new Discord.RichEmbed()
          .setDescription("You Do Not Have Permission MANAGE_MESSAGES :(")
          .setColor("RANDOM");
        message.channel.sendEmbed(manage);
        return;
      }
  }
});


client.on('message', message => {
         if(message.content === prefix + "lock") {
                             if(!message.channel.guild) return message.reply('** This command only for servers**');
  
     if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(' **__ليس لديك صلاحيات__**');
                message.channel.overwritePermissions(message.guild.id, {
              SEND_MESSAGES: false
  
                }).then(() => {
                    message.reply(":lock: **has been locked.**")
                });
                  }
      if(message.content === prefix + "unlock") {
                          if(!message.channel.guild) return message.reply('** This command only for servers**');
  
     if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('**__ليس لديك صلاحيات__**');
                message.channel.overwritePermissions(message.guild.id, {
              SEND_MESSAGES: true
  
                }).then(() => {
                    message.reply(":unlock: **has been unlocked.**")
                });
      }
         
});
client.on('message', message => {
  if (message.author.codes) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "ban") {
               if(!message.channel.guild) return message.reply('** This command only for servers**');
         
  if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.reply("**انت لا تملك الصلاحيات المطلوبه**");
  if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.reply("**I Don't Have ` BAN_MEMBERS ` Permission**");
  let user = message.mentions.users.first();
  
  if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
  if (!message.guild.member(user)
  .bannable) return message.reply("**يجب ان تكون رتبة البوت اعلي من رتبه الشخص المراد تبنيدة**");


  message.guild.member(user).ban(7, user);

message.channel.send(`**:white_check_mark: ${user.tag} banned from the server ! :airplane: **  `)

}
});


var AsciiTable = require('ascii-data-table').default
client.on('message', message =>{

    if(message.content == prefix +"roles"){
        if(message.guild.member(message.author).hasPermission("ADMINISTRATOR"))
        var 
        ros=message.guild.roles.size,
        data = [['Rank', 'RoleName']]
        for(let i =0;i<ros;i++){
            if(message.guild.roles.array()[i].id !== message.guild.id){
         data.push([i,`${message.guild.roles.filter(r => r.position == ros-i).map(r=>r.name)}`])
        }}
        let res = AsciiTable.table(data)

        message.channel.send(`**\`\`\`xl\n${res}\`\`\`**`);
    }
});
  
client.on('message', message => {
    if (message.author.kick) return;
    if (!message.content.startsWith(prefix)) return;
  
    let command = message.content.split(" ")[0];
    command = command.slice(prefix.length);
  
    let args = message.content.split(" ").slice(1);
  
    if (command == "kick") {
      if (!message.channel.guild) return;
  
    if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.reply("You Don't Have KICK_MEMBERS Permission").then(msg => msg.delete(5000));
    if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.reply("I Don't Have KICK_Members Permission");
    let user = message.mentions.users.first();
    let reason = message.content.split(" ").slice(2).join(" ");
  
    if (message.mentions.users.size < 1) return 
    if(!reason) return message.reply ("Type The Reason Please");
    if (!message.guild.member(user)
    .bannable) return message.reply("I can not be higher than my rank");
  
    message.guild.member(user).kick(7, user);
  message.channel.send(`**:white_check_mark: ${user} has been kicked ! **`)
  user.send(`**You are has been kicked in ${message.guild.name} reason: ${reason}**`)
      message.delete()
  }
  });

client.on("message",message => {
  if(message.author.bot) return;
  if(!message.content.startsWith(prefix)) return;
    if(message.content.startsWith(prefix + "avatar")){
  const mention = message.mentions.users.first()
  
  if(!mention) return console.log("") 
  let embed = new Discord.RichEmbed()
  .setColor("BLACK")
  .setAuthor(`${mention.username}#${mention.discriminator}`,`${mention.avatarURL}`) 
  .setTitle("Avatar Link")
  .setURL(`${mention.avatarURL}`)
  .setImage(`${mention.avatarURL}`)
  .setFooter(`Requested By ${message.author.tag}`,`${message.author.avatarURL}`)    
      message.channel.send(embed)
  }
  })
  
  client.on("message", message => {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(message.content.startsWith(prefix + "avatar server")) {
      let doma = new Discord.RichEmbed()
      .setColor("BLACK")
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setTitle("Avatar Link")
      .setURL(message.guild.iconURL)
      .setImage(message.guild.iconURL)
      .setFooter(`Requested By ${message.author.tag}`, message.author.avatarURL)
      message.channel.send(doma)
    } else if(message.content.startsWith(prefix + "avatar")) {
      let args = message.content.split(" ")[1]
  var avt = args || message.author.id;    
      client.fetchUser(avt).then(user => {
       avt = user;
    let embed = new Discord.RichEmbed() 
    .setColor("BLACK")
    .setAuthor(`${avt.tag}`, avt.avatarURL)
    .setTitle("Avatar Link")
    .setURL(avt.avatarURL)
    .setImage(avt.avatarURL)
    .setFooter(`Requested By ${message.author.tag}`, message.author.avatarURL)
    message.channel.send(embed) 
      })
    }
  });

client.on('message', message => {
if(message.content.startsWith(prefix +"server")){
  if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.reply(`**هذه الخاصية للادارة فقط** :negative_squared_cross_mark: `)
if(!message.channel.guild) return message.reply(' ');
const millis = new Date().getTime() - message.guild.createdAt.getTime();
const now = new Date();
dateFormat(now, 'dddd, mmmm dS, yyyy, h:MM:ss TT');
const verificationLevels = ['None', 'Low', 'Medium', 'Insane', 'Extreme'];
const days = millis / 1000 / 60 / 60 / 24;
let roles = client.guilds.get(message.guild.id).roles.map(r => r.name);
var embed  = new Discord.RichEmbed()
.setAuthor(message.guild.name, message.guild.iconURL)
.addField("**🆔 Server ID:**", message.guild.id,true)
.addField("**📅 Created On**", message.guild.createdAt.toLocaleString(),true)
.addField("**👑 Owned by**",`${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`)
.addField("**👥 Members**",`[${message.guild.memberCount}]`,true)
.addField('**💬 Channels **',`**${message.guild.channels.filter(m => m.type === 'text').size}**` + ' text | Voice  '+ `**${message.guild.channels.filter(m => m.type === 'voice').size}** `,true)
.addField("**🌍 Others **" , message.guild.region,true)
.addField("**🔐 Roles **",`**[${message.guild.roles.size}]** Role `,true)
.setColor('#000000')
message.channel.sendEmbed(embed)

}
});

client.on('message', message =>{
  if(message.content === prefix +'ping'){
let start = Date.now(); message.channel.send('pong').then(message => { 
message.edit(`\`\`\`js
Time taken: ${Date.now() - start} ms
Discord API: ${client.ping.toFixed(0)} ms\`\`\``);
  });
  }
});

const temp = JSON.parse(fs.readFileSync('./temp.json', 'utf8'));
client.on('message', async message => {
 if(message.channel.type === "dm") return;
  if(message.author.bot) return;
   if(!temp[message.guild.id]) temp[message.guild.id] = {
    time: "3000",
     category : 'click here',
      channel : 'click here'
       }
        if(message.content.startsWith( prefix +'temp on')){
         if(!message.member.hasPermission(`MANAGE_GUILD`)) return;
          var ggg= message.guild.createChannel('click here', 'category').then(cg => {
           var ccc =message.guild.createChannel('click here', 'voice').then(ch => {
            ch.setParent(cg)
             message.channel.send('**Done ,**')
              client.on('message' , message => {
               if(message.content === prefix +'temp off') {
                if(!message.member.hasPermission(`MANAGE_GUILD`)) return;
                 cg.delete()
                  ch.delete()
                   message.channel.send('**Done ,**')
                    }
                     });
                      const time = temp[message.guild.id].time
                       client.on('message' , message => {
                        if (message.content.startsWith(prefix + "temptime")) {
                         if(!message.member.hasPermission(`MANAGE_GUILD`)) return;
                          let newTime= message.content.split(' ').slice(1).join(" ")
                          if(!newTime) return message.reply(`**${prefix}temptime <time>  \`1000 = 1s\`**`)
	                 if(isNaN(newTime)) return message.reply(`** The Time Be Nambers :face_palm: **`);
	                if(newTime < 1) return message.reply(`**The Time Be Up \`3000s\`**`)
                       temp[message.guild.id].time = newTime
                      message.channel.send(`**Temp Rooms Time Change To \`${newTime}\`**`);
                     }
                    });
                   client.on('voiceStateUpdate', (old, neww) => {
                  let newUserChannel = neww.voiceChannel
                 let oldUserChannel = old.voiceChannel
                temp[message.guild.id].category = cg.id
               temp[message.guild.id].channel = ch.id
              let channel = temp[message.guild.id].channel
             let category = temp[message.guild.id].category
            if(oldUserChannel === undefined && newUserChannel !== undefined && newUserChannel.id == channel) {
           neww.guild.createChannel(neww.displayName , 'voice').then(c => {
          c.setParent(category)
         let scan = setTimeout(()=>{
        if(!neww.voiceChannel) {
       c.delete();
      client.channels.get(channel).overwritePermissions(neww, {
     CONNECT:true,
    SPEAK:true
   })
  }
 }, temp[neww.guild.id].time);
  c.overwritePermissions(neww, {
   CONNECT:true,
    SPEAK:true,
     MANAGE_CHANNEL:true,
      MUTE_MEMBERS:true,
       DEAFEN_MEMBERS:true,
	MOVE_MEMBERS:true,
	 VIEW_CHANNEL:true
	  })
	   neww.setVoiceChannel(c)
            })
             client.channels.get(channel).overwritePermissions(neww, {
	      CONNECT:false,
	       SPEAK:false
		})
               }
              })
             })
           })
          }
         fs.writeFile("./temp.json", JSON.stringify(temp), (err) => {
        if(err) console.error(err)
       })
      });

var top = require("./top.json");
function save() {
    fs.writeFileSync("./top.json", JSON.stringify(top, null, 4));
}
client.on("voiceStateUpdate", async function(oldMember, newMember) {
    if (newMember.user.bot) return;
    if (!top[newMember.guild.id]) top[newMember.guild.id] = {};
    if (!top[newMember.guild.id][newMember.user.id]) top[newMember.guild.id][newMember.user.id] = {
        "text": 0,
        "voice": parseInt(Math.random()*10),
        "msgs": 0,
        "id": newMember.user.id
    }
    save();
    if (!oldMember.voiceChannel && newMember.voiceChannel) {
        var addXP = setInterval(async function () {
            top[newMember.guild.id][newMember.user.id].voice+=parseInt(Math.random()*4);
            save();
            if (!newMember.voiceChannel) {
                clearInterval(addXP);
            }
        }, 60000);
    }
});
client.on("message", async function (message) {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!top[message.guild.id]) top[message.guild.id] = {};
    if (!top[message.guild.id][message.author.id]) top[message.guild.id][message.author.id] = {
        "text": parseInt(Math.random()*10),
        "voice": 1,
        "msgs": 0,
        "id": message.author.id
    }
    if (top[message.guild.id][message.author.id].msgs > 10) {
        top[message.guild.id][message.author.id].text += parseInt(Math.random()*4);
        top[message.guild.id][message.author.id].msgs = 0;
    }
    save();
    var args = message.content.split(" ");
    var cmd = args[0].toLowerCase();
    if (!message.content.startsWith(prefix)) return;
  if(message.content.startsWith(prefix + "top text")) {
            var topArray = Object.values(top[message.guild.id]);
            var num = 0;
            var textStr = `${topArray.sort((a, b) => b.text - a.text).slice(0, 5).filter(user => user.text > 0 && message.guild.members.get(user.id)).map(function (user) {
                if (user.text > 0) {
                    return `**#${++num} | <@${user.id}> XP: \`${user.text}\` **`
                }
            }).join("\n")}`;
            var embed = new Discord.RichEmbed()
            .setAuthor("?? | Guild Score Leaderboards", message.guild.iconURL)
  .setColor("13B813")
        .addField(`**:speech_balloon: | TEXT LEADERBOARD**`, `${textStr}   \n\n\n **? | For More: \`${prefix}top text\`**`, true)  
        .setFooter(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()
            message.channel.send({
                embed: embed
            });
     //   if (!message.content.startsWith(prefix)) return;
  } else {
    if(message.content.startsWith(prefix + "top voice")) {
            var topArray = Object.values(top[message.guild.id]);
            var num = 0;
            var voiceStr = `${topArray.sort((a, b) => b.voice - a.voice).slice(0, 5).filter(user => user.voice > 0 && message.guild.members.get(user.id)).map(function (user) {
                if (user.voice > 0) {
                    return `**#${++num} | <@${user.id}> XP: \`${user.voice}\` **`
                }
            }).join("\n")}`;
            var embed = new Discord.RichEmbed()
            .setAuthor("?? | Guild Score Leaderboards", message.guild.iconURL)
  .setColor("13B813")
        .addField(`**:microphone2: | VOICE LEADERBOARD**`, `${voiceStr}   \n\n\n **:sparkles: More?** \`${prefix}top voice\``, true)
  
        .setFooter(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()  
            message.channel.send({
                embed: embed
            });
      
 
     //  break;
       // if (!message.content.startsWith(prefix)) return;
  } else {
       if(message.content.startsWith(prefix + "top")) {
            var topArray = Object.values(top[message.guild.id]);
            var num = 0;
            var textStr = `${topArray.sort((a, b) => b.text - a.text).slice(0, 10).filter(user => user.text > 0 && message.guild.members.get(user.id)).map(function (user) {
                if (user.text > 0) {
                    return `**#${++num} | <@${user.id}> XP: \`${user.text}\` **`
                }
            }).join("\n")}`;
            num = 0;
            var voiceStr = `${topArray.sort((a, b) => b.voice - a.voice).slice(0, 10).filter(user => user.voice > 0 && message.guild.members.get(user.id)).map(function (user) {
                if (user.voice > 0) {
                    return `**#${++num} | <@${user.id}> XP: \`${user.voice}\` **`
                }
            }).join("\n")}`;
            var embed = new Discord.RichEmbed()  
            .setAuthor("?? | Guild Score Leaderboards", message.guild.iconURL)
            .addField("**TOP 5 TEXT :speech_balloon:**", `${textStr}  \n\n  **:sparkles: More?** \`${prefix}top text\``, true)
            .addField("**TOP 5 VOICE :microphone2:**", `${voiceStr} \n\n **:sparkles: More?** \`${prefix}top voice\``, true)
            .setFooter(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()
            .setColor("13B813");
            message.channel.send({
                embed: embed
            
  
            });

      
       
        }
  }
  }
  
});
client.on("message", message => {
if(message.content.startsWith(prefix + "setnick")){
if(message.author.bot || message.channel.type == "dm" || !message.member.hasPermission("MANAGE_NICKNAMES") || !message.guild.member(client.user).hasPermission("MANAGE_NICKNAMES")) return;
var user = message.mentions.members.first();
var args = message.content.split(" ").slice(2);
var nick = args.join(" ");
if(!user || !args) return message.channel.send(`
\`\`\`js
Command: setnick
تغيير لقب العضو.

الاستخدام:
#setnick (العضو)
#setnick (العضو) (اللقب الجديد)

أمثله للأمر:
#setnick @𝗭𝗼𝗺𝗯𝗶𝗲𝗫
#setnick @𝗭𝗼𝗺𝗯𝗶𝗲𝗫 زومبي
\`\`\`

`);
message.guild.member(user.user).setNickname(`${nick}`);
message.channel.send(`Successfully changed **${user}** nickname to **${nick}**`);
}
});



/////كود كريدت
  
const cool = [];

client.on('message',async message => {

  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;
 
  const args = message.content.split(' ');
  const credits = require('./credits.json');
  const path = './credits.json';
  const mention = message.mentions.users.first() || client.users.get(args[1]) || message.author;
  const mentionn = message.mentions.users.first() || client.users.get(args[1]);
  const author = message.author.id;
  const balance = args[2];
  const daily = Math.floor(Math.random() * 350) + 10;
 
  if(!credits[author]) credits[author] = {credits: 50};
  if(!credits[mention.id]) credits[mention.id] = {credits: 50};
  fs.writeFile(path, JSON.stringify(credits, null, 5), function(err) {if(err) console.log(err)});
 
 
  if(message.content.startsWith(prefix + "credit")) {
  if(args[0] !== `${prefix}credit` && args[0] !== `${prefix}credits`) return;
 
  if(args[2]) {
    if(isNaN(args[2])) return message.channel.send('**:heavy_multiplication_x:| هذه الخانة يجب ان تتكون من ارقام وليس احرف.**');
    if(mention.bot) return message.channel.send(`**:heavy_multiplication_x:| ${message.content.split(' ')[1]} لم يتم العثور على**`);
    if(mention.id === message.author.id) return message.channel.send('**:heavy_multiplication_x:| لا يمكنك تحويل كردت لنفسك**');
    if(credits[author].credits < balance) return message.channel.send('**:heavy_multiplication_x:| أنت لا تملك هذا القدر من الكردت**');
    var one = Math.floor(Math.random() * 9) + 1;
    var two = Math.floor(Math.random() * 9) + 1;
    var three = Math.floor(Math.random() * 9) + 1;
    var four = Math.floor(Math.random() * 9) + 1;
 
    var number = `${one}${two}${three}${four}`;
   
    message.channel.send(`**:heavy_dollar_sign:| \`${number}\`, أكتب الرقم للأستمرار**`).then(m => {
      message.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 10000}).then(c => {
        if(c.first().content === number) {
          m.delete();
          message.channel.send(`**:atm:| ${message.author.username}, قام بتحويل \`${balance}\` لـ ${mention}**`);
          credits[author].credits += (-balance);
          credits[mention.id].credits += (+balance);
          fs.writeFile(path, JSON.stringify(credits, null, 5), function(err) {if(err) console.log(err)});
        } else if(c.first().content !== number) {
          m.delete();
          message.channel.send(`** :money_with_wings: | تم الغاء الإرسال**`);
        }
      });
    });
  }
  if(!args[2]) {
    if(mention.bot) return message.channel.send(`**:heavy_multiplication_x:| ${message.content.split(' ')[1]} لم يتم العثور على**`);
    message.channel.send(`**${mention.username}, your :credit_card: balance is **${credits[mention.id].credits}`);
  }
 
  }
  if(message.content.startsWith(prefix + "daily")) {
    if(cool.includes(message.author.id)) return message.channel.send(`**:heavy_dollar_sign: | \ , يجب عليك انتظار  يوم لأخذ المبلغ مرة اخرى**`);
    if(mentionn) {
      var one = Math.floor(Math.random() * 9) + 1;
      var two = Math.floor(Math.random() * 9) + 1;
      var three = Math.floor(Math.random() * 9) + 1;
      var four = Math.floor(Math.random() * 9) + 1;
 
      var number = `${one}${two}${three}${four}`;
 
      message.channel.send(`**:atm: | \`${number}\`, قم بكتابة الرقم للأستمرار**`).then(async m => {
        message.channel.awaitMessages(msg => msg.author.id === message.author.id, {max: 1, time: 20000, errors: ['time']}).then(collected => {
          if(collected.first().content === number) {
            m.delete();
            collected.first().delete();
            credits[mentionn.id].credits += (+daily);
            fs.writeFile(path, JSON.stringify(credits, null, 5), function(err) {if(err) console.log(err)});
 
          message.channel.send(`**:atm: | \`${daily}\`, تم تسليم المبلغ**`);  
          }
          if(collected.first().content !== number) {
            return m.delete();
          }
        });
      });
    } else if(!mentionn) {
      credits[author].credits += (+daily);
      fs.writeFile(path, JSON.stringify(credits, null, 5), function(err) {if(err) console.log(err)});
 
      message.channel.send(`**:atm: | \`${daily}\`, تم اعطائك المبلغ**`);
    }
    cool.unshift(message.author.id);
 
    setTimeout(() => {
      cool.shift(message.author.id);
      message.author.send("**:atm: | \`Daily\`, يمكنك الحصول على الكردت المجانية الان**").catch();
    }, ms("1d"));
  }
});


client.login(process.env.token);
