import './SemanticTags.css';
const React = require('react');

class SemanticTags extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            focused: false,
            input: ''
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
        if ( evt.keyCode === 13 ) {
            const {value} = evt.target;

            this.setState(state => ({
                items: [...state.items, value],
                input: ''
            }));
        }

        if ( this.state.items.length && evt.keyCode === 8 && !this.state.input.length ) {
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
        }
    }
    makeRandomColor(index) {

        let rgb = [];
        let rgb2 = [];
        for (let i = 0; i < 3; i++) {
            let r = Math.floor(Math.random() * 256);
            let r2 = Math.floor(Math.random() * 256 * -3) ;
            rgb.push(r);
            rgb2.push(r2);
        }
        let styles2 = {
            backgroundColor: `rgb(${rgb})`,
            color: `rgb(${rgb2})`,
            fontFamily : 'Helvetica, sans-serif',
            marginRight: '5px',
            cursor: 'pointer'
        };
        return styles2
    }
    render() {
        const styles = {
            container: {
                border: '1px solid #ddd',
                padding: '5px',
                borderRadius: '5px',
                width : '42vw',
                maxWidth : '320px'
            },

            items: {
                display: 'inline-block',
                padding: '2px',
                border: '1px solid blue',
                fontFamily: 'Helvetica, sans-serif',
                borderRadius: '5px',
                marginRight: '5px',
                cursor: 'pointer'
            },

            input: {
                outline: 'none',
                border: 'none',
                fontSize: '14px',
                fontFamily: 'Helvetica, sans-serif'
            },

        };
        return (
            <label>
                <ul style={styles.container}>
                    {this.state.items.map((item, i) =>
                        <li key={i} className={'tag'} onClick={this.handleRemoveItem(i)} style={this.makeRandomColor(i)}>
                            <span>   x    . </span>
                            {item}
                        </li>
                    )}
                    <input
                        style={styles.input}
                        value={this.state.input}
                        onChange={this.handleInputChange}
                        onKeyDown={this.handleInputKeyDown} />
                </ul>
            </label>
        );
    }


}
export default SemanticTags;



