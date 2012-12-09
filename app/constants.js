define(['backbone'], function(Backbone) {

	return{
		paperWidth: 1400,
		paperHeight: 1800,

		iterationLength: 4000,
		animationType: 'ease-out',

		angle: 2*Math.PI,

		circleRadius: 250,
		frequencyRadius: 40,

		// Time Circle Properties
		timeCircleWidth: 20,
		timeCircleBaseColor: '#ccc',
		timeCircleTimeColor: '#2590A6',
        timeCircleRadiusDifference: 10,

        centerZeroCircleRadius: 20,


		// Emotion Shape Properties
		emotionShapeFillColor: '#aaaaaa',
		emotionShapeStrokeColor: '#aaaaaa',

		labels: new Array('Love', 'Pride', 'Surprise', 'Excitement', 'Joy', 'Like', 'Anger', 'Shame', 'Shock', 'Anxiety', 'Sadness', 'Dislike'),
	}
})