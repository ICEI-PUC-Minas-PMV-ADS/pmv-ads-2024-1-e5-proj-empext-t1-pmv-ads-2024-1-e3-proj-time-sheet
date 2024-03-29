import React, { useState, useEffect } from 'react';
import Container from "../components/Container";
export default function Home() {

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [users, setUsers] = useState(null);
    function createUser(e) {

        e.preventDefault();

        fetch("user/create", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname: firstName,
                lastName: lastName,
                email: email,
                password: "Teste@123"
            })
        }).then((response) => response.json())
            .then((data) => {
                const update = async function () {
                    const response = await fetch('user/all');
                    const data = await response.json();

                    setUsers(data.users);
                }

                update();

            })
            .catch((err) => {
                alert(`err `)
            });
    }

    return (
        <div className="d-flex flex-column justify-content-start align-items-center vh-100 bg-dark p-5">
            <h1 className="text-white">Time sheet</h1>

            <div className="col-md-6">
                <form class="row g-3">
                    <div class="col-md-6">
                        <label for="name" className="form-label text-white">Nome</label>
                        <input type="text" class="form-control" id="name" onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div class="col-md-6">
                        <label for="lastname" className="form-label text-white">Sobrenome</label>
                        <input type="text" class="form-control" id="lastname" onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div class="col-md-12">
                        <label for="email" className="form-label text-white">Email</label>
                        <input type="email" class="form-control" id="email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary" onClick={(e) => createUser(e)}>Criar</button>
                    </div>
                </form>

                <table class="table table-striped table-light my-5">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Sobrenome</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users !== null ? users.map(user =>
                            <tr>
                                <th scope="row">{user.id}</th>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                            </tr>
                        ) : <></>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}