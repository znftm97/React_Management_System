const fs = require('fs'); // File System
const express = require('express'); // node.js를 위한 웹 프레임워크 require
const bodyParser = require('body-parser'); // node.js 모듈, 클라이언트 POST request data의 body로부터 파라미터 추출

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data); // data 파싱
const mysql = require('mysql'); // mysql 설치후 require

//db connection
const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});

connection.connect();

const multer = require('multer'); // multer 설치후 require(이미지 파일 처리위한 라이브러리)
const upload = multer({dest: './upload'});

app.get('/api/customers', (req, res)=> {
  connection.query(
    "SELECT * FROM CUSTOMER",
    (err, rows, fields) =>{ // err: 실행중 에러를 나타냄, rows: 접속된 행을 나타냄, fields: 결과 영향을 받은 열에 정보들을 나타냄
      res.send(rows);
    }
  );
});

app.use('/image', express.static('./upload')); // 사용자가 업로드하려는 사진을 볼 수 있게 폴더 공유
app.post('/api/customers', upload.single('image'), (req, res)=>{
  let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?)';
  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let birth = req.body.birth;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birth, gender, job];
  console.log(image);

  connection.query(sql, params,
    (err, rows, fileds) => {
      res.send(rows);
      console.log(err);  
    } 
    );
});

app.listen(port, () => console.log(`Listening on port ${port}`));