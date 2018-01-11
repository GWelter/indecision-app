import React from 'react';

import AddOption from './add-option';
import Options from './options';
import Header from './header';
import Action from './action';
import OptionModal from './option-modal';

class IndecisionApp extends React.Component {
	state = {
		options: [],
		selectedOption: undefined
	};
	handleDeleteOptions() {
		this.setState(() => ({
			options: []
		}));
	}
	handleDeleteSingleOption = (optionToRemove) => {
		this.setState((prevState) => ({
			options: prevState.options.filter((option => option !== optionToRemove))
		}));
	}
	handlePick = () => {
		const position = Math.floor(Math.random() * this.state.options.length);
		this.setState(() => ({ selectedOption: this.state.options[position] }));
	}
	handleClearPick = () => {
		this.setState(() => ({ selectedOption: undefined }));
	}
	handleAddOption = (option) => {
		if(!option) {
			return 'Enter valid value to add item';
		}else if(this.state.options.indexOf(option) >1) {
			return 'This option already exists';
		}

		this.setState((prevState) => ({
			options: prevState.options.concat(option)
		}));
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
				<OptionModal handleClearPick={this.handleClearPick} selectedOption={this.state.selectedOption}/>
			</div>
		);
	}
};

IndecisionApp.defaultProps = {
	options: []
};

export default IndecisionApp;