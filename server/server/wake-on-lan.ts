import { wake } from "wake_on_lan";

export default function wakeOnLan({ mac }: { mac: string }): Promise<void> {
  return new Promise((resolve, reject) => {
    wake(mac, function (error) {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
}
