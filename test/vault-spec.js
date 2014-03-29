/**
 * Vault.js
 */
describe('vault', function () {

  /**
   * set() method
   * adds properties to the
   * localStorage object
   */
  describe('set()', function () {

    beforeEach(function () {
      Vault.set('localTestStringProp', 'test');
      Vault.set('localTestObjectProp', { test: 'test' });
    });

    it('should add a property to window.localStorage', function () {
      expect(window.localStorage.localTestStringProp).toBeDefined();
      expect(window.localStorage.localTestObjectProp).toBeDefined();
    });

  });

  /**
   * get() method
   * retrieves set values (object|strings)
   */
  describe('get()', function () {

    it('should fetch the storage value String', function () {
      var localString = Vault.get('localTestStringProp');
      expect(localString).toBe('test');
    });

    it('should fetch the storage value Object by JSON.parse()', function () {
      var localObject = Vault.get('localTestObjectProp');
      expect(localObject.test).toBe('test');
    });

  });

  /**
   * remove() method
   * removes storage properties
   */
  describe('remove()', function () {

    beforeEach(function () {
      Vault.remove('localTestStringProp');
      Vault.remove('localTestObjectProp');
    });

    it('should remove storage properties', function () {
      expect(Vault.get('localTestStringProp')).not.toBeDefined();
      expect(Vault.get('localTestObjectProp')).not.toBeDefined();
    });

  });

  /**
   * empty() method
   * empties the entire storage object
   */
  describe('empty()', function () {

    beforeEach(function () {
      Vault.set('localTestStringProp', 'test');
      Vault.set('localTestObjectProp', { test: 'test' });

      Vault.empty('local');
    });

    it('should clear the storage objects', function () {
      expect(window.localStorage).toEqual({});
    });

  });

});
