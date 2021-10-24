class LocalStorageProvider {
  constructor () {
    this._localStorage = localStorage;
  }

  load (key) {
    const serializedResult = this._localStorage.getItem(key);

    if (serializedResult) {
      try {
        return JSON.parse(serializedResult);
      } catch (e) {
        // window.log.warning(`Can't parse value from localStorage by key "${key}. Return raw value". Error: ${e.message}`);
        return serializedResult;
      }
    }

    return null;
  }

  save (key, value) {
    this._localStorage.setItem(key, JSON.stringify(value));
  }

  remove (key) {
    this._localStorage.removeItem(key);
  }
}

export default LocalStorageProvider;
