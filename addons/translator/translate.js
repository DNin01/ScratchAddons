export default class TranslateModule {
  quota = 50;

  /**
   * Requests a translation of the input from the Scratch translate service.
   * @param {string} text The input.
   * @param {string} lang The language to translate to.
   * @returns {string} A translation of the input to the specified language.
   */
  async fetchTranslation(text, lang) {
    if (this.quota <= 0) throw new Error("Quota reached");
    this.quota--;
    const res = await fetch(
      `https://translate-service.scratch.mit.edu/translate?language=${lang}&text=${encodeURIComponent(text)}`
    );
    const json = await res.json();
    return json.result;
  }

  /**
   * Takes a newline-separated list of strings and turns it into an array.
   * @param {string} string Serialized translation result to convert to an array.
   * @param {number} lines Number of items expected to be returned.
   * @returns {Array} An array consisting of each translation.
   */
  arrayify(string, lines) {
    const array = string.split("\n");
    if (array.length !== lines) {
      // What?! The number of lines changed! Something definitely went wrong.
      throw new Error("Translation error");
    }
    return array;
  }

  /**
   * Translates a bunch of strings.
   * @param {Array} strings The array of strings to be mass translated.
   * @param {string} lang The language to translate to.
   * @returns {Array} An array with each string translated to the target language.
   */
  async getTranslations(strings, lang) {
    let results = [];
    let index = 0;

    // Loop until all inputs have been translated.
    while (index < strings.length) {
      let buffer = "";
      // The API's character limit is 1024, but it can successfully return text that is over 1024 characters.
      // By adding the length of the next appendage to the buffer's current length, we can see if we're going over.
      // (Because each line break adds 1 character, we subtract that by 1.)
      while (index < strings.length && buffer.length + strings[index].length <= 1023) {
        if (buffer !== "") buffer += "\n"; // Separate each entry with a line break
        buffer += strings[index];
        index++;
      }

      // Once the buffer is full, request a translation.
      const result = await new Promise((resolve) => resolve(this.fetchTranslation(buffer, lang)));
      const array = this.arrayify(result, buffer.split("\n").length);
      console.log("Translations received:", array);
      results.push(...array);
    }

    return results;
  }
}
