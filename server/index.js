const express = require('express')
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();
const cors = require('cors');


const port = 8000;

app.use(bodyParser.json());

app.use(cors());

let users = []

let conn=null

const initMySQL = async () => {
   conn= await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'webdb',
    port: 8820
  
  })
}

/*app.get('/testdbnew',async (req, res) => {

  try{
    const results = await conn.query('SELECT * FROM user')
    res.json(results[0])
  } catch (error) { 
    console.log('error', error.message)
        res.status(500).json({error: 'Error fetching users'}) 

  }
})*/
/*
GET /users สำหรับ get users ทั้งหมดที่บันทึกไว้
POST /user สำหรับสร้าง user ใหม่
GET /users/:id สำหรับ ดึง users รายคนออกมา
PUT /users/:id สำหรับแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
DELETE /users/:id สำหรับลบ users รายคน ตาม id ที่บันทึกเข้าไป) 

*/
// path = GET /users สำหรับ get users ทั้งหมดที่บันทึกไว้
app.get('/users',async (req, res) => {
  const results = await conn.query('SELECT * FROM user')
  res.json(results[0])
})

// path = POST /user สำหรับสร้าง user ใหม่
app.post('/users',async (req, res) => {
 
  try{
    let user = req.body;
    const results= await conn.query('INSERT INTO user SET ?', user)
    res.json({
      message: 'Create user successfully',
      data: results[0]
    }) 
  }catch(err){
    res.status(500).json({
      message: 'something went wrong',
      errorMesssage: err.message
    
    })
  }
}) 

// path = GET /users/:id สำหรับ ดึง users รายคนออกมา
app.get('/users/:id', async (req, res) => {
  try {
    let id = req.params.id;
    const results = await conn.query('SELECT * FROM user WHERE id = ?', id)
    if (results[0].length == 0) {
      throw{ statusCode: 404, message: 'user not found'}
    }
      res.json(results[0][0])
     
    } catch (err) {
      console.log('error', err.message)
      let statusCode = err.statusCode || 500
      res.status(500).json({
        message: 'something went wrong',
        errorMesssage: err.message
      })
  } 
}) 

// path: PUT /users/:id สำหรับแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
app.put('/users/:id',async (req, res) => {

  try{
    let id = req.params.id;
    let updateUser = req.body;
    let user = req.body;
    const results= await conn.query(
      'UPDATE user SET ? WHERE id=?', 
      [updateUser, id]
    )
    res.json({
      message: 'Update user successfully',
      data: results[0]
    }) 
  }catch(err){
    res.status(500).json({
      message: 'something went wrong',
      errorMesssage: err.message
    })
  }
})

//path: DELETE /users/:id สำหรับลบ users รายคน ตาม id ที่บันทึกเข้าไป)
app.delete('/users/:id',async (req, res) => {
  try{
    let id = req.params.id;
    const results= await conn.query('DELETE from user WHERE id=?',id)
    res.json({
      message: 'Delete user successfully',
      data: results[0]
    }) 
  }catch(err){
    console.log('error', err.message)
    res.status(500).json({
      message: 'something went wrong',
      error: err.message
    })
  }
})
  app.listen(port,async (req,res) => {
    await initMySQL()
    console.log('http server is running on port'+port)
  })
