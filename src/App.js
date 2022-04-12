import { useEffect, useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import PostsContainer, { Posts } from './components/PostsContainer';
import Title from './components/Title';

export const DataContext = createContext();

function App() {
	const [posts, setPosts] = useState({});
	const [comments, setComments] = useState({});

	const getData = () => {
		fetch('data.json', {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		})
			.then(res => res.json())
			.then(db => {
				setPosts(db.posts);
				setComments(db.comments);
			});
	};

	const addComment = newComment => {
		setComments(prevComments => [...prevComments, newComment]);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<DataContext.Provider value={{ posts, comments, addComment }}>
			<div className="container mx-auto pt-6 pb-10">
				<Title />
				<Routes>
					<Route path="/" element={<PostsContainer />} />
					<Route path="/posts/:post" element={<Posts />} />
				</Routes>
			</div>
		</DataContext.Provider>
	);
}

export default App;
