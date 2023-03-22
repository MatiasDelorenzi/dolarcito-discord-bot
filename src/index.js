const { Client, GatewayIntentBits, REST, Routes } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const commands = require("./utils/commands");
const cron = require("cron");
const fetchDollarData = require("./utils/fetchDollarData");
const buildDollarMessage = require("./utils/buildDollarMessage");
const { config } = require("dotenv");
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
      `El dólar blue está a $${dolarBlue.venta} para la venta y $${dolarBlue.compra} para la compra.`
    );
  }

  if (interaction.commandName === "oficial") {
    const { dolarOficial } = await fetchDollarData();
    await interaction.reply(
      `El dólar oficial está a $${dolarOficial.venta} para la venta y $${dolarOficial.compra} para la compra.`
    );
  }

  if (interaction.commandName === "bolsa") {
    const { dolarBolsa } = await fetchDollarData();
    await interaction.reply(
      `El dólar bolsa está a $${dolarBolsa.venta} para la venta y $${dolarBolsa.compra} para la compra.`
    );
  }

  if (interaction.commandName === "liqui") {
    const { dolarLiqui } = await fetchDollarData();
    await interaction.reply(
      `El dólar contado con liqui está a $${dolarLiqui.venta} para la venta y $${dolarLiqui.compra} para la compra.`
    );
  }

  if (interaction.commandName === "soja") {
    const { dolarSoja } = await fetchDollarData();
    await interaction.reply(
      `El dólar soja está a $${dolarSoja.venta} para la venta y $${dolarSoja.compra} para la compra.`
    );
  }

  if (interaction.commandName === "turista") {
    const { dolarTurista } = await fetchDollarData();
    await interaction.reply(
      `El dólar turista está a $${dolarTurista.venta} para la venta y ${dolarTurista.compra} para la compra.`
    );
  }

  if (interaction.commandName === "dolar") {
    const dollarMessage = await buildDollarMessage();
    await interaction.reply(dollarMessage);
  }
});

client.login(process.env.DISCORD_TOKEN);
