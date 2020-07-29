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
    fontSize: 24,
    flexBasis: 150,
  }),

  name: RX.Styles.createTextStyle({
    fontWeight: "bold",
    fontSize: 96,
    color: "#333333",
  }),

  links: RX.Styles.createViewStyle({
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    flexGrow: 1,
    alignSelf: "stretch",
  }),

  link: RX.Styles.createLinkStyle({
    marginRight: 5,
    marginLeft: 5,
    color: "#0070E0",
    flexGrow: 1,
    backgroundColor: "#aaaaaa",
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  }),
};

const MACS = {
  "1": "40:8d:5c:df:0c:b1",
  "3": "b4:2e:99:e1:87:25",
  "4": "98:9e:63:2b:f9:84",
};

let client;

const rows = [
  {
    title: "Input",
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
    title: "Capture",
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
    title: "Monitor",
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
  {
    title: "Wake",
    buttons: ["1", "2", "3", "4"].map((x) => {
      return {
        text: x,
        command: {
          type: "WOL",
          mac: MACS[x],
        },
      };
    }),
  },
];

const newLines = `
`;

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
      {rows.map(({ title, buttons }) => (
        <RX.View style={_styles.links} key={title}>
          <RX.Text style={_styles.label}>{title}</RX.Text>
          {buttons.map(({ text, command }, i) => (
            <RX.Button
              style={_styles.link}
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
      ))}
      <RX.View style={_styles.links}>
        <RX.Text style={_styles.title}>{text}</RX.Text>
        <RX.Text style={_styles.title}>{newLines}</RX.Text>
      </RX.View>
    </RX.View>
  );
};
