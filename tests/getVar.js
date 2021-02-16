function getListOfTests_getVar() {

    function test_getVar_preparation() {
        logTest('Preparation');

        setVar('testBoolVar', true);
        setVar('testIntVar', 8);
        setVar('testFloatVar', 5.6);
        setVar('testStringVar', 'Puppy');
    }

    function test_getVar_String() {
        logTest('getVar(String)');

        const noSuchVar = getVar('noSuchVar');
        verifyNull(noSuchVar);

        const boolVar = getVar('testBoolVar');
        assertNotNull(boolVar);
        verifyType('boolean', boolVar);
        verifyEqual(true, boolVar);

        const intVar = getVar('testIntVar');
        assertNotNull(intVar);
        verifyType('number', intVar);
        verifyEqual(8, intVar);

        const floatVar = getVar('testFloatVar');
        assertNotNull(floatVar);
        verifyType('number', floatVar);
        verifyEqual(5.6, floatVar);

        const stringVar = getVar('testStringVar');
        assertNotNull(stringVar);
        verifyType('string', stringVar);
        verifyEqual('Puppy', stringVar);
    }

    function test_getVar_String_Object() {
        logTest('getVar(String, Object)');

        const defaultBoolVar1 = getVar('noSuchVar', true);
        assertNotNull(defaultBoolVar1);
        verifyType('boolean', defaultBoolVar1);
        verifyEqual(true, defaultBoolVar1);

        const defaultBoolVar2 = getVar('noSuchVar', false);
        assertNotNull(defaultBoolVar2);
        verifyType('boolean', defaultBoolVar2);
        verifyEqual(false, defaultBoolVar2);

        const defaultIntVar = getVar('noSuchVar', 12);
        assertNotNull(defaultIntVar);
        verifyType('number', defaultIntVar);
        verifyEqual(12, defaultIntVar);

        const defaultFloatVar = getVar('noSuchVar', 15.7);
        assertNotNull(defaultFloatVar);
        verifyType('number', defaultFloatVar);
        verifyEqual(15.7, defaultFloatVar);

        const defaultStringVar = getVar('noSuchVar', 'test text');
        assertNotNull(defaultStringVar);
        verifyType('string', defaultStringVar);
        verifyEqual('test text', defaultStringVar);
    }

    function test_getVar_String_null() {
        logTest('getVar(String, null)');

        const defaultNullVar = getVar('noSuchVar', null);
        verifyNull(defaultNullVar);

        const boolVar = getVar('testBoolVar', null);
        assertNotNull(boolVar);
        verifyType('boolean', boolVar);
        verifyEqual(true, boolVar);

        const intVar = getVar('testIntVar', null);
        assertNotNull(intVar);
        verifyType('number', intVar);
        verifyEqual(8, intVar);

        const floatVar = getVar('testFloatVar', null);
        assertNotNull(floatVar);
        verifyType('number', floatVar);
        verifyEqual(5.6, floatVar);

        const stringVar = getVar('testStringVar', null);
        assertNotNull(stringVar);
        verifyType('string', stringVar);
        verifyEqual('Puppy', stringVar);
    }

    function test_getVar_badCalls() {
        logTest('getVar - Bad calls');

        const bad1 = getVar();
        verifyNull(bad1);
        const bad2 = getVar(null);
        verifyNull(bad2);
        const bad3 = getVar(null, null);
        verifyNull(bad3);
        const bad4 = getVar(null, 'text');
        verifyNull(bad4);
    }

    return [
        test_getVar_preparation,
        test_getVar_String,
        test_getVar_String_Object,
        test_getVar_String_null,
        test_getVar_badCalls
    ];
}

registerTestSuite('getVar', getListOfTests_getVar());
