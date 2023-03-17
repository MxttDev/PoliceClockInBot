const { SlashCommandBuilder } = require("discord.js");

const createEmbed = require("../Functions/createEmbed.js");
const userData = require("../Functions/userData").userPlaytime;

const GetAPI = require("../Functions/getAPI.js");
const appendAPI = require("../Functions/appendAPI");
const deleteAPI = require("../Functions/deleteAPI");
const getAPI = require("../Functions/getAPI.js");

const axios = require("axios");

function getDutyTime(startTime, EndTime) {
  let timer = EndTime - startTime;
  timer = Math.floor(timer / 60000) + 1;
  return timer;
}

function sendAPI(id, time) {
  let URL = "https://api.statepolice.net/users/" + id;

  axios.get(URL).then(function (response) {
    var name = "name";
    var role = "role";
    var bnumber = "bnumber";
    var joindate = "joindate";
    var lastpromotion = "lastpromotion";
    var pfpicon = "pfpicon";
    var playtime = "0";
    var hours = "0";

    console.log(playtime);

    if (!response.data.name == null) {
      name = response.data.name;
      role = response.data.role;
      bnumber = response.data.bnumber;
      joindate = response.data.joindate;
      lastpromotion = response.data.lastpromotion;
      pfpicon = response.data.pfpicon;
      playtime = response.data.playtime;
      hours = response.data.hours;

      deleteAPI(
        "https://api.statepolice.net/users/delete",
        id,
        name,
        role,
        bnumber,
        joindate,
        lastpromotion,
        pfpicon,
        playtime,
        hours
      );
    }

    setTimeout(function () {
      appendAPI(
        "https://api.statepolice.net/users/create",
        id,
        name,
        role,
        bnumber,
        joindate,
        lastpromotion,
        pfpicon,
        playtime,
        hours
      );
    }, 1000);
  });
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clockout")
    .setDescription("Clock out duty!"),
  async execute(interaction) {
    var user = userData.get(interaction.member.id);

    if (user) {
      let timer = getDutyTime(user, Date.now());

      let embed = createEmbed(
        `Ending your Tour of Duty!\n\n**Minutes: ${timer}**`
      );

      userData.delete(interaction.member.id);

      interaction.reply({ embeds: [embed], ephemeral: true });

      sendAPI(interaction.member.id, timer);
    } else {
      let embed = createEmbed(`You did not clock in!`);
      interaction.reply({ embeds: [embed], ephemeral: true });
    }
    setTimeout(() => interaction.deleteReply(), 5000);
  },
};
