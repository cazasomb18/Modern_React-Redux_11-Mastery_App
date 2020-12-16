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
