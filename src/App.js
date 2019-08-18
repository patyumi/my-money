import React, { useEffect, useReducer } from 'react';
import axios from 'axios';

const url = 'https://mymoney-curso-devpleno.firebaseio.com/movimentacoes/2019-08.json';

// Função pura (mais fácil de testar)
const reducer = (state, action) => {
  if (action.type === 'REQUEST') {
    return {
      ...state,
      loading: true,
    };
  }
  if (action.type === 'SUCCESS') {
    return {
      ...state,
      loading: false,
      data: action.data,
    };
  }

  return state;
};

function App() {
  // HOOKS: useReduer
  const [data, dispatch] = useReducer(reducer, {
    loading: true,
    data: {},
  });

  // HOOKS: useEffect
  useEffect(() => {
    dispatch({ type: 'REQUEST' });
    axios
      .get(url)
      .then((res) => {
        dispatch({ type: 'SUCCESS', data: res.data });
      });
  }, []);

  // Elementos
  return (
    <div>
      <h1>Olá</h1>
      { JSON.stringify(data) }
      { data.loading && <p>loading...</p> }
    </div>
  );
}

export default App;
