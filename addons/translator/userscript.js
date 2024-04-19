import TranslateModule from "./translate.js";
const translator = new TranslateModule();

export default async function ({ addon, console }) {
  const items = [
    "apples",
    "bananas",
    "sleeping cats",
    "dinosaurs",
    "email",
    "cat food",
    "gorillas",
    "high scores",
    "images",
    "jewlery that cats just happen to love",
    "knocks on wood",
  ];
  console.log("Translating:", items);
  translator
    .getTranslations(items, "es")
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error("Failed to obtain translations", e);
    });
}
