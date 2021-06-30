import React, {Component} from 'react';
import axios from 'axios';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import SimpleReactValidator from 'simple-react-validator';

import HeaderTitle from '../img/header_title.png';
import '../css/react-css/login_page.css';

const dropDownLiStyle = {
        display: 'block',
        padding: '.25rem 1.5rem',
        clear: 'both',
        fontWeight: '400',
        color: '#212529',
        whiteSpace: 'nowrap',
        backgroundColor: 'transparent',
        border: 0,
        textAlign: 'center',
        lineHeight: '1.5em',
    },
    dropDownWrapperStyle = {
        fontSize: '12px'
    };

class LoginClassComponent extends Component {
    state = {
        serverVersion: '',
        id: '',
        pwd: '',
        selectedLanguage: ['ko', '한국어']
    };

    constructor(props) {
        super(props);

        this.idInput = React.createRef();
        this.pwdInput = React.createRef();
        this.validator = new SimpleReactValidator({
            messages: {
                required: '입력 필수 항목입니다.'
            }
        });
    }

    componentDidMount() {
        axios.get('/api/getServerVersion.do')
            .then(res => {
                console.log(res.data)
                this.setState({
                    serverVersion: res.data
                })
            });

        this.focusIdInput();
    }

    handleKeyPress = (e) => {
        if (e.charCode === 13) {
            this.goLogin();
        }
    }

    handleChangeLanguage = (language) => {
        this.setState({
            selectedLanguage: language
        })
    }

    focusIdInput() {
        this.idInput.current.focus();
    }

    handleChagneId = (e) => {
        let obj = {};
        obj[e.target.name] = e.target.value;
        this.setState(obj);
        this.setState({
            id: e.target.value
        });
    }

    handleChagnePwd = (e) => {
        let obj = {};
        obj[e.target.name] = e.target.value;
        this.setState(obj);
        this.setState({
            pwd: e.target.value
        });
    }

    goLogin = () => {
        if (this.validator.allValid()) {

            let params = new URLSearchParams();
            params.append('id', this.state.id);
            params.append('password', this.state.pwd);
            params.append('lang', this.state.selectedLanguage[0]);

            axios.post('/api/setLogin.do', params)
                .then(res => {
                    const obj = res.data.model;

                    if (obj.result === 'S') {
                        if (obj.alertMsg !== undefined) {
                            alert(obj.alertMsg);
                        }
                        if (obj.locationHref !== undefined) {
                            console.log(obj.locationHref);
                            this.props.history.push("/other");
                            // window.location = result.locationHref;
                        }
                    } else if (obj.result === 'F') {
                        if (obj.alertMsg !== undefined) {
                            alert(obj.alertMsg);
                            this.idInput.current.focus();
                        } else {
                            alert('오류가 발생했습니다. 다시 로그인 바랍니다.');
                        }
                    }
                });
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        return (
            <div className="wrapper login-boxed">
                <div className="wrapper-inner">
                    {/*Start Main Header*/}
                    <div className="main-header">
                        <div className="container-fluid">
                            <div className="row-fluid">
                                <div className="span12">
                                    <div className="title">
                                        <h1>
                                            <img src={HeaderTitle} alt='DLP'/>
                                            <span className="ver">{this.state.serverVersion}</span>
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*End Main Header*/}

                    {/*Start Login*/}
                    <div className="login-content">
                        <div className="row-fluid">
                            <div className="span12">
                                {/*Start Login Form*/}
                                <h3><i className="icon iconfa-lock"></i> Login to your account</h3>

                                <div className="login-area">
                                    <input type="text" placeholder="아이디를 입력하세요"
                                           className="input-block-level" required minLength="3" ref={this.idInput}
                                           value={this.state.required}
                                           onChange={this.handleChagneId}/>
                                    {this.validator.message('id', this.state.id, 'required')}
                                    <input type="password"
                                           placeholder="비밀번호를 입력하세요"
                                           className="input-block-level" required
                                           minLength="3" maxLength="30" ref={this.pwdInput}
                                           value={this.state.required}
                                           onKeyPress={this.handleKeyPress}
                                           onChange={this.handleChagnePwd}/>
                                    {this.validator.message('password', this.state.pwd, 'required')}

                                    {/*Start btn-group*/}
                                    <div className="btn-group" style={dropDownWrapperStyle}>
                                        <DropdownButton id="dropdown-basic-button"
                                                        title={this.state.selectedLanguage[1]}>
                                            <Dropdown.Item style={dropDownLiStyle}
                                                           onClick={() => this.handleChangeLanguage(['ko', '한국어'])}>
                                                한국어
                                            </Dropdown.Item>
                                            <Dropdown.Item style={dropDownLiStyle}
                                                           onClick={() => this.handleChangeLanguage(['en', 'English'])}>
                                                English
                                            </Dropdown.Item>
                                            <Dropdown.Item style={dropDownLiStyle}
                                                           onClick={() => this.handleChangeLanguage(['cn', 'China'])}>
                                                China
                                            </Dropdown.Item>
                                        </DropdownButton>
                                    </div>
                                    {/*End btn-group*/}
                                </div>

                                <dl className="login-caution">
                                    {/*<dt><i class="icon-info-sign"></i> 주의</dt>*/}
                                    {/*<dd>1. 개인정보파일의 외부 전송 시, 수신자를 다시 한번 확인해 주시기 바랍니다. </dd>*/}
                                    {/*<dd>2. 본 시스템의 사용 내역은 모니터링되고 있음을 안내드립니다.</dd>*/}
                                    {/*<dd>3. 비밀번호 분실 시에는 관리자에게 문의 바랍니다.</dd>*/}
                                </dl>

                                <div className="login-area">
                                    <div className="login-btn">
                                        <button className="btn01 btn-primary" type="button" onClick={this.goLogin}>
                                            로그인
                                        </button>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*End Login*/}
                </div>
            </div>
        )
    };
}

export default LoginClassComponent;