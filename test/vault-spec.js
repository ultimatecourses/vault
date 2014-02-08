/**
 * Vault.js
 */
describe('vault', function () {

  /**
   * set() method
   * adds properties to the
   * (local|session)Storage object
   */
  describe('set()', function () {

    beforeEach(function () {
      Vault.set('local', 'localTestStringProp', 'test');
      Vault.set('local', 'localTestObjectProp', { test: 'test' });
      Vault.set('session', 'sessionTestStringProp', 'test');
      Vault.set('session', 'sessionTestObjectProp', { test: 'test' });
    });

    it('should add a property to window.localStorage', function () {
      expect(window.localStorage.localTestStringProp).toBeDefined();
      expect(window.localStorage.localTestObjectProp).toBeDefined();
    });

    it('should add a property to window.sessionStorage', function () {
      expect(window.sessionStorage.sessionTestStringProp).toBeDefined();
      expect(window.sessionStorage.sessionTestObjectProp).toBeDefined();
    });

  });

  /**
   * get() method
   * retrieves set values (object|strings)
   */
  describe('get()', function () {

    it('should fetch the storage value String', function () {
      var localString = Vault.get('local', 'localTestStringProp');
      var sessionString = Vault.get('session', 'sessionTestStringProp');
      expect(localString).toBe('test');
      expect(sessionString).toBe('test');
    });

    it('should fetch the storage value Object by JSON.parse()', function () {
      var localObject = Vault.get('local', 'localTestObjectProp');
      var sessionObject = Vault.get('session', 'sessionTestObjectProp');
      expect(localObject.test).toBe('test');
      expect(sessionObject.test).toBe('test');
    });

  });

  /**
   * remove() method
   * removes storage properties
   */
  describe('remove()', function () {

    beforeEach(function () {
      Vault.remove('local', 'localTestStringProp');
      Vault.remove('local', 'localTestObjectProp');
      Vault.remove('session', 'sessionTestStringProp');
      Vault.remove('session', 'sessionTestObjectProp');
    });

    it('should remove storage properties', function () {
      expect(Vault.get('local', 'localTestStringProp')).not.toBeDefined();
      expect(Vault.get('local', 'localTestObjectProp')).not.toBeDefined();
      expect(Vault.get('session', 'localTestStringProp')).not.toBeDefined();
      expect(Vault.get('session', 'localTestObjectProp')).not.toBeDefined();
    });

  });

  /**
   * empty() method
   * empties the entire storage object
   */
  describe('empty()', function () {

    beforeEach(function () {
      Vault.set('local', 'localTestStringProp', 'test');
      Vault.set('local', 'localTestObjectProp', { test: 'test' });
      Vault.set('session', 'sessionTestStringProp', 'test');
      Vault.set('session', 'sessionTestObjectProp', { test: 'test' });

      Vault.empty('local');
      Vault.empty('session');
    });

    it('should clear the storage objects', function () {
      expect(window.localStorage).toEqual({});
      expect(window.sessionStorage).toEqual({});
    });

  });

});
