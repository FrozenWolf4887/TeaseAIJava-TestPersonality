function test_getVar() {
    lockImages();

    logTest('Preparation');

    setVar('testBoolVar', true);
    setVar('testIntVar', 8);
    setVar('testFloatVar', 5.6);
    setVar('testStringVar', 'Puppy');

    logTest('getVar(String)');

    const noSuchVar = getVar('noSuchVar');
    verifyNull(noSuchVar);

    const boolVar = getVar('testBoolVar');
    verifyNotNull(boolVar);
    verifyType('boolean', boolVar);
    verifyEqual(true, boolVar);

    const intVar = getVar('testIntVar');
    verifyNotNull(intVar);
    verifyType('number', intVar);
    verifyEqual(8, intVar);

    const floatVar = getVar('testFloatVar');
    verifyNotNull(floatVar);
    verifyType('number', floatVar);
    verifyEqual(5.6, floatVar);

    const stringVar = getVar('testStringVar');
    verifyNotNull(stringVar);
    verifyType('string', stringVar);
    verifyEqual('Puppy', stringVar);

    logTest('getVar(String, Object)');

    const defaultBoolVar1 = getVar('noSuchVar', true);
    verifyNotNull(defaultBoolVar1);
    verifyType('boolean', defaultBoolVar1);
    verifyEqual(true, defaultBoolVar1);

    const defaultBoolVar2 = getVar('noSuchVar', false);
    verifyNotNull(defaultBoolVar2);
    verifyType('boolean', defaultBoolVar2);
    verifyEqual(false, defaultBoolVar2);

    const defaultIntVar = getVar('noSuchVar', 12);
    verifyNotNull(defaultIntVar);
    verifyType('number', defaultIntVar);
    verifyEqual(12, defaultIntVar);

    const defaultFloatVar = getVar('noSuchVar', 15.7);
    verifyNotNull(defaultFloatVar);
    verifyType('number', defaultFloatVar);
    verifyEqual(15.7, defaultFloatVar);

    const defaultStringVar = getVar('noSuchVar', 'test text');
    verifyNotNull(defaultStringVar);
    verifyType('string', defaultStringVar);
    verifyEqual('test text', defaultStringVar);

    logTest('getVar(String, null)');

    const defaultNullVar = getVar('noSuchVar', null);
    verifyNull(defaultNullVar);

    const boolVar2 = getVar('testBoolVar', null);
    verifyNotNull(boolVar2);
    verifyType('boolean', boolVar2);
    verifyEqual(true, boolVar2);

    const intVar2 = getVar('testIntVar', null);
    verifyNotNull(intVar2);
    verifyType('number', intVar2);
    verifyEqual(8, intVar2);

    const floatVar2 = getVar('testFloatVar', null);
    verifyNotNull(floatVar2);
    verifyType('number', floatVar2);
    verifyEqual(5.6, floatVar2);

    const stringVar2 = getVar('testStringVar', null);
    verifyNotNull(stringVar2);
    verifyType('string', stringVar2);
    verifyEqual('Puppy', stringVar2);

    logTest('Bad calls');

    const bad1 = getVar();
    verifyNull(bad1);
    const bad2 = getVar(null);
    verifyNull(bad2);
    const bad3 = getVar(null, null);
    verifyNull(bad3);
    const bad4 = getVar(null, 'text');
    verifyNull(bad4);

    unlockImages();
}

registerTestSuite('getVar', test_getVar);
