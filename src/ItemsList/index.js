import React, { Component } from 'react';

class ItemsList extends Component {
	render() {
		const { items, sortedType } = this.props;

		const todos = items.sort((prev, curr) => {
			if (sortedType === 'number') {
				return prev.number - curr.number;
			} else if (sortedType === 'name') {
				return prev.name.localeCompare(curr.name);
			}
		});

		return (
			<ol className="list list-group">
				{todos.map((item, index) =>
					<li className={item.done ? 'list__item--done list__item list-group-item' : 'list__item list-group-item'}
						key={item.number}
					>
						<span>{item.number}. {item.name}</span>

						<button onClick={() => this.doneHandler(index)} className="list__done-btn btn">
							<span className="glyphicon glyphicon-ok"></span>
						</button>

						<button onClick={() => this.removeHandler(item.number)} className="list__close-btn btn">
							<span>&times;</span>
						</button>
					</li>
				)}
			</ol>
		)
	}

	removeHandler(number) {
		this.props.onRemoveItem(number);
	}

	doneHandler(index) {
		this.props.onDoneItem(index);
	}
}

export default ItemsList;