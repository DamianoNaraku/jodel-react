import axios from 'axios';

export default class Persistance {
    static url(path: string): string {
        return 'http://localhost:8000/api/v1/' + path + '/';
    }

    static signin(name: string, username: string, email: string, password: string): void {
        axios.post(Persistance.url('user'), {
            username: username,
            password: password,
            name: name,
            mail: email
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    static login(username: string, password: string): void {
        axios.post(Persistance.url('token'), {
            username: username,
            password: password,
        })
            .then(function (response) {
                console.log(response);
                return response.data.token;

            })
            .catch(function (error) {
                console.log(error);
            });
    }


    static post(): void {
        axios.post(Persistance.url('user'), {
            username: "test",
            password: "Password123!",
            name: "test",
            mail: "test@mail.it"
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    static get(): void {
        axios.get(Persistance.url('user'))
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    static test(email: string): void {
        axios.post(Persistance.url('user'), {
            username: "test",
            password: "Password123!",
            name: "test",
            mail: email
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
