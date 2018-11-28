// const React = require('react');
// const ReactTags = require('react-tag-autocomplete');
//
// export default class ReactTag extends React.Component {
//     constructor (props) {
//         super(props);
//
//         this.state = {
//             tags: [
//                 { id: 1, name: "Apples" },
//                 { id: 2, name: "Pears" }
//             ],
//             suggestions: [
//                 { id: 3, name: "Bananas" },
//                 { id: 4, name: "Mangos" },
//                 { id: 5, name: "Lemons" },
//                 { id: 6, name: "Apricots" }
//             ]
//         }
//     }
//
//     handleDelete (i) {
//         const tags = this.state.tags.slice(0)
//         tags.splice(i, 1)
//         this.setState({ tags })
//     }
//
//     handleAddition (tag) {
//         const tags = [].concat(this.state.tags, tag)
//         this.setState({ tags })
//     }
//
//     render () {
//         return (
//             <ReactTags
//                 tags={this.state.tags}
//                 suggestions={this.state.suggestions}
//                 handleDelete={this.handleDelete.bind(this)}
//                 handleAddition={this.handleAddition.bind(this)} />
//         )
//     }

import './style.css';
import React, { Component } from 'react';
const ReactTags = require('react-tag-autocomplete');

export default class ReactTag extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            suggestions: [
                {
                    label: 'Suggestions 1',
                    value: '1'
                },
                {
                    label: 'Suggestions 2',
                    value: '2'
                },
                {
                    label: 'Another suggestions',
                    value: 'X'
                }
            ]
        }
    }
    onChange = (value) => {
        console.log('Value received from onChange: ' + value)
    };
    render(){
        return (
            <ReactTags
                suggestions={this.state.suggestions}
                onChange={this.handleChange}
            />
        )
    }
}


