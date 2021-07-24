const { MessageEmbed } = require('discord.js');
const Command = require('../Structures/Command');

class Presets extends Command {
  constructor(client, options) {
    super(client, {
      name: 'presets',
      description: "Get a list of PronounBot's preset pronouns",
      usage: '[preset]',
    });

    this.client = client;
  }

  async run(message, args) {
    let list = this.client.config.pronounPresets;

    const embed = new MessageEmbed();
    embed.setColor(this.client.config.colors.neutral);

    if (!args[0]) {
      embed.setTitle(`${this.client.user.username} Presets`);
      embed.setDescription(list.map((x) => x.set + '\n').join(''));
      embed.setFooter(
        `Use ${this.usage} for specific information about a preset.`
      );

      message.channel.send(embed);
    } else {
      let preset = list.find((x) => x.subjective === args[0].split(/\//gim)[0]);
      console.log(preset);
      if (!preset)
        return message.reply(
          `Invalid preset received, use ${this.client.config.prefix}${this.name} for a full list.`
        );

      console.log(preset);

      embed.setTitle(`Preset (${preset.set})`);

      embed.setDescription(
        `**Subjective:** \`${preset.subjective}\`\n**Objective:** \`${preset.objective}\`\n**Possessive Adjective:** \`${preset.possessiveAdjective}\`\n**Possessive Pronoun:** \`${preset.possessivePronoun}\`\n**Reflexive:** \`${preset.reflexive}\``
      );

      message.channel.send(embed);
    }
  }
}

module.exports = Presets;
