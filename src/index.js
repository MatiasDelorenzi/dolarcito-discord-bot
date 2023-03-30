const { Client, GatewayIntentBits, REST, Routes } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const commands = require("./utils/commands");
const cron = require("cron");
const fetchDollarData = require("./utils/fetchDollarData");
const { config } = require("dotenv");
const buildDollarTypeMessage = require("./utils/messages/buildDollarTypeMessage");
const buildAllDollarMessage = require("./utils/messages/buildAllDollarMessage");
config();

const job = new cron.CronJob(
  "0 16 * * 1-5",
  function () {
    client.guilds.cache.forEach((guild) => {
      guild.channels.cache.forEach((channel) => {
        if (channel.type === 0) {
          channel
            .send(buildDollarMessage(dollarData))
            .catch((error) => console.log(error));
        }
      });
    });
  },
  null,
  true,
  "America/Argentina/Buenos_Aires"
);

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
    job.start();
  } catch (error) {
    console.error(error);
  }
})();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }

  if (interaction.commandName === "blue") {
    const { dolarBlue } = await fetchDollarData();
    await interaction.reply(
      buildDollarTypeMessage(
        dolarBlue.nombre,
        dolarBlue.compra,
        dolarBlue.venta
      )
    );
  }

  if (interaction.commandName === "oficial") {
    const { dolarOficial } = await fetchDollarData();
    await interaction.reply(
      buildDollarTypeMessage(
        dolarOficial.nombre,
        dolarOficial.compra,
        dolarOficial.venta
      )
    );
  }

  if (interaction.commandName === "bolsa") {
    const { dolarBolsa } = await fetchDollarData();
    await interaction.reply(
      buildDollarTypeMessage(
        dolarBolsa.nombre,
        dolarBolsa.compra,
        dolarBolsa.venta
      )
    );
  }

  if (interaction.commandName === "liqui") {
    const { dolarLiqui } = await fetchDollarData();
    await interaction.reply(
      buildDollarTypeMessage(
        dolarLiqui.nombre,
        dolarLiqui.compra,
        dolarLiqui.venta
      )
    );
  }

  if (interaction.commandName === "soja") {
    const { dolarSoja } = await fetchDollarData();
    await interaction.reply(
      buildDollarTypeMessage(
        dolarSoja.nombre,
        dolarSoja.compra,
        dolarSoja.venta
      )
    );
  }

  if (interaction.commandName === "turista") {
    const { dolarTurista } = await fetchDollarData();
    await interaction.reply(
      buildDollarTypeMessage(
        dolarTurista.nombre,
        dolarTurista.compra,
        dolarTurista.venta
      )
    );
  }

  if (interaction.commandName === "cotizaciones") {
    const dollarMessage = await buildAllDollarMessage();
    await interaction.reply(dollarMessage);
  }
});

client.login(process.env.DISCORD_TOKEN);
