const { MessageEmbed, Message } = require('discord.js');
const Command = require('../Structures/Command');

class Help extends Command {
  constructor(client, options = {}) {
    super(client, {
      name: 'help',
      description: 'Get a list of commands',
      ownerOnly: false,
    });
  }

  async run(message, args) {
    const commands = this.client.commands;
    const embed = new MessageEmbed();
    embed.setColor(this.client.config.colors.neutral);
    embed.setTimestamp();
    embed.setTitle(`${this.client.user.username} Commands`);
    commands.forEach((command) => {
      embed.addField(
        `${command.name} \`${command.usage}\``,
        `*${command.description}*`,
        true
      );
    });
    embed.setFooter(message.author.tag);

    message.channel.send(embed);
  }
}

module.exports = Help;
