import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			ip: "192.168.1.2",
			port: "8008",
			username: "popcorn",
			password: "popcorn"
		};

		this.handleConfigChange = this.handleConfigChange.bind(this);
	}

	handleConfigChange(name,value) {
		this.setState({
			[name]: value
		});
	}

	ping() {
		console.log('hola');
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-xs-12">
						<h1>Crispetes</h1>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12">
						<ConfigForm config={this.state} onConfigChange={this.handleConfigChange} />
					</div>
				</div>

				<div className="row">
					<div className="col-xs-12">
						<Keypad config={this.state} />
					</div>
				</div>			
			</div>
		);
	}
}

class ConfigForm extends React.Component {
	constructor(props) {
		super(props);

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event) {
		const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
		this.props.onConfigChange(event.target.name, value);
	}

	handleSubmit(event){
		event.preventDefault();
		console.log(this.props.config);
	}

	render() {
		return (
			<div>
				<a className="btn btn-default btn-sm" role="button" data-toggle="collapse" href="#settings" aria-expanded="false" aria-controls="settings">
	  				<span className="glyphicon glyphicon-cog" aria-hidden="true"></span>
				</a>
				<div className="collapse" id="settings">
					<form onSubmit={this.handleSubmit}>
						<fieldset>
							<legend>Settings</legend>

							<div className="form-group">
								<label htmlFor="ip">Local IP Address</label>
								<input onChange={this.handleInputChange} defaultValue={this.props.config.ip} type="text" id="ip" name="ip" className="form-control" placeholder="192.168.1.2" />
							</div>
							
							<div className="form-group">
								<label htmlFor="port">HTTP API Port</label>
								<input onChange={this.handleInputChange} defaultValue={this.props.config.port} type="text" id="port" name="port" className="form-control" placeholder="8008" />
							</div>

							<div className="form-group">
								<label htmlFor="username">HTTP API Username</label>
								<input onChange={this.handleInputChange} defaultValue={this.props.config.username} type="text" id="username" name="username" className="form-control" placeholder="popcorn" />
							</div>

							<div className="form-group">
								<label htmlFor="password">HTTP API Password</label>
								<input onChange={this.handleInputChange} defaultValue={this.props.config.password} type="text" id="password" name="password" className="form-control" placeholder="popcorn" />
							</div>

							<button type="submit" className="btn btn-success">Save</button>
						</fieldset>
					</form>
				</div>
			</div>
		);
	}	
}

class Keypad extends React.Component {
	render() {
		return (
			<div>
				<div className="row">
					<div className="col-xs-4">
						<Button config={this.props.config} caption="Movies" action="movieslist" className="btn-primary btn-lg" />
					</div>
					<div className="col-xs-4">
						<Button config={this.props.config} caption="Series" action="showslist" className="btn-primary btn-lg" />
					</div>
					<div className="col-xs-4">
						<Button config={this.props.config} caption="Anime" action="animelist" className="btn-primary btn-lg" />
					</div>
				</div>

				<div className="row">
					<div className="col-xs-12">
						<Button config={this.props.config} caption="Play" action="toggleplaying" className="btn-success btn-lg" />
					</div>
				</div>
				
				<div className="row">
					<div className="col-xs-2">
						<Button config={this.props.config} caption="Favourite" action="togglefavourite" className="btn-primary btn-lg" />
					</div>
					<div className="col-xs-8">
						<Button config={this.props.config} caption="Up" action="up" className="btn-primary btn-lg" />
					</div>
					<div className="col-xs-2">
						<Button config={this.props.config} caption="Watched" action="togglewatched" className="btn-primary btn-lg" />
					</div>
				</div>
				<div className="row">
					<div className="col-xs-4">
						<Button config={this.props.config} caption="Left" action="left" className="btn-primary btn-lg" />
					</div>
					<div className="col-xs-4">
						<Button config={this.props.config} caption="OK" action="enter" className="btn-primary btn-lg" />
					</div>
					<div className="col-xs-4">
						<Button config={this.props.config} caption="Right" action="right" className="btn-primary btn-lg" />
					</div>
				</div>
				<div className="row">
					<div className="col-xs-2">
						<Button config={this.props.config} caption="Quality" action="togglequality" className="btn-primary btn-lg" />
					</div>
					<div className="col-xs-8">
						<Button config={this.props.config} caption="Down" action="down" className="btn-primary btn-lg" />
					</div>
					<div className="col-xs-2">
						<Button config={this.props.config} caption="Fullscreen" action="togglefullscreen" className="btn-primary btn-lg" />
					</div>
				</div>

				<div className="row">
					<div className="col-xs-4">
						<Button config={this.props.config} caption="Watchlist" action="showwatchlist" className="btn-primary btn-lg" />
					</div>

					<div className="col-xs-4">
						<Button config={this.props.config} caption="Favourites" action="showfavourites" className="btn-primary btn-lg" />
					</div>

					<div className="col-xs-4">
						<Button config={this.props.config} caption="Search" action="search" className="btn-primary btn-lg" />
					</div>
				</div>
			</div>
		);
	}
}

function popcornCall(ip,port,username,password,action){
	var url = 'http://'+ip+':'+port
	var response = fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Basic '+btoa(username+':'+password), 
		},
		body: JSON.stringify({"jsonrpc": "2.0", "method": action, "params": [], "id": 1})
	})
	.then((response) => response.json())
	.catch((error) => {
		return false;
	});

	return response;
}

class Button extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		popcornCall(this.props.config.ip,this.props.config.port,this.props.config.username,this.props.config.password,this.props.action);
	}

	render() {
		return (
			<button onClick={this.handleClick} className={"btn btn-block "+this.props.className} type="submit">{this.props.caption}</button>
		);
	}
}

// ========================================
setInterval(App.ping, 1000);

ReactDOM.render(
	<App />,
	document.getElementById('root')
);