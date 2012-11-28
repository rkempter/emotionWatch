(function(window) {
    /**
     * do the job of putting all letters in a set returned bu printLetters in a path
     * @param p - can be a rpahael path obejct or string
     */
    var _printOnPath = function(text, paper, p) {
        if(typeof(p)=="string")
            p = paper.path(p).attr({stroke: "none"});
        for ( var i = 0; i < text.length; i++) {       
            var letter = text[i];
            var newP = p.getPointAtLength(letter.getBBox().x);
            var newTransformation = letter.transform()+
                 "T"+(newP.x-letter.getBBox().x)+","+
                (newP.y-letter.getBBox().y-letter.getBBox().height);       
            //also rotate the letter to correspond the path angle of derivative
            newTransformation+="R"+
                (newP.alpha<360 ? 180+newP.alpha : newP.alpha);
            letter.transform(newTransformation);
        }
    };

    /** print letter by letter, and return the set of letters (paths), just like the old raphael print() method did. */
    console.log(window);
    var Raphael = window.R;
    Raphael.fn.printLetters = function(x, y, str, font, size,
            letter_spacing, line_height, onpath) {
        letter_spacing=letter_spacing||size/1.5;
        line_height=line_height||size;
        this.setStart();
        var x_=x, y_=y;
        for ( var i = 0; i < str.length; i++) {
            if(str.charAt(i)!='\n') {
                var letter = this.print(x_,y_,str.charAt(i),font,size);
                x_+=letter_spacing;               
            }
            else {
                x_=x;
                y_+=line_height;
            }
        }
        var set = this.setFinish();
        if(onpath) {
            _printOnPath(set, this, onpath);
        }
        return set;
    };   
})(this);