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
            nameFromInput: "",
            heightFromInput: "",
            birthyearFromInput: "",
            genderFromInput: "",
            eyecolorFromInput: ""
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
        })
    }

    onFavBtnClick = x => {
        this.addFavorites(x);
        this.setState({showFavorites: true})
    }

    formValidation = () => {
        let asd = !this.state.nameFromInput
            && !this.state.heightFromInput
            && !this.state.birthyearFromInput
            && !this.state.genderFromInput
            && !this.state.eyecolorFromInput;
        return asd;
    }

    onKeyboardClick = event => {
        this.setState({ search: event.target.value}); 
    }

    addFavorites = x => {
        let favoriteList = [...this.state.favoriteList, x]
        this.setState({ favoriteList })
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    addNewCharacter = () => {
        this.setState( prevState => ({
            favoriteList: [...prevState.favoriteList, {
                name: this.state.nameFromInput,
                height: this.state.heightFromInput,
                birth_year: this.state.birthyearFromInput,
                gender: this.state.genderFromInput,
                eye_color: this.state.eyecolorFromInput}]
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
        console.log(this.state.favoriteList)
        return(
            <main>
                <div className="resultbox">
                    <ul>
                        {this.state.peopleList.filter(this.filterPerson).map( (person, id) => (
                            <li key={id}>
                                <button className="fav" onClick={ () => this.onFavBtnClick(person)}>Fav</button>
                                {`(${person.gender}) ${person.name} is ${person.height} cm tall, got ${person.eye_color} eyes and is born ${person.birth_year}`}
                            </li>
                        ))}
                        
                        {this.state.showFavorites && <h3 className="favoriteHeader">Favorites</h3>}
                        {this.state.favoriteList.map((person, id) => (
                            <li key={id} className="favList">
                                {`(${person.gender}) ${person.name} is ${person.height} cm tall, got ${person.eye_color} eyes and is born ${person.birth_year}`}
                            </li>
                            ))}
                    </ul>
                </div>
                <div className="Form">
                    <input className="search" placeholder="Search the universe!" type="text" value={this.state.search} onChange={this.onKeyboardClick}></input>
                    <h3>Make you own character!</h3>
                    <input className="search special" placeholder="Name..." name="nameFromInput" onChange={this.handleChange}></input>
                    <input className="search" placeholder="Gender..." name="genderFromInput" onChange={this.handleChange}></input>
                    <input className="search" placeholder="Birthyear..." name="birthyearFromInput" onChange={this.handleChange}></input>
                    <input className="search" placeholder="Height..." name="heightFromInput" onChange={this.handleChange}></input>
                    <input className="search" placeholder="Eyecolor..." name="eyecolorFromInput" onChange={this.handleChange}></input>
                    <button className="findBtn" onClick={this.addNewCharacter} disabled={this.formValidation()}>Add character</button>
                </div>
            </main>
        )
    }
}

export default List;