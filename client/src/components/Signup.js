import React, { Component } from 'react'
import { signup } from '../services/auth';

export default class Signup extends Component {

	state = {
		username: '',
		password: '',
		password2: '',
		message: ''
	}

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		})
	}

	handleSubmit = e => {
		e.preventDefault();
		const { username, password, password2 } = this.state;
		signup(username, password, password2)
			.then(response => {
				console.log(response);
				if (response.message) {
					this.setState({
						message: response.message,
						username: '',
						password: '',
						password2: ''
					})
				} else {
					// user is correctly signed up in the backend
					// -> we want to add the user also in the state of App.js
					this.props.setUser(response);
					// redirect to /projects
					this.props.history.push('/projects');
				}
			})
	}

	render() {
		return (
			<>
				<h2>Signup</h2>
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="username"> </label>
					<input
						placeholder='Username'
						type="text"
						name="username"
						value={this.state.username}
						onChange={this.handleChange}
					/>
					<label htmlFor="password"> </label>
					<input
						placeholder='Password'
						type="password"
						name="password"
						value={this.state.password}
						onChange={this.handleChange}
					/>
					<label htmlFor="password2"> </label>
					<input
						placeholder='Repeat your password'
						type="password"
						name="password2"
						value={this.state.password2}
						onChange={this.handleChange}
					/>
					<button type="submit">Signup</button>
					{this.state.message && (
						<h3>{this.state.message}</h3>
					)}
				</form>
			</>
		)

	}
}