import React from 'react';
import axios from 'axios';

 class List extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            peopleList: [],
            search: ""
        }
    }

    componentDidMount() {
        this.peopleListFromApi();
    }

    peopleListFromApi() {
        const baseUrl = 'https://swapi.dev/api/'

        axios.get(baseUrl + 'people')
        .then(response => {
            let peopleList = response.data.results.map((person, i) => {
                return(
                    <main key={i}>
                            <ul key={i}>
                                {<li key={i}>{'('+person.gender+') '+person.name+' is '+person.height+' cm tall, got '+person.eye_color+' eyes and is born '+person.birth_year}</li>}
                            </ul>
                    </main>
                )
            })
            this.setState({ peopleList: peopleList})
        })
    }

    
    onchange = e => {
        this.setState({ search: e.target.value});
    }

    render(){
        return(
            <main>
                    <ul>
                        {this.state.peopleList}
                    </ul>
                <input className="search" placeholder="Search the universe..." type="text" onChange={this.onchange}></input> 
            </main> 
        )
    }
}

export default List;