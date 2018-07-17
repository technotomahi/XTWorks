export class DataService {
    constructor( authKey) {
        this.fetchOptions = {
            headers: { 'Content-Type': 'application/json', 'user-key': authKey },
            mode: 'cors',
            cache: 'default'
        };
    }

    logJSON(url) {
         this.fetchOptions.method = "POST";
        fetch(url, this.fetchOptions)
            .then(res => {
                res.json().then(data => {
                    console.log(data);
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    getJSON(url) {
         this.fetchOptions.method = "GET";
        var dataPromise = fetch(url, this.fetchOptions);
        return new Promise((resolve, reject) => {
            dataPromise.then(res => {
                res.json().then(data => {
                    resolve(data);
                });
            })
            .catch(err => {
                reject(err);
            });
        });
            
    }

     postJSON(url, payload) {
         this.fetchOptions.method = "POST";
         this.fetchOptions.body =   JSON.stringify( payload );
        var dataPromise = fetch(url, this.fetchOptions);
        return new Promise((resolve, reject) => {
            dataPromise.then(res => {
                res.json().then(data => {
                    resolve(data);
                });
            })
            .catch(err => {
                reject(err);
            });
        });
            
    }

}


