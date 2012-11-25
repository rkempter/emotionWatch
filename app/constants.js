define(['backbone'], function(Backbone) {

	return{
		paperWidth: 1200,
		paperHeight: 900,

		iterationLength: 4000,
		animationType: 'ease-out',

		angle: 2*Math.PI,

		// Emotion Circle Properties
		emotionCircleWidth: '40px',
		emotionCircleColor: '#000000',

		// Time Circle Properties
		timeCircleWidth: '10px',
		timeCircleBaseColor: '#ccc',
		timeCircleTimeColor: '#2590A6',
        timeCircleRadiusDifference: 40,

		// Emotion Shape Properties
		emotionShapeFillColor: '#aaaaaa',
		emotionShapeStrokeColor: '#aaaaaa',

		labels: new Array('Love', 'Pride', 'Surprise', 'Excitement', 'Joy', 'Like', 'Anger', 'Shame', 'Shock', 'Anxiety', 'Sadness', 'Dislike'),
	}
})