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

    //React render function to render the todo list
    render() {
        return (
            //Split Treatments is a React component that performs feature evalutation
            //Does a call to client.getTreatmentswithConfig(names)
            //You pass in the name of the feature flag
            //This returns a treatment and a config
            <SplitTreatments names={['talia_todolist_delete']} >
                {({ treatments }) => {
                    return this.renderContent(treatments['talia_todolist_delete']) 
                }}
            </SplitTreatments>
        );
    }

    renderContent(deleteTreatment) {
        const allowDelete = deleteTreatment.treatment === 'on';
        return (
            <div className="todoListMain">
                <div className="header">
                    <form onSubmit={this.addItem}>
                        <input ref={(a) => this._inputElement = a}
                            placeholder="Enter Task">
                        </input>
                        <button type="submit">Add</button> 
                    </form>
                </div>
                <TodoItems entries={this.state.items} allowDelete={allowDelete}
                    delete={this.deleteItem} />
            </div>
            )
    }
}

// The config that I use to configure my split instance
// This initializes the Split Factory, which is the entry point of the library
// From Syntax in UI
const sdkConfig = {
    core: {
        authorizationKey: 's2959s3memm2hp1b03u34khu1sjl0106j6qr',
        key: 'talia.nassi@split.io'
    },
    debug: true
};

export default withSplitFactory(sdkConfig)(TodoList);