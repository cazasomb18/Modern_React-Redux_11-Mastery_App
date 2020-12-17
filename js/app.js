//////////////////////////////////////////////////////////////////////////////////////////
//Let's Text your React Mastery

//App overview
	//We will construct an app that tests the basic concepts that we've just learned, 

	//We're going to make a YouTube Browser Application

		//Top: search bar triggered by the enter key that will trigger a youtube API search

		//Results will be stacked in a list of items stacked to the right.

		//When video is clicked we will show a video in the center of the screen




//////////////////////////////////////////////////////////////////////////////////////////
//Component Design

	//SearchBar - identical in functionality to the previous SearchBar we designed:
		//Show text input, that user can type into there to update state
		//On ENTER will trigger a form submit event
		//Submit search term to parent component and use that term to make an API request

	//VideoDetail - Responsible for actually showing a video played tthat can play the video
		//Title and details shown underneath the video
			//**need to figure out how to embed youtube video in your application...

	//VideoList - will render all the search results in a list to aligned right
		//VideoItem - each individual list item from the VideoList


	//Component Hierarchy 
		//App - resp for holding all state, retrieving list of videos, storing current term
				//--> Configures VideoDetail and VideoList by passing props down to those components

			//VideoDetail (Child of App)
			//VideoList (Child of App)
				//VideoItem (child of VideoList)



//////////////////////////////////////////////////////////////////////////////////////////
//Scaffolding the App
	//In general - we will move much more quickly in building this app.

	//1. Delete contents of src dir, add index.js, add boiler plate
	//2. Create src/components dir, place App.js inside components.js
	//3. Make app.js class-based component that returns <div>APP</div>
	//4. Create SearchBar.js class-based compo in src/components dir, return <div>SearchBar</div>
	//5. Import SearchBar in index.js and replace 'APP' text w/ <SearchBar/>


//////////////////////////////////////////////////////////////////////////////////////////
//Reminder on Event Handlers

	//Don't forget to import semantic ui! (public/index.html)

	//In SearchBar.js, build out component w/ semantic ui classes:
		<div className="search-bar ui segment">
			<form className="ui form">
				<div className="field">
					<label>VIDEO SEARCH</label>
					<input type="text"/>
				</div>
			</form>
		</div>

	//Add semantic ui className to div @ index.js:
		<div className="ui container"></div>


	//Make SearchBar.js a 'controlled' component:
		//initialize state @ an empty string: state = {term: ''};
		//set value on <input/> to this.state.term
		//add onChange event handler to <input/>: onChange={this.onInputChange}
		//add onInputChange as an arrow function for callback use in form: onInputChange = () => {};


//////////////////////////////////////////////////////////////////////////////////////////
//Handling Form Submittal

	//Process
		//onInputchange: will be called with an {event } object, we want to take the value out of that property,
		//and assign it to our state object:
		onInputChange = (e) => {
			this.setState({ term: e.target.value })
		};
				//REMEMBER: VALUE OF 'this' in CALLBACK, this is why we're using arrow func notation here  

		//Now we want to assign a callback handler to the form element so we can watch for when it's submitted:
			//onSubmit={this.onFormSubmit} 
			//and create same arrow function syntax method below onInputchange, call it onFormSubmit:
		onFormSubmit = (e) => {
			event.preventDefault();
			//prevents browser from refreshing
			//TODO: MAKE SURE WE CALL CALLBACK FROM PARENT COMPONENT
		};
			//eventually we want to make a callback that we're going to pass down into the searchbar


//////////////////////////////////////////////////////////////////////////////////////////
//Accessing YouTube API:
	//We're going to pause developing the SearchBar component and work on the youtube.api:

		//console.developers.google.com > new project > Video Browser > + enable APIS and services

		//search: youtube > Youtube Data API v3 > enable > create credentials (API key) > copy key

		//create directory src/apis/youtube.js
		//create var const KEY = 'yourapikey';

		//In youtube developer's dashboard, you can restrict key, and manage access: 
			//Application Restrictions > HTTP referrers > additem: localhost:3000
				//only can receive requests from localhost:3000


