import React, { Component } from "react";
import { SplitTreatments, withSplitFactory } from "@splitsoftware/splitio-react"
import TodoItems from "./TodoItems";
import "./TodoList.css";

class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    addItem(e) {
        if (this._inputElement.value !== "") {
            var newItem = {
                text: this._inputElement.value,
                key: Date.now()
            };

            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(newItem)
                };
            });

            this._inputElement.value = "";
        }

        console.log(this.state.items);

        e.preventDefault();
    }

    deleteItem(key) {
        var filteredItems = this.state.items.filter(function (item) {
            return (item.key !== key);
        });

        this.setState({
            items: filteredItems
        });
    }

    render() {
        return (

            <SplitTreatments names={['talia_todolist_delete']} >
                {({ treatments }) => {
                    return this.renderContent(treatments['talia_todolist_delete']) 
                }}

            </SplitTreatments>
        );
    }

    renderContent(treatment) {
        const buttonClass = treatment === 'on' ? '' : 'button_new';

        return (
            <div className="todoListMain">
                <div className="header">
                    <form onSubmit={this.addItem}>
                        <input ref={(a) => this._inputElement = a}
                            placeholder="Enter Task">
                        </input>
                        <button className={buttonClass} type="submit">Add</button>
                    </form>
                </div>
                <TodoItems entries={this.state.items}
                    delete={this.deleteItem} />
            </div>
            )
    }
}

const sdkConfig = {
    core: {
        authorizationKey: 's2959s3memm2hp1b03u34khu1sjl0106j6qr',
        key: 'talia.nassi@split.io'
    },
    debug: true
};

export default withSplitFactory(sdkConfig)(TodoList);