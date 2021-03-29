const fetch = require("node-fetch");
const got = require("got");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const isAbsoluteUrl = require("is-absolute-url");
var urlExists = require("url-exists");

exports.scrap = async function (req, res) {
  const addressArray = req.query.address;
  for (const address of addressArray) {
    try {
      const response = await got(address);
      let dom = new JSDOM(response.body);
      let title = dom.window.document.querySelector("title").textContent;
      //Create HTML response here
      console.log(title);
      res.write(`<h1>${title}</h1>`);
    } catch (error) {
      res.code(400).send("Error while fetching Title || URL is invalid");
    }
  }

  res.end("Hello World");
};
