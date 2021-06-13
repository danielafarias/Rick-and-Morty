import React from 'react';
import { Link } from 'react-router-dom'

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.id = parseInt(props.match.params.id); // será utilizado como path e identificador

        this.state = {
            // Dicionario vazio inicial para casos de personagens não encontrados
            isLoaded: false,
            character: {}
        };
    }
    // O que será renderizado
    render() {
        const { isLoaded, character } = this.state;
        // Personagens que serão renderizados conforme o estado alterado
        if (!isLoaded) {
            return (
                <section className='info'>
                    Loading...
                </section>
            )
        } else {
            return (
                <section className='info'>
                    <div className='info__header'>
                        <img src='https://cdn140.picsart.com/271010551004211.png?type=webp&to=min&r=640' alt='logo' className='logo'/>
                    </div>
                    <div className='info__body'>
                        <img src={character.image} alt='info-img' className='info__body__img'/>
                        
                        <div className='info__body__status'>
                            <h2>{character.name}</h2>
                            <p>Status: {character.status}</p>
                            <p>Specie: {character.species}</p>
                            <p>Gender: {character.gender}</p>
                            <p>Type: {character.type}</p>
                        </div>
                        
                        <Link to='/'><button className='info__body__button'>Return</button></Link>
                    </div>
                    <div className='info__footer'>
                        <strong>© Development and design by Daniela Farias. Images are not mine.</strong>
                    </div>
                </section>
            );
        
        }
        
    }

    componentDidMount() {
        fetch(`https://rickandmortyapi.com/api/character/${this.id}`)
        .then(resultado => resultado.json())
        .then(resultadoJson => {
            this.setState({
                isLoaded: true,
                character: resultadoJson
            })
        })
    }
}

export default Info;