const axios = require("axios");

module.exports = function deleteUser(
  Url,
  id,
  name,
  role,
  bnumber,
  joindate,
  lastpromotion,
  pfpicon,
  playtime,
  hours
) {
  console.log(name);
  axios
    .post(Url, {
      id: id,
      name: name,
      role: role,
      bnumber: bnumber,
      joindate: joindate,
      lastpromotion: lastpromotion,
      pfpicon: pfpicon,
      playtime: playtime,
      hours: hours,
    })
    .then(function (response) {
      console.log(response);
    });
};
