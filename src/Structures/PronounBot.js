const { Client, Collection } = require('discord.js');
const mongoose = require('mongoose');
const path = require('path'),
  glob = require('glob');
const Command = require('./Command');

class PronounBot extends Client {
  constructor(options = {}) {
    super(options);

    this.config = require('../../config');
    this.commands = new Collection();
  }

  get directory() {
    return `${path.dirname(require.main.filename)}${path.sep}`;
  }

  async loadCommands() {
    glob(`${this.directory}/Commands/**/*.js`, (er, files) => {
      if (er) throw new Error(er);

      for (const file of files) {
        delete require.cache[[`${file}`]];
        const cmd = require(file);
        const command = new cmd(this);
        const filename = file.slice(file.lastIndexOf('/') + 1, file.length - 3);

        if (!(command instanceof Command))
          throw new TypeError(
            `${filename} is not a correct command. Not an instance of "Command" class.`
          );

        this.commands.set(command.name, command);

        console.log(`${filename} loaded`);
      }
    });
  }

  loadEvents() {
    glob(`${this.directory}/Events/**/*.js`, (er, files) => {
      if (er) throw new Error(er);

      for (const file of files) {
        delete require.cache[[`${file}`]];
        const event = new (require(file))(this),
          eventname = file.slice(file.lastIndexOf('/') + 1, file.length - 3);

        if (event.enable) super.on(eventname, (...args) => event.run(...args));
      }
    });
  }

  initDB() {
    const db = this.config.db;

    mongoose.connect(
      db.host
        .replace(/\{username\}/, db.username)
        .replace(/\{password\}/, db.password)
        .replace(/\{name\}/, db.name),
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      },
      () =>
        console.log(
          `Mongoose is now connected at ${mongoose.connection.host}:${mongoose.connection.port}`
        )
    );
  }

  async login() {
    super.login(this.config.token);

    const app = await super.fetchApplication();

    console.log(
      `PronounBot is online - Made by: ${await app.owner.username}#${await app
        .owner.discriminator}`
    );
  }

  async init() {
    this.initDB();
    this.loadCommands();
    this.loadEvents();
    this.login();
  }
}

module.exports = PronounBot;
