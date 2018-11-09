import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
  }

  onInputChange(term) {
    this.setState({ term: term });
    this.props.onChange(term);
  }

  render() {
    return (
      <div>
        <div className="search-bar">
          <input
            id="namanyay-search-box" name="q" size="40" type="text" placeholder="Search"
            value={this.state.term}
            onChange={(event) => {
              this.onInputChange(event.target.value)
            }}
            placeholder='Search Video'
          />
        </div>
      </div>
    );
  }
}

export default SearchBar;
