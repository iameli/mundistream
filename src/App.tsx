/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect, useState } from "react";
import RX from "reactxp";
import WebSocketAsPromised from "websocket-as-promised";
import Client from "./client";

const _styles = {
  main: RX.Styles.createViewStyle({
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  }),

  title: RX.Styles.createTextStyle({
    fontWeight: "bold",
    fontSize: 36,
    textAlign: "center",
  }),

  label: RX.Styles.createTextStyle({
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
  }),

  name: RX.Styles.createTextStyle({
    fontWeight: "bold",
    fontSize: 96,
    color: "#333333",
    marginLeft: 100,
    marginRight: 100,
  }),

  links: RX.Styles.createViewStyle({
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  }),

  link: RX.Styles.createLinkStyle({
    marginRight: 5,
    marginLeft: 5,
    color: "#0070E0",
  }),
};

let client;

const rows = [
  {
    title: "Input Device",
    buttons: ["1", "2", "3", "4"].map((x) => {
      return {
        text: x,
        command: {
          command: `Input${x}`,
          type: "IRCommand",
          deviceId: "70361789",
        },
      };
    }),
  },
  {
    title: "Capture Device",
    buttons: ["1", "2", "3", "4"].map((x) => {
      return {
        text: x,
        command: {
          command: `InputA${x}`,
          type: "IRCommand",
          deviceId: "34350046",
        },
      };
    }),
  },
  {
    title: "Monitor Device",
    buttons: ["1", "2", "3", "4"].map((x) => {
      return {
        text: x,
        command: {
          command: `InputB${x}`,
          type: "IRCommand",
          deviceId: "34350046",
        },
      };
    }),
  },
];

export const App = () => {
  const [text, setText] = useState("start?");
  const [client, setClient] = useState(null);
  useEffect(() => {
    const client = new Client();
    setClient(client);
    client.on("log", (text) => setText(text));
    client.on("message", (msg) => setText(msg));

    // console.log(test);
  }, []);
  if (!client) {
    return (
      <RX.View>
        <RX.Text>Loading...</RX.Text>
      </RX.View>
    );
  }
  return (
    <RX.View style={_styles.main}>
      <RX.View>
        <RX.Text style={_styles.title}>{text}</RX.Text>
        <RX.Text style={_styles.label}>
          To get started, edit /src/App.tsx
        </RX.Text>
      </RX.View>

      {rows.map(({ title, buttons }) => (
        <RX.View key={title}>
          <RX.Text>{title}</RX.Text>
          <RX.View style={_styles.links}>
            {buttons.map(({ text, command }, i) => (
              <RX.Button
                onPress={() => {
                  if (!client) {
                    setText("not connected");
                    return;
                  }
                  client.send(command);
                }}
                key={i}
              >
                <RX.Text style={_styles.name}>{text}</RX.Text>
              </RX.Button>
            ))}
          </RX.View>
        </RX.View>
      ))}
    </RX.View>
  );
};
