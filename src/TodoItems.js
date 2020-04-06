import React, { Component } from "react";

class TodoItems extends Component {

    constructor(props) {
        super(props);

        this.createTasks = this.createTasks.bind(this);
    }

    delete(key) {
        this.props.delete(key);
    }

    createTasks(item) {
        // conditionally rendering where we only render the delete buttpn if the allow delete button is set to true
        return <li
            key={item.key}>{item.text}
            {this.props.allowDelete && <button onClick={() => this.delete(item.key)}>x</button>}
            </li>
    }

    render() {
        var todoEntries = this.props.entries;
        var listItems = todoEntries.map(this.createTasks);

        return (
            <ul className="theList">
                {listItems}
            </ul>
        );
    }
};

export default TodoItems;