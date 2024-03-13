import { Dispatcher } from "./state";

export default async function (message: string, time: number) {
  const url = `https://iame.li/#${time}`;
  const content = `@everyone 🔴 LIVE ${message} ${url}`;
  const hook = {
    username: "iame.li robot",
    avatar_url:
      "https://cdn.discordapp.com/attachments/1095419600298053644/1217278790795788449/image.png?ex=66037237&is=65f0fd37&hm=2d84605d30e2c350c5342d223bb8cbf0db4ff0eff2c788b275de22e0ea3612d4&",
    content: content,
    embeds: [
      {
        // author: {
        //   name: "Birdie♫",
        //   url: "https://www.reddit.com/r/cats/",
        //   icon_url: "https://i.imgur.com/R66g1Pe.jpg",
        // },
        title: "iameli livestreams",
        url: url,
        // description:
        //   "Text message. You can use Markdown here. *Italic* **bold** __underline__ ~~strikeout~~ [hyperlink](https://google.com) `code`",
        // color: 15258703,
        // fields: [
        //   {
        //     name: "Text",
        //     value: "More text",
        //     inline: true,
        //   },
        //   {
        //     name: "Even more text",
        //     value: "Yup",
        //     inline: true,
        //   },
        //   {
        //     name: 'Use `"inline": true` parameter, if you want to display fields in the same line.',
        //     value: "okay...",
        //   },
        //   {
        //     name: "Thanks!",
        //     value: "You're welcome :wink:",
        //   },
        // ],
        thumbnail: {
          url: "https://upload.wikimedia.org/wikipedia/commons/3/38/4-Nature-Wallpapers-2014-1_ukaavUI.jpg",
        },
        image: {
          url: "https://cdn.discordapp.com/attachments/1095419600298053644/1217272033398751372/image.png?ex=66036bec&is=65f0f6ec&hm=5a44146261ac189268ca0caa150661bdf9bfb24a7865af12cf884d520fd2ea7b&",
        },
        // footer: {
        //   text: "Woah! So cool! :smirk:",
        //   icon_url: "https://i.imgur.com/fKL31aD.jpg",
        // },
      },
    ],
  };
  const res = await fetch(process.env.MUNDISTREAM_DISCORD_WEBHOOK, {
    method: "POST",
    body: JSON.stringify(hook),
    headers: {
      "content-type": "application/json",
    },
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`res not ok: ${res.status} ${text}`);
  }
  console.log(text);
  return text;
}
