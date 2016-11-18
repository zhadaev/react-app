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

var AddNewsItem = React.createClass({

	getInitialState: function() {
		return {
			isBtnDisabled: true
		}
	},

	componentDidMount: function() {
		ReactDOM.findDOMNode(this.refs.newsHeader).focus();
	},

	addNews: function(){
		var newsTitle = ReactDOM.findDOMNode(this.refs.newsHeader).value,
			newsContent = ReactDOM.findDOMNode(this.refs.newsContent).value;

		if (newsTitle.trim() && newsContent.trim()) {
			alert(newsTitle + '\n' +  newsContent);
		} else {
			alert('All fields are required');
		}

		alert(newsTitle + '\n' +  newsContent);
	},

	onTermsChange: function(e){
		//ReactDOM.findDOMNode(this.refs.addBtn).disabled = ! e.target.checked;

		this.setState({
			isBtnDisabled: false
		});
	},

	render: function(){
		return (
			<div>
				<input
					type="text"
					defaultValue = ""
					ref = "newsHeader"
					placeholder="Input news title"
				/><br/>
				<textarea
					defaultValue=""
					ref="newsContent"
					placeholder="Input news content"
				></textarea><br/>
				<label>
					<input type="checkbox" onChange={this.onTermsChange} />
						I agree with terms
				</label><br/>
				<button onClick={this.addNews} disabled={this.state.isBtnDisabled}>Add news item</button>
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
		this.setState({visible: true});
	},

	render: function(){
		var title   = this.props.data.title,
			preview = this.props.data.preview,
			content = this.props.data.content,
			visible = this.state.visible;

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
				<AddNewsItem />
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