//////////////////////////////////////////////////////////////////////////////////////////
//Note about Axios Version Bug & 400 "Required Parameter: part" Error:
/*Updated 8-25-2020

Important Note - Axios v0.20.0 has been released which resolves this bug. These instructions
will be left up for anyone who may be using older code and versions of the library.

In the upcoming lecture, we will be creating an axios config instance to call the YouTube API.
Starting with release v0.19.0 there is a bug that fails to merge the parameters from the config
instance. This will cause a 400 error failure with the message "Required Parameter : part"

Here are two ways we can deal with this:

1. Install a specific version of axios:

npm install axios@0.20.0

2. Move the Params object to the App.js axios call

This is what your axios code should look like at the end of "Putting it all Together" lecture

apis/youtube.js:

import axios from "axios";
 
export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3"
});
App.js:

import React from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
 
const KEY = "YOUR_KEY";
 
class App extends React.Component {
 
  onTermSubmit = term => {
    youtube.get("/search", {
      params: {
        q: term,
        part: "snippet",
        maxResults: 5,
        key: KEY
      }
    });
  };
...


//This is what your axios code should look like at the end of the project:

apis/youtube.js:

import axios from "axios";
 
export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3"
});
App.js:

import React from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
 
const KEY = "YOUR_KEY";
 
class App extends React.Component {
 
...
 
  onTermSubmit = async term => {
    const response = await youtube.get("/search", {
      params: {
        q: term,
        part: "snippet",
        maxResults: 5,
        type: 'video',
        key: KEY
      }
    });
  };
...*/
//////////////////////////////////////////////////////////////////////////////////////////




//////////////////////////////////////////////////////////////////////////////////////////
//Searching for Videos 

	//Youtube documentation: GET  request endpoint --> https://www.googleapis.com/youtube/v3/search
		//query string parameters:
			//part: 'snippet' --> tells youtube api what info we want to retrieve about each particular video
				//'snippet' --> sends back a summary title of the video
			//maxResults: '25' --> maximum number of results we'll get back from API search
			//q: 'surfing' --> 'queue'

			//We pass them in as params in the configuration object, just as we did with unsplash,
			//We'll create a preconfigured instance of axios just like we did also w/ unsplash:

		import axios from 'axios';
		//import axios 
		export default axios.create({
			baseURL: 'https://www.googleapis.com/youtube/v3',
			params: {
				part: 'snippet',
				maxResults: 5,
				key: KEY
			}
		});
		//export statement w/ custom configured instance of axios, w/ parameters object\

		//remember to install axios --> npm install axios@0.20.0

//////////////////////////////////////////////////////////////////////////////////////////
//NOTE ON ADDING A VIDEO TYPE:
	/*updated 7-16-2020

	At some point in the course you may end up getting Warning: Each child in a list should 
	have a unique "key" prop even after we add a key prop in the "Fixing a Few Warnings" lecture.
	To ensure that this is not an issue, we should add a type parameter to our axios config object 
	to only search for videos and not playlists.

	If your params are in the youtube.js file, add the type parameter like so:

	apis/youtube.js:

	export default axios.create({
	    baseURL: 'https://www.googleapis.com/youtube/v3',
	    params: {
	      part: 'snippet', 
	      type: 'video',
	      maxResults: 5,
	      key: KEY
	  }
	});
	If your params are in the Apps.js component, add the type parameter like so:

	App.js:

	  onTermSubmit = term => {
	    youtube.get("/search", {
	      params: {
	        q: term,
	        part: "snippet",
	        type: 'video',
	        maxResults: 5,
	        key: KEY
	      }
	    });
	  };*/
