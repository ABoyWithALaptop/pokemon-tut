import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'
import PokemonCollection from './components/PokemonCollection'
import {Pokemon, Detail} from './Interfaces'

interface Pokemons {
  name: string;
  url: string;
}


const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNext] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [detail, setDetail] = useState<Detail>({
    id: 0,
    isOpen: false
  })

  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20");

      setNext(res.data.next);
      
      res.data.results.forEach(async (pokemon:{name:string, url:string}) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        
        setPokemons((pokes) => [...pokes, poke.data])
        console.log(poke.data);
        
      })
      setLoading(false);
    }
    getPokemon()
  }, [])

  const nextPage = async () => {
    setLoading(true);
    let res = await axios.get(nextUrl)
    setNext(res.data.next)
    res.data.results.forEach(async (pokemon: Pokemons) => {
      const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
      setPokemons((pokes) => [...pokes, poke.data]);
    })
    setLoading(false);
  }
  
  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">pokemon</header>
        <PokemonCollection pokemons={pokemons} detail={detail} setDetail={setDetail} />
        <div className='btn'>
          <button onClick={nextPage}>{ loading?'loading':'load more'}</button>
        </div>
      </div>
    </div>
  );
}

export default App;
