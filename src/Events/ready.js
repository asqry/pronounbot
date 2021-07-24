class Ready {
  constructor(client) {
    this.client = client;
    this.enable = true;
  }

  async run() {
    let data = {
      name: 'p!help | :)',
      type: 'PLAYING',
    };

    await this.client.user.setActivity(data);
  }
}

module.exports = Ready;
