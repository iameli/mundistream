/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect, useState } from "react";
import RX from "reactxp";
import WebSocketAsPromised from "websocket-as-promised";

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
    fontSize: 36,
    color: "#42B74F",
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

export const App = () => {
  const [text, setText] = useState("start?");
  useEffect(() => {
    (async () => {
      try {
        console.log("hi");
        const url = new URL("http://10.9.168.95:8080");
        url.protocol = "ws:";
        url.port = "8080";
        const wsp = new WebSocketAsPromised(url.toString(), {});
        wsp.onError.addListener((err) => console.log(err));
        setText("opening websocket");
        await wsp.open();
        setText("sending message");
        wsp.send("message");
        wsp.onMessage.addListener((foo) => {
          setText(`reply: ${JSON.stringify(foo)} ${Date.now()}`);
        });
        // await wsp.close();
      } catch (e) {
        setText(e.message);
      }

      // console.log(test);
    })().catch((e) => console.log(e));
  }, []);
  return (
    <RX.View style={_styles.main}>
      <RX.View>
        <RX.Text style={_styles.title}>{text}</RX.Text>
        <RX.Text style={_styles.label}>
          To get started, edit /src/App.tsx
        </RX.Text>
      </RX.View>

      <RX.View style={_styles.links}>
        <RX.Link
          url={"https://github.com/Microsoft/reactxp"}
          style={_styles.link}
        >
          GitHub
        </RX.Link>
        <RX.Link
          url={"https://microsoft.github.io/reactxp"}
          style={_styles.link}
        >
          Docs
        </RX.Link>
        <RX.Link
          url={"https://github.com/Microsoft/reactxp/tree/master/samples"}
          style={_styles.link}
        >
          Samples
        </RX.Link>
        <RX.Link
          url={"https://github.com/Microsoft/reactxp/tree/master/extensions"}
          style={_styles.link}
        >
          Extensions
        </RX.Link>
      </RX.View>
    </RX.View>
  );
};
