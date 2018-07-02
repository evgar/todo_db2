import React, { Component } from 'react';

import ItemsList from './ItemsList';
import ListInput from './ListInput';
import Toggle from './Toggle';
import './App.css';

class App extends Component {
	constructor() {
		super();

		this.state = {
			todoItems: [],
			sortedBy: 'number'
		};

		this.lastIndex =0;
	}

	render() {
		return (
			<section>
				<h3>TODO List</h3>
				<ListInput onListInputSubmit={e => this.getNewItem(e)}/>
				<Toggle onSortingChange={e => this.changeSorting(e)}/>
				<ItemsList
					items={this.state.todoItems}
					sortedType={this.state.sortedBy}
					onRemoveItem={e => this.removeItem(e)}
					onDoneItem={e => this.doneItem(e)}
				/>
			</section>
		);
	}

	getNewItem(value) {
		if (value) {
			let item = {
				name: value,
				number: this.lastIndex + 1,
				done: false
			};

			this.setState({ todoItems: [item, ...this.state.todoItems] },
				() => this.lastIndex = this.lastIndex + 1
			);
		}
	}

	changeSorting(event) {
		let sortedType = event.target.checked ? 'name' : 'number';
		this.setState({sortedBy: sortedType});
	}

	removeItem(number) {
		const todoItems = this.state.todoItems.filter(item => item.number !== number)
		this.setState({todoItems});
	}

	doneItem(index) {
		const todoItems = [...this.state.todoItems];
		todoItems[index].done = !todoItems[index].done;

		this.setState({todoItems});
	}
}

export default App;
