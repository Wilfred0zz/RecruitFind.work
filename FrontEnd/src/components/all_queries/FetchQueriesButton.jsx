import React from 'react';

export default function addQueries(props){
    return props.fetchQueries.map((term) => {
        return(
            <button type='button' onClick={this.fetchQueries.bind(this, term)}> {term}</button>
        );
    })
}
