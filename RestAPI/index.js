const express = require('express');
const users=require("./MOCK_DATA.json");
const fs=require("fs");
const app = express();

const port = 8000;

//middleware(helps to parse JSON body(it is kind of a plugin understands the type of data))
app.use(express.urlencoded({ extended: false }));
//custom middleware
app.use((req,res,next) => {
  fs.appendFile("log.txt",`${Date.now()}:${req.ip}, ${req.method} ${req.url}\n`, (err,data) => {
 // console.log("hello from middleware 1");
  next();
})}) ;

//route to get all users
app.get('/users', (req, res) => {
  const html=`
  <ul> 

${users.map(user => `<li>${user.first_name} ${user.last_name}</li>`).join('')}
  </ul>`
  return res.send(html);
});
  //Restfull api
app.get('/api/users', (req, res) => {
  res.json(users);
});
app.route('/api/users/:id').get((req, res) => {
     const id=Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user);
post
  res.send(html); 
})
.post((req,res) => {
   
})
.put((req, res) => {})
.delete((req, res) =>{})

app.post('/api/users', (req, res) => {
    const body = req.body;
    const newuser={...body, id: users.length + 1};
   users.push(newuser);
   fs.writeFile("./MOCK_DATA.json",JSON.stringify(users,null,2),(err) =>{
    if(err){
      return res.status(500).json({status: "error", message: "Failed to save user"});
    }

        return res.json({status: "success", id: newuser.id});
});

 
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});