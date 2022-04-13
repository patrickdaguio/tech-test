import { useContext, useState } from 'react';
import { DataContext } from '../App';
import Comments from './Comments';
import Form from './Form';
import { Link } from 'react-router-dom';

const PostsContainer = () => {
	const { posts, comments } = useContext(DataContext);
	return (
		<div className="posts-container">
			{
				// Makes sure data has been properly fetched before running any code that uses it
				posts &&
					comments &&
					comments.length > 0 &&
					posts.length > 0 &&
					posts.map(post => {
						let { id, title } = post;
						return <Posts id={id} title={title} key={id} comments={comments} />;
					})
			}
		</div>
	);
};

export const Posts = ({ id, title, comments }) => {
	const [showComments, setShowComments] = useState(false);

	function filterComments() {
		return comments.filter(comment => comment.postId === id);
	}

	let totalComments = filterComments();

	return (
		<section className="posts">
			<h2 className="text-2xl font-semibold border-b-2 mr-2 last:mr-0">
				<Link to={`/posts/${id}`}>{title}</Link>
			</h2>
			<p className="text-lg my-2">ID: {id}</p>
			<button
				className={
					!showComments
						? 'post-button bg-gray-300  hover:bg-gray-200'
						: 'post-button bg-gray-200 hover:bg-gray-300 '
				}
				onClick={() => setShowComments(!showComments)}>
				Show Comments ({totalComments.length})
			</button>
			{showComments && (
				<>
					<div className="mt-5">
						{totalComments.length > 0 ? (
							totalComments.map(comment => (
								<Comments comment={comment} key={comment.id} />
							))
						) : (
							<h3>There are no comments to display for post {id}</h3>
						)}
					</div>
					<Form postId={id} />
				</>
			)}
		</section>
	);
};

export default PostsContainer;
