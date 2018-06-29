import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

	constructor() {
		super();

		this.state = {
			todoItems: [
				{
					number: 1,
					name: 'One'
				},
				{
					number: 2,
					name: 'Two'
				}, {
					number: 3,
					name: 'Three'
				},
			]
		}
	}

	render() {
		return (
			<section>
				<h3>TODO list</h3>
				<ListInput onListInputSubmit={e => this.getNewItem(e)}/>
				<Toggle/>
				<ItemsList items={this.state.todoItems}/>
			</section>
		);
	}

	getNewItem(e) {
		let item = {
			name: e
		};
		this.setState({
			todoItems: [...this.state.todoItems,  item]
		});
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
	}
}

class Toggle extends Component {
	render() {
		return (
			<div>
				<p>Sort by:</p>
				<span>Name</span>
				<input type="checkbox"/>
				<span>Number</span>
			</div>
		)
	}
}

class ItemsList extends Component {
	render() {

		return (
			<ol>
				{
					this.props.items.map((item, i) => (
						<li key={i}> {item.name}</li>
					))
				}
			</ol>
		)
	}
}

export default App;
