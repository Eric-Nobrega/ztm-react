import React, { Component } from 'react'

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  // make an api request here, as the component is now on the DOM
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(data =>
        this.setState(
          () => {
            return { monsters: data }
          }
        )
      )
  }

  render() {
    // by placing the filterd list here
    // it will update every time the state is changed
    // the state is changed upon search bar value being changed
    // therefore, as we remove characters, instead of displaying
    // an incorrect, constant modified state array, we have a dynamically
    // updating filtered array, which by default, a null/empty string
    // search bar value, is equal to the original state array
    const filteredMonsters = this.state.monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(this.state.searchField);
    })

    return (
      <div className='App'>
        <input className='search-box' type="search" placeholder='search monsters' onChange={(e) => {

          this.setState(() => {
            return { searchField: e.target.value.toLowerCase() }
          })

        }} />
        {filteredMonsters.map((ele) => {
          return (
            <h1 key={ele.id}>{ele.name}</h1>
          )
        })}
      </div>
    )
  }
}

export default App