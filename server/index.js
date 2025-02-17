const express = require('express')
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();

const port = 8000;

app.use(bodyParser.json());

let users = []
let counter = 1

app.get('/testdb', (req, res) => {
  let conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'webdb',
    port: 8820

  }).then((conn) => {
      conn
      .query('SELECT * FROM user')
      .then((results) => {
        res.json(results[0])
      })
      .catch((error) => {
        console.log('error', error.message)
        res.status(500).json({error: 'Error fetching users'})
    })
  })
})
/*
GET /users สำหรับ get users ทั้งหมดที่บันทึกไว้
POST /user สำหรับสร้าง user ใหม่
GET /users/:id สำหรับ ดึง users รายคนออกมา
PUT /users/:id สำหรับแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
DELETE /users/:id สำหรับลบ users รายคน ตาม id ที่บันทึกเข้าไป)

*/

// path = GET /users สำหรับ get users ทั้งหมดที่บันทึกไว้
app.get('/users', (req, res) => {
  const filterUsers = users.map(user => {
    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      fullname: user.firstname + ' ' + user.lastname

    }
  })
  res.json(filterUsers)
})

// path = POST /user สำหรับสร้าง user ใหม่
app.post('/user', (req, res) => {
  let user = req.body;
  user.id = counter;
  counter+=1;
  users.push(user);
  res.json({
    message: 'Create new user successfully',
    user: user
  });
})

// path = GET /users/:id สำหรับ ดึง users รายคนออกมา
app.get('/users/:id', (req, res) => {
  let id = req.params.id;
  // ค้นหา user หรือ index ที่ต้องการดึง
  let selectedIndex = users.findIndex(user => user.id == id)


  res.json(users[selectedIndex])
})

// path: PUT /users/:id สำหรับแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
app.put('/users/:id', (req, res) => {
  let id = req.params.id;
  let updateUser = req.body;
  let selectedIndex = users.findIndex(user => user.id == id)

  users[selectedIndex].firstname = updateUser.firstname || users[selectedIndex].firstname
  users[selectedIndex].lastname = updateUser.lastname || users[selectedIndex].lastname
  users[selectedIndex].age = updateUser.age || users[selectedIndex].age
  users[selectedIndex].gender = updateUser.gender || users[selectedIndex].gender
  
  res.json({
    message: 'Update user successfully',
    data: {
        user: updateUser,
        indexUpdate: selectedIndex
    }
  })
  // users ที่ update ใหม่ udpate กลับไปเก็บใน users เดิม
})

//path: DELETE /users/:id สำหรับลบ users รายคน ตาม id ที่บันทึกเข้าไป)
app.delete('/users/:id', (req, res) => {
  let id = req.params.id;
  // หา index ของ user ที่ต้องการลบ
  let selectedIndex = users.findIndex(user => user.id == id)

  // ลบ
  users.splice(selectedIndex, 1)
  res.json({
    message: 'Delete user successfully',
      indexDeleted: selectedIndex
  })
})

app.listen(port, (req, res) => {
  console.log('http server is running on port' + port)
});