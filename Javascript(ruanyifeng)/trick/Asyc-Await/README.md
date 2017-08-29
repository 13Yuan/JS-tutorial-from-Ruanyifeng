![Async Await in Nodejs](./logo.sample.png)

# Async Await
> Simplify callback or Promise in Nodejs with async functions

Other languages for Async:
    Nodejs, C#: async await
    Kotlin:     coroutines
    GO:         goroutines
## Async functions

Async funtions is similar with Generator that you can halt the execution, but return Promise instead

```shell
function handler(req, res) {
    return request('url')
        .catch((err) => { console.log(err); })
        .then((response) => Mongo.findOne({user: response.user})
        .catch((err) => { throw err; })
        .then((org) => exec(org))
        .catch((err) => { res.status(500).send(); })
}

replace to Async Await

async function handler(req, res) {
    let response;
    try {
        response = await request('url')  
    } catch (err) {
        return res.status(500).send()
    }

    let org
    try {
        org = await Mongo.findOne({ user: response.user })
    } catch (err) {
        return res.status(500).send()
    }

    exec(org, req, res)
}
```

## Intermediate values

function A return a promise, then function B needs it and function C needs the results of function A and B.

```shell
solution 1:
    function exec(){
        return A()
                .then((a) => {
                    return B(a)
                            .then((b) => {
                                return C(a, b);
                            }
                }
    }
    a is unavailable

solution 2:
    move a to high scope. needs val to value a;
    
    function exec() {
        let val;
        return A().then((a) => {
            val = a; 
            return B(val)
        }).then((b) => { return C(val, b); })
    }

solution 3
    leverage Promise.all

    function exec() {
        return A().then((a) => {
            return Promise.all([a, B(a)])
        })
        .then(([a, b]) => {
            return C(a, b);
        })
    }

solution 4
    use high order helper

    const converge = (...promise) => (...args) => {
        let [head, ...tail] = promise;
        if (tail.length) {
            return head(...args)
                .then((value) => converge(...tail)(...args.concat([value]))
        } else {
            return head(...args);
        }
    }
    A().then((a) => converge(B, C)(a));

solution 5
    aysnc function exec() {
        const a = await A();
        const b = await B(a);
        return C(a, b);
    }
```

## Multiple request with Async Await

``` shell
    aynsc function execs() {
        const [a, b, c] = await Promise.all([
            A(), B(), C()
        ]);
        do(a);
        do(b);
        do(c);
    }
```

## iteration with Async Await

```
    async function exec() {
        return [1, 2, 3].map(async (val) => {
            const v = await A(val);
            return v;
        })
    }
    
    exec().then(v => console.log(v)).catch(err);
```