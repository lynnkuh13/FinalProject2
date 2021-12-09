import React, {useState, useEffect} from "react";
import './Add.css';
import axios from 'axios';

function Add() {

  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [isbn, setISBN] = useState("");
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([]);

 

  const submit = (e) =>{
    e.preventDefault();
    const data = {
        author,
        category,
        isbn,
        title,
        ingredients
    }
    setAuthor("");
    setCategory("");
    setISBN("");
    setTitle("");
    setIngredients("");

    console.log("DATA: ", data);
      axios.post('http://localhost:3402/post', data)
      .then(res => {
          console.log("In post ", res);
      }) 
      .catch (err => {
        console.log("Error ", err);
    })
  }

  const [cookbooks, setCookbooks] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3402/')
        .then(res =>{
            setCookbooks(res.data);
        })
        .catch (err => {
            console.log("Error ", err);
        })
    }, [])
  console.log("state: ", cookbooks);
  let cookbooksList = [];
  if (cookbooks.length > 0 ) {
      cookbooksList = cookbooks.map(el => {
          console.log(el["_id"])
          return (
              <li>{el.author}, {el.category}, {el.isbn}, {el.title}</li>
          )
      })
  }



  return (
    <div className="container">
        <form>
            <div className="inpt"><input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Enter author" /></div>
            <div className="inpt"><input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="Enter category" /></div>
            <div className="inpt"><input type="text" value={isbn} onChange={e => setISBN(e.target.value)} placeholder="Enter ISBN" /></div>
            <div className="inpt"><input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter title" /></div>
            <div className="inpt"><input type="text" value={ingredients} onChange={e => setIngredients(e.target.value)} placeholder="Enter ingredients" /></div>
            <div className="btn"><button type="submit" value="Submit" onClick={e => submit(e)}>Submit</button></div>
        </form>
    </div>
  );
}

export default Add;