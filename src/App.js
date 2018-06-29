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
				},	{
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
				<ListInput />
				<Toggle />
				<ItemsList items={this.state.todoItems} />
			</section>
		);
	}
}

class ListInput extends Component {
	render() {
		return (
			<form action="">
				<input type="text"/>
				<button>Add</button>
			</form>
		)
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
