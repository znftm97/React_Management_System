import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions'; // 팝업창에서 아래 버튼 공간
import DialogTitle from '@material-ui/core/DialogTitle'; // 팝업창 제목
import DialogContent from '@material-ui/core/DialogContent'; // 팝업창 내용
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



class CustomerDelete extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            open: false // 
        }
    }

    handleClickOpen= () => { // 사용자가 고객추가 버튼을 눌러서 창을 띄우는 함수
        this.setState({
            open: true
        })
    }

    handleClose = () => { // = () => 바인딩처리
        this.setState({
            open: false
        })
    }

    deleteCustomer(id){
        const url = '/api/customers/' + id;
        fetch(url, {
            method: 'DELETE'
        });
        this.props.stateRefresh();
    }

    render() {
        return (
            <div>
            <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>삭제</Button>
            <Dialog onClose={this.handleClose} open={this.state.open}>
                <DialogTitle onClose={this.handleClose}>
                    삭제 확인
                </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        선택한 고객 정보가 삭제됩니다.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</Button>
                    <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
            </div>
        )
    }

}

export default CustomerDelete;