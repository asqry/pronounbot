class Command {
  constructor(client, options = {}) {
    this.client = client;
    this.name = options.name;
    this.description =
      options.description || 'No description provided, yell at the devs!';
    this.cooldown = options.cooldown || null;
    this.usage = options.usage
      ? `${client.config.prefix}${this.name} ${options.usage}`
      : `${client.config.prefix}${this.name}`;
    this.ownerOnly = options.ownerOnly || false;
    this.permission = options.permission || null;
  }

  async run() {
    throw new Error(`Command ${this.name} doesn't provide a run method!`);
  }
}

module.exports = Command;
