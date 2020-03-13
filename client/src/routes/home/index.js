import { h } from 'preact';
import style from './style';

const Home = () => (
	<div class={style.home}>
		<h1 className="text-3xl font-bold">Home</h1>
		<p className="text-gray-700 mb-4">This is the Home component.</p>
		<button className="px-4 h-10 bg-purple-700 hover:bg-purple-800 text-white rounded">
			Take me home
		</button>
	</div>
);

export default Home;