//////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////
//Putting it All Together - want to reach out to youtube and get results from their API

	//Add callback method to our class App that will be called everytime someone submit searchbar form:
	const onTermSubmit = (term) => {};
		//note the arrow function syntax

	//add prop onFormSubmit to <SearchBar/> from <App/>
		<SearchBar onFormSubmit={this.onTermSubmit}/>
			//typically you want ot name the callback and the property the same thing but we are doing
			//it this way to demonstrate that they do not require equivalent names 
				//equivalent names is a convention that should be followed

	//Invoke callback via props @ searchbar.js in onFormSubmit passing in this.state.term as argument:
		this.props.onTermSubmit(this.state.term);

	//onTermSubmit() in App.js, after importing youtube configuration:
		import youtube from '../apis/youtube';
		youtube.get('/search', {
			params: {
				q: term
			}
		});

	//Now let's make a request in our youtube browser app:
		//make a search on browser
			//console > network > clickrequest > preview tab > items:
				// 0 > id > videoId: "puTqp;oiawolx34os"
					//this is how we'll eventually get the video to play



//////////////////////////////////////////////////////////////////////////////////////////
//Updating State with Fetched Data

	//Now that's we're able to fetch videos from onTermSubmit(){}, we need to:
		//1 - Take the videos received, and set them in state
		//2 - Then render the list on the screen
			//*** an API call is an async operation, anytime make an async operation we need to
			//use promises or async await syntax (async await is way easier)

		//Async Await syntax: 
			//a - initialize state as an empty array: state = { videos: [] };
			//b - make sure onTermSubmit(){} is using arrow function syntax: onTermSubmit = term => {}
			//c - add 'async' and 'const response = await youtube.get...'
			//d - after 'response' clock setState: this.setState({videos: response.data.items})
				//*** to check (after <SearchBar/>: I have {this.state.videos.length} items




//////////////////////////////////////////////////////////////////////////////////////////
//Passing State as Props
	//Now we'll start to create the VideoList and VideoDetail components and connect them:
		// App component will show the VideoList
		// VideoList will then render each VideoItem component

		//1 - Create VideoList.js in components dir:
		//2 - Make functional component that returns div w/ text VideoList and takes in props
		//3 - export default VideoList and import @ App level
		//4 - App.js: add videos prop to VideoList and set value to this.state.videos
		//5 - VideoList.js: return div spits out value of props.videos.length: 



//////////////////////////////////////////////////////////////////////////////////////////
//Rendering a List of Videos
	//1 - Destructure out props object from VideoList.js:
		const VideoList = ({videos}) => {
			return <div>{videos.length}</div>
		};

	//2 - import <VideoItem/> and return component in return statement

	//3 - .map over videos array and set to const var renderedList, return renderedList:
	const VideoList = ({ videos }) => {
		const renderedList = videos.map((video) => {
			return <VideoItem/>;
		})	
		return <div>{renderedList}</div>
	};
		//**will see key-prop warning in console, but should see 'Video Item' printed 5 times



//////////////////////////////////////////////////////////////////////////////////////////
//Rendering Video Thumbnails
	//We're now going to customize each of the VideoItem components, by taking the video 
	//that we're mapping over and passing down as a prop to VideoItem:
		return <VideoItem video={video}/>;

	//VideoItem.js, props.video now contains all the individual info we want to get:
		//Destructure out video:
			const VideoItem = ({ video }) => {}
		//Look @ {} in browser, to get to title: video.snippet.title

	//In VideoItem.js: return div w/ video.snippet.title
		<div>{video.snippet.title}</div>

	//Now, let's add an <img/> tag w/ the src === snippet.thumbnails.medium.url
		<img src={video.snippet.thumbnails.medium.url} />
			//Now we can see the thumbnails on the screen!




