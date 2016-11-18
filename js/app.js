var root = document.getElementById('root'),
	ee = new EventEmitter(),
	startNews = [
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
			isBtnDisabled: true,
			emptyTitle: true,
			emptyNewsContent: true
		}
	},

	componentDidMount: function() {
		ReactDOM.findDOMNode(this.refs.newsHeader).focus();
	},

	addNews: function(e){
		e.preventDefault();
		var newsTitle = ReactDOM.findDOMNode(this.refs.newsHeader).value,
			newsContent = ReactDOM.findDOMNode(this.refs.newsContent).value,
			item = [{
				title: newsTitle,
				content: newsContent,
				ellipsis: '...'
			}];

		ee.emit('News.add', item);

		// newsTitle.value = '';
		// newsContent.value = '';

		// this.setState({
		// 	emptyTitle: true,
		// 	emptyNewsContent: true
		// });


	},

	onTermsChange: function(e){
		//ReactDOM.findDOMNode(this.refs.addBtn).disabled = ! e.target.checked;
		this.setState({
			isBtnDisabled: !this.state.isBtnDisabled
		});
	},

	onFieldChange: function(fieldName, e){
		var next = {};
		if (e.target.value.trim().length > 0) {
			next[fieldName] = false;
			this.setState(next);
		} else {
			next[fieldName] = true;
			this.setState(next);
		}
	},

	render: function(){
		return (
			<div>
				<input
					type="text"
					onChange={this.onFieldChange.bind(this, 'emptyTitle')}
					ref = "newsHeader"
					placeholder="Input news title"
				/><br/>
				<textarea
					onChange={this.onFieldChange.bind(this, 'emptyNewsContent')}
					ref="newsContent"
					placeholder="Input news content"
				></textarea><br/>
				<label>
					<input type="checkbox" onChange={this.onTermsChange} />
						I agree with terms
				</label><br/>
				<button onClick={this.addNews} disabled={
					this.state.isBtnDisabled ||
					this.state.emptyTitle ||
					this.state.emptyNewsContent
				}>Add news item</button>
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
	getInitialState: function(){
		return {
			news: startNews
		}
	},

	componentDidMount: function(){
		var self = this;
		ee.addListener('News.add', function(item){
			var nextNews = item.concat(self.state.news);
			self.setState({news: nextNews});
		});
	},

	componentWillUnmount: function(){
		window.ee.removeListener('News.add')
	},

	render: function(){
		return (
			<div className="app-wrapper">
				<h1 className="app-header">App header</h1>
				<hr/>
				<AddNewsItem />
				<hr/>
				<News data={this.state.news}/>
				<hr/>
			</div>
		);
	}
});

ReactDOM.render(
	<App />,
	root
);