import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Wrapper from './components/CommentForm/CommentFormWrapper'
import CommentList from './components/Comments/Comment'

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {}
	}

	componentDidMount() {
		fetch(this.props.apiUrl + '/comments/' + this.props.recipeId)
			.then(response => response.json())
			.then(json => this.setState({ comments: json }))

		const loggedInUser = localStorage.getItem('loggedInUser')
		this.setState({ loggedInUser })
	}

	submitComment = comment => {
		if (comment.length < 1) return

		const endpoint = this.props.apiUrl + '/comments/create'

		const postData = {
			comment,
			user_id: this.state.loggedInUser,
			recipe_id: this.props.recipeId
		}

		fetch(endpoint, {
			method: 'POST',
			body: JSON.stringify(postData)
		})
			.then(response => {
				if (response.ok) {
					return response.json()
				}
				throw new Error('Comment could not be uploaded')
			})
			.then(comment =>
				this.setState(state => {
					const comments = state.comments
					return { comments: [...comments, comment] }
				})
			)
			.catch(console.error)
	}

	deleteComment = (user_id, commentId) => {
		const endpoint = this.props.apiUrl + '/comments/delete/' + commentId

		const postData = { user_id }

		console.log(endpoint)

		fetch(endpoint, {
			method: 'POST',
			body: JSON.stringify(postData)
		})
			.then(response => {
				if (response.ok) {
					return response.json()
				}
				throw new Error('Comment could not be deleted')
			})
			.then(
				this.setState(state => ({
					comments: state.comments.filter(
						({ id }) => id !== commentId
					)
				}))
			)
			.catch(console.error)
	}

	submitLogin = (username, password, errorFun) => {
		const endpoint = this.props.apiUrl + '/auth/login'

		const postData = { username, password }

		fetch(endpoint, {
			method: 'POST',
			body: JSON.stringify(postData)
		})
			.then(response => {
				if (response.ok) {
					return response.json()
				}
				throw new Error('Comment could not be deleted')
			})
			.then(user => {
				localStorage.setItem('loggedInUser', user.id)
				this.setState({ loggedInUser: user.id })
			})
			.catch(error => {
				console.error(error)
				errorFun()
			})
	}

	submitRegister = (username, password, errorFun) => {
		const endpoint = this.props.apiUrl + '/auth/register'

		const postData = { username, password }
		fetch(endpoint, {
			method: 'POST',
			body: JSON.stringify(postData)
		})
			.then(response => {
				if (response.ok) {
					return response.json()
				}
				throw new Error('Comment could not be deleted')
			})
			.then(user => {
				localStorage.setItem('loggedInUser', user.id)
				this.setState({ loggedInUser: user.id })
			})
			.catch(error => {
				console.error(error)
				errorFun()
			})
	}

	logout = () => {
		localStorage.removeItem('loggedInUser')
		this.setState({ loggedInUser: undefined })
	}

	render() {
		return (
			<React.Fragment>
				<h2 className="user-comment-section__title">Comments</h2>
				<div className="user-comment-section__container">
					<Wrapper
						loggedInUser={this.state.loggedInUser}
						apiUrl={this.props.apiUrl}
						submitComment={this.submitComment}
						submitLogin={this.submitLogin}
						submitRegister={this.submitRegister}
						logout={this.logout}
					/>
					{this.state.comments ? (
						<CommentList
							comments={this.state.comments}
							loggedInUser={this.state.loggedInUser}
							deleteComment={this.deleteComment}
						/>
					) : (
						<div className="user-comment">Fetching comments...</div>
					)}
				</div>
			</React.Fragment>
		)
	}
}

const showApp = (apiUrl, recipeId, element) => {
	ReactDOM.render(<App apiUrl={apiUrl} recipeId={recipeId} />, element)
}

module.exports = showApp
