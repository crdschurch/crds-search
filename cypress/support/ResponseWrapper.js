export class ResponseWrapper {
  constructor () {
    this._response_ready = false;
  }

  get responseReady() {
    return this._response_ready;
  }

  set responseBody(response) {
    this._response_body = response;
    this._response_ready = true;
  }

  get responseBody() {
    return this._response_body;
  }
}
