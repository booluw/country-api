var express = require('express');
var router = express.Router();
const path = require("path");
const fs = require("fs").promises;

router.get("/", async function (req, res) {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "javascripts",
      "countries+states+cities.json"
    );
    const raw = await fs.readFile(filePath, "utf8");
    const json = JSON.parse(raw);

    const { q } = req.query;

    if (!q) {
      res.json({ data: json, message: "All Countries returned" });
      return;
    }

    const filtered = json
      .map((country) => {
        if (country.name.toLowerCase().includes(q.toLocaleLowerCase())) {
          return country;
        }

        return null;
      })
      .filter((item) => item !== null);

    res.json({ data: filtered, message: `Countries with: ${q} returned` });
    return;
  } catch (error) {
    res.json({ message: "An Error occurred", error });
    console.error(error);
    return;
  }
});

router.get('/countries', async function (req, res) {
  try {
    const filePath = path.join(process.cwd(), "public", "javascripts", "countries+states+cities.json");
    const raw = await fs.readFile(filePath, "utf8");
    const json = JSON.parse(raw);

    const { q } = req.query;

    if (!q) {

      const result = json.map((country) => {
        const {
          states: _states,
          timezones: _timezones,
          translations: _translations,
          ...rest
        } = country;
        return rest
      })

      res.json({ data: result, message: "All Countries returned" })
      return
    }

    const filtered = json.map((country) => {
      if (country.name.toLowerCase().includes(q.toLocaleLowerCase())) {
        const {
          states: _states,
          timezones: _timezones,
          translations: _translations,
          ...rest
        } = country;
        return rest
      }

      return null
    }).filter((item) => item !== null)

    res.json({ data: filtered, message: `Countries with: ${q} returned` })
    return
  } catch (error) {
    res.json({ message: "An Error occurred", error })
    console.error(error)
    return
  }
});

router.get("/states", async function (req, res) {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "javascripts",
      "countries+states+cities.json"
    );
    const raw = await fs.readFile(filePath, "utf8");
    const json = JSON.parse(raw);

    const { q } = req.query;

    if (!q) {
      res.json({ data: json, message: "All Countries returned" });
      return;
    }

    const filtered = json
      .map((country) => {
        if (country.name.toLowerCase().includes(q.toLocaleLowerCase())) {
          return country.states;
        }

        return null;
      })
      .filter((item) => item !== null);

    res.json({ data: filtered, message: `Countries with: ${q} returned` });
    return;
  } catch (error) {
    res.json({ message: "An Error occurred", error });
    console.error(error);
    return;
  }
});

module.exports = router;
