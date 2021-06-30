import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import getServerVersion from './getServerVersion';
import getPageInfo from './getPageInfo';
import HeaderTitle from '../img/header_title.png';

import '../css/react-css/header.css'

function Header(props) {

    let [serverVersion, setServerVersion] = useState('');
    let [activeMenuName1, setActiveMenuName1] = useState('');
    let [activeMenuName2, setActiveMenuName2] = useState('');
    let [activeMenuName3, setActiveMenuName3] = useState('');

    useEffect(() => {
        async function getData() {
            setServerVersion(await getServerVersion());
            await getPageInfo('1010000')
                .then(r => {
                    setActiveMenuName1(r.activeMenuName1);
                    setActiveMenuName2(r.activeMenuName2);
                    setActiveMenuName3(r.activeMenuName3);
                });
        }

        getData();
    }, [serverVersion]);

    if (props.location.pathname === "/" || props.location.pathname === "/login") {
        return false;
    }

    return (
        <div className="main-header">
            <div className="container-fluid">
                <div className="title">
                    <Link to={`/other`}>
                        <h1>
                            <img src={HeaderTitle}/>
                            <span className="ver">{serverVersion}</span>
                        </h1>
                    </Link>
                </div>

                {/*Start Header Panel*/}
                <div className="header-panel">
                    <div id="dropdown-patterns" className="dropdown " rel="tooltip" data-placement="left">

                                <span className="menu" id="btnModalAdminSetting" style={{cursor: 'pointer'}}
                                      rel="tooltip"
                                      data-placement="left" title="관리자 비밀번호 변경">
                                    <i className="icon iconfa-cog"></i>
                                </span>

                        <a className="menu" rel="tooltip" data-placement="left" title="로그아웃">
                            <i className="icon iconfa-signout"></i>
                        </a>

                        <a className="menu"><i className="icon iconfa-home"></i></a>

                        <a className="menu" id="menu-phone" data-menu="mobile">
                            <i className="icon iconfa-tasks"></i>
                        </a>
                    </div>
                </div>
                {/*End Header Panel*/}
            </div>

            {/*Start depth space*/}
            <div className="row-fluid">
                <div className="depth_space"></div>
                {/*Start depth*/}
                <div className="depth_box">
                    <ul className="depth">
                        <li><a><span className="icon iconfa-home depth_icon"></span> Home</a></li>
                        {(activeMenuName1 !== null && activeMenuName1 !== '') && <li><a>{activeMenuName1}</a></li>}
                        {(activeMenuName2 !== null && activeMenuName2 !== '') && <li><a>{activeMenuName2}</a></li>}
                        {(activeMenuName3 !== null && activeMenuName3 !== '') && <li><a>{activeMenuName3}</a></li>}
                    </ul>
                </div>
                {/*End depth*/}
            </div>
            {/*End depth space*/}
        </div>
    );
}

export default Header;