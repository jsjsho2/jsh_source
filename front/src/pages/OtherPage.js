import {useEffect, useState} from "react";
import getPageInfo from "../components/getPageInfo";

function OtherPage(props) {

    let [pageInfo, setPageInfo] = useState({});

    useEffect(() => {
        async function getData() {
            setPageInfo(await getPageInfo('1010000'));
        }

        getData();
    }, []);

    return (
        <>
            {/*Start Main Content*/}
            <div id="main-content">

                {/*Start Nav Submenu Title*/}
                <div className="h2Title_box">
                    <h2 className="h2_header">{pageInfo.title}</h2>
                    <p className="h2Title_box_line"></p>
                </div>
                {/*End Nav Submenu Title*/}

                <p className="header_space"></p>

                <div className="row-fluid">
                    {/*Start Organization Contents*/}
                    <div className="span12" id="listGridHead">
                        <div className="widget">
                            {/*Start Widget Head*/}
                            <div className="widget-head">
                                <form>
                                    <div className="front_Toolbar">
                                        <ul className="tool_item">
                                            <li>
                                                <button type="button" className="btn_f_tool" id="btnReload">
                                                    <i className="icon icon-refresh"></i>
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="btn_f_tool" id="btnNew">
                                                    <i className="icon icon-plus-sign"></i>
                                                </button>
                                            </li>
                                            <li className="item_check">
                                                <p className="field switch">
                                                    &nbsp;
                                                    <input type="radio" id="rdoUseYN1" name="rdoUseYN" value="Y" checked/>
                                                    <input type="radio" id="rdoUseYN2" name="rdoUseYN" value="N"/>
                                                    <label id="lblUseYN1" for="rdoUseYN1" className="cb-enable selected">
                                                        <span>사용</span>
                                                    </label>
                                                    <label id="lblUseYN2" for="rdoUseYN2" className="cb-disable">
                                                        <span>사용안함</span>
                                                    </label>
                                                    &nbsp;
                                                </p>
                                            </li>
                                            <li className="search">
                                                <div className="input-append">
                                                    <input type="text" id="txtSearch"
                                                           placeholder="정책명"
                                                           className="search-query"/>
                                                    <button className="btn" type="button" id="btnSearch">
                                                        <i className="icon icon-search"></i>
                                                    </button>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="toolbar">
                                        <div className="btn-group">
                                            <a href="#" className="btn" data-toggle="dropdown">PageSize
                                                <span className="caret"></span>
                                            </a>
                                            <ul className="dropdown-menu pull-right" role="menu" aria-labelledby="dLabel">
                                                <li><a id="btnPagesize20" pagesize='20'> 20</a></li>
                                                <li><a id="btnPagesize50" pagesize='50'> 50</a></li>
                                                <li><a id="btnPagesize100" pagesize='100'> 100</a></li>
                                                <li><a id="btnPagesize500" pagesize='500'> 500</a></li>
                                            </ul>
                                        </div>

                                        <div className="btn-group">
                                            <a href="#" className="btn" data-toggle="dropdown">Tools <span className="caret"></span>
                                            </a>
                                            <ul className="dropdown-menu pull-right" role="menu" aria-labelledby="dLabel">
                                                <li><a id="btnToolsExcel" target="listGrid" type="excel">
                                                    <i className="icon-eye-open"></i> Excel Download</a>
                                                </li>
                                                <li><a id="btnToolsPdf" target="listGrid" type="pdf">
                                                    <i className="icon-eye-open"></i> Pdf Download</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            {/*End Widget Head*/}

                            <table id="listGrid"></table>

                            <div id="NoData" className="row-fluid hidden">
                                <div className="span12">
                                    <div className="widget-content">
                                        <div className="widget-content-inner text-center">
                                            <h4>
                                                자료가 없습니다. 다른 검색조건을 선택해주세요
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row-fluid">
                                {/*Start Organization Contents*/}
                                <div className="span12">
                                    <div className="widget-content no-padding">
                                        {/*Start dataTable_Footer*/}
                                        <div className="dataTable_footer">
                                            <div className="row-fluid">
                                                <div className="span6">
                                                    <div className="dataTables_info" id="listGridInfo"></div>
                                                </div>
                                                <div className="span6">
                                                    <div id="paginate" className="dataTables_paginate paging_bootstrap pagination"></div>
                                                </div>
                                            </div>
                                        </div>
                                        {/*End dataTable_Footer*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*End Main Content*/}
        </>
    );
}

export default OtherPage;