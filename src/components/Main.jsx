import React from 'react';
import axios from 'axios';


 class List extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            peopleList: [],
            search: "",
            favoriteList: [],
            showFavorites: false,
            name: "",
            age: "",
            birthyear: "",
            gender: "",
            eyecolor: ""
        }
    }

    componentDidMount() {
        this.dataFromApi();
    }

    dataFromApi() {
        const baseUrl = 'https://swapi.dev/api/'
        
        axios.get(baseUrl + 'people')
        .then(response => {
            const peopleList = response.data.results
            this.setState({ peopleList: peopleList})
            console.log("data: ", peopleList)
        })
    }

    onClick = () => {
        this.addFavorites();
        this.showFavFunciton();
    }

    handleChange = event => {
        this.setState({
            name: event.target.value,
            age: event.target.value,
            birthyear: event.target.value,
            gender: event.target.value,
            eyecolor: event.target.value});
    }

    formValidation = () => {
        let asd = !this.state.name
            && !this.state.age
            && !this.state.birthyear
            && !this.state.gender
            && !this.state.eyecolor;
        return asd;
    }

    showFavFunciton = () => {
        this.setState({showFavorites: true})
    }

    onKeyboardClick = event => {
        this.setState({ search: event.target.value}); 
    }

    addFavorites = () => {
        let favoriteList = this.state.favoriteList.concat(this.state.peopleList)
        this.setState({ favoriteList })
    }

    addNewCharacter = () => {
        this.setState(prevState => ({
            favoriteList: [...prevState.favoriteList, {
                name: this.state.name,
                age: this.state.age,
                birthyear: this.state.birthyear,
                gender: this.state.gender,
                eyecolor: this.state.eyecolor
            }]
        }))
        this.setState({showFavorites: true})
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
                        {this.state.peopleList.filter(this.filterPerson).map( (person, id) => (
                            <li key={id}>
                                <button className="fav" onClick={this.onClick}>Fav</button>
                                {`(${person.gender}) ${person.name} is ${person.height} cm tall, got ${person.eye_color} eyes and is born ${person.birth_year}`}
                            </li>
                        ))}
                        
                        {this.state.showFavorites && <h3 className="favoriteHeader">Favorites</h3>}
                        {this.state.favoriteList.map((person, id) => (
                            <li key={id}>
                                {`(${person.gender}) ${person.name}`}
                                {`(${this.state.gender}) ${this.state.name} is ${this.state.height} cm tall, got ${this.state.eyecolor} eyes and is born ${this.state.birthyear}`}
                            </li>
                            ))}
                    </ul>
                </div>
                <div className="Form">
                    <input className="search" placeholder="Search the universe!" type="text" value={this.state.search} onChange={this.onKeyboardClick}></input>
                    <h3>Make you own character!</h3>
                    <input className="search special" placeholder="Name..." onChange={this.handleChange}></input>
                    <input className="search" placeholder="Gender..." onChange={this.handleChange}></input>
                    <input className="search" placeholder="Birthyear..." onChange={this.handleChange}></input>
                    <input className="search" placeholder="Height..." onChange={this.handleChange}></input>
                    <input className="search" placeholder="Eyecolor..." onChange={this.handleChange}></input>
                    <button className="findBtn" onClick={this.addNewCharacter} disabled={this.formValidation()}>Add character</button>
                </div>
            </main>
        )
    }
}

export default List;