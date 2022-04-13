import { useContext, useState } from 'react';
import { DataContext } from '../App';
import Comments from './Comments';
import Form from './Form';
import { Link, useParams } from 'react-router-dom';
import Error from './Error';

const Post = () => {
	const { id } = useParams();
	const { posts, comments } = useContext(DataContext);
	const [showComments, setShowComments] = useState(false);

	// Filters database to fetch comments specific to post
	function filterComments() {
		return comments.filter(comment => comment.postId === parseInt(id));
	}

	let totalComments = filterComments();

	// Filters database to fetch the specified post
	function filterPosts() {
		return posts.filter(post => post.id === parseInt(id));
	}

	let filteredPost = filterPosts();

	if (!id) return <Error />;

	return (
		<section className="posts">
			<h2 className="text-2xl font-semibold mr-2 last:mr-0">
				{filteredPost[0].title}
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

			{
				// Checks if comment sections has been toggled
				showComments && (
					<>
						<div className="mt-5">
							{
								// Checks to see if comments exists within post
								totalComments.length > 0 ? (
									totalComments.map(comment => (
										<Comments comment={comment} key={comment.id} />
									))
								) : (
									<h3>There are no comments to display for post {id}</h3>
								)
							}
						</div>
						<Form postId={parseInt(id)} />
					</>
				)
			}
			<h3 className="mt-4 underline text-blue-800">
				<Link to="/">Go Back</Link>
			</h3>
		</section>
	);
};

export default Post;
