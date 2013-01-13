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

        //labels: ['Love', 'Pride', 'Surprise', 'Excitement', 'Joy', 'Like', 'Anger', 'Shame', 'Shock', 'Anxiety', 'Sadness', 'Dislike'],
        labels: ['Involvement', 'Amusement', 'Pride', 'Happiness', 'Pleasure', 'Love', 'Awe', 'Relief', 'Surprise', 'Nostalgia', 'Pity', 'Sadness', 'Worry', 'Shame', 'Guilt', 'Regret', 'Envy', 'Disgust', 'Contempt', 'Anger'];

        nullEmotion:
            [
                { emotion: "involvement",
                  value: 0 
                },
                { emotion: "amusement",
                  value: 0 
                },
                { emotion: "pride",
                  value: 0 
                },
                { emotion: "happiness",
                  value: 0 
                },
                { emotion: "pleasure",
                  value: 0 
                },
                { emotion: "love",
                  value: 0 
                },
                { emotion: "awe",
                  value: 0 
                },
                { emotion: "relief",
                  value: 0 
                },
                { emotion: "surprise",
                  value: 0 
                },
                { emotion: "nostalgia",
                  value: 0 
                },
                { emotion: "pity",
                  value: 0 
                },
                { emotion: "sadness",
                  value: 0 
                },
                { emotion: "worry",
                  value: 0 
                },
                { emotion: "shame",
                  value: 0 
                },
                { emotion: "guilt",
                  value: 0 
                },
                { emotion: "regret",
                  value: 0 
                },
                { emotion: "envy",
                  value: 0 
                },
                { emotion: "disgust",
                  value: 0 
                },
                { emotion: "contempt",
                  value: 0 
                },
                { emotion: "anger",
                  value: 0 
                }
            ]
    };
});