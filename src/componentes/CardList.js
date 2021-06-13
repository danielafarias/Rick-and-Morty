import React from 'react';
import Card from './Card';
import SearchBox from './SearchBox';

class CardList extends React.Component {
    constructor(props) {
        super(props);
        // Criação de um estado inicial de uma lista de personagens vazia
        this.state = {
            isLoaded: false,
            characters: [],
            loadedCharacters: [],
            page: 1
        };
    }
    
    charactersCardsCreate() {
        // Inserção das informações nos cards usando map para criar por index/key
        return this.state.characters.map((character) => {
            return <Card character={character} key={character.id}/>
        })
    }

    searchCharacter(evento) {
        const page = 1;
        this.search = evento.target.value.toLowerCase();
        fetch(`https://rickandmortyapi.com/api/character/?page=${page}&name=${this.search}`)
        .then(filtrados => filtrados.json())
        .then(filtradosJson => {
            if (evento.key === 'Enter') {
            this.setState({
                page: page,
                characters: filtradosJson.results
            })}
        })
    }

    loadMore() {
        const page = this.state.page;
        const novaPagina = page + 1;
        const characters = this.state.characters
        if (!this.search) {
            fetch(`https://rickandmortyapi.com/api/character/?page=${novaPagina}`)
            .then(pagina => pagina.json())
            .then(paginaJson => {
                this.setState({
                    page: novaPagina,
                    characters: characters.concat(paginaJson.results)
                })
        })
        } else {
        fetch(`https://rickandmortyapi.com/api/character/?page=${novaPagina}&name=${this.search}`)
        .then(pagina => pagina.json())
        .then(paginaJson => {
                this.setState({
                    page: novaPagina,
                    characters: characters.concat(paginaJson.results)
                })
        })}
    }

    

    render() {
       const isLoaded = this.state.isLoaded;
        
       if(!isLoaded) {
        return (
            <section className='card-list'>
                Loading...
            </section>
        )
    } else {
        return (
            <section className='card-list'>

                <div className='card-list__list-header'>

                    <a href='https://github.com/danielafarias/rick-and-morty'>
                        <div className='card-list__list-header__doc-bar'>
                            <img src='https://static.platzi.com/media/achievements/badge-git-github-pt-0c2eb2bc-b0dd-4cac-be85-5ab06ccf548d.png' alt='github' className='card-list__list-header__doc-bar__github'/>
                            <p>GitHub for more</p>
                        </div>
                    </a>
                    <img src='https://cdn140.picsart.com/271010551004211.png?type=webp&to=min&r=640' alt='logo' className='logo'/>
                    <img src='https://cdn6.aptoide.com/imgs/1/6/9/169d6adfd60f44a64bcfe0764a80d0c4_icon.png' alt='rick-logo' className='card-list__list-header__rick-logo'/>
                    <SearchBox placeholder='Press Enter to search...' onChange={(evento) => this.searchCharacter(evento)} onKeyDown={(evento) => this.searchCharacter(evento)}/>
                </div>
                
                <div className='card-list__body'>
                    {this.charactersCardsCreate()}
                    
                        <button className='card-list__body__button' onClick={() => this.loadMore()}>
                            Load More
                        </button>
                    
                </div>

                <div className='card-list__body__footer'>
                    <strong>© Development and design by Daniela Farias. Images are not mine.</strong>
                </div>
                
            </section>
        )};
    }

    componentDidMount() {
        fetch('https://rickandmortyapi.com/api/character')
        .then(resultado => resultado.json())
        .then(resultadoJson => {
            this.setState({
                isLoaded: true,
                characters: resultadoJson.results
            })
        })
    }
}

export default CardList;