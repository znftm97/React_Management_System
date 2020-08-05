import React from 'react';
import {post} from 'axios'; //http 클라이언트 라이브러리(비동기 방식 http 데이터 요청)
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {                      // hidden은 클래스 이름
        display: 'none'
    }
});

class CustomerAdd extends React.Component{
    constructor(props){
        super(props);
        this.state ={          // 초기화
            file: null,
            userName: '',
            birth: '',
            gender: '',
            job: '',
            fileName:'',
            open: false // Dialog 창이 열려있는지 확인하기 위한 변수
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            })
        this.setState({
            file: null,
            userName: '',
            birth: '',
            gender: '',
            job: '',
            fileName:'',
            open: false
        })
           
    }

    handleFileChange = (e) =>{
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }

    handleValueChange = (e) =>{
        let nextState={};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer = () =>{
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birth', this.state.birth);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        const config = {
            headers :{
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }

    handleClickOpen= () => { // 사용자가 고객추가 버튼을 눌러서 창을 띄우는 함수
        this.setState({
            open: true
        })
    }

    handleClose = () => { // = () => 바인딩처리
        this.setState({
            file: null,
            userName: '',
            birth: '',
            gender: '',
            job: '',
            fileName:'',
            open: false
        })
    }

    render(){
        const {classes} = this.props; // 클래스 변수 초기화

        return(
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    고객 추가하기  
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle> 고객 추가 </DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        <br/>
                        </label>
                        <TextField label= "이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                        <TextField label= "생년월일" type="text" name="birth" value={this.state.birth} onChange={this.handleValueChange}/><br/>
                        <TextField label= "성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                        <TextField label= "직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>취소</Button>
                    </DialogActions>
                </Dialog>
            </div>
            // Dialog open은 고객 추가 버튼을 눌렀을때 handleClickOpen 실행되고, this.state.open 값 이 true됨
            // 따라서 open값이 true일때만 창이 열리도록 함
            // accept 부분은 사용자가 이미지 파일만 넣을 수 있도록함

            
            
        )
    }

}

export default withStyles(styles)(CustomerAdd);