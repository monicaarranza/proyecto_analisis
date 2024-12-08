import React, { useState } from "react";
import "./index.css";

// Algoritmo exacto
const findSubsetsRecursive = (array, sum) => {
  const result = new Set(); 
  const backtrack = (currentSubset, index, currentSum) => {
    if (currentSum === sum) {
      result.add(JSON.stringify([...currentSubset].sort())); 
      return;
    }
    if (currentSum > sum || index >= array.length) {
      return;
    }

   
    currentSubset.push(array[index]);
    backtrack(currentSubset, index + 1, currentSum + array[index]);

    
    currentSubset.pop();
    backtrack(currentSubset, index + 1, currentSum);
  };

  backtrack([], 0, 0);
  return Array.from(result).map((subset) => JSON.parse(subset)); 
};


const findSubsetsOptimized = (array, sum) => {
  const dp = Array.from({ length: array.length + 1 }, () =>
    Array(sum + 1).fill(false)
  );
  dp[0][0] = true;

  for (let i = 1; i <= array.length; i++) {
    for (let j = 0; j <= sum; j++) {
      if (dp[i - 1][j] || (j >= array[i - 1] && dp[i - 1][j - array[i - 1]])) {
        dp[i][j] = true;
      }
    }
  }

  const result = new Set();
  const backtrack = (i, j, currentSubset) => {
    if (i === 0 || j === 0) {
      result.add(JSON.stringify([...currentSubset].sort()));
      return;
    }
    if (dp[i - 1][j]) {
      backtrack(i - 1, j, currentSubset);
    }
    if (j >= array[i - 1] && dp[i - 1][j - array[i - 1]]) {
      currentSubset.push(array[i - 1]);
      backtrack(i - 1, j - array[i - 1], currentSubset);
      currentSubset.pop();
    }
  };

  if (dp[array.length][sum]) {
    backtrack(array.length, sum, []);
  }

  return Array.from(result).map((subset) => JSON.parse(subset));
};




const App = () => {
  const [array, setArray] = useState([]);
  const [sum, setSum] = useState(0);
  const [recursiveResult, setRecursiveResult] = useState([]);
  const [optimizedResult, setOptimizedResult] = useState([]);
  const [recursiveTime, setRecursiveTime] = useState(0);
  const [optimizedTime, setOptimizedTime] = useState(0);

  // Generar un arreglo aleatorio
  const generateArray = (n) => {
    const randomArray = Array.from({ length: n }, () =>
      Math.floor(Math.random() * 100) + 1
    );
    setArray(randomArray);
    setRecursiveResult([]);
    setOptimizedResult([]);
    setRecursiveTime(0);
    setOptimizedTime(0);
  };

  // Calcular los subconjuntos que suman el objetivo
  const handleCalculate = () => {
    const startRecursive = performance.now();
    const recursiveSubsets = findSubsetsRecursive(array, sum);
    const endRecursive = performance.now();

    const startOptimized = performance.now();
    const optimizedSubsets = findSubsetsOptimized(array, sum);
    const endOptimized = performance.now();

    setRecursiveResult(recursiveSubsets);
    setRecursiveTime((endRecursive - startRecursive).toFixed(3));
    setOptimizedResult(optimizedSubsets);
    setOptimizedTime((endOptimized - startOptimized).toFixed(3));
  };

  return (
    <div className="container">
      <h1>Subset Sum Visualizer</h1>
      <p>Ingresa el tamaño del arreglo y la suma objetivo:</p>

      <div className="controls">
        <input
          type="number"
          placeholder="Tamaño del arreglo"
          onChange={(e) => generateArray(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Suma objetivo"
          value={sum}
          onChange={(e) => setSum(Number(e.target.value))}
        />
        <button onClick={handleCalculate}>Calcular</button>
      </div>

      <div className="results">
        <h2>Resultados</h2>
        <div>
          <p>
            <strong>Resultado Algoritmo Exacto:</strong>{" "}
            {recursiveResult.length > 0 ? "Sí" : "No"}
          </p>
          <p>
            <strong>Tiempo Algoritmo Exacto:</strong> {recursiveTime} ms
          </p>
          <p>
            <strong>Resultado Algoritmo Aproximado:</strong>{" "}
            {optimizedResult.length > 0 ? "Sí" : "No"}
          </p>
          <p>
            <strong>Tiempo Algoritmo Aproximado:</strong> {optimizedTime} ms
          </p>
        </div>

        <h3>Tabla de Subconjuntos</h3>
        <div className="grid">
          {array.map((value, i) => (
            <div key={i} className="cell">{value}</div>
          ))}
        </div>
        {recursiveResult.length > 0 && (
          <div>
            <h3>Subconjuntos que suman el objetivo</h3>
            {recursiveResult.map((subset, index) => (
              <div key={index} className="subset-container">
                <div className="subset-title">Subconjunto {index + 1}:</div>
                <div className="grid">
                  {subset.map((value, i) => (
                    <div key={i} className="cell highlight">
                      {value}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
