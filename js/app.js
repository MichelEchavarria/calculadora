let inputValueMemo = 0;
let operator;
let cuentaComas = 0;


const getContentClick = event => {
  const value  = event.target.innerHTML;
  filterAction(value);
}

const filterAction = (value) => {
  let valorNumber;
  value != ','?valorNumber = parseInt(value):cuentaComas++;

  console.log(cuentaComas)

  if(isNaN(valorNumber) && value == ',' && cuentaComas < 2) {
    addNumberInput(value)
  } else if(!isNaN(valorNumber) && valorNumber !=','){
    addNumberInput(parseInt(value));
  }

  switch (value) {
    case "+" :
        setOperation('+');
        cuentaComas = 0;
        break;

    case "-" :
        setOperation('-');
        cuentaComas = 0;
        break;    

    case "x" :
        setOperation('*');
        cuentaComas = 0;
        break;

    case "/" :
        setOperation('/');
        cuentaComas = 0;
        break;

    case "%" :
        setOperation('%');
        cuentaComas = 0;
        break;

    case "+/-" :
        setOperation('+/-');
        cuentaComas = 0;
        break;

    case "=" :
        calculation();
        cuentaComas = 0;
        break;

    case "AC" :
        inputValueMemo = 0;
        document.querySelector('.calculator__screen').value = "0";
        cuentaComas = 0;
        break;
  }
}

const addNumberInput = (value) => {
  
  const inputScreen = document.querySelector('.calculator__screen');
  const inputValue = inputScreen.value;
  
  if(inputValue === "0" && inputValue.length === 1 && value != ',') {
    inputScreen.value = value;
    return;
  }
  if(value === ","){
    console.log("te agarre coma")
    value = 0 + ',';
  }
  inputScreen.value = inputValue + value;
}


const setOperation = (op) => {

  const inputScreenValue = document.querySelector('.calculator__screen').value;

  operator = op;

  if(inputScreenValue !=0) {

    calculation();
  }
}

const calculation = () => {
    let total = 0;
    const inputScreen = document.querySelector('.calculator__screen');
    let valueOne = transformCommaToPoint(inputValueMemo);
    let valueTwo = transformCommaToPoint(inputScreen.value);
    

    if(operator === '+' && inputScreen.value !== "") {
      total = valueOne + valueTwo;
    }
    if(operator === '-' && inputScreen.value !=="") {
      if(valueOne !== 0) {
        total = valueOne - valueTwo;
      } else {
        total = valueTwo;
      }
    }
    if(operator === '*' && inputScreen.value !=="") {
      if(valueOne !== 0) {
        total = valueOne * valueTwo;
      } else {
        total = valueTwo;
      }
    }
    if(operator === '/' && inputScreen.value !=="") {
      if(valueOne !== 0) {
        total = valueOne / valueTwo;
      } else {
        total = valueTwo;
      }
    }
    if(operator === '%' && inputScreen.value !=="") {
        total =  valueTwo / 100;
    }
    if(operator === '+/-' && inputScreen.value !=="") {
      if(valueTwo > 0) {
        total = -valueTwo;
      }
    }

    total = transformPointToComma(total);
    inputValueMemo = total;
    inputScreen.value = "";
    inputScreen.placeholder = total;
  }
  
  const resetCalculator = () => {
    const inputScreen = document.querySelector('.calculator__screen');
    inputScreen.value = 0;
    inputValueMemo = 0;
    operator = null;
  }

  const transformCommaToPoint = (value) => {
    if(typeof value !== "number") {
      let resultTransform = value.replace(',','.');
      return parseFloat(resultTransform);
    }

    return value;
  }
  
  const transformPointToComma = value => {
    let resultTransform = value.toString();
    resultTransform = resultTransform.replace('.', ',');
    return resultTransform;
  }