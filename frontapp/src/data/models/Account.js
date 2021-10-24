import moment from 'moment';


// const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

class Account {
  // eslint-disable-next-line max-statements
  static deserialize (obj) {
    const res = new Account();

    res._id = obj.applicationUserId;
    res._name = obj.applicationUserName;
    res._fullName = obj.fullName;
    res._avatar = obj.avatar;
    res._languageCode = obj.languageCode;

    res._companyId = obj.companyId;
    res._companyName = obj.companyName;
    res._corporationId = obj.corporationId;
    res._role = 'Manager';
    /*
     * Note:
     * https://stackoverflow.com/questions/44677784/custom-claim-with-boolean-type
     * На бэке в Payload часть через Claim's можно класть только string типы. Поэтому любой отличный от него тип
     * будет приводиться к string, причем в коде на C# - явно.
     */
    res._isExtended = String(obj.isExtended).toLowerCase() === 'true';

    res._sub = obj.sub;
    res._aud = obj.aud;
    res._iss = obj.iss;
    res._jti = obj.jti;
    res._exp = obj.exp;

    return res;
  }

  static serialize (obj) {
    return {
      applicationUserId: obj._id,
      applicationUserName: obj._name,
      fullName: obj._fullName,
      avatar: obj._avatar,
      languageCode: obj._languageCode,
      companyId: obj._companyId,
      companyName: obj._companyName,
      corporationId: obj._corporationId,
      role: obj._role,
      isExtended: obj.isExtended,
      sub: obj._sub,
      aud: obj._aud,
      iss: obj._iss,
      jti: obj._jti,
      exp: obj._exp
    };
  }

  constructor () {
    this._id = null;
    this._name = '';
    this._fullName = '';
    this._avatar = null;
    this._languageCode = '1';

    this._companyId = null;
    this._companyName = '';
    this._corporationId = null;
    this._role = null;
    this._isExtended = false;

    this._sub = null;
    this._aud = null;
    this._iss = null;
    this._jti = null;
    this._exp = 0;

    this._token = null;
  }

  serialize () {
    return Account.serialize(this);
  }

  get avatar () {
    return this._avatar;
  }

  get id () {
    return this._id;
  }

  get name () {
    return this._name;
  }

  get fullName () {
    return this._fullName;
  }

  get companyId () {
    return this._companyId;
  }

  get companyName () {
    return this._companyName;
  }

  get corporationId () {
    return this._corporationId;
  }

  get role () {
    return this._role;
  }

  get isExtended () {
    return this._isExtended;
  }

  get sub () {
    return this._sub;
  }

  get token () {
    return this._token;
  }

  set token (value) {
    this._token = value;
  }

  isActual () {
    // Token is inactual if expiration time less then 1 minute

    // eslint-disable-next-line no-magic-numbers
    const expDate = moment(this._exp * 1000).subtract(1, 'minutes');
    const currentDate = moment(Date.now());

    return expDate.isAfter(currentDate);
  }
}

export default Account;
