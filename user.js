const BASE_URL = 'http://localhost:8000'


<<<<<<< HEAD
window.onload = async() => {
    await loadData()
}

const loadData = async() => {
console.log('user page loaded')
    //1. load user ทั้งหมด จาก api ที่เตรียมไว้
    const response = await axios.get(`${BASE_URL}/users`)

    console.log(response.data)

    const userDOM = document.getElementById('user')
    //2. นำ user ทั้งหมด โหลดกลับเข้าไปใน html

    let htmlData = '<div>'
    for(let i = 0; i < response.data.length; i++) {
      let users = response.data[i]
      htmlData += `<div>
      ${users.id} ${users.firstname} ${users.lastname} 
      <a href='index.html?id=${users.id}'><button>Edit</button></a>
      <button class= 'delete' data-id= '${users.id}'>Delete</button>
      </div>`
    }
    htmlData += '</div>'
    userDOM.innerHTML = htmlData

    //3. สร้าง event สำหรับลบ user
    const deletDOMs = document.getElementsByClassName('delete')
    for(let i = 0; i < deletDOMs.length; i++) {
      deletDOMs[i].addEventListener('click', async (event) => {
        const id = event.target.dataset.id
        try{
            await axios.delete(`${BASE_URL}/users/${id}`)
            loadData()//เรียกใช้ฟังก์ชั่นตัวเองเพื่อโหลดข้อมูลใหม่
        }catch(error){
            console.log('error', error)
        }
      })    
    }
=======
window.onload = async () => {
  await loadData()
}

const loadData = async () => {
  console.log('user page loaded')
  //1. load user ทั้งหมด จาก api ที่เตรียมไว้
  const response = await axios.get(`${BASE_URL}/users`)

  console.log(response.data)

  const userDOM = document.getElementById('user')
  //2. นำ user ทั้งหมด โหลดกลับเข้าไปใน html
 
  //สร้างตารางเพื่อแสดงข้อมูล user
  let htmlData = `
  <table border="1" cellspacing="1" cellpadding="10">
      <thead>
          <tr>
              <th>ID</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Interests</th>
              <th>Description</th>
              <th>Action</th>
          </tr>
      </thead>
      <tbody>
  `;

  for (let i = 0; i < response.data.length; i++) {
    let users = response.data[i];
    htmlData += `
      <tr>
          <td>${users.id}</td>
          <td>${users.firstname}</td>
          <td>${users.lastname}</td>
          <td>${users.age}</td>
          <td>${users.gender}</td>
          <td>${users.interests || '-'}</td>
          <td>${users.description || '-'}</td>
          <td>
          <a href="index.html?id=${users.id}"><button class='Edit'>Edit</button></a>
          <button class="delete" data-id="${users.id}">Delete</button>
          </td>
      </tr>
    `;
  }

  htmlData += `
            </tbody>
        </table>
    `;
    userDOM.innerHTML = htmlData;

  //3. สร้าง event สำหรับลบ user
  const deletDOMs = document.getElementsByClassName('delete')
  for (let i = 0; i < deletDOMs.length; i++) {
    deletDOMs[i].addEventListener('click', async (event) => {
      const id = event.target.dataset.id
      try {
        await axios.delete(`${BASE_URL}/users/${id}`)
        loadData()//เรียกใช้ฟังก์ชั่นตัวเองเพื่อโหลดข้อมูลใหม่
      } catch (error) {
        console.log('error', error)
      }
    })
  }
>>>>>>> 76088f4 (Initial commit)
}