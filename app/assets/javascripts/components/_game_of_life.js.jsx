var events = {};

var Cell = React.createClass({
	getInitialState: function() {
		return {selected: false, nextState: false};
	},
	isSelected: function(row, col) {
		var grid_dim = Math.sqrt(this.props.cells.length);

		if(row == -1)
			row = grid_dim-1;
		if(row == grid_dim) 
			row = 0;

		if(col == -1)
			col = grid_dim-1;
		if(col == grid_dim)
			col = 0;

		var id = (row * grid_dim) + col;
		return this.props.cells[id].state.selected;
	},
	calculate: function() {
		var neighbors = 0;
		var grid_dim = Math.sqrt(this.props.cells.length);
		var row = Math.floor(this.props.id / grid_dim);
		var col = this.props.id - (row * grid_dim);

		// calculate number of neighbors
		if(this.isSelected(row-1, col))
			neighbors++;
		if(this.isSelected(row-1, col+1))
			neighbors++;
		if( this.isSelected(row-1, col-1))
			neighbors++;

		if(this.isSelected(row, col+1))
			neighbors++;
		if(this.isSelected(row, col-1))
			neighbors++;

		if(this.isSelected(row+1, col))
			neighbors++;
		if(this.isSelected(row+1, col+1))
			neighbors++;
		if(this.isSelected(row+1, col-1))
			neighbors++;

		// assign nextState to the cell based on number of neighbors
		this.state.nextState = false;
		if(this.state.selected) {
			if(neighbors == 2 || neighbors == 3)
				this.state.nextState = true;
			else
				this.state.nextState = false;
		} else {
			if(neighbors == 3)
				this.state.nextState = true;
		}
	},
	renderNext: function() {
		this.setState({selected: this.state.nextState});
	},
	componentDidMount: function() {
		this.props.cells[this.props.id] = this; // put cell object in the global array
		$(events).on("calculate", this.calculate);
		$(events).on("renderNext", this.renderNext);
	},
	onClick: function(e) {
		this.setState({selected: !this.state.selected}) // toggle state on click
	},
	render: function() {
		return(
			<div className={this.state.selected ? 'grid_cell active' : 'grid_cell'} onClick={this.onClick}></div>
		);
	}
});

var Box = React.createClass({
	getInitialState: function() {
		var cells_arr = [];
		for(var i=0; i<100; i++) {
			cells_arr.push(<Cell key={i} id={i} cells={cells_arr} />);
		}
		return {cells: cells_arr};
	},
	render: function() {
		return(
			<div>{this.state.cells}</div>
		);
	}
});

// calculate and render next state on spacebar press
$(document).keydown(function(e) {
	if(e.which == 32) { // spacebar
		$(events).trigger("calculate");
		$(events).trigger("renderNext");
	}
});
