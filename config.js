require('dotenv/config');

module.exports = {
  Master: '334392742266535957',

  prefix: 'p!',

  token: process.env.TOKEN,

  db: {
    host: process.env.DBHOST,
    username: process.env.DBUSER,
    password: process.env.DBPASS,
    name: process.env.DBNAME,
  },

  pronounPresets: [
    {
      set: 'he/him',
      subjective: 'he',
      objective: 'him',
      possessiveAdjective: 'his',
      possessivePronoun: 'his',
      reflexive: 'himself',
    },
    {
      set: 'she/her',
      subjective: 'she',
      objective: 'her',
      possessiveAdjective: 'her',
      possessivePronoun: 'hers',
      reflexive: 'herself',
    },
    {
      set: 'ze/zir',
      subjective: 'ze',
      objective: 'zir',
      possessiveAdjective: 'zir',
      possessivePronoun: 'zirs',
      reflexive: 'zirself',
    },
    {
      set: 'xe/xem',
      subjective: 'xe',
      objective: 'xem',
      possessiveAdjective: 'xir',
      possessivePronoun: 'xirs',
      reflexive: 'xirself',
    },
    {
      set: 'sie/hir',
      subjective: 'sie',
      objective: 'hir',
      possessiveAdjective: 'hir',
      possessivePronoun: 'hirs',
      reflexive: 'hirself',
    },
    {
      set: 'they/them',
      subjective: 'they',
      objective: 'them',
      possessiveAdjective: 'their',
      possessivePronoun: 'theirs',
      reflexive: 'themself',
    },
  ],

  colors: {
    neutral: '#f095ee',
    error: '#ff7777',
    success: '#77ff77',
  },
};
