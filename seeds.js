var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

//data to be added to the db
var data = [
    {
        name: "Broken Mountains",
        image: "https://farm8.staticflickr.com/7161/6498260841_dc8e89d348.jpg",
        description: "The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee."
    },
    {
        name: "Secret Cove",
        image: "https://farm3.staticflickr.com/2927/33369960251_b5bd59549e.jpg",
        description: "Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass."
    },
    {
        name: "Northrend",
        image: "https://farm1.staticflickr.com/598/32649324311_8d6b2ec3dd.jpg",
        description: "Now that there is the Tec-9, a crappy spray gun from South Miami. This gun is advertised as the most popular gun in American crime. Do you believe that shit? It actually says that in the little book that comes with it: the most popular gun in American crime. Like they're actually proud of that shit."
    }

];

function seedDB() {
    //Remove all Campgrounds
    Campground.remove({},function (err) {
        if(err){
            console.log('ERROR: '+err);
        } else {
            console.log("Database campgrounds cleaned");

            //Remove all Comments
            Comment.remove({},function (err) {
                if(!err){
                    console.log("Database comments cleaned");

                    //create seed entries
                    data.forEach(function (t) {
                        Campground.create(t, function (err, camp) {
                            if(!err){

                                // //Add comments
                                // Comment.create(
                                //     {
                                //         text: 'You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder.I love this campground',
                                //         author: 'Sammy J'
                                //     }, function (err, comment) {
                                //         if(!err){
                                //             camp.comments.push(comment);
                                //             camp.save();
                                //         }else{
                                //             console.log('ERROR: '+err);
                                //         }
                                //     }
                                // );
                                //
                                // Comment.create(
                                //     {
                                //         text: 'Your bones don\'t break, mine do. That\'s clear. Your cells react to bacteria and viruses differently than mine. You don\'t get sick, I do. That\'s also clear.',
                                //         author: 'Also Sammy J'
                                //     }, function (err, comment) {
                                //         if(!err){
                                //             camp.comments.push(comment);
                                //             camp.save();
                                //         }else{
                                //             console.log('ERROR: '+err);
                                //         }
                                //     }
                                // );


                            } else {
                                console.log('ERROR: '+err);
                            }
                        });
                    });
                } else {
                    console.log('ERROR: '+err);
                }
                console.log("Database Seeded.");
            });


        }
    });




}

module.exports = seedDB;