import React, {useRef, useState, useEffect} from 'react';
import {useHistory} from "react-router";
import axios from 'axios';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import {useForm} from "react-hook-form";

import getServerVersion from '../components/getServerVersion';

import HeaderTitle from '../img/header_title.png';
import '../css/react-css/login_page.css';

function SeconDocTest() {
    let [serverVersion, setServerVersion] = useState('');

    const fileInput = useRef(null);

    useEffect(async () => {
        setServerVersion(await getServerVersion());
    }, []);

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const goSubmit = (data) => {

        console.log(fileInput.current.files)

        let params = new FormData();
        params.append('userID', "아니");
        // params.append('AdminUserIDs', data.AdminUserIDs);
        // params.append('DBSearchLangCode', data.DBSearchLangCode);
        // params.append('adminSessionLanguage', data.adminSessionLanguage);
        // params.append('adminUserID', data.adminUserID);
        params.append('clipboardYN', data.clipboardYN);
        // params.append('content', data.content);
        params.append('downCntLimit', data.downCntLimit);
        params.append('downCntLimitYN', data.downCntLimitYN);
        // params.append('enterpriseCode', data.enterpriseCode);
        params.append('execCntLimit', data.execCntLimit);
        params.append('execCntLimitYN', data.execCntLimitYN);
        // params.append('mailSubject', data.mailSubject);
        params.append('password', data.password);
        params.append('passwordUseYN', data.passwordUseYN);
        // params.append('patternFilterAccCount', data.patternFilterAccCount);
        // params.append('patternFilterCardCount', data.patternFilterCardCount);
        // params.append('patternFilterCorpCount', data.patternFilterCorpCount);
        // params.append('patternFilterDrvCount', data.patternFilterDrvCount);
        // params.append('patternFilterEnterCount', data.patternFilterEnterCount);
        // params.append('patternFilterJuminCount', data.patternFilterJuminCount);
        // params.append('patternFilterMailCount', data.patternFilterMailCount);
        // params.append('patternFilterMobileCount', data.patternFilterMobileCount);
        // params.append('patternFilterPassCount', data.patternFilterPassCount);
        // params.append('patternFilterPhoneCount', data.patternFilterPhoneCount);
        params.append('printLimitYN', data.printLimitYN);
        params.append('reSendYN', data.reSendYN);
        // params.append('recivMail', data.recivMail);
        params.append('saveasYN', data.saveasYN);
        params.append('screenCaptureYN', data.screenCaptureYN);
        params.append('useDate', data.useDate);

        for (let i = 0, l = fileInput.current.files.length; i < l; i++) {
            params.append('uploadFile', fileInput.current.files[i]);
        }

        axios.post('/api/secondDocFileUpload.do', params, {
            headers: {
                'Authorization': 'testToken',
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            // alert(res.data);
            console.log(res);
            console.log(res.data);
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
                            <h3><i className="icon iconfa-lock"></i> 2차유통 테스트</h3>

                            <div className="login-area">
                                <form onSubmit={handleSubmit(goSubmit)}>
                                    <div className="login-btn" style={{clear: 'inherit'}}>
                                        <button className="btn01 btn-primary" type="submit">전송</button>
                                    </div>

                                    uploadFile
                                    <input type="file"
                                           multiple="multiple"
                                           className="input-block-level"
                                           ref={fileInput}/>

                                    유저 아이디
                                    <input type="text"
                                           className="input-block-level"
                                           value="jsh"
                                           {...register("userID", {required: true})}/>
                                    {errors.userID && <p className='validate-message'>필수 입력항목입니다.</p>}

                                    printLimitYN
                                    <input type="text"
                                           className="input-block-level"
                                           value="1"
                                           {...register("printLimitYN", {required: true})}/>
                                    {errors.printLimitYN && <p className='validate-message'>필수 입력항목입니다.</p>}

                                    saveasYN
                                    <input type="text"
                                           className="input-block-level"
                                           value="Y"
                                           {...register("saveasYN", {required: true})}/>
                                    {errors.saveasYN && <p className='validate-message'>필수 입력항목입니다.</p>}

                                    screenCaptureYN
                                    <input type="text"
                                           className="input-block-level"
                                           value="Y"
                                           {...register("screenCaptureYN", {required: true})}/>
                                    {errors.screenCaptureYN && <p className='validate-message'>필수 입력항목입니다.</p>}

                                    patternFilterEnterCount
                                    <input type="text"
                                           className="input-block-level"
                                           value="1"
                                           {...register("patternFilterEnterCount", {required: true})}/>
                                    {errors.patternFilterEnterCount && <p className='validate-message'>필수 입력항목입니다.</p>}

                                    patternFilterDrvCount
                                    <input type="text"
                                           className="input-block-level"
                                           value="1"
                                           {...register("patternFilterDrvCount", {required: true})}/>
                                    {errors.patternFilterDrvCount && <p className='validate-message'>필수 입력항목입니다.</p>}

                                    useDate
                                    <input type="text"
                                           className="input-block-level"
                                           value="2021-06-30"
                                           {...register("useDate", {required: true})}/>
                                    {errors.useDate && <p className='validate-message'>필수 입력항목입니다.</p>}

                                    downCntLimitYN
                                    <input type="text"
                                           className="input-block-level"
                                           value="Y"
                                           {...register("downCntLimitYN", {required: true})}/>
                                    {errors.downCntLimitYN && <p className='validate-message'>필수 입력항목입니다.</p>}

                                    patternFilterCorpCount
                                    <input type="text"
                                           className="input-block-level"
                                           value="1"
                                           {...register("patternFilterCorpCount", {required: true})}/>
                                    {errors.patternFilterCorpCount && <p className='validate-message'>필수 입력항목입니다.</p>}

                                    recivMail
                                    <input type="text"
                                           className="input-block-level"
                                           value=""
                                           {...register("recivMail", {required: false})}/>

                                    patternFilterMailCount
                                    <input type="text"
                                           className="input-block-level"
                                           value="1"
                                           {...register("patternFilterMailCount", {required: true})}/>
                                    {errors.patternFilterMailCount && <p className='validate-message'>필수 입력항목입니다.</p>}

                                    patternFilterCardCount
                                    <input type="text"
                                           className="input-block-level"
                                           value="1"
                                           {...register("patternFilterCardCount", {required: true})}/>
                                    {errors.patternFilterCardCount && <p className='validate-message'>필수 입력항목입니다.</p>}

                                    patternFilterMobileCount
                                    <input type="text"
                                           className="input-block-level"
                                           value="1"
                                           {...register("patternFilterMobileCount", {required: true})}/>
                                    {errors.patternFilterMobileCount && <p className='validate-message'>필수 입력항목입니다.</p>}

                                    patternFilterJuminCount
                                    <input type="text"
                                           className="input-block-level"
                                           value="1"
                                           {...register("patternFilterJuminCount", {required: true})}/>
                                    {errors.patternFilterJuminCount && <p className='validate-message'>필수 입력항목입니다.</p>}

                                    reSendYN
                                    <input type="text"
                                           className="input-block-level"
                                           value="1"
                                           {...register("reSendYN", {required: true})}/>
                                    {errors.password && <p className='validate-message'>필수 입력항목입니다.</p>}

                                    mailSubject
                                    <input type="text"
                                           className="input-block-level"
                                           value="enter_title"
                                           {...register("mailSubject", {required: true})}/>
                                    {errors.mailSubject && <p className='validate-message'>필수 입력항목입니다.</p>}

                                    password
                                    <input type="text"
                                           className="input-block-level"
                                           value="12341234"
                                           {...register("password", {required: true})}/>
                                    {errors.password && <p className='validate-message'>필수 입력항목입니다.</p>}

                                    uploadFile
                                    <input type="text"
                                           className="input-block-level"
                                           value=""
                                           {...register("uploadFile", {required: false})}/>

                                    execCntLimit
                                    <input type="text"
                                           className="input-block-level"
                                           value="5"
                                           {...register("execCntLimit", {required: true})}/>
                                    {errors.execCntLimit && <p className='validate-message'>필수 입력항목입니다.</p>}

                                    patternFilterPhoneCount
                                    <input type="text"
                                           className="input-block-level"
                                           value="1"
                                           {...register("patternFilterPhoneCount", {required: true})}/>
                                    {errors.patternFilterPhoneCount && <p className='validate-message'>필수 입력항목입니다.</p>}

                                    patternFilterPassCount
                                    <input type="text"
                                           className="input-block-level"
                                           value="1"
                                           {...register("patternFilterPassCount", {required: true})}/>
                                    {errors.patternFilterPassCount && <p className='validate-message'>필수 입력항목입니다.</p>}

                                    patternFilterAccCount
                                    <input type="text"
                                           className="input-block-level"
                                           value="1"
                                           {...register("patternFilterAccCount", {required: true})}/>
                                    {errors.patternFilterAccCount && <p className='validate-message'>필수 입력항목입니다.</p>}

                                    passwordUseYN
                                    <input type="text"
                                           className="input-block-level"
                                           value="Y"
                                           {...register("passwordUseYN", {required: true})}/>
                                    {errors.passwordUseYN && <p className='validate-message'>필수 입력항목입니다.</p>}

                                    downCntLimit
                                    <input type="text"
                                           className="input-block-level"
                                           value="5"
                                           {...register("downCntLimit", {required: true})}/>
                                    {errors.downCntLimit && <p className='validate-message'>필수 입력항목입니다.</p>}

                                    execCntLimitYN
                                    <input type="text"
                                           className="input-block-level"
                                           value="Y"
                                           {...register("execCntLimitYN", {required: true})}/>
                                    {errors.execCntLimitYN && <p className='validate-message'>필수 입력항목입니다.</p>}

                                    content
                                    <input type="text"
                                           className="input-block-level"
                                           value="enter_content"
                                           {...register("content", {required: true})}/>
                                    {errors.content && <p className='validate-message'>필수 입력항목입니다.</p>}

                                    clipboardYN
                                    <input type="text"
                                           className="input-block-level"
                                           value="Y"
                                           {...register("clipboardYN", {required: true})}/>
                                    {errors.clipboardYN && <p className='validate-message'>필수 입력항목입니다.</p>}

                                    AdminUserIDs
                                    <input type="text"
                                           className="input-block-level"
                                           value="kings"
                                           {...register("AdminUserIDs", {required: true})}/>
                                    {errors.AdminUserIDs && <p className='validate-message'>필수 입력항목입니다.</p>}

                                    adminUserID
                                    <input type="text"
                                           className="input-block-level"
                                           value="kings"
                                           {...register("adminUserID", {required: true})}/>
                                    {errors.adminUserID && <p className='validate-message'>필수 입력항목입니다.</p>}

                                    adminSessionLanguage
                                    <input type="text"
                                           className="input-block-level"
                                           value="ko"
                                           {...register("adminSessionLanguage", {required: true})}/>
                                    {errors.adminSessionLanguage && <p className='validate-message'>필수 입력항목입니다.</p>}

                                    DBSearchLangCode
                                    <input type="text"
                                           className="input-block-level"
                                           value="ko"
                                           {...register("DBSearchLangCode", {required: true})}/>
                                    {errors.DBSearchLangCode && <p className='validate-message'>필수 입력항목입니다.</p>}

                                    enterpriseCode
                                    <input type="text"
                                           className="input-block-level"
                                           value="CU"
                                           {...register("enterpriseCode", {required: true})}/>
                                    {errors.enterpriseCode && <p className='validate-message'>enterpriseCode 필수 입력항목입니다.</p>}

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

export default SeconDocTest;