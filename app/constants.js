define(['backbone'], function(Backbone) {

    return{
        paperWidth: 1400,
        paperHeight: 1800,

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

        videoInterval: 5,

        centerZeroCircleRadius: 20,

        patternCircleRadius: 100,

        slots: 100,

        startDateTime: new Date('26 Jul 2012 00:00').getTime(),
        endDateTime: new Date('13 Aug 2012 00:00').getTime(),

        // Emotion Shape Properties
        emotionShapeFillColor: '#aaaaaa',
        emotionShapeStrokeColor: '#aaaaaa',

        labels: ['Love', 'Pride', 'Surprise', 'Excitement', 'Joy', 'Like', 'Anger', 'Shame', 'Shock', 'Anxiety', 'Sadness', 'Dislike'],
    
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
                }
            ]
    };
});