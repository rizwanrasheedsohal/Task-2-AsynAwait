const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const Step = require("step");
const request = require("request");
var validUrl = require("valid-url");

exports.scrap = async function (req, res) {
  let addressArray = req.query.address;
  if (!Array.isArray(addressArray)) {
    addressArray = [addressArray];
  }
  let titles = [];
  let count = 0;
  for (let address of addressArray) {
    if (!validUrl.isUri(address)) {
      address = "https://" + address;
    }
    Step(
      function requestHTTP() {
        request(address, this);
      },
      function getResponse(err, response) {
        if (err) {
          titles.push(address + " -No response");
        }
        let dom = new JSDOM(response.body);
        let title = dom.window.document.querySelector("title");
        if (title !== null) {
          title = title.textContent;
          return title;
        }
        return err;
      },
      function pushTitle(err, title) {
        if (err) throw err;
        titles.push(address + " - " + "'" + title + "'");
        return titles;
      },
      function renderUI(err, titles) {
        count++;
        if (count == addressArray.length) {
          res.render("titles", { titles });
        }
      }
    );
  }
};
