var root = document.getElementById('root'),
news = [
	{
		title: 'First news',
		preview: 'Lorem ipsum dolor sit amet',
		content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita maxime, nobis magni itaque veritatis autem tenetur cum consequatur nemo error amet ipsam, at reiciendis porro tempora eius doloribus ratione, aperiam.'
	},
	{
		title: 'Second news',
		preview: 'Lorem ipsum dolor sit amet',
		content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita maxime, nobis magni itaque veritatis autem tenetur cum consequatur nemo error amet ipsam, at reiciendis porro tempora eius doloribus ratione, aperiam.'
	},
	{
		title: 'Third news',
		preview: 'Lorem ipsum dolor sit amet',
		content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita maxime, nobis magni itaque veritatis autem tenetur cum consequatur nemo error amet ipsam, at reiciendis porro tempora eius doloribus ratione, aperiam.'
	}
];

var TestInput = React.createClass({

	// getInitialState: function(){
	// 	return {
	// 		inputValue: ''
	// 	}
	// },

	//changeInput: function(e){
		//this.setState({inputValue: e.target.value});
	//},

	showInputValue: function(){
		var someVar = ReactDOM.findDOMNode(this.refs.myTestInput).value;
		console.log(this.refs);
		console.log(someVar);

	},

	render: function(){
		return (
			<div>
				<input
					type="text"
					defaultValue = ""
					ref = "myTestInput"
					placeholder="Input some text..."
				/>
				<button ref="button-ref" onClick={this.showInputValue}>Show Input value</button>
			</div>
		)
	}
});

var Article =  React.createClass({
	getInitialState: function(){
		return {
			visible: false
		}
	},

	showNewsContent: function(e){
		e.preventDefault();
		this.setState({visible: true}, function(){
			console.log('visible state changed'); // callback function
		});
	},

	render: function(){
		var title   = this.props.data.title,
			preview = this.props.data.preview,
			content = this.props.data.content,
			visible = this.state.visible;

		//console.log('render', this);

		return (
			<div>
				<h3 className="news-item__title">{title}</h3>
				<div className="news-item__preview">{preview}</div>
				<a href="#" className={"news-item__more" + (visible ? ' hidden' : '')} onClick={this.showNewsContent}>Подробнее</a>
				<div className={"news-item__content" + (visible ? '' : ' hidden')}>{content}</div>
			</div>
		);
	}
});

var News = React.createClass({
	propTypes: {
		data: React.PropTypes.array.isRequired
	},

	getInitialState: function(){
		return {
			counter: 0
		}
	},

	incrementCounter: function(e){
		e.preventDefault();
		this.setState({counter: ++this.state.counter});
	},

	render: function(){
		var data = this.props.data,
		newsItems;

		if (data.length > 0) {
			newsItems = data.map(function(item, index){
				return (
				<div className="news-item" key={index}>
					<Article data={item} />
				</div>
				);
			});
		} else {
			newsItems = <div>There is no news</div>;
		}

		return (
			<div className="news-wrapper">
				<h2 className="news-header">News block header</h2>
					{newsItems}
				<hr/>
				<div className="counter-wrapper">Now counter equals to {this.state.counter}</div>
				<button onClick={this.incrementCounter}>+1</button>
			</div>
		);
	}
});

var App = React.createClass({
	render: function(){
		return (
			<div className="app-wrapper">
				<h1 className="app-header">App header</h1>
				<hr/>
				<TestInput />
				<hr/>
				<News data={news}/>
				<hr/>
			</div>
		);
	}
});

ReactDOM.render(
	<App />,
	root
);