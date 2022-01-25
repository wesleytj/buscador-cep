import { useState } from "react";
import { FiSearch } from "react-icons/fi";

import "./style.css";

import api from './services/api';

function App() {

const [input, setInput] = useState('');
const [cep, setCep] = useState('');

async function handleSearch(){
  if(input === ''){
    alert("Preencha algum CEP");
    return;
  }

  try{
    const response = await api.get(`${input}/json`);
    setCep(response.data);
    setInput("");
  }catch{
    alert("Ops! Erro ao buscar CEP");
    setInput("");
  }
}

  return (
    <div className="container">
      <h1 className="title">Buscar CEP</h1>

      <div className="container-input">
        <input tyoe="text" placeholder="Digite seu cep..." 
        value={ input }
        onChange={(e) => setInput(e.target.value)} />
        
        <button className="button-search" onClick={handleSearch}>
          <FiSearch size={25} color="#fff"/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: { cep.cep }</h2>

          <span>Rua: { cep.logradouro }</span>
          <span>Complemento: { cep.complemento }</span>
          <span>Bairro: { cep.bairro }</span>
          <span>Cidade/UF: { cep.localidade } - { cep.uf }</span>
        </main>
      )}

    </div>
  );
}

export default App;
