import React from "react";
import "./ScrollbarSearch.css";
import Autosuggest from "react-autosuggest";

const languages = [];

/**
 *
 * ScrollbarSearch
 */

class ScrollbarSearch extends React.Component {
  constructor() {
    super();

    this.state = {
      value: "",
      suggestions: []
    };
  }

  // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  getSuggestions(value) {
    const escapedValue = this.escapeRegexCharacters(value.trim());

    if (escapedValue === "") {
      return [];
    }

    const regex = new RegExp("^" + escapedValue, "i");

    return this.props.collectionTitle.filter(title => regex.test(title.name));
  }

  getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  renderSuggestion = suggestion => {
    return (
      <div>
        <span>{suggestion.name}</span>
      </div>
    );
  };
  onChange = (event, { newValue, method }) => {
    this.props.updateSearch(this.escapeRegexCharacters(newValue));
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    console.log("value is", this.state.suggestions);
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Type your Collection Name",
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        className="body"
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default ScrollbarSearch;
