import React from 'react';
import axios from 'axios';

export default class List extends React.Component{
    state = {
        peopleList: []
    }

    componentDidMount() {
        const baseUrl = 'https://swapi.dev/api/';
        
        
        axios.get(baseUrl + 'planets')
        .then(response => {
            console.log("PLANETS: ", response.data)
            this.setState( {peopleList: response.data.results})
        })

        axios.get(baseUrl + 'people')
        .then(response => {
            console.log("axios response: ", response.data)
            this.setState( {peopleList: response.data.results})
        })
}

    render(){
        return(
            <main>   
                <h1>Names: </h1>
                    <ul>
                        {this.state.peopleList.map((person, i) => <li key={i}>{person.name + " is " + person.height + " cm long"}</li>)}
                    </ul>
            </main>
        )
    }
}
