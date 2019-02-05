import "./SemanticTags.css";

const React = require("react");

class SemanticTags extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: props.tags,
            focused: false,
            input: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
        this.makeRandomColor = this.makeRandomColor.bind(this);
    }

    componentWillMount() {
        if (
            this.state.items &&
            this.state.items !== undefined &&
            this.state.items.length > 0
        ) {
            let temp = this.state.items.slice();
            temp = temp.map((item, index) => {
                let obj = item;
                obj.style = this.makeRandomColor(index);
                return obj;
            });
            this.setState({ items: temp });
        }
    }
    handleInputChange(evt) {
        this.setState({ input: evt.target.value });
    }

    handleInputKeyDown(evt) {
        if (evt.keyCode === 13) {
            evt.preventDefault();
            let obj = {};
            const { value } = evt.target;
            obj.value = value;
            obj.style = this.makeRandomColor(this.state.items.length);
            this.setState(state => ({
                items: [...state.items, obj],
                input: " "
            }));
            this.props.saveTags(value);
        }
    }

    handleRemoveItem(index, item) {
        return () => {
            this.setState(state => ({
                items: state.items.filter((item, i) => i !== index)
            }));
            this.props.deleteTags(item.key);
        };
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
            fontFamily: "Helvetica, sans-serif",
            marginRight: "5px",
            cursor: "pointer"
        };
        return styles2;
    }

    render() {
        console.log("prps in tags", this.props);
        const styles = {
            container: {
                border: "1px solid #ddd",
                padding: "5px",
                borderRadius: "5px",
                width: "55vw",
                marginTop: "30px",
                maxWidth: "450px"
            },

            items: {
                display: "inline-block",
                padding: "2px",
                border: "1px solid blue",
                fontFamily: "Helvetica, sans-serif",
                borderRadius: "5px",
                marginRight: "5px",
                cursor: "pointer",
                marginTop: "10px"
            },

            input: {
                outline: "none",
                border: "none",
                fontSize: "14px",
                fontFamily: "Helvetica, sans-serif"
            }
        };
        return (
            <label>
                <ul style={styles.container}>
                    {this.state.items.map(
                        (item, i) =>
                             (
                                <li
                                    key={i}
                                    className={"tag"}
                                    style={item.style}
                                >
                                    <span
                                        onClick={this.handleRemoveItem(i, item)}
                                    >
                                        {" "}
                                        x {" "}
                                    </span>
                                    {item.value}
                                </li>
                            )
                    )}
                    <input
                        style={styles.input}
                        value={this.state.input}
                        onChange={this.handleInputChange}
                        onKeyDown={this.handleInputKeyDown}
                    />
                </ul>
            </label>
        );
    }
}
export default SemanticTags;
