describe('vault', function () {

  /**
   * set() method
   * adds properties to the
   * localStorage object
   */
  describe('set()', function () {

    beforeEach(function () {
      vault.set('localTestStringProp', 'test');
      vault.set('localTestObjectProp', { test: 'test' });
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
      var localString = vault.get('localTestStringProp');
      expect(localString).toBe('test');
    });

    it('should fetch the storage value Object by JSON.parse()', function () {
      var localObject = vault.get('localTestObjectProp');
      expect(localObject.test).toBe('test');
    });

  });

  /**
   * remove() method
   * removes storage properties
   */
  describe('remove()', function () {

    beforeEach(function () {
      vault.remove('localTestStringProp');
      vault.remove('localTestObjectProp');
    });

    it('should remove storage properties', function () {
      expect(vault.get('localTestStringProp')).not.toBeDefined();
      expect(vault.get('localTestObjectProp')).not.toBeDefined();
    });

  });

  /**
   * empty() method
   * empties the entire storage object
   */
  describe('empty()', function () {

    beforeEach(function () {
      vault.set('localTestStringProp', 'test');
      vault.set('localTestObjectProp', { test: 'test' });

      vault.empty('local');
    });

    it('should clear the storage objects', function () {
      expect(window.localStorage.length).toEqual(0);
    });

  });

});
