{
    const listOfTestFunctions = [
    () => {
        Test.logName('Preparation');

        setVar('testBoolVar', true);
        setVar('testIntVar', 8);
        setVar('testFloatVar', 5.6);
        setVar('testStringVar', 'Puppy');
    },
    () => {
        Test.logName('getVar(String)');

        const noSuchVar = getVar('noSuchVar');
        Test.verifyNull(noSuchVar);

        const boolVar = getVar('testBoolVar');
        Test.assertNotNull(boolVar);
        Test.verifyType('boolean', boolVar);
        Test.verifyEqual(true, boolVar);

        const intVar = getVar('testIntVar');
        Test.assertNotNull(intVar);
        Test.verifyType('number', intVar);
        Test.verifyEqual(8, intVar);

        const floatVar = getVar('testFloatVar');
        Test.assertNotNull(floatVar);
        Test.verifyType('number', floatVar);
        Test.verifyEqual(5.6, floatVar);

        const stringVar = getVar('testStringVar');
        Test.assertNotNull(stringVar);
        Test.verifyType('string', stringVar);
        Test.verifyEqual('Puppy', stringVar);
    },
    () => {
        Test.logName('getVar(String, Object)');

        const defaultBoolVar1 = getVar('noSuchVar', true);
        Test.assertNotNull(defaultBoolVar1);
        Test.verifyType('boolean', defaultBoolVar1);
        Test.verifyEqual(true, defaultBoolVar1);

        const defaultBoolVar2 = getVar('noSuchVar', false);
        Test.assertNotNull(defaultBoolVar2);
        Test.verifyType('boolean', defaultBoolVar2);
        Test.verifyEqual(false, defaultBoolVar2);

        const defaultIntVar = getVar('noSuchVar', 12);
        Test.assertNotNull(defaultIntVar);
        Test.verifyType('number', defaultIntVar);
        Test.verifyEqual(12, defaultIntVar);

        const defaultFloatVar = getVar('noSuchVar', 15.7);
        Test.assertNotNull(defaultFloatVar);
        Test.verifyType('number', defaultFloatVar);
        Test.verifyEqual(15.7, defaultFloatVar);

        const defaultStringVar = getVar('noSuchVar', 'test text');
        Test.assertNotNull(defaultStringVar);
        Test.verifyType('string', defaultStringVar);
        Test.verifyEqual('test text', defaultStringVar);
    },
    () => {
        Test.logName('getVar(String, null)');

        const defaultNullVar = getVar('noSuchVar', null);
        Test.verifyNull(defaultNullVar);

        const boolVar = getVar('testBoolVar', null);
        Test.assertNotNull(boolVar);
        Test.verifyType('boolean', boolVar);
        Test.verifyEqual(true, boolVar);

        const intVar = getVar('testIntVar', null);
        Test.assertNotNull(intVar);
        Test.verifyType('number', intVar);
        Test.verifyEqual(8, intVar);

        const floatVar = getVar('testFloatVar', null);
        Test.assertNotNull(floatVar);
        Test.verifyType('number', floatVar);
        Test.verifyEqual(5.6, floatVar);

        const stringVar = getVar('testStringVar', null);
        Test.assertNotNull(stringVar);
        Test.verifyType('string', stringVar);
        Test.verifyEqual('Puppy', stringVar);
    },
    () => {
        Test.logName('getVar - Bad calls');

        const bad1 = getVar();
        Test.verifyNull(bad1);
        const bad2 = getVar(null);
        Test.verifyNull(bad2);
        const bad3 = getVar(null, null);
        Test.verifyNull(bad3);
        const bad4 = getVar(null, 'text');
        Test.verifyNull(bad4);
    }];

    TestRegister.addTestSuite('getVar', listOfTestFunctions);
}
