import React, {Component} from 'react';

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

export default ListInput;
