import React, {useEffect, useState} from "react";
import './Delete.css';
import axios from 'axios';

function Delete(props) {

    const [cookbooks, setCookbooks] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3402/')
        .then(res =>{
            setCookbooks(res.data);
        })
    }, [])
    console.log("state: ", cookbooks);
    let cookbooksList = [];
    if (cookbooks.length > 0 ) {
        cookbooksList = cookbooks.map(el => {
            console.log(el["_id"])
            return (
                <li>{el.author}, {el.category}, {el.isbn}, {el.title}, <button onClick={() => deleteFunction(el["_id"])}> Delete </button> </li>
            )
        })
    }

    const deleteFunction = (id) => {
        console.log("id: ", id);
        axios.delete('http://localhost:3402/delete', {params:{ids: id}})
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

    return (
        <div>
            <ul>{cookbooksList}</ul>
        </div>
    );

}
export default Delete;