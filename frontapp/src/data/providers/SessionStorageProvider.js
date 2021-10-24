class SessionStorageProvider {
  constructor() {
    this._sessionStorage = sessionStorage;
  }

  load(key) {
    const serializedResult = this._sessionStorage.getItem(key);
    
    if (serializedResult) {
      return JSON.parse(serializedResult);
    }

    return null;
  }

  save(key, value) {
    this._sessionStorage.setItem(key, JSON.stringify(value));
  }

  remove(key) {
    this._sessionStorage.removeItem(key);
  }
}

export default SessionStorageProvider;
