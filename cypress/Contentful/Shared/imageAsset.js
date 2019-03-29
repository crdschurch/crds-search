//TODO update CCT with this
export class ImageAsset {
  constructor (imageObject, isPublished = true) {
    this._image_object = imageObject;
    this._is_published = isPublished;
  }

  //If an image is retrieved through a link it may not be published
  get isPublished() {
    return this._is_published;
  }

  get id() {
    return this._image_object !== undefined ? this._image_object.sys.id : undefined;
  }
}