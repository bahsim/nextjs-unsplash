import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router';

import '../styles/main.scss'

const clientId = 'ACCESS_KEY'

const handleSubmit = (e) => {
	const { value } = e.target.input;
	e.preventDefault();
	if (value.trim() === '') return;
	Router.router.push(`/gallery/${value.trim()}`);
}

const Index = (props) => (
	<div>
		<form onSubmit={handleSubmit} className="search search-center">
			<input 
				type="text" 
				name="input" 
				className="search__input" 
				placeholder="Поиск..."
				autoComplete="off"
			/>
			<button type="submit" className="search__button">
				&#10004;
			</button>
		</form>
		<div className="search-photo search-center">
			<img src={props.photo.urls.regular} />
		</div>
	</div>
)

Index.getInitialProps = async () => {
  
	const res = await fetch(`https://api.unsplash.com/photos/random?client_id=${clientId}`)
	const data = await res.json()
	
  return {
		photo: data
	}
}

export default Index