//////////////////////////////////////////////////////////////////////////////////////////
//Styling a List
	//We need to add styling to make this look a little better, let's see the semantic ui
	//docs: elements > list: 
		// containing div class --> "ui relaxed divided list"
		// VideoItem div class --> "item"
		//Video Item img class --> "ui image"
		//final return statement: 
		return (
			<div className="item">
				<img className="ui image" src={video.snippet.thumbnails.medium.url} />
				<div className="content">
					<div className="header">
						{video.snippet.title}
					</div>
				</div>
			</div>
		);
			//looks much better but now we want to center the title and decrease the image size
 
	//Inside components directory make file called VideoItem.css and import @ VideoItem.js:

	//Rule: find root element that is returned from some comp and give it a class name === to comp name:
		//"video-item", add this class to the div
			//in video-item.css: add rules:
				//display: flex !important;
				//align-items: center !important:
				//cursor: pointer;

		//".video-item.item img" class in css, add rule:
			//max-width: 180px;



//////////////////////////////////////////////////////////////////////////////////////////
//Communicating from Child to Parent
	//Cursor: pointer rule --> turns cursor into a clickable cursor, remember we want to click these listItems,
	//and then render them into a large window that will play the video, how do we do this?

	//Flow: add on new state prop that will reference the current video that the VideoDetail will show.

	//App comp: has list of videos that it's passing to video list
		//In addition to that list of videos we are going to pass a callback 
			//VideoList takes callback (onVideoSelect) and passed it to each VideoItem

	//We're adding a new method to the app, passing a reference to that method app > video list > video item,
		//onClick videoItem: invoke callback onVideoSelect=()=>{}, will pass in video that's been passed,
			//That video is that passed back up to state and it set in state at currentVideo



//////////////////////////////////////////////////////////////////////////////////////////
//Deeply Nested Callbacks
	//We're trying to pass a function callback to the VideoList and down to the video Item
		//this will eventuall pass data up to state and alter state object @ app level:

	//in App.js, initialize selectedVideo prop in state w/ value of null:
		this.state {selectedVideo: null}

	//Create af onVideoSelect method that takes in video and console.logs video object:
		onVideoSelect = video => {
			console.log('From the App!', video);
		};

	//Add identically names prop to VideoList and pass in onVideoSelect method:
		<VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos}/>

	//In VideoList.js, destructure out prop onVideoList and pass VideoItem onVideoSelect via same named prop:
		const renderedList = videos.map((video, onVideoList) => {
			return <VideoItem onVideoSelect={onVideoSelect} video={video}/>;
		});
	//in VideoItem.js, desctructure onVideoSelect, add onClick property w/ that value, wrapped in af w/ arg video:
		//const VideoItem = ({ video, onVideoSelect }) => {
			//return <div onClick={ ()=> onVideoSelect(video) } className="video-item item">
				//CALLBACK is WRAPPED in an ARROW FUNCTION so VIDEO {} has a change to load be inserted as arg

	//Revew:
		//In App we defined a new callback onVideoSelect
			//Pass down as prop to vidlist
				//Passed down as prop to video item
					//Whenver user clicked on videoitem we invoked callback
						//Whenever we want ot communicate from a child to a parent we usually use a callback

	//Last thing: onvideoselect, need to make sure it takes taht video and sets it in state
		//This will re render app, and then we can create teh video detail comp and pass it current video




//////////////////////////////////////////////////////////////////////////////////////////
//Conditional Rendering

	//In App.js, replace console.log in onVideoSelect(){} w/ this.setState({video}):
		this.setState({ selectedVideo: video });

	//Create VideoDetail.js in components directory, trying to show the video title and description:

	//Make VideoDetail function component and destructure out video from props obj, return div/
	//w/  value: video.snippet.title
		//However we get error: cannot read value of 'null', this is b/c we initialized that state w/
		//null value an hasn't been updated yet, to fix, conditional rendering:

	//in VideoDetail.js, use conditional rendering to return div/ w/ loading... if (!video):
		const VideoDetail = ({ video }) => {
			if (!video) {
				return <div>Loading...</div>
			} 
				return <div>{video.snippet.title}</div>
		};



