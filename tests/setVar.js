function test_setVar() {
    lockImages();

    const uniqueId = setDate().getTimeInMillis();
    const testBoolVarName = 'testBoolVar' + uniqueId
    const testIntVarName = 'testIntVar' + uniqueId
    const testFloatVarName = 'testFloatVar' + uniqueId
    const testStringVarName = 'testStringVar' + uniqueId

    logTest('setVar new variable');

    const vBoolCreated = setVar(testBoolVarName, true);
    verifyNotNull(vBoolCreated);
    verifyType('boolean', vBoolCreated);
    verifyEqual(true, vBoolCreated);

    const vIntCreated = setVar(testIntVarName, 5);
    verifyNotNull(vIntCreated);
    verifyType('number', vIntCreated);
    verifyEqual(5, vIntCreated);

    const vFloatCreated = setVar(testFloatVarName, 6.5);
    verifyNotNull(vFloatCreated);
    verifyType('number', vFloatCreated);
    verifyEqual(6.5, vFloatCreated);

    const vStringCreated = setVar(testStringVarName, 'Hello');
    verifyNotNull(vStringCreated);
    verifyType('string', vStringCreated);
    verifyEqual('Hello', vStringCreated);

    logTest('getVar of set variable');

    const vBoolRetrieved = getVar(testBoolVarName);
    verifyNotNull(vBoolRetrieved);
    verifyType('boolean', vBoolRetrieved);
    verifyEqual(true, vBoolRetrieved);

    const vIntRetrieved = getVar(testIntVarName);
    verifyNotNull(vIntRetrieved);
    verifyType('number', vIntRetrieved);
    verifyEqual(5, vIntRetrieved);

    const vFloatRetrieved = getVar(testFloatVarName);
    verifyNotNull(vFloatRetrieved);
    verifyType('number', vFloatRetrieved);
    verifyEqual(6.5, vFloatRetrieved);

    const vStringRetrieved = getVar(testStringVarName);
    verifyNotNull(vStringRetrieved);
    verifyType('string', vStringRetrieved);
    verifyEqual('Hello', vStringRetrieved);

    logTest('setVar replace existing variable with same type');

    const vBoolReplaced = setVar(testBoolVarName, false);
    verifyNotNull(vBoolReplaced);
    verifyType('boolean', vBoolReplaced);
    verifyEqual(false, vBoolReplaced);

    const vIntReplaced = setVar(testIntVarName, 7);
    verifyNotNull(vIntReplaced);
    verifyType('number', vIntReplaced);
    verifyEqual(7, vIntReplaced);

    const vFloatReplaced = setVar(testFloatVarName, 8.5);
    verifyNotNull(vFloatReplaced);
    verifyType('number', vFloatReplaced);
    verifyEqual(8.5, vFloatReplaced);

    const vStringReplaced = setVar(testStringVarName, 'World');
    verifyNotNull(vStringReplaced);
    verifyType('string', vStringReplaced);
    verifyEqual('World', vStringReplaced);

    logTest('getVar of updated variable');

    const vBoolUpdated = getVar(testBoolVarName);
    verifyNotNull(vBoolUpdated);
    verifyType('boolean', vBoolUpdated);
    verifyEqual(false, vBoolUpdated);

    const vIntUpdated = getVar(testIntVarName);
    verifyNotNull(vIntUpdated);
    verifyType('number', vIntUpdated);
    verifyEqual(7, vIntUpdated);

    const vFloatUpdated = getVar(testFloatVarName);
    verifyNotNull(vFloatUpdated);
    verifyType('number', vFloatUpdated);
    verifyEqual(8.5, vFloatUpdated);

    const vStringUpdated = getVar(testStringVarName);
    verifyNotNull(vStringUpdated);
    verifyType('string', vStringUpdated);
    verifyEqual('World', vStringUpdated);

    logTest('setVar replace existing variable with different type');

    const vIntReplacedWithBool = setVar(testIntVarName, true);
    verifyNotNull(vIntReplacedWithBool);
    verifyType('boolean', vIntReplacedWithBool);
    verifyEqual(true, vIntReplacedWithBool);

    const vBoolReplacedWithInt = setVar(testBoolVarName, 11);
    verifyNotNull(vBoolReplacedWithInt);
    verifyType('number', vBoolReplacedWithInt);
    verifyEqual(11, vBoolReplacedWithInt);

    const vStringReplacedWithFloat = setVar(testStringVarName, 12.5);
    verifyNotNull(vStringReplacedWithFloat);
    verifyType('number', vStringReplacedWithFloat);
    verifyEqual(12.5, vStringReplacedWithFloat);

    const vFloatReplacedWithString = setVar(testFloatVarName, 'Banana');
    verifyNotNull(vFloatReplacedWithString);
    verifyType('string', vFloatReplacedWithString);
    verifyEqual('Banana', vFloatReplacedWithString);

    logTest('getVar of new variable type');

    const vBoolNewType = getVar(testIntVarName);
    verifyNotNull(vBoolNewType);
    verifyType('boolean', vBoolNewType);
    verifyEqual(true, vBoolNewType);

    const vIntNewType = getVar(testBoolVarName);
    verifyNotNull(vIntNewType);
    verifyType('number', vIntNewType);
    verifyEqual(11, vIntNewType);

    const vFloatNewType = getVar(testStringVarName);
    verifyNotNull(vFloatNewType);
    verifyType('number', vFloatNewType);
    verifyEqual(12.5, vFloatNewType);

    const vStringNewType = getVar(testFloatVarName);
    verifyNotNull(vStringNewType);
    verifyType('string', vStringNewType);
    verifyEqual('Banana', vStringNewType);

    logTest('Bad calls');

    const bad1 = setVar();
    verifyNull(bad1);
    const bad2 = setVar(null);
    verifyNull(bad2);
    const bad3 = setVar('someVar', 0, 1);
    verifyNull(bad3);

    unlockImages();
}
