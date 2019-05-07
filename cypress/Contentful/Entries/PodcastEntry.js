export class PodcastEntry {
  constructor(entryObject) {
    const fields = entryObject.fields;
    this._title = new PlainTextField(fields.title, true);
    this._slug = new PlainTextField(fields.slug, true);
  }

  get title() {
    return this._title;
  }

  get slug() {
    return this._slug;
  }
}