//////////////////////////////////////////////////////////////////////////////////////////
//Styling the VideoDetail
	//We want to show a panel w/ video title and description underneath: 

	//in VideoDetail.js Add "ui segment" class to containing div, and "ui header" to h4 tag: 

	//look @ response object, in <p> tag add value for video.snippet.description: 
		// <p>{video.snippet.description}</p>



//////////////////////////////////////////////////////////////////////////////////////////
//Displaying a Video Player
	//<iframe/> tag: html element, is going to attempt to make a request to some outside website 
		//(besides the one user is visiting)

		//Once makes request, youtube will replay with all html and js required to show video player

	//in videoDetail.js, add div w/ classname "ui embed" containing <iframe></iframe>

	//Go to youtube.com > click any video > share > embed:
		//shows appropriate iframe to get video to display, will not copy+paste b/c we want to customize it
			//src="https://www.youtube.com/embed/n4VRZMSMdLY"
				//--> "n4VRZMSMdLY" === ID OF THE VIDEO!

	//Back to VideoDetail.js, store this as a variable:
		const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;

	//And interpolate value into src prop of iframe:
		src={videoSrc};

		//@ this point: we can get a video to render and play on screen!
			//Any errors that aren't referencing children keys value are almost certainly related to
			//youtube iframe throwing errors: most common is if you have pop up ad blocker (ERR_BLOCKED BY CLIENT)

		//2 issues:
			//list of videos needs to be aligned to the right of the video detail window
			//video detail window stays up there after new serach is performed (unexpected)





//////////////////////////////////////////////////////////////////////////////////////////
//Fixing a Few Warnings

	//Iframe element needs a title assigned to it
	//videoitems need alt property
	//list of records needs a key prop

	//Iframe
		//add prop of title="video player"


	//VideoItem.js, <img /> needs alt property --> add title={video.snippet.title}
		<img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title}/>

	//VideoList.js, VideoItem needs a key prop
		//add key={video.id.videoId} to <VideoItem />:
			<VideoItem key={ video.id.videoId }/>

	//Now we want to use the grid system with semantic ui to make sure the list and detail
	//laid out nex to each other:
		//Semantic ui documentation > collections > grid:
			//Need to specify class w/ "ui grid" and specify columns to lay out grid:
			<div class="ui grid">
			  <div class="two wide column"></div>
			  <div class="two wide column"></div>
			</div>

			//But we'll use this:
			<div className="ui grid">
				<div className="ui row">
					<VideoDetail/>
					<VideoList/>
				</div>
			</div>
				//"ui row" --> renders all contained in the same row

			//Now we want those components on lists next to each other in that row, add classes:
			<div className="ui grid">
					<div className="ui row">
						<div className="eleven wide column">
							<VideoDetail video={this.state.selectedVideo}/>
						</div>
						<div className="five wide column">
							<VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos}/>	
						</div>
					</div>
				</div>
					//"eleven wide column" --> uses 11 of the default 16 spaces to render the list
					//"five wide column" --> uses 5 of the default 16 spaces to render the list

			//Few issues now:
				//1 - We still have annoying 'Loading...' message, maybe use a default search term?
				//2 - Old video is still rendered in VideoDisplay when new search is run



//////////////////////////////////////////////////////////////////////////////////////////
//Defaulting Video Selection
	//Old Video is still rendered in VideoDisplay when new search is run
		//How to fix: we should setState on the currentVideo when we run onTermSubmit in App.js:
		onTermSubmit = term => {
			this.setState({ 
				videos: response.data.items,
				selectedVideo: response.data.items[0] 
			});
		};

	//To get rid of 'Loading...' text instead of VideoDisplay, we call onTermSubmit with a default term in CDM:
		componentDidMount(){
			this.onTermSubmit('buildings');
		};
		//Like so ^^^