import { useContext, useState } from 'react';
import { DataContext } from '../App';

const Form = ({ postId }) => {
	const { comments, addComment } = useContext(DataContext);
	const initialState = {
		postId,
		id: '',
		body: ''
	};
	const [formValue, setFormValue] = useState(initialState);
	const [error, setError] = useState(false);

	const submitForm = e => {
		e.preventDefault();
		// Checks if comment ID already exists within database
		if (comments.findIndex(comment => comment.id === formValue.id) >= 0) {
			setError(true);
			// Resets fiels and adds comment to database is ID is new
		} else {
			addComment(formValue);
			setError(false);
			setFormValue(initialState);
		}
	};

	return (
		<div className="mt-6">
			<h3 className="text-xl mb-4">Add Comment</h3>
			<form className="flex flex-col" onSubmit={submitForm}>
				<input
					className="form-input"
					type="number"
					placeholder="ID"
					name="id"
					value={formValue.id}
					onChange={e =>
						setFormValue({ ...formValue, id: parseInt(e.target.value) })
					}></input>
				{error && (
					<span className="text-red-500">
						A comment with ID {formValue.id} already exists.
					</span>
				)}
				<textarea
					className="form-input"
					name="body"
					placeholder="Comment here..."
					rows="6"
					value={formValue.body}
					onChange={e =>
						setFormValue({ ...formValue, body: e.target.value })
					}></textarea>
				<button
					className="w-fit bg-blue-200 px-8 py-2 rounded-md font-medium hover:bg-blue-400 duration-150 transition-colors"
					type="submit">
					Add Comment
				</button>
			</form>
		</div>
	);
};

export default Form;
