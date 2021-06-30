import React, {useState} from "react";
import {Link} from "react-router-dom";
import Collapse from "react-bootstrap/Collapse";

// export default (props) => {
//     console.log(props);

function MakeSideMenu(sideMenuList, menu, idx, pageInfo) {
    const [isOpen, setOpen] = useState(false);

    console.log(sideMenuList)
    console.log(menu)
    console.log(idx)

    return (
        <>
            {menu.upperMenuId === 0 &&
            <li key={`l1-${idx}`} className="accordion-group">
                <Link target={menu.menuNo === 7000000 ? "_blank" : ""}
                      data-toggle={menu.menuNo !== 7000000 ? "collapse" : ""}
                      data-parent={menu.menuNo !== 7000000 ? "#nav-mainmenu" : ""}
                      to={menu.menuNo !== 7000000 ? `#` : `${menu.chkURL}`}
                      onClick={setOpen(!isOpen)}
                      aria-expanded={isOpen}>
                    {menu.relateImageNm !== '/' && menu.relateImageNm !== '' &&
                    <span className={`icon ${menu.relateImageNm}`}></span>}
                    <span className="text">{menu.menuNm}</span>
                    <span className="badge pull-right">{menu.childCount}</span>
                </Link>

                <Collapse in={isOpen}>
                    <ul key={`u1-${idx}`}
                        className={`nav-submenu collapse ${pageInfo.activeMenu1 === menu.menuNo && "in"}`}>

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
                </Collapse>
            </li>
            }
        </>
    );
}

export default MakeSideMenu