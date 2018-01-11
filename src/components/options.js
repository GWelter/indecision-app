import React from 'react';
import Option from './option';

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

export default Options;