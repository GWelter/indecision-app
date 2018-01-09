class IndecisionApp extends React.Component {
	render() {
		const title = 'Indecision App';
		const subtitle = 'Put your live in the hands of a computer';
		const options = ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4'];

		return (
			<div>
			<Header title={title} subtitle={subtitle}/>
			<Action />
			<Options options={options}/>
			<AddOptions />
			</div>
		);
	}
}

class Header extends React.Component {
	render() {
		return (
			<div>
				<h1>{this.props.title}</h1>
				<h2>{this.props.subtitle}</h2>
			</div>
		);
	}
}

class Action extends React.Component {
	handlePick() {
		alert('handlePick');
	}
	render() {
		return (
			<div>
				<button onClick={this.handlePick}>What should i do?</button>
			</div>
		);
	}
}

class Options extends React.Component {
	removeAllOptions() {
		alert('removeAllOptions');
	}
	render() {
		return (
			<div>
				<button onClick={this.removeAllOptions}>Remove All options</button>
				<p>Options Component Here</p>
				{this.props.options.map((option) => <Option key={option} optionText={option} />)}
			</div>
		);
	}
}

class Option extends React.Component {
	render() {
		return (
			<div>
				<p>{this.props.optionText}</p>
			</div>
		);
	}
}

class AddOptions extends React.Component {
	handleAddOption(e) {
		e.preventDefault();

		const option = e.target.option.value.trim();

		if(option) {
			alert(option);
		}
	}
	render() {
		return (
			<div>
				<form onSubmit={this.handleAddOption}>
					<input type="text" name="option" />
					<button>Add Option</button>
				</form>
			</div>
		);
	}
}


ReactDOM.render(<IndecisionApp />, document.getElementById('app'));