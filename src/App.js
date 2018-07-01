import React, {Component} from 'react';
import './App.css';

class App extends Component {

	constructor() {
		super();

		this.state = {
			todoItems: [],
			sortedBy: 'number',
			number: 0
		}
	}

	render() {
		return (
			<section>
				<h3>TODO List</h3>
				<ListInput onListInputSubmit={e => this.getNewItem(e)}/>
				<Toggle onSortingChange={e => this.changeSorting(e)}/>
				<ItemsList items={this.state.todoItems}
						   sortedType={this.state.sortedBy}
						   onRemoveItem={e => this.removeItem(e)}
						   onDoneItem={e => this.doneItem(e)}
				/>
			</section>
		);
	}

	getNewItem(e) {
		if (e) {
			let item = {
				name: e,
				number: this.state.todoItems.length + 1,
				done: false
			};
			this.setState({
				todoItems: [item, ...this.state.todoItems]
			});
		}
	}

	changeSorting(e) {
		let sortedType = e.target.checked ? 'name' : 'number';
		this.setState({sortedBy: sortedType});
	}

	removeItem(number) {
		let actualItems = this.state.todoItems.filter(item => item.number !== number);
		// actualItems.forEach((item, i) => item.number = i + 1);
		this.setState({todoItems: actualItems});
	}

	doneItem(number) {
		this.setState(prevState => {
			let newData = prevState.todoItems.slice();
			newData[number - 1].done = !newData[number - 1].done;
			return {todoItems: newData}
		})
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
			<form className="form-group"
				  onSubmit={e => this.handleSubmit(e)}>
				<input
					className="form-control form-control-lg"
					onChange={e => this.handleChange(e)}
					type="text"
					value={this.state.value}/>
				<button className="btn form-group__btn">Add</button>
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
			<div className="toggle">
				<p className="toggle__head">Sort by:</p>
				<span className="toggle__label">Number</span>
				<label onChange={e => this.handleChange(e)} className="switch">
					<input type="checkbox"/>
					<span className="slider round"></span>
				</label>

				<span className="toggle__label">Name</span>
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
			<ol className="list list-group">
				{
					this.props.items.sort((item1, item2) => {
						if (this.props.sortedType === 'number') {
							return item1.number - item2.number;
						} else if (this.props.sortedType === 'name') {
							return item1.name.localeCompare(item2.name);
						}
					}).map((item, index) =>
						<li className={item.done ? 'list__item--done list__item list-group-item' : 'list__item list-group-item'}
							key={index}>{item.number}. {item.name}

							<button onClick={() => this.doneHandler(item.number)}
									className="list__done-btn btn">
								<span className="glyphicon glyphicon-ok"></span>
							</button>

							<button
								onClick={() => this.removeHandler(item.number)}
								className="list__close-btn btn"
							>
								<span>&times;</span>
							</button>
						</li>
					)
				}
			</ol>
		)
	}

	removeHandler(number) {
		this.props.onRemoveItem(number);
	}

	doneHandler(number) {
		this.props.onDoneItem(number);
	}
}

export default App;
