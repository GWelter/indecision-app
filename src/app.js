class IndecisionApp extends React.Component {
	constructor(props) {
		super(props);
		this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
		this.handleDeleteSingleOption = this.handleDeleteSingleOption.bind(this);
		this.handlePick = this.handlePick.bind(this);
		this.handleAddOption = this.handleAddOption.bind(this);
		this.state = {
			options: props.options
		}
	}
	componentDidMount() {
		try {
			const json = localStorage.getItem('options');
			const options = JSON.parse(json);
	
			if(options) {
				this.setState(() => ({options}));
			}	
		} catch (error) {
			//Do nothing
		}
	}
	componentDidUpdate(prevProps, prevState) {
		if(this.state.options.length !== prevState.options.length) {
			const json = JSON.stringify(this.state.options);
			localStorage.setItem('options', json);
		}
	}
	componentWillUnmount() {

	}
	handleDeleteOptions() {
		this.setState(() => ({
			options: []
		}));
	}
	handleDeleteSingleOption(optionToRemove) {
		this.setState((prevState) => ({
			options: prevState.options.filter((option => option !== optionToRemove))
		}));
	};
	handlePick() {
		const position = Math.floor(Math.random() * this.state.options.length);
		alert(this.state.options[position]);
	}
	handleAddOption(option) {
		if(!option) {
			return 'Enter valid value to add item';
		}else if(this.state.options.indexOf(option) > -1) {
			return 'This option already exists';
		}

		this.setState((prevState) => ({
			options: prevState.options.concat(option)
		}));
	}
	render() {
		const subtitle = 'Put your live in the hands of a computer';

		return (
			<div>
				<Header subtitle={subtitle}/>
				<Action
					handlePick={this.handlePick}
					hasOptions={this.state.options.length > 0}
				/>
				<Options
					options={this.state.options}
					handleDeleteOptions={this.handleDeleteOptions}
					handleDeleteSingleOption={this.handleDeleteSingleOption}
				/>
				<AddOption handleAddOption={this.handleAddOption} />
			</div>
		);
	}
};

IndecisionApp.defaultProps = {
	options: []
}

const Header = (props) => {
	return (
		<div>
			<h1>{props.title}</h1>
			{props.subtitle && <h2>{props.subtitle}</h2>}
		</div>
	);
};

Header.defaultProps = {
	title: 'Indecision'
};

const Action = (props) => {
	return (
		<div>
			<button disabled={!props.hasOptions} onClick={props.handlePick}>What should i do??</button>
		</div>
	);
};

const Options = (props) => {
	return (
		<div>
			<button onClick={props.handleDeleteOptions}>Remove All options</button>
			{props.options.length == 0 && <p>Please add an option</p>}
			<p>Options Component Here</p>
			{props.options.map((option) => (
				<Option
					handleDeleteSingleOption={props.handleDeleteSingleOption}
					key={option}
					optionText={option}
				/>)
			)}
		</div>
	);
};

const Option = (props) => {
	return (
		<div>
			{props.optionText}
			<button
				onClick={ (e) => {
					props.handleDeleteSingleOption(props.optionText)
				}}
			>
			remove
			</button>
		</div>
	);
};

class AddOption extends React.Component {
	constructor(props) {
		super(props);
		this.handleAddOption = this.handleAddOption.bind(this);
		this.state = {
			error: undefined
		}
	}
	handleAddOption(e) {
		e.preventDefault();

		const option = e.target.option.value.trim();
		const error = this.props.handleAddOption(option);
		
		this.setState(() => ({error}));
		if(!error) {
			e.target.option.value = '';
		}
	}
	render() {
		return (
			<div>
				{this.state.error && <p>{this.state.error}</p>}
				<form onSubmit={this.handleAddOption}>
					<input type="text" name="option" />
					<button>Add Option</button>
				</form>
			</div>
		);
	}
};

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));