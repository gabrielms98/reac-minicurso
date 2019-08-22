import React, { useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

import { FaGithubAlt } from "react-icons/fa";
import "./styles.css";

export default function Main() {
  const [value, setValue] = useState();
  const [repositories, setRepositories] = useState([
    { name: "facebook/react", login: "facebook" }
  ]);

  async function handleSubmit(e) {
    e.preventDefault();

    const { data } = await api.get(value);

    const {
      name,
      owner: { login }
    } = data;

    setValue("");
    setRepositories([...repositories, { name, login }]);
  }

  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <div id="container">
      <h1>
        <FaGithubAlt />
        Repositórios
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicionar repositorio"
          value={value}
          onChange={handleChange}
        />
        <button>+</button>
      </form>

      <div id="repositories">
        <ul>
          {repositories.map(repository => (
            <li key={repository.name}>
              <p>{repository.name}</p>
              <Link to={`repository/${repository.name}`}>Detalhes</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
