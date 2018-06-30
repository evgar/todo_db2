import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

	constructor() {
		super();

		this.state = {
			todoItems: [],
			sortedBy: 'number'
		}
	}

	render() {
		return (
			<section>
				<h3>TODO list</h3>
				<ListInput onListInputSubmit = {e => this.getNewItem(e)}/>
				<Toggle onSortingChange = {e => this.changeSorting(e)}/>
				<ItemsList items={this.state.todoItems} sortedType = {this.state.sortedBy}/>
			</section>
		);
	}

	getNewItem(e) {
		let item = {
			name: e,
			number: this.state.todoItems.length + 1
		};
		this.setState({
			todoItems: [item, ...this.state.todoItems]
		});
	}

	changeSorting(e) {
		let sortedType = e.target.checked ? 'number' : 'name';
		this.setState({sortedBy: sortedType});
	}
}

class ListInput extends Component {
	constructor() {
		super();

		this.state = {
			value: ''
		};
	}

	render() {
		return (
			<form onSubmit={e => this.handleSubmit(e)}>
				<input onChange={e => this.handleChange(e)} type="text" value={this.state.value}/>
				<button>Add</button>
			</form>
		)
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.onListInputSubmit(this.state.value);
		this.setState({value: event.target.value = ''});
	}
}

class Toggle extends Component {
	render() {
		return (
			<div>
				<p>Sort by:</p>
				<span>Name</span>
				<input onChange={e => this.handleChange(e)} type="checkbox"/>
				<span>Number</span>
			</div>
		)
	}

	handleChange(event) {
		this.props.onSortingChange(event);
	}
}

class ItemsList extends Component {
	render() {
		return (
			<ol>
				{
					this.props.items.sort((item1, item2) => {
						if (this.props.sortedType === 'number') {
							return item1.number - item2.number;
						} else if (this.props.sortedType === 'name') {
							this.props.items.sort((item1, item2) => {
								if (item1.name < item2.name) return -1;
								if (item1.name > item2.name) return 1;
								return 0;
							})
						}
					}).map((item, index) => (
						<li key={index}>{item.number} {item.name}
							<button onClick={() => this.clickHandler(index)}>Remove</button>
						</li>
					))
				}
			</ol>
		)


	}
	clickHandler(index) {
		console.log(index);
	}
}

export default App;
