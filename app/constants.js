define(['backbone'], function(Backbone) {

	return{
		paperWidth: 800,
		paperHeight: 800,

		iterationLength: 4000,
		animationType: 'ease-out',

		angle: 2*Math.PI,

		// Emotion Circle Properties
		emotionCircleWidth: '40px',
		emotionCircleColor: '#000000',

		// Time Circle Properties
		timeCircleWidth: '10px',
		timeCircleBaseColor: '#ccc',
		timeCircleTimeColor: '##2590A6',

		// Emotion Shape Properties
		emotionShapeFillColor: '#aaaaaa',
		emotionShapeStrokeColor: '#aaaaaa',

	}
})