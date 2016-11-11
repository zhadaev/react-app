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

var Article =  React.createClass({
	getInitialState() {
		return {
			visible: false
		}
	},

	render: function(){
		return (
			<div>
				<h3 className="news-item__title">{this.props.data.title}</h3>
				<div className="news-item__preview">{this.props.data.preview}</div>
				<a href="#" className="news-item__more">Подробнее</a>
				<div className="news-item__content">{this.props.data.content}</div>
			</div>
		);
	}
});

var News = React.createClass({
	propTypes: {
		data: React.PropTypes.array.isRequired
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