import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import getSideMenuList from "./getSideMenuList";
import getPageInfo from "./getPageInfo";

import '../css/react-css/sideMenu.css';

function SideMenu(props) {
    let [sideMenuList, setSideMenuList] = useState([]);
    let [pageInfo, setPageInfo] = useState({});

    useEffect(async () => {
        setSideMenuList(await getSideMenuList());
        setPageInfo(await getPageInfo('1010000'));

        console.log(sideMenuList)
    }, []);

    if (props.location.pathname === "/" || props.location.pathname === "/login") {
        return false;
    }

    let test = 0

    return (
        <div id="sidebar">

            <Accordion defaultActiveKey="0">
                <div>
                    <Card>
                        <Accordion.Toggle variant="link" eventKey={`tt${++test}`}>
                            Click me!
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={`tt${test}`}>
                            <Card.Body>
                                Hello! I'm the body
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Button} variant="link" eventKey={`tt${++test}`}>
                            Click me!
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={`tt${test}`}>
                            <Card.Body>
                                Hello! I'm another body
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </div>
            </Accordion>

            <Accordion defaultActiveKey="0">
                <ul className="nav-mainmenu" id="nav-mainmenu">
                    {sideMenuList.map((menu, idx) => (
                        <>
                            {menu.upperMenuId === 0 &&
                            <>
                                <li key={`l1-${idx}`} className="accordion-group">
                                    <Card>
                                        <Accordion.Toggle variant="link" eventKey={`tt${++test}`}>
                                            {/*                                    <Link target={menu.menuNo === 7000000 ? "_blank" : ""}
                                          data-toggle={menu.menuNo !== 7000000 ? "collapse" : ""}
                                          data-parent={menu.menuNo !== 7000000 ? "#nav-mainmenu" : ""}
                                          to={menu.menuNo !== 7000000 ? `${menu.menuNo}` : `${menu.chkURL}`}>
                                        {menu.relateImageNm !== '/' && menu.relateImageNm !== '' &&*/}
                                            {/*<span className={`icon ${menu.relateImageNm}`}></span>*/}
                                            {/*<span className="text">{menu.menuNm}</span>*/}
                                            {/*<span className="badge pull-right">{menu.childCount}</span>*/}
                                            {`tt${test}`}
                                            {/*</Link>*/}
                                        </Accordion.Toggle>
                                    </Card>
                                    <Card>
                                        <Accordion.Collapse eventKey={`tt${test}`}>
                                            <Card.Body>
                                                <ul key={`u1-${idx}`}
                                                    className={`nav-submenu collapse ${pageInfo.activeMenu1 === menu.menuNo && "in"}`}
                                                    id={menu.menuNo}>

                                                    {sideMenuList.map((twoDepthMenu, idx2) => (
                                                        <>
                                                            {(twoDepthMenu.upperMenuId === menu.menuNo && twoDepthMenu.childCount === 0) &&
                                                            <li key={`l2-${idx2}`}
                                                                id={`leftmenu${twoDepthMenu.menuNo}`}>
                                                                <Link className={pageInfo.activeMenu2 === twoDepthMenu.menuNo ? "active" : ""}
                                                                      to={twoDepthMenu.chkURL}>
                                                                    {(twoDepthMenu.relateImageNm !== '/' && twoDepthMenu.relateImageNm !== '') &&
                                                                    <span className={`icon ${twoDepthMenu.relateImageNm}`}></span>
                                                                    }
                                                                    <div className="nav-submenu_txt">
                                                                        {twoDepthMenu.menuNm}
                                                                    </div>
                                                                </Link>
                                                            </li>
                                                            }
                                                            {(twoDepthMenu.upperMenuId === menu.menuNo && twoDepthMenu.childCount !== 0) &&
                                                            <div>
                                                                <li key={`l2-${idx2}`}
                                                                    className="accordion-group"
                                                                    id={`leftmenu${twoDepthMenu.menuNo}`}>
                                                                    <Link data-toggle="collapse"
                                                                          data-parent="#page"
                                                                          to={`#${twoDepthMenu.menuNo}`}
                                                                          className={pageInfo.activeMenu2 === twoDepthMenu.menuNo ? "active" : ""}>
                                                                        {(twoDepthMenu.relateImageNm !== '/' && twoDepthMenu.relateImageNm !== '') &&
                                                                        <span className={`icon ${twoDepthMenu.relateImageNm}`}></span>}
                                                                        {twoDepthMenu.menuNm}
                                                                        <span className="caret pull-right"></span>
                                                                    </Link>

                                                                    <ul key={`u2-${idx2}`}
                                                                        className={`nav-subitem collapse ${pageInfo.activeMenu2 === twoDepthMenu.menuNo && "in"}`}
                                                                        id={twoDepthMenu.menuNo}>
                                                                        Start 3Depth Menu
                                                                        {sideMenuList.map((threeDepthMenu, idx3) => (
                                                                            <>
                                                                                {threeDepthMenu.upperMenuId === twoDepthMenu.menuNo &&
                                                                                <li key={`l3-${idx3}`}
                                                                                    id={`leftmenu${threeDepthMenu.menuNo}`}>
                                                                                    <Link to={threeDepthMenu.chkURL}
                                                                                          className={pageInfo.activeMenu3 === threeDepthMenu.menuNo ? "active" : ""}>
                                                                                        {(threeDepthMenu.relateImageNm != '/' && threeDepthMenu.relateImageNm != '') &&
                                                                                        <span className={`icon ${threeDepthMenu.relateImageNm}`}></span>
                                                                                        }
                                                                                    </Link>
                                                                                </li>
                                                                                }
                                                                            </>
                                                                        ))}
                                                                    </ul>
                                                                </li>
                                                            </div>
                                                            }
                                                        </>
                                                    ))}
                                                </ul>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </li>
                            </>
                            }
                        </>
                    ))}
                </ul>
            </Accordion>
        </div>
    );
}

export default SideMenu;