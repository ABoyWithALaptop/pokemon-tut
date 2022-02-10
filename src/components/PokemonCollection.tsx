import React from 'react';
import { Pokemon, Detail, PokemonDetail } from './../Interfaces'
import PokemonList from './PokemonList'

interface Props {
  pokemons: PokemonDetail[],
  detail: Detail,
  setDetail: React.Dispatch<React.SetStateAction<Detail>>
}

const PokemonCollection:React.FC<Props> = (props) => {
  const { pokemons, detail, setDetail } = props;
  const selectPoke= (id:number)=>{
    console.log(id);
    if(!detail?.isOpen) {
      setDetail({
      id: id,
      isOpen: true
      })
    }
    
    
  }
  return (
    <>
      <section className={detail.isOpen ? 'collection-container-active' : 'collection-container'}>
        {detail.isOpen ? (
          <div className='overlay'></div>
        ) :
          (
            <div>
              
            </div>
          )
        }
        {pokemons.map((pokemon) => {
          return (
            <div className="" key={pokemon.id} onClick={()=> selectPoke(pokemon.id)}>
              <PokemonList
                key={pokemon.id}
                name={pokemon.name}
                id={pokemon.id}
                abilities={pokemon.abilities}
                detail={detail}
                setDetail={setDetail}
                image={pokemon.sprites.front_default}
              />
            </div>
          )
        })}
      </section>
    </>
  );
};

export default PokemonCollection;
