const Command = require('../Structures/Command');
const User = require('../Models/user');

class Set extends Command {
  constructor(client, options) {
    super(client, {
      name: 'set',
      description: 'Set your preferred pronouns!',
      usage: 'sub/obj/posAdj/posPro/ref',
    });
  }

  async run(message, args) {
    if (!args[0])
      return message.reply(
        'Incorrect pronouns received, make sure your pronoun list follows the command usage: `' +
          this.usage +
          '`'
      );

    let pronouns = args[0].split(/\//gim);

    let findPreset = this.client.config.pronounPresets.find(
      (preset) => preset.subjective === pronouns[0]
    );

    if (!findPreset) pronouns = pronouns;
    else
      pronouns = [
        findPreset.subjective,
        findPreset.objective,
        findPreset.possessiveAdjective,
        findPreset.possessivePronoun,
        findPreset.reflexive,
      ];

    if (!pronouns || pronouns.length !== 5)
      return message.reply(
        'Incorrect pronoun pattern received, make sure your pronoun list follows the command usage: `' +
          this.usage +
          '` or use a preset (he/him), (she/her), (they/them). Use the ' +
          this.client.config.prefix +
          'presets command for a full list.'
      );

    let map = {
      '1': 'subjective',
      '2': 'objective',
      '3': 'possessiveAdjective',
      '4': 'possessivePronoun',
      '5': 'reflexive',
    };

    let sortedPronouns = [];

    for (let i = 0; i < pronouns.length; i++) {
      let type = map[(i + 1).toString()];
      sortedPronouns.push({ type: type, value: pronouns[i] });
    }

    const findUser = await User.findOne({ id: message.author.id });

    function findType(p) {
      return sortedPronouns.find((pronoun) => pronoun.type === p).value;
    }

    console.log(findType('reflexive'));

    if (!findUser)
      return new User({
        id: message.author.id,
        subjective: await findType('subjective'),
        objective: await findType('objective'),
        possessiveAdjective: await findType('possessiveAdjective'),
        posessivePronoun: await findType('possessivePronoun'),
        reflexive: await findType('reflexive'),
      }).save();
  }
}

module.exports = Set;
