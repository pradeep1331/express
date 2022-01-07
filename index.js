//const express = require('express');
////const {MongoClient} = require('mongodb');
import express, { response } from 'express';
import {Db, MongoClient} from 'mongodb';
import dotenv from "dotenv";

dotenv.config();
const app = express();

// const movies = [
//     {
//       id: "103",
//       name: "The Avengers",
//       rating: 8,
//       summary:
//         "Marvel's The Avengers (classified under the name Marvel Avengers\n Assemble in the United Kingdom and Ireland), or simply The Avengers, is\n a 2012 American superhero film based on the Marvel Comics superhero team\n of the same name.",
//       poster:
//         "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
//       trailer: "https://www.youtube.com/embed/eOrNdBpGMv8",
//       language: "english"
//     },
//     {
//       id: "100",
//       name: "Iron man 2",
//       poster:
//         "https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_FMjpg_UX1000_.jpg",
//       rating: 7,
//       summary:
//         "With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.",
//       trailer: "https://www.youtube.com/embed/wKtcmiifycU",
//       language: "english"
//     },
//     {
//       id: "101",
//       name: "No Country for Old Men",
//       poster:
//         "https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg",
//       rating: 8.1,
//       summary:
//         "A hunter's life takes a drastic turn when he discovers two million dollars while strolling through the aftermath of a drug deal. He is then pursued by a psychopathic killer who wants the money.",
//       trailer: "https://www.youtube.com/embed/38A__WT3-o0",
//       language: "english"
//     },
//     {
//       id: "102",
//       name: "Jai Bhim",
//       poster:
//         "https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg",
//       summary:
//         "A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case",
//       rating: 8.8,
//       trailer: "https://www.youtube.com/embed/nnXpbTFrqXA",
//       language: "tamil"
//     },
  
//     {
//       id: "104",
//       name: "Interstellar",
//       poster: "https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg",
//       rating: 8.6,
//       summary:
//         "When Earth becomes uninhabitable in the future, a farmer and ex-NASA\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\n of researchers, to find a new planet for humans.",
//       trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
//       language: "english"
//     },
//     {
//       id: "105",
//       name: "Baahubali",
//       poster: "https://flxt.tmsimg.com/assets/p11546593_p_v10_af.jpg",
//       rating: 8,
//       summary:
//         "In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.",
//       trailer: "https://www.youtube.com/embed/sOEg_YZQsTI",
//       language: "telugu"
//     },
//     {
//       id: "106",
//       name: "Ratatouille",
//       poster:
//         "https://resizing.flixster.com/gL_JpWcD7sNHNYSwI1ff069Yyug=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzc4ZmJhZjZiLTEzNWMtNDIwOC1hYzU1LTgwZjE3ZjQzNTdiNy5qcGc=",
//       rating: 8,
//       summary:
//         "Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.",
//       trailer: "https://www.youtube.com/embed/NgsQ8mVkN8w",
//       language: "english"
//     }
//   ];
 

 
const MONGO_URL =  process.env.MONGO_URL;

//const MONGO_URL = "mongodb://localhost";// "mongodb://localhost:27017" this is default any ither port we have to mention

async function createConnection(){
    const client = new MongoClient(MONGO_URL);
     await client.connect(); // promise
     return client;
  }
  
  const client = await createConnection();
  
//CRUD  - READ = GET
//const PORT = "9000";
const PORT = process.env.PORT;

//middleware
//aap.use => intercepts every request
//app.use(express.json());


app.get("/",(request,response)=>{
    response.send("Hello :-)")
})

app.get("/movies/",async (request,response)=>{
  const filter = request.query;
  if(filter.rating){
    filter.rating = +filter.rating;
  }

  // const {language,rating} = request.query;
  const movie = await client
                .db("db1")
                .collection("movies")
                .find(filter) //cursor
                .toArray();
                response.send(movie);
    
  //   let language = request.query.language;
  //   let rating = request.query.rating;
  //   let result=[];
  //   if(language &&rating){
  //     result = movies.filter((mv)=>{
  //     return mv.language === language && mv.rating ===+rating;
  //  })
  // } else if (language){
  //   result = movies.filter((mv)=>{
  //     return mv.language === language ;
  //  })
  // }else if (rating){
  //   result = movies.filter((mv)=>{
  //     return mv.rating ===+rating ;
  //  })
  // }else{
  //   result = movies;
  // }
   //result ? response.send(result): response.send({mesg:"Movie not found"});
   //response.send(filteredMovies);

})

app.get("/movies/:id", async (request,response)=>{
    const { id } = request.params;
    const movie = await client
    .db("db1")
    .collection("movies")
    .findOne({id:id});    
     movie ? response.send(movie): response.status(404).send({mesg:"Movie not found"});
});

app.post("/movies",express.json(), async (request,response)=>{
    
  const data = request.body;
  console.log("incoming movies",data);

  const result = await client
  .db("db1")
  .collection("movies")
  .insertMany(data);
  
  response.send(result);
});

app.delete("/movies/:id",async (request,response)=>{
    
  const id = +request.params.id
 console.log(id);
 
  const Delete = await client
  .db("db1")
  .collection("movies")
  .deleteOne({id:id});

    response.send(Delete);

});

app.put("/movies/:id",express.json(), async (request,response)=>{
    
  const id = +request.params.id
  const data = request.body;

  const result = await client
  .db("db1")
  .collection("movies")
  .updateOne({id:id},{$set:data});

  response.send(result);
});


app.listen(PORT,()=>{
    console.log("Server STarted!!!")
})





