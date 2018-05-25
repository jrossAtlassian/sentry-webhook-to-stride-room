// init project
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const rp = require("request-promise");
const { ROOM_URL, ROOM_TOKEN } = process.env;

app.use(bodyParser.json());

function convertSentryLevelToLozAppearance(level) {
  switch (level) {
    case "error":
    case "fatal":
      return "removed"; //red
    case "warning":
      return "moved"; //yellow
    case "info":
      return "inprogress"; //blue
    case "debug":
    default:
      return "default"; //grey
  }
}

app.post("/forwardToStride", function(req, res) {
  //console.log(JSON.stringify(req.body, null, 2))
  res.sendStatus(204).end();

  const strideTemplate = `{
  "content": [
    {
      "attrs": {
        "collapsible": true,
        "context": {
          "icon": {
            "label": "Sentry",
            "url": "https://e90d271df3e973c7.global.ssl.fastly.net/_static/f65232a5a7a7a0e17ac35f981e2ddc64/sentry/images/favicon.ico"
          },
          "text": "Sentry Event - ${req.body.project}"
        },
        "description": {
          "text": "${req.body.message}"
        },
        "details": [
          {
            "lozenge": {
              "appearance": "${convertSentryLevelToLozAppearance(
                req.body.level
              )}",
              "text": "${req.body.level}"
            },
            "title":"Level"
          },
          {
            "lozenge": {
              "appearance": "default",
              "text": "${req.body.project}"
            },
            "title": "Project"
          },
          {
            "lozenge": {
              "appearance": "success",
              "text": "${req.body.id}"
            },
            "title": "ID"
          }
        ],
        "link": {
          "url": "${req.body.url}"
        },
        "text": "Sentry Event - ${
          req.body.project
        } - ${req.body.level.toUpperCase()} - \\"${req.body.message}\\"",
        "title": {
          "text": "${req.body.project} - ${req.body.level.toUpperCase()}",
          "user": {
            "icon": {
              "label": "Sentry",
              "url": "https://e90d271df3e973c7.global.ssl.fastly.net/_static/f65232a5a7a7a0e17ac35f981e2ddc64/sentry/images/favicon.ico"
            }
          }
        }
      },
      "type": "applicationCard"
    }
  ],
  "type": "doc",
  "version": 1
}`;

  let strideMessage = JSON.parse(strideTemplate);
  let options = {
    method: "POST",
    uri: ROOM_URL,
    headers: {
      Authorization: `Bearer ${ROOM_TOKEN}`
    },
    body: strideMessage,
    json: true
  };
  rp(options)
    .then(b => {
      console.log("post successful");
    })
    .catch(err => {
      console.error(err);
    });
});

// listen for requests :)
let listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
