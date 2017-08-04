var Body = React.createClass({
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="text-center">
						<Header />
					</div>
				</div>

				<div className="row">
					<div id="grid" className="center"><Box /></div>
				</div>
			</div>
		);
	}
});
