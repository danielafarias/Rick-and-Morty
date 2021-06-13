import React from 'react';
import { Link } from 'react-router-dom'
class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            character: {} // Estado inicial. Para gerar um personagem dinâmico
        }
    }

    createPoint() {
        const character = this.state.character;
        if (character.status === "Alive") {
            return (
                <img src="https://pngimage.net/wp-content/uploads/2018/06/green-glow-png-2.png" alt='point' className='card-list__card__status__point'/>
            )
            
        } else if (character.status === "Dead"){
            return (
                <img src="https://2.bp.blogspot.com/-6HBy2C5u-uo/VmlnzsyELTI/AAAAAAAAIGc/kcktc6O629k/s1600/Copy%2Bof%2B1437492876530.png" alt='point' className='card-list__card__status__point'/>
        
            )
        } else {
            return (
                <img src="https://storage.needpix.com/rsynced_images/question-mark-40876_1280.png" alt='point' className='card-list__card__status__point'/>
            )
        }
    }

    
    // Para renderizar um card dinâmico:
    render() {
        const { isLoaded, character } = this.state;
        
        if (!isLoaded) {
            return (
                <div className='card-list__card'>
                    
                </div>
            )
        } else {
            return (
                <Link to={`/character/${character.id}`}>
                <div className='card-list__card'>
                    <img src={character.image} alt={character.firstname} className='card-list__card__img'/>
                <div className='card-list__card__info'>
                    <h3>{character.name}</h3>
                    <div className='card-list__card__status'>
                        {this.createPoint()}
                        <p>{character.status} - {character.species}</p>
                    </div>
                    <h4>Gender: </h4>
                    <p>{character.gender}</p>
                </div>
                </div>
                </Link>
            );
        }
        
    }

    // Atualizar o estado do card com as propriedades inseridas
    componentDidMount() {
        fetch(this.props.character.url)
        .then(resultado => resultado.json())
        .then(resultadoJson => {
            this.setState({
                isLoaded: true,
                character: resultadoJson
            })
        })
        
    }
}

export default Card;