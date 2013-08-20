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

        initialAngle: 9 * 2 * Math.PI / 360,

        centerZeroCircleRadius: 20,

        centerPoint: { x: 470, y: 480 },

        patternCircleRadius: 100,

        slots: 100,

        startDateTime: new Date('26 Jul 2012 00:00').getTime(),
        endDateTime: new Date('13 Aug 2012 00:00').getTime(),

        // Emotion Shape Properties
        emotionShapeFillColor: '#aaaaaa',
        emotionShapeStrokeColor: '#aaaaaa',

        //labels: ['Love', 'Pride', 'Surprise', 'Excitement', 'Joy', 'Like', 'Anger', 'Shame', 'Shock', 'Anxiety', 'Sadness', 'Dislike'],
        //labels: ['Involvement', 'Amusement', 'Pride', 'Happiness', 'Pleasure', 'Love', 'Awe', 'Relief', 'Surprise', 'Nostalgia', 'Pity', 'Sadness', 'Worry', 'Shame', 'Guilt', 'Regret', 'Envy', 'Disgust', 'Contempt', 'Anger'],
        labels: ['Love', 'Awe', 'Relief', 'Surprise', 'Nostalgia', 'Pity', 'Sadness', 'Worry', 'Shame', 'Guilt', 'Regret', 'Envy', 'Disgust', 'Contempt', 'Anger', 'Involvement', 'Amusement', 'Pride / Elation', 'Happiness', 'Pleasure'],


        nullEmotion: {
            "involvement": 0, 
            "amusement": 0,
            "pride": 0,
            "happiness": 0,
            "pleasure":0, 
            "love": 0,
            "awe": 0,
            "relief": 0,
            "surprise": 0,
            "nostalgia": 0, 
            "pity": 0,
            "sadness": 0,
            "worry": 0,
            "shame": 0,
            "guilt": 0,
            "regret": 0, 
            "envy": 0,
            "disgust": 0,
            "contempt": 0, 
            "anger": 0
        }
    };
});