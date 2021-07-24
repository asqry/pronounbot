const User = require('../Models/user');

class Message {
  constructor(client) {
    this.client = client;
    this.enable = true;
  }

  async run(message) {
    const client = this.client;

    if (message.author.bot || !message.guild || message.system) return;
    if (!message.member && message.guild)
      message.member = await message.guild.members.fetch(message.author);

    if (!message.content.startsWith(client.config.prefix)) {
      //CHECK FOR PRONOUNS
      const user = await User.findOne({ id: message.member.id });
      if (!user) return;

      let pronounSet = `(${user.subjective}/${user.objective})`;

      if (message.member.nickname.includes(pronounSet)) return;

      message.member.setNickname(
        `${pronounSet} + ${
          message.member.nickname || message.member.user.username
        }`
      );
      //CHECK FOR PRONOUNS
    }

    const [cmd, ...args] = message.content
      .slice(client.config.prefix.length)
      .trim()
      .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase());

    if (!command) return;

    if (command.ownerOnly && message.member.id !== client.config.Master)
      return message.reply(
        `The \`${command.name}\` command is restricted to the bot owner.`
      );

    command.run(message, args);
  }
}

module.exports = Message;
