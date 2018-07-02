import React, {Component} from 'react';

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

export default Toggle;
