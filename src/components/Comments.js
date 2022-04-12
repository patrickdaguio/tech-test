const Comments = ({ comment }) => {
	return (
		<article className="bg-gray-200 mb-4 p-6 rounded-md">
			<h3 className="text-xl">Post {comment.postId} Comments:</h3>
			<p className="my-3">{comment.body}</p>
			<span className="text-xs text-gray-600">
				Comment ID: {comment.id} | Comment Post ID: {comment.postId}
			</span>
		</article>
	);
};

export default Comments;
