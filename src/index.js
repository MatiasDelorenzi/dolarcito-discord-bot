const { Client, GatewayIntentBits, REST, Routes } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const commands = require("./utils/commands");
const cron = require("cron");
const fetchDollarData = require("./utils/fetchDollarData");

const job = new cron.CronJob(
  "0 16 * * 1-5",
  function () {
    client.guilds.cache.forEach((guild) => {
      guild.channels.cache.forEach((channel) => {
        if (channel.type === 0) {
          channel
            .send(
              `
**Dólar Oficial** => $${dollarData.dolarOficial.venta} para la venta y ${dollarData.dolarOficial.compra} para la compra.\n
**Dólar Blue** => $${dollarData.dolarBlue.venta} para la venta y ${dollarData.dolarBlue.compra} para la compra.\n
**Dólar Bolsa** => $${dollarData.dolarBolsa.venta} para la venta y ${dollarData.dolarBolsa.compra} para la compra.\n
**Dólar Contado con Liqui** => $${dollarData.dolarLiqui.venta} para la venta y ${dollarData.dolarLiqui.compra} para la compra.\n
**Dólar Soja** => $${dollarData.dolarSoja.venta} para la venta y ${dollarData.dolarSoja.compra} para la compra.\n
**Dólar Turista** => $${dollarData.dolarTurista.venta} para la venta y ${dollarData.dolarTurista.compra} para la compra.\n
              `
            )
            .catch((error) => console.log(error));
        }
      });
    });
  },
  null,
  true,
  "America/Argentina/Buenos_Aires"
);

const rest = new REST({ version: "10" }).setToken(
  "MTA4NzgzMjc0NTQxOTQ4MTE2OA.GaG5fX.B3g3FtPhtU5jptPWXR3lEERj7FvKo2-ZyxwtP8"
);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands("1087832745419481168"), {
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
    const dollarData = await fetchDollarData();
    await interaction.reply(`
**Dólar Oficial** => $${dollarData.dolarOficial.venta} para la venta y ${dollarData.dolarOficial.compra} para la compra.\n
**Dólar Blue** => $${dollarData.dolarBlue.venta} para la venta y ${dollarData.dolarBlue.compra} para la compra.\n
**Dólar Bolsa** => $${dollarData.dolarBolsa.venta} para la venta y ${dollarData.dolarBolsa.compra} para la compra.\n
**Dólar Contado con Liqui** => $${dollarData.dolarLiqui.venta} para la venta y ${dollarData.dolarLiqui.compra} para la compra.\n
**Dólar Soja** => $${dollarData.dolarSoja.venta} para la venta y ${dollarData.dolarSoja.compra} para la compra.\n
**Dólar Turista** => $${dollarData.dolarTurista.venta} para la venta y ${dollarData.dolarTurista.compra} para la compra.\n
    `);
  }
});

client.login(
  "MTA4NzgzMjc0NTQxOTQ4MTE2OA.GaG5fX.B3g3FtPhtU5jptPWXR3lEERj7FvKo2-ZyxwtP8"
);
