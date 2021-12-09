import React, {useEffect, useState} from "react";
import './Update.css';
import axios from 'axios';
import { useParams } from "react-router-dom";

function Update() {

    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");
    const [isbn, setISBN] = useState("");
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [cookbookId, setId] = useState("");
    const [cookbooks, setCookbooks] = useState([]);
    const params = useParams();

    useEffect(() => {
        console.log("Props.params: ", params.id)
        if (typeof params.id != 'undefined') {
        
            axios.get('http://localhost:3402/find', {params: { id: params.id}})
                .then(res => {
                    setAuthor(res.data.author);
                    setCategory(res.data.category);
                    setISBN(res.data.isbn);
                    setTitle(res.data.title);
                    setIngredients(res.data.ingredients);
                    setId(res.data["_id"]);

            })
                .catch (err => {
                console.log("Error ", err);
            })
        }
    }, [])


    

 /*   let cookbookList = [];
    if (cookbooks.length > 0){
        cookbookList = cookbooks.map(el => {
            return (
                <li>{el.author}, {el.category}, {el.isbn}, {el.title}, <button onClick={() => updateFunction(el["_id"])}> Update </button> </li>
            )
        })
    }
*/
/*
    const updateFunction = (id) => {
        console.log("id: ", id);
        axios.put('http://localhost:3402/update', {id})
        .then(res => {
            console.log('res: ', res.data);
            getCookbooks();
        })
        .catch (err => {
            console.log("Error ", err);
        })
    }

    const getCookbooks = () => {
        axios.get('http://localhost:3402/')
        .then(res => {
            setCookbooks(res.data);
        })
        .catch (err => {
            console.log("Error ", err);
        })
    }
*/

    const submit = (e) =>{
        e.preventDefault();
        if (cookbookId) {
        const data = {
            author,
            category,
            isbn,
            title,
            ingredients
        }
    
        console.log("DATA: ", data);
        axios.put('http://localhost:3402/update', data)
        .then(res => {
            console.log('res: ', res.data);
         /*   getCookbooks(); */
        })
        .catch (err => {
            console.log("Error ", err);
        })
    }}

    return (
        <div>
            <h1>Update</h1>
            <ul>
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
            </ul>
        </div>
    );

}
export default Update;