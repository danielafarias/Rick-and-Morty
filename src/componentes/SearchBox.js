import React from 'react';

class SearchBox extends React.Component {
    render() {
        return (
            <input type='text' className='card-list__list-header__search-box' 
            placeholder={this.props.placeholder} onChange={this.props.onChange} onKeyDown={this.props.onKeyDown}>
            </input>
        )
    }
}

export default SearchBox;