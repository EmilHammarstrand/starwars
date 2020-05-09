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
        this.dataFromApi();
    }

    dataFromApi() {
        const baseUrl = 'https://swapi.dev/api/'
        
        axios.get(baseUrl + 'people')
        .then(response => {
            const peopleList = response.data.results || []
            this.setState({ peopleList: peopleList})
        })
    }

    onBtnPress = event => {
        this.setState({ search: event.target.value}); 
    }

    filterPerson = person => {
        let personInfo = person.name.toUpperCase().indexOf(this.state.search.toUpperCase()) > -1
            || person.height.indexOf(this.state.search) > -1
            || person.gender.toUpperCase().indexOf(this.state.search.toUpperCase()) > -1
            || person.eye_color.toUpperCase().indexOf(this.state.search.toUpperCase()) > -1 
            || person.birth_year.toUpperCase().indexOf(this.state.search.toUpperCase()) > -1;
        return personInfo;
    }

    render(){
        return(
            <main>
                <div className="resultbox">
                    <ul>
                        {this.state.peopleList.filter(this.filterPerson).map((person, id) => (
                            <li key={id}>
                                {`(${person.gender}) ${person.name} is ${person.height} cm tall, got ${person.eye_color} eyes and is born ${person.birth_year}`}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="Form">
                    {<input className="search" placeholder="Search the universe..." type="text" value={this.state.search} onChange={this.onBtnPress}></input>}
                    <button className="findBtn">Add character</button>
                </div>
            </main>
        )
    }
}

export default List;