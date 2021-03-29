const fetch = require("node-fetch");
const got = require("got");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

exports.scrap = async function (req, res) {
  const addressArray = req.query.address;
  const titles = [];
  for (const address of addressArray) {
    try {
      const response = await got(address);
      let dom = new JSDOM(response.body);
      let title = dom.window.document.querySelector("title").textContent;
      titles.push(title);
    } catch (error) {
      res.send("Error while fetching Title || URL is invalid");
    }
  }

  res.render("titles", { titles });
};
