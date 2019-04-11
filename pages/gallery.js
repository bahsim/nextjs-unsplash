import { Component } from 'react';
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import Modal from 'react-modal';
import Router from 'next/router';

import '../styles/main.scss'

const clientId = 'ACCESS_KEY'

class Gallery extends Component {
	state = {
		openPhoto: false,
		photoUri: null
	}
	componentDidMount() {
    Modal.setAppElement('body');
	}
	handleOpenPhoto = (photo) => {
		this.setState({openPhoto: true, photoUri: photo.regular})
	}
	handleSubmit = (e) => {
		const { value } = e.target.input;
		e.preventDefault();
		if (value.trim() === '') return;
		Router.router.push(`/gallery/${value.trim()}`);
	}
	handleClosePhoto = (photo) => {
		this.setState({openPhoto: false, photoUri: null})
	}
	render() {
		const { photos } = this.props;
		return (
			<div>
				{!this.state.openPhoto &&
					<form onSubmit={this.handleSubmit} className="search search-top">
						<input 
							type="text" 
							name="input" 
							defaultValue={this.props.phrase}
							className="search__input" 
							placeholder="Поиск..."
							autoComplete="off"
						/>
						<button type="submit" className="search__button">
							&#10004;
						</button>
					</form>
				}
				<div className="gallery">
					<div className="gallery-row">
						<img src={photos[0].small} onClick={() => this.handleOpenPhoto(photos[0])} />
						<img src={photos[3].small} onClick={() => this.handleOpenPhoto(photos[3])} />
						<img src={photos[6].small} onClick={() => this.handleOpenPhoto(photos[6])} />
						<img src={photos[9].small} onClick={() => this.handleOpenPhoto(photos[9])} />
					</div>
					<div className="gallery-row">
						<img src={photos[1].small} onClick={() => this.handleOpenPhoto(photos[1])} />
						<img src={photos[4].small} onClick={() => this.handleOpenPhoto(photos[4])} />
						<img src={photos[7].small} onClick={() => this.handleOpenPhoto(photos[7])} />
					</div>
					<div className="gallery-row">
						<img src={photos[2].small} onClick={() => this.handleOpenPhoto(photos[2])} />
						<img src={photos[5].small} onClick={() => this.handleOpenPhoto(photos[5])} />
						<img src={photos[8].small} onClick={() => this.handleOpenPhoto(photos[8])} />
					</div>
				</div>
				<Modal
          isOpen={this.state.openPhoto}
          onRequestClose={this.closeModal}
        >
					<img 
						className="modal-picture"
						src={this.state.photoUri} 
						onClick={() => this.handleClosePhoto(photos[0])} 
					/>
        </Modal>
			</div>	
		)
	}
}

Gallery.getInitialProps = async (context) => {
  const { value } = context.query
  
	const res = await fetch(`https://api.unsplash.com/search/photos/?page=1&query=${value}&client_id=${clientId}`)
	const data = await res.json()
	
	const photos = data.results.map(entry => entry.urls)
	if (photos.length < 10) {
		for (let i=photos.length; i<10; i++) {
			photos[i] = {small: null, regular: null};
		}
	}
	// console.log(photos);
	
  return {
		photos: photos,
		phrase: value
  }
}

export default Gallery