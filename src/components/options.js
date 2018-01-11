import React from 'react';
import Option from './option';

const Options = (props) => (
	<div>
		<div className="widget-header">
			<h3 className="widget-header__title">Your Options</h3>
			<button
				className="button button--link"
				onClick={props.handleDeleteOptions}>
				Remove All options
			</button>
		</div>
		{props.options.length == 0 && <p className="widget__message">Please add an option</p>}
		{props.options.map((option, index) => (
			<Option
				handleDeleteSingleOption={props.handleDeleteSingleOption}
				count={index + 1}
				key={option}
				optionText={option}
			/>)
		)}
	</div>
);

export default Options;