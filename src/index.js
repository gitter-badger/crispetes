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

	render() {
		return (
			<div>
				<nav className="navbar navbar-toggleable-xl navbar-inverse bg-inverse">
					<a className="navbar-brand" href="#logo"><img alt="Brand" src="/img/favicon.png" /></a>
 					
 					<div className="ml-auto">
						<ConfigForm config={this.state} onConfigChange={this.handleConfigChange} />
					</div>
				</nav>

				<Keypad config={this.state} />
				
				<div className="content-fluid footer">
					<div className="row">
						<div className="col">
							<Button config={this.state} icon="inbox" action="showwatchlist" className="btn-link btn-lg" />
						</div>
						<div className="col">
							<Button config={this.state} icon="heart" action="showfavourites" className="btn-link btn-lg" />
						</div>
						<div className="col">
							<Button config={this.state} icon="search" action="search" className="btn-link btn-lg" />
						</div>
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
				<button type="button" className="btn btn-outline-secondary" data-toggle="modal" data-target="#configModal"><span className="fa fa-cog"></span></button>

				<div className="modal fade" id="configModal" role="dialog" aria-labelledby="configModalLabel" aria-hidden="true">
					<div className="modal-dialog modal-sm" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h6 className="modal-title modal-title" id="configModalLabel">Settings</h6>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<form onSubmit={this.handleSubmit}>
									<div className="form-group row">
										<label htmlFor="ip" className="col-4 col-form-label col-form-label-sm">Local IP Address</label>
										<div className="col-8">
											<input onChange={this.handleInputChange} defaultValue={this.props.config.ip} type="text" id="ip" name="ip" className="form-control form-control-sm" placeholder="192.168.1.2" />
										</div>
									</div>
									
									<div className="form-group row">
										<label htmlFor="port" className="col-4 col-form-label col-form-label-sm">HTTP API Port</label>
										<div className="col-8">
											<input onChange={this.handleInputChange} defaultValue={this.props.config.port} type="text" id="port" name="port" className="form-control form-control-sm" placeholder="8008" />
										</div>
									</div>

									<div className="form-group row">
										<label htmlFor="username" className="col-4 col-form-label col-form-label-sm">HTTP API Username</label>
										<div className="col-8">
											<input onChange={this.handleInputChange} defaultValue={this.props.config.username} type="text" id="username" name="username" className="form-control form-control-sm" placeholder="popcorn" />
										</div>
									</div>

									<div className="form-group row">
										<label htmlFor="password" className="col-4 col-form-label col-form-label-sm">HTTP API Password</label>
										<div className="col-8">
											<input onChange={this.handleInputChange} defaultValue={this.props.config.password} type="text" id="password" name="password" className="form-control form-control-sm" placeholder="popcorn" />
										</div>
									</div>
								</form>
							</div>
							<div className="modal-footer">
								<button type="button" data-dismiss="modal" className="btn btn-primary btn-sm">Save changes</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}	
}

class Keypad extends React.Component {
	render() {
		return (
			<div className="keypad container-fluid">
				<div className="row">
					<ul className="col filter-bar nav nav-justified">
  						<li className="nav-item active">
							<Button btype="link" config={this.props.config} caption="Movies" action="movieslist" />
						</li>
						<li className="nav-item">
							<Button btype="link" config={this.props.config} caption="Series" action="showslist" />
							</li>
						<li className="nav-item">
							<Button btype="link" config={this.props.config} caption="Anime" action="animelist" />
						</li>
					</ul>
				</div>
				{/*
				<div className="row">
					<div className="col-12">
						<Button config={this.props.config} icon="play" action="toggleplaying" className="btn-success btn-lg" />
					</div>
				</div>
				*/}

				<div className="row">
					<div className="col-3">
						<Button config={this.props.config} icon="arrow-left" action="back" className="btn-primary btn-lg" />
					</div>
					<div className="col-3">
						<Button config={this.props.config} action="togglefullscreen" icon="arrows-alt" className="btn-success btn-lg" />
					</div>
					<div className="col-3">
						<Button config={this.props.config} icon="toggle-up" action="previousseason" className="btn-primary btn-lg" />
					</div>
					<div className="col-3">
						<Button config={this.props.config} icon="toggle-down" action="nextseason" className="btn-primary btn-lg" />
					</div>
				</div>

				<div className="cursors">
					<div className="row">
						<div className="col">
							<Button config={this.props.config} action="up" icon="caret-up" className="btn-link btn-lg" />	
						</div>
					</div>
					<div className="row">
						<div className="col"></div>
						<div className="col">
							<Button config={this.props.config} action="left" icon="caret-left" className="btn-link btn-lg" />
						</div>
						<div className="col">
							<Button config={this.props.config} icon="play" action="enter" className="btn-link btn-lg" />
						</div>
						<div className="col">
							<Button config={this.props.config} action="right" icon="caret-right" className="btn-link btn-lg" />
						</div>
						<div className="col"></div>
					</div>
					<div className="row">
						<div className="col">
							<Button config={this.props.config} action="down" icon="caret-down" className="btn-link btn-lg" />
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-3">
						<Button config={this.props.config} icon="hd-video" action="togglequality" className="btn-popcorn btn-lg" />
					</div>
					<div className="col-3">
						<Button config={this.props.config} icon="volume-off" action="togglemute" className="btn-info btn-lg" />
					</div>
					<div className="col-3">
						<Button config={this.props.config} icon="heart-o" action="togglefavourite" className="btn-danger btn-lg" />
					</div>
					<div className="col-3">
						<Button config={this.props.config} icon="eye" action="togglewatched" className="btn-warning btn-lg" />
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
		var icon = this.props.icon ?
			<span className={"fa fa-"+this.props.icon} aria-hidden="true"></span> :
			null;

		var className = ((this.props.btype !== 'link') ? "btn btn-block " : '') + this.props.className

		var props = {
			onClick		: this.handleClick,
			className	: className,
		};

		var button = <button {...props}>{icon}{this.props.caption}</button>;
		if (this.props.btype === "link") {
			button = <a href="#" {...props}>{icon}{this.props.caption}</a>;
		}

		return (
			button

		);
	}
}

// ========================================

ReactDOM.render(
	<App />,
	document.getElementById('root')
);