export default class Event {
  constructor(app, options) {
    this.app = app;
  }

  update(adata={}) {
    let { app, update, get ,set, ...data } = adata;

    for(let [k,v] of Object.entries(data)) {
      this[k] = Object.assign(this[k]||{}, v);
    }

    this.app.event.emitMerge('onConfigUpdate', this);
  }

  set(path='', data) {
    let nextData = {...this};
    this.app.utils.pathSet(nextData, path, data);
    let { app, update, get ,set, ...nextDataOmit } = nextData;
    Object.assign(this, nextDataOmit);
    this.app.event.emitMerge('onConfigUpdate', this);
  }

  get(path='') {
    return this.app.utils.pathGet(this, path);
  }
}