function convertToDecimal(value, base) {
    return parseInt(value, base);
  }
  function findConstantTerm(points) {
    let constant = 0;
  
    for (let i = 0; i < points.length; i++) {
      let [x_i, y_i] = points[i];
      let term = y_i;
  
      for (let j = 0; j < points.length; j++) {
        if (i !== j) {
          let [x_j] = points[j];
          term *= -x_j / (x_i - x_j);
        }
      }
  
      constant += term;
    }
  
    return Math.round(constant);
  }
  function recoverSecret(jsonData) {
    const { n, k } = jsonData.keys;
    let points = [];
  
    for (let key in jsonData) {
      if (key !== "keys") {
        let base = parseInt(jsonData[key].base);
        let value = jsonData[key].value;
  
        let y = convertToDecimal(value, base);
        let x = parseInt(key);
  
        points.push([x, y]);
      }
    }
    points.sort((a, b) => a[0] - b[0]);
    points = points.slice(0, k);
  
    return findConstantTerm(points);
  }
  
  const test1 = {
    "keys": { "n": 4, "k": 3 },
    "1": { "base": "10", "value": "4" },
    "2": { "base": "2", "value": "111" },
    "3": { "base": "10", "value": "12" },
    "6": { "base": "4", "value": "213" }
  };
  
  const test2 = {
    "keys": { "n": 10, "k": 7 },
    "1": { "base": "6", "value": "13444211440455345511" },
    "2": { "base": "15", "value": "aed7015a346d63" },
    "3": { "base": "15", "value": "6aeeb69631c227c" },
    "4": { "base": "16", "value": "e1b5e05623d881f" },
    "5": { "base": "8", "value": "316034514573652620673" },
    "6": { "base": "3", "value": "2122212201122002221120200210011020220200" },
    "7": { "base": "3", "value": "20120221122211000100210021102001201112121" },
    "8": { "base": "6", "value": "20220554335330240002224253" },
    "9": { "base": "12", "value": "45153788322a1255483" },
    "10": { "base": "7", "value": "1101613130313526312514143" }
  };
  
  const secret1 = recoverSecret(test1);
  const secret2 = recoverSecret(test2);
  
  console.log(`Secret for test case 1: ${secret1}`);
  console.log(`Secret for test case 2: ${secret2}`);
  