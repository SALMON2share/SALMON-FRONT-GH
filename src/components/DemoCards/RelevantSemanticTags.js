import "./RelevantSemanticTags.css";
const React = require("react");

class RelevantSemanticTags extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      focused: false,
      input: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.makeRandomColor = this.makeRandomColor.bind(this);
  }
  handleInputChange(evt) {
    this.setState({ input: evt.target.value });
  }

  handleInputKeyDown(evt) {
    if (evt.keyCode === 13) {
      let obj = {};
      const { value } = evt.target;
      obj.value = value;
      obj.style = this.makeRandomColor(this.state.items.length);
      this.setState(state => ({
        items: [...state.items, obj],
        input: " "
      }));
    }

    if (
      this.state.items.length &&
      evt.keyCode === 8 &&
      !this.state.input.length
    ) {
      this.setState(state => ({
        items: state.items.slice(0, state.items.length - 1)
      }));
    }
  }

  handleRemoveItem(index) {
    return () => {
      this.setState(state => ({
        items: state.items.filter((item, i) => i !== index)
      }));
    };
  }
  shouldComponentUpdate(props, state) {
    return false;
  }
  makeRandomColor(index) {
    let rgb = [];
    let rgb2 = [];
    for (let i = 0; i < 3; i++) {
      let r = Math.floor(Math.random() * 256);
      let r2 = Math.floor(Math.random() * 256 * -3);
      rgb.push(r);
      rgb2.push(r2);
    }
    let styles2 = {
      backgroundColor: `rgb(${rgb})`,
      color: `rgb(${rgb2})`,
      fontSize: 16
    };
    return styles2;
  }
  render() {
    return (
      <label>
        <ul className={"semantic-tags"}>
          {this.props.tags.map(
            (item, i) =>
              item.trim() !== "" && (
                <li key={i} className={"tag"} style={this.makeRandomColor(i)}>
                  <span> x . </span>
                  {item}
                </li>
              )
          )}
        </ul>
      </label>
    );
  }
}
export default RelevantSemanticTags;
