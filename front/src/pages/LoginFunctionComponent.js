import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router";
import axios from 'axios';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import {useForm} from "react-hook-form";

import getServerVersion from '../components/getServerVersion';

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

function LoginFunctionComponent() {
    const history = useHistory();
    let [serverVersion, setServerVersion] = useState('');
    let [selectedLanguage, setSelectedLanguage] = useState(['ko', '한국어']);

    useEffect(async () => {
        setServerVersion(await getServerVersion());
        setFocus("id");
    }, []);

    const {
        register,
        handleSubmit,
        setFocus,
        formState: {errors}
    } = useForm();

    const handleChangeLanguage = (language) => {
        setSelectedLanguage(language);
    }

    const goLogin = (data) => {

        let params = new URLSearchParams();
        params.append('id', data.id);
        params.append('password', data.password);
        params.append('lang', selectedLanguage[0]);

        axios.post('/api/Login.do', params)
            .then(res => {

                console.log(res.data)
                // const obj = res.data.model;
                //
                // if (obj.result === 'S') {
                //     if (obj.alertMsg !== undefined) {
                //         alert(obj.alertMsg);
                //     }
                //     if (obj.locationHref !== undefined) {
                //         console.log(obj.locationHref);
                //         history.push("/other");
                //         // window.location = result.locationHref;
                //     }
                // } else if (obj.result === 'F') {
                //     if (obj.alertMsg !== undefined) {
                //         alert(obj.alertMsg);
                //         setFocus("id");
                //     } else {
                //         alert('오류가 발생했습니다. 다시 로그인 바랍니다.');
                //     }
                // }
            });
    }

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
                                        <span className="ver">{serverVersion}</span>
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

                                <form onSubmit={handleSubmit(goLogin)}>
                                    <input type="text" placeholder="아이디를 입력하세요"
                                           className="input-block-level"
                                           value="kings"
                                           {...register("id", {required: true, minLength: 3})}
                                    />
                                    {errors.id && <p className='validate-message'>필수 입력항목입니다.</p>}

                                    <input type="password"
                                           placeholder="비밀번호를 입력하세요"
                                           className="input-block-level"
                                           value="kessadmin12#"
                                           {...register("password", {required: true, minLength: 3, maxLength: 30})}
                                    />
                                    {errors.password && <p className='validate-message'>필수 입력항목입니다.</p>}

                                    {/*Start btn-group*/}
                                    <div className="btn-group" style={dropDownWrapperStyle}>
                                        <DropdownButton id="dropdown-basic-button"
                                                        title={selectedLanguage[1]}>
                                            <Dropdown.Item style={dropDownLiStyle}
                                                           onClick={() => handleChangeLanguage(['ko', '한국어'])}>
                                                한국어
                                            </Dropdown.Item>
                                            <Dropdown.Item style={dropDownLiStyle}
                                                           onClick={() => handleChangeLanguage(['en', 'English'])}>
                                                English
                                            </Dropdown.Item>
                                            <Dropdown.Item style={dropDownLiStyle}
                                                           onClick={() => handleChangeLanguage(['cn', 'China'])}>
                                                China
                                            </Dropdown.Item>
                                        </DropdownButton>
                                    </div>

                                    <dl className="login-caution">
                                        {/*<dt><i class="icon-info-sign"></i> 주의</dt>*/}
                                        {/*<dd>1. 개인정보파일의 외부 전송 시, 수신자를 다시 한번 확인해 주시기 바랍니다. </dd>*/}
                                        {/*<dd>2. 본 시스템의 사용 내역은 모니터링되고 있음을 안내드립니다.</dd>*/}
                                        {/*<dd>3. 비밀번호 분실 시에는 관리자에게 문의 바랍니다.</dd>*/}
                                    </dl>

                                    <div className="login-btn">
                                        <button className="btn01 btn-primary" type="submit">로그인</button>
                                    </div>
                                    <div className="clearfix"></div>
                                </form>
                                {/*End btn-group*/}
                            </div>
                        </div>
                    </div>
                </div>
                {/*End Login*/}
            </div>
        </div>
    )
}

export default LoginFunctionComponent;