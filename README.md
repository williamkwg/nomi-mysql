# nomi-mysql

the mysql plugin of nomi framework.

## Installation

``` bash
$ npm install nomi-mysql --save
```

Node.js >= 8.0.0  required.

## API

- getConnection
- insert
- update
- updateRows
- get
- select
- delete
- count
- beginTransaction
- query

## Usage

```js
const nomiMysql = require('nomi-mysql');

const db = nomiMysql({
  host: 'your-host',
  port: 3306,
  user: 'your-username',
  password: 'your-password',
  database: 'your-database-name',
});
```

### demo1: use insert、update to handle data
``` js
let row = {
  name: 'fengmk2',
  otherField: 'other field value',
  createdAt: db.literals.now, // `now()` on db server
  // ...
};
let result1 = await db.insert('table-name', {name: 'weiguo.kong'});
let result2 = await db.insert('table-name', [{name: 'weiguo.kong'}, {name: 'lantao.wang'}]);
let result3 = db.update('table-name', {id: 124, name: 'weiguo'});
let ressult4 =  db.update('table-name', {role: '1', otherField: 'other' }, {
  where: { name: 'weiguo' },
  columns: [ 'otherField' ]
});

```


#### demo2: use get、 select to fetch data

```js

let row = await db.get('table-name', { name: 'weiguo.kong' });
let rows = await db.select('table-name');
let rowList = await db.select('table-name', {
  where: {
    type: 'mydb'
  },
  columns: ['author', 'title']
});
let res = db.query('SELECT * FROM user WHERE userId=?', [1]);
```

#### demo3: use delete to handle data.

```js
let result = await db.delete('table-name', {
  name: 'weiguo'
});

```

#### demo4: beginTransaction, commit or rollback

```js
let tran = await db.beginTransaction();

try {
  await tran.insert('table-name', {name: 'weiguo.kong'});
  await tran.update('table-name', {id: 124, name: 'weiguo'});
  await tran.commit();
} catch (err) {
  await tran.rollback();
  throw err;
}

let result = await db.beginTransactionScope(async (conn) => {
  await conn.insert('table-name', {name: 'weiguo.kong'});
  await conn.update('table-name', {id: 124, name: 'weiguo'});
  return { ret: true, msg: 'success' };
}, ctx);
```
