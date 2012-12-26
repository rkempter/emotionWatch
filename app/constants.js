define(['backbone'], function(Backbone) {

	return{
		paperWidth: 1400,
		paperHeight: 1800,

		iterationLength: 4000,
		animationType: 'ease-out',

		angle: 2*Math.PI,

		circleRadius: 250,
		frequencyRadius: 20,

		// Time Circle Properties
		timeCircleWidth: 20,
		timeCircleBaseColor: '#ccc',
		timeCircleTimeColor: '#2590A6',
        timeCircleRadiusDifference: 10,
        timeCircleMaxThickness: 50,

        centerZeroCircleRadius: 20,


		// Emotion Shape Properties
		emotionShapeFillColor: '#aaaaaa',
		emotionShapeStrokeColor: '#aaaaaa',

		labels: new Array('Love', 'Pride', 'Surprise', 'Excitement', 'Joy', 'Like', 'Anger', 'Shame', 'Shock', 'Anxiety', 'Sadness', 'Dislike'),
	
		nullEmotion:
			[
				{ emotion: "love",
				  value: 0 
				},
				{ emotion: "pride",
				  value: 0 
				},
				{ emotion: "surprise",
				  value: 0 
				},
				{ emotion: "excitement",
				  value: 0 
				},
				{ emotion: "joy",
				  value: 0 
				},
				{ emotion: "like",
				  value: 0 
				},
				{ emotion: "anger",
				  value: 0 
				},
				{ emotion: "shame",
				  value: 0 
				},
				{ emotion: "shock",
				  value: 0 
				},
				{ emotion: "anxiety",
				  value: 0 
				},
				{ emotion: "sadness",
				  value: 0 
				},
				{ emotion: "dislike",
				  value: 0 
				},
			]
	}
})