import { RepositoryItem } from './RepositoryItem';
import '../styles/repositories.scss';
import { useEffect, useState } from 'react';

export function RepositoryList() {
	const [repositories, setRepositories] = useState<Repository[]>([]);
	const [user, setUser] = useState<string>('leomirada');
	const [urlAPI, setUrlAPI] = useState<string>(
		'https://api.github.com/users/leomiranda/repos'
	);

	interface Repository {
		name: string;
		description: string;
		html_url: string;
	}

	useEffect(() => {
		fetch(urlAPI)
			.then((response) => response.json())
			.then((data) => setRepositories(data));
	}, [urlAPI]);

	function fetchRepos(user: string) {
		setUrlAPI(`https://api.github.com/users/${user}/repos`);
	}

	return (
		<section className='repository-list'>
			<div className='input-group'>
				<input
					name='user'
					type='text'
					value={user}
					placeholder={user}
					onChange={(e) => setUser(e.target.value)}
					onKeyUp={(e) => e.key === 'Enter' && fetchRepos(user)}
				/>
				<button
					type='button'
					onClick={() => user.length > 0 && fetchRepos(user)}
				>
					Search Repo
				</button>
			</div>
			<h1>Repository List</h1>

			<ul>
				{repositories.map((repository) => (
					<RepositoryItem key={repository.name} repository={repository} />
				))}
			</ul>
		</section>
	);
}
