/**
 ~ Copyright 2020 Infinigru Corp.; All codes, algorithms including this script are the properties of Infinigru Corp.
 ~ It is strictly forbidden to copy including photocopy, or duplicate, or use without the permission of Infinigru CAO.
 ~ @description :
 ~ @team        : CoreCell
 ~ @author      : JSEUNGHO
 ~ @since       : 2020.7.6
 ~
 ~ Date        Author      Note
 ~ ----------  ----------  ------------------------------------
 ~ 2020.7.6   JSEUNGHO    최초등록
 ~ 2020.12.10 JSEUNGHO    소스 리뉴얼 작업 착수...

 반복, 공용으로 사용되는 함수들을 정리한 js

 coreFn{

    defaultOnLoad                       // 콘솔 로그인 시 미리 로드해야 될 함수들

    notification                        // 토스트, 콘솔 상단 알림, 승인팝업 등 알림과 관련된 함수들
        -startNotificationAndBlockCheck : 토스트 + 알림 체크 반복시키는 함수
        -check                          : 토스트 + 알림 체크
        -countSet                       : 콘솔 상단 알림아이콘에 알림 수 채우기
        -load                           : 콘솔 상단 알림아이콘 클릭 시 데이터 ajax
        -setNotification                : 콘솔 상단 알림아이콘 클릭 시 데이터 append
        -updateStatus                   : 콘솔 상단 알림창에서 모두 확인 누를 시 알림 상태 업데이트
        -popupToast                     : 토스트 팝업 띄우는 함수
        -toastRemove                    : 토스트 올 삭제
        -getDetect                      : 최초 1회 토스트 발생 후 더이상 같은 데이터는 토스트로 뜨지않게 함
        -endDetect                      : 토스트를 알림을 확인했다는 값으로 update

    manipulationDom                     // 엘리먼트의 속성값을 사용하여 해당 엘리먼트에 요소를 탈부착시키는 함수들
        -addonCheck                     : html 엘리먼트 속성에 addon이 있는지 체크

    addon                               // manipulationDom 의 함수들과 연계
        -clipboard                      : html 엘리먼트 addon 속성에 clipboard 가 있으면 클립보드 마크 달아줌
        -chosen                         : html 엘리먼트 addon 속성에 chosen 이 있으면 chosen lib를 사용하여 엘리먼트 변경. clipboard는 덤으로 붙여줌

    format                              // string 형태의 데이터를 number 등의 포맷으로 변경시키는 함수들
        -number                         : 숫자 포맷 (값)
        -pone                           : 휴대폰번호 포맷 (값)
        -tell                           : 전화번호 포맷 (값)

    common                              // 자주 공용으로 쓰이는 함수들
        - showModal                     : modal 띄우기 (width%, url, 파라미터, 모달 띄운 후 실행 함수)
        - goDetail                      : 리스트에서나 다른 곳에서 디테일 페이지로 넘어갈때 사용 (엘리먼트 attr data-param 사용)
        - setBorderBottomLiner          : input 에 포커스갔을때 밑줄 쫙쫙 기능
        - copyText                      : 글자 복사
        - conditionSessionSet           : grid 검색이나 해당 페이지의 조건값을 세션에 담음 (object)
        - goToBack                      : 목록, 뒤로가기 (history.back)
        - createUuid                    : javascript의 UUID 생성 함수
        - materialLabel                 : input 에 포커스갔을때 라벨 위아래 움직이는거
        - datePickerSet                 : js에서 함수호출하면 dateRangeTimePickerSetting 함수 실행. (숫자, 기간)
        - dateRangeTimePickerSetting    : 시간이 포함된 날짜기간 선택 달력을 적용시킴 (시작일시, 종료일시, page 타입: 모달 or 일반 페이지)
        - dateRangePickerSetting        : 날짜기간 선택 달력을 적용시킴 (시작일시, 종료일시, page 타입: 모달 or 일반 페이지)
        - changeLanguageSession         : 국가 마크 선택으로 언어 세션 변경

    grid                                // pqgrid 의 사용, 조작과 관련된 함수들
        - ajax                          : pqgrid 에 뿌릴 컨트롤러 url 맵핑 페이징 없는 타입 (url)
        - ajaxPagingType                : pqgrid 에 뿌릴 컨트롤러 url 맵핑 페이징 있는 타입 (url)
        - search                        : pqgrid load 시작 (ajax를 담음 , 세션에 담을 파라미터(검색 조건) , grid option, grid ID)
        - commentRender                 : commonet (tooltip) 달아줌

    alert                               // 알림 팝업과 관련된 함수들. ( notification 아님. 알림 lib 팝업 )
        - success                       : 성공 alert (메시지)
        - info                          : 정보 alert (메시지)
        - confirm                       : 컨펌 alert (메시지, 승인 시 실행 함수)
        - error                         : 에러 alert (메시지)

    session                             // 세션과 관련된 함수들
        - startSessionCount             : 세션카운트 시작

    eventBind                           // 페이지 중복 접근 시 함수 중복 선언으로인한 오류를 처리하기위해 함수로 뺌
        - document                      : $(document).on
        - on                            : $(target).on(motion, function(){})

    etc                                 // 기타..
        - scrollTop                     : 화면 최상단으로 올리는 버튼 기능
        - isEmpty                       : object, array 가 비어있는지 true, false 리턴 (object or array)
 }
 **/

let contextPath = $('#contextPath').val(),
    language = JSON.parse($('#language').val()),
    $modal = $("#modal"),
    $modalAppendDiv = $("#modalAppendDiv"),
    $modalLoadingMsg = $("#modalLoadingMsg"),
    $processingDiv = $(".processing-div"),
    $startDt = $('#startDt'),
    $endDt = $('#endDt'),
    keyPressMove = 0,
    enjoyhint_instance, enjoyhint_script_steps;

/**
 * 아직 미정의 함수들
 */
$("#changePasswordBtn").on("click", function () {
    location.href = contextPath + "/changepassword";
});

let coreFn = {
    sessionTimeOutTime: 60 * 30, // 세션유지 시간(60 * 30 sec)
    clientSessionTime: 0,
    variousNotificationsTime: 2 * 1000, // 알림, 블럭, 승인 체크 주기(초)
    firstLoad: "Y",
    offsetCnt: 0,
    ajaxObject: {
        location: "remote", // data location
        sorting: "remote", // remote or local
        dataType: "JSON",
        method: "POST", // Always use post only (Security)
    },
    bottomIconId: null,

    notification: {
        count: 0,
        $messageDiv: $("#notificationMessageContents"),
        $header: $("#notificationDropdownHeader"),
        $footer: $("#notificationDropdownFooter"),
        noticeLength: 0,
        beforeCount: 0,
        $notificationImg: $(".notification-img"),

        startNotificationAndBlockCheck: function () {

            setTimeout(function checking() {
                if (coreFn.clientSessionTime == 0 || coreFn.clientSessionTime < 1) return false;
                coreFn.notification.check();
                setTimeout(checking, coreFn.variousNotificationsTime);
            }, coreFn.variousNotificationsTime);
        },

        load: function () {
            coreFn.notification.count = $('#notificationCount').text();
            coreFn.notification.noticeLength = 0;

            coreFn.notification.$header.text("0 New Notification");
            coreFn.notification.$footer.text('more.. (0/0)');
            coreFn.notification.$messageDiv.empty();
            coreFn.notification.$messageDiv.append("<div id='notificationLoading' style='text-align: center;padding: 5px;'>Loading....</div><div class='dropdown-divider'></div>");

            $.ajax({
                url: contextPath + "/rest/v1/adsCommon/selectAlert",
                type: "POST",
                data: JSON.stringify({offset: coreFn.offsetCnt}),
                contentType: "application/json"
            }).done(function (response) {
                coreFn.notification.setNotification(response);
                $("#notificationLoading").remove();
            });
        },

        check: function () {
            let contact = {
                cnfrYn: '0',
                dplcYn: '0'
            };

            $.ajax({
                url: contextPath + "/rest/v1/adsCommon/selectAlertCnt",
                type: "POST",
                data: JSON.stringify(contact),
                contentType: "application/json"
            }).done(function (response) {

                response = parseInt(response);
                if (isNaN(response) || response === undefined || response === null || response === '') {
                    response = 0;
                }
                coreFn.notification.countSet(response);

                /* Rest 빈도 수를 위해 적용했으며 테스트 필요 */
                if (response > 0) {

                    $.ajax({
                        url: contextPath + "/rest/v1/adsCommon/toastCheck",
                        type: "POST",
                        data: JSON.stringify(contact),
                        contentType: "application/json"
                    }).done(function (rs) {
                        for (let i = 0; i < rs.length; i++) {
                            const uuid = rs[i].uuid;
                            if (uuid != null) {
                                switch (rs[i].alertKind) {
                                    case null:
                                        coreFn.notification.popupToast(rs[i], uuid, "D");
                                        break;
                                    case "R":
                                        coreFn.notification.popupToast(rs[i], uuid, "R");
                                        break;
                                    case "S":
                                        coreFn.notification.popupToast(rs[i], uuid, "S");
                                        break;
                                }
                            }
                        }
                    }).fail(function (jqXHR, textStatus) {
                        console.log('request check Error');
                    });
                }

            }).fail(function (jqXHR, textStatus) {
                console.log('selectAlertCnt Error');
            });
        },

        countSet: function (response) {

            if (response !== 0) {
                coreFn.notification.$notificationImg.hasClass("please-alert-check") ?
                    false : coreFn.notification.$notificationImg.addClass("please-alert-check");
            } else {
                coreFn.notification.$notificationImg.hasClass("please-alert-check") ?
                    coreFn.notification.$notificationImg.addClass("please-alert-check") : false;
            }

            coreFn.notification.beforeCount !== response ? $("#notificationCount").text(response) : false;
            coreFn.notification.beforeCount = response;
        },

        setNotification: function (response) {
            let $frag = $(document.createDocumentFragment());
            let length = response.length;
            coreFn.notification.noticeLength += length;

            for (let i = 0; i < length; i++) {
                let alertKindsDetail = "",
                    rowData = response[i];

                switch (rowData.alertCntn) {
                    case "차단":
                    case "Block":
                        alertKindsDetail = "<i class='fas fa-ban block-color'> " + rowData.alertCntn + "</i>";
                        break;
                    case "경보":
                    case "Warning":
                        alertKindsDetail = "<i class='fas fa-exclamation-triangle warning-color'> " + rowData.alertCntn + "</i>";
                        break;
                    case "예보":
                    case "Forecast":
                        alertKindsDetail = "<i class='fas fa-volume-up forecast-color'> " + rowData.alertCntn + "</i>";
                        break;
                    case "주시":
                    case "Watch":
                        alertKindsDetail = "<i class='fas fa-eye watch-color'> " + rowData.alertCntn + "</i>";
                        break;
                }

                if (rowData.alertKind === "결재" || rowData.alertKind === "R") {
                    $frag.append("<a class='dropdown-item notification-go-detail'  data-param='{\"url\": \"/approval/detail\", \"uuid\": \"" + rowData.alertTrgtUuid + "\", \"trgetUuid\": \"" + rowData.alertUuid + "\", \"blank\": true}'>" +
                        "             <div class='width-100'>" +
                        "                 <i class='fas fa-exclamation mr-2' style='color:red'></i>" +
                        "                 <span class='mr-2'>결재요청</span>" +
                        "                 <span class='mr-6 dropdown-num-color'>" + rowData.mngNo + "</span>" +
                        "                 <br>" +
                        "                 <div class='pull-right alert-time'>" +
                        "                     <small>" + rowData.alertCrtnDttm + "</small>" +
                        "                 </div>" +
                        "             </div>" +
                        "         </a>" +
                        "         <div class='dropdown-divider'></div>");
                } else if (rowData.alertKind === "가입 요청") {
                    $frag.append("<a class='dropdown-item notification-go-detail'  data-param='{\"url\": \"/user/detail\", \"uuid\": \"" + rowData.alertTrgtUuid + "\", \"trgetUuid\": \"" + rowData.alertTrgtUuid + "\", \"blank\": true}'>" +
                        "             <div class='width-100'>" +
                        "                 <i class='fas fa-exclamation mr-2' style='color:red'></i>" +
                        "                 <span class='mr-2'>가입 요청</span>" +
                        "                 <span class='mr-6 dropdown-num-color'>" + rowData.alertTrgtUuid + "</span>" +
                        "                 <br>" +
                        "                 <div class='pull-right alert-time'>" +
                        "                     <small>" + rowData.alertCrtnDttm + "</small>" +
                        "                 </div>" +
                        "             </div>" +
                        "         </a>" +
                        "         <div class='dropdown-divider'></div>");
                } else {
                    $frag.append("<a class='dropdown-item notification-go-detail'  data-param='{\"url\": \"/detectionResult/detail\", \"uuid\": \"" + rowData.alertUuid + "\", \"trgetUuid\": \"" + rowData.alertTrgtUuid + "\", \"blank\": true}'>" +
                        "             <div class='width-100'>" +
                        "                 <i class='fas fa-exclamation mr-2' style='color:red'></i>" +
                        "                 <span class='mr-2'>" + rowData.alertKind + "</span>" +
                        alertKindsDetail +
                        "                 <span class='mr-6 dropdown-num-color'>" + rowData.mngNo + "</span>" +
                        "                 <br>" +
                        "                 <div class='pull-right alert-time'>" +
                        "                     <small>" + rowData.alertCrtnDttm + "</small>" +
                        "                 </div>" +
                        "             </div>" +
                        "         </a>" +
                        "         <div class='dropdown-divider'></div>");
                }
            }

            coreFn.notification.$messageDiv.append($frag);
            coreFn.notification.$header.text(coreFn.notification.count + " New Notification");
            coreFn.notification.$footer.text('more.. (' + coreFn.notification.noticeLength + '/' + coreFn.notification.count + ')');
        },

        updateStatus: function (uuid) {
            let $notificationCount = $("#notificationCount");
            if (uuid == 'all') {
                coreFn.notification.$header.text("0 New Notification");
                coreFn.notification.$footer.text('more.. (0/0)');
                coreFn.notification.$messageDiv.empty();
                $notificationCount.text("0");
            }

            $.ajax({
                url: contextPath + "/rest/v1/adsCommon/updateAlert",
                type: "POST",
                data: {"uuid": uuid}
            });
            coreFn.notification.toastRemove();
        },

        popupToast: function (param, uuid, type) {

            param === null || param === "null" ? "ABCDEFG" : param;


            let bgColor = "",
                textColor = "",
                msgHeaderArray = [],
                msgArray = [],
                toastIcon = "";

            switch (type) {
                case "D":
                    if (param.apiEtcOptn !== '' && param.apiEtcOptn !== null && param.apiEtcOptn !== undefined) {
                        param.apiEtcOptn = JSON.parse(param.apiEtcOptn);

                        bgColor = param.apiEtcOptn.backgroundColor;
                        textColor = param.apiEtcOptn.textColor;
                    } else {
                        bgColor = "#e03d3d";
                        textColor = "#fff";
                    }

                    toastIcon = "warning";

                    // param = param.replace(/&amp;nbsp;/gi, ' ')
                    // .replace(/&amp;amp;nbsp;/gi, ' ')
                    // .replace(/&lt;p&gt;/gi, '')
                    // .replace('[hd]', '');
                    // //tag 복구
                    // param = param.replace(/&lt;/gi, '<')
                    // .replace(/&gt;/gi, '>')
                    // .replace(/&quot;/gi, '"');
                    //
                    // param = param.replace(/uuidValue/gi, uuid);
                    // msgHeaderArray = param.split('[/hd]');
                    //
                    // //tag 복구
                    // param = msgHeaderArray[1];
                    // param = param.replace(/&lt;/gi, '<')
                    // .replace(/&gt;/gi, '>')
                    // .replace(/&quot;/gi, '"')
                    // .replace(/<[?/]p>/gi, '!@#');
                    // msgArray = param.split('!@#');

                    let toast_msg = param.notcMsg;
                    toast_msg = toast_msg.replace("@{관리번호}", param.trgetUuid)
                        .replace("[hd]", "<h6 style='margin-bottom: 6px;'>")
                        .replace("[/hd]", "</h6>")
                        .replace("@{탐지상세Link/}", "<a class='adsDetectionDetailForToast' style='cursor:pointer' data-param='{\"uuid\": \"uuidValue\", \"gfFdsId\": \"" + param.trgetUuid + "\", \"url\": \"/detectionResult/detail\", \"blank\": true}'>")
                        .replace("@{/탐지상세}", "</a>")
                        .replace("@{탐지번호}", param.gfFdsId)
                        .replace("@{고객번호}", param.phoneNumber)
                        .replace("@{탐지일시}", param.dtctDt)
                        .replace("@{카테고리}", param.dtctGrName)
                        .replace("@{룰표출코드}", param.expressionCode)
                        .replace("@{룰명}", param.ruleTitle);

                    // param.msg // 저 원문
                    // param.gfFdsId // 탐지번호

                    msgArray.push(toast_msg);

                    msgArray = msgArray.filter((function (e) {
                        return e
                    }));
                    break;
                case "R":
                    bgColor = "#553fe8";
                    textColor = "#fff";
                    toastIcon = "info";

                    msgHeaderArray.push("<p class='notification-go-detail' style='cursor:pointer' data-param='{\"url\": \"/approval/detail\", \"uuid\": \"" + param.trgetUuid + "\", \"trgetUuid\": \"" + param.uuid + "\", \"blank\": true}'>[결재요청] : " + msg.sanctnNo + "</p>");
                    msgArray.push("<p>요청일시: " + param.dmndDt + "</p>");
                    msgArray.push("<p>요청자 : " + param.dmndId + ": " + param.dmndNm + "</p>");
                    msgArray.push("<p>요청제목 : " + param.dmndTtl + "</p>");
                    msgArray.push("<p>결재화면 : " + param.scrnNm + "</p>");
                    break;
                case "S":
                    bgColor = "#553fe8";
                    textColor = "#fff";
                    toastIcon = "info";

                    msgHeaderArray.push("<p class='notification-go-detail' style='cursor:pointer' data-param='{\"url\": \"/user/detail\", \"uuid\": \"" + param.trgetUuid + "\", \"trgetUuid\": \"" + param.trgetUuid + "\", \"blank\": true}'>[사용자 가입요청]</p>");
                    msgArray.push("<p>요청일시: " + param.frstRegDttm + "</p>");
                    msgArray.push("<p>사용자 ID : " + param.userId + "</p>");
                    msgArray.push("<p>사용자 이름 : " + param.userNm + "</p>");
                    break;
            }

            $.toast({
                heading: msgHeaderArray[0],
                text: msgArray,
                icon: toastIcon, // 'success', 'error', 'info', 'warning'
                showHideTransition: 'slide',
                allowToastClose: true,
                // hideAfter: false,
                hideAfter: 1000 * 60, // 현재 20초 설정
                stack: 4,
                bgColor: bgColor,
                textColor: textColor,
                position: 'bottom-right',
                textAlign: 'left',
                // loaderBg: '#3c8dbc',
                loader: true,
                beforeShow: function () {
                    coreFn.notification.getDetect({uuid: uuid});
                },
                beforeHide: function () {
                    coreFn.notification.endDetect({uuid: uuid});
                }
            });
        },

        toastRemove: function () {
            $.ajax({
                url: contextPath + "/rest/notification/allRemove",
                type: 'post',
                dataType: 'json',
                success: function (json) {
                    $.toast().reset('all');
                }
            });
        },

        getDetect: function (contact) {
            $.ajax({
                url: contextPath + "/rest/v1/adsCommon/getDetect",
                type: "POST",
                data: JSON.stringify(contact),
                contentType: "application/json"
            })
        },

        endDetect: function (contact) {
            $.ajax({
                url: contextPath + "/rest/v1/adsCommon/endDetect",
                type: "POST",
                data: JSON.stringify(contact),
                contentType: "application/json"
            })
        }
    },

    manipulationDom: {
        addonCheck: function (wrapper = "") {
            coreFn.addon.clipboard(wrapper);
            coreFn.addon.chosen(wrapper);
            coreFn.addon.verification(wrapper);
            coreFn.addon.smartSelect(wrapper);
        },

        labelauty: function (target) {
            $(target).find("input").each(function () {
                $(this).addClass("to-labelauty");
            });

            $(target).find(".to-labelauty").labelauty();
        }
    },

    format: {
        onlyNumber: function ($target) {
            $target.value = $target.value.replace(/[^0-9]/g, '');
        },

        number: function (num) {
            if (num != null) {
                if (num.indexOf('.') != -1) {
                    let tmp;
                    tmp = num.split('.');
                    num = tmp[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '.' + tmp[1];
                } else {
                    num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
                return num;
            } else {
                return "0";
            }
        },

        phone: function (str) {
            str = str.replace(/[^0-9]/g, '');
            let tmp = '';
            if (str.length < 4) {
                return str;
            } else if (str.length < 7) {
                tmp += str.substr(0, 3);
                tmp += '-';
                tmp += str.substr(3);
                return tmp;
            } else if (str.length < 11) {
                tmp += str.substr(0, 3);
                tmp += '-';
                tmp += str.substr(3, 3);
                tmp += '-';
                tmp += str.substr(6);
                return tmp;
            } else {
                tmp += str.substr(0, 3);
                tmp += '-';
                tmp += str.substr(3, 4);
                tmp += '-';
                tmp += str.substr(7);
                return tmp;
            }
        },

        tell: function (str) {
            str = str.replace(/[^0-9]/g, '');
            let tmp = '';

            // 인터넷 전화 정규식
            let regexIntnetNo = /(0[3-9]0)/g;

            // 지역번호 02로 시작시
            if (str.substr(0, 2) == "02") {
                if (str.length < 3) {
                    return str;
                } else if (str.length < 6) {
                    tmp += str.substr(0, 2);
                    tmp += '-';
                    tmp += str.substr(2);
                    return tmp;
                } else if (str.length < 10) {
                    tmp += str.substr(0, 2);
                    tmp += '-';
                    tmp += str.substr(2, 3);
                    tmp += '-';
                    tmp += str.substr(5);
                    return tmp;
                } else {
                    tmp += str.substr(0, 2);
                    tmp += '-';
                    tmp += str.substr(2, 4);
                    tmp += '-';
                    tmp += str.substr(6);
                    return tmp;
                }
                // 인터넷 전화 형식 0[3~9]0-XXXX-XXXX
            } else if (regexIntnetNo.test(str.substr(0, 3)) === true) {
                if (str.length < 4) {
                    return str;
                } else if (str.length < 7) {
                    tmp += str.substr(0, 3);
                    tmp += '-';
                    tmp += str.substr(3);
                    return tmp;
                } else {
                    tmp += str.substr(0, 3);
                    tmp += '-';
                    tmp += str.substr(3, 4);
                    tmp += '-';
                    tmp += str.substr(7);
                    return tmp;
                }
            } else {
                if (str.length < 4) {
                    return str;
                } else if (str.length < 7) {
                    tmp += str.substr(0, 3);
                    tmp += '-';
                    tmp += str.substr(3);
                    return tmp;
                } else if (str.length < 11) {
                    tmp += str.substr(0, 3);
                    tmp += '-';
                    tmp += str.substr(3, 3);
                    tmp += '-';
                    tmp += str.substr(6);
                    return tmp;
                } else {
                    tmp += str.substr(0, 3);
                    tmp += '-';
                    tmp += str.substr(3, 4);
                    tmp += '-';
                    tmp += str.substr(7);
                    return tmp;
                }
            }
        },

        camelToSnake: function (str) {
            // string 객체가 아닌 녀석들을 걸러줍니다.
            if (!str || typeof str !== 'string') {
                return "noDataIndex";
            }

            // 카멜 케이스 공식에 어긋나는 녀석들을 걸러줍니다: 영숫자로 되어 있지 않으며 대문자가 연속되는 녀석들(e.x. leCTURe, Lec, leC)
            const dustPattern = str.match(/[^a-zA-Z0-9]|[A-Z][A-Z]+/g) || [];
            const edgeCase = str[0].charCodeAt(0) < 97 || str[str.length - 1].charCodeAt(0) < 97;
            if (dustPattern.length > 0 || edgeCase) throw new Error('Input string is not Camel case.');

            const splitStringArray = [];
            let prevIdx = 0;
            Array.from(str).forEach((e, idx) => {
                if (e.charCodeAt(0) < 97) {
                    const value = `${str.slice(prevIdx, idx)}_${e.toLowerCase()}`;
                    splitStringArray.push(value);
                    prevIdx = idx + 1;
                }
            });

            // 대문자 기준으로 넣었기 때문에 마지막 대문자 이후의 나머지들을 푸쉬 해줍니다.
            splitStringArray.push(str.substring(prevIdx));
            // [result, _query, _items] => result_query_items
            const ret = splitStringArray.join('');

            return ret;
        },

        startDt: function (target, length = 14, dateConversion = 0) {
            const $target = $(target);
            let returnDate = "";

            if ($target.prop('tagName').toLowerCase() === "input") {
                const value = $target.val();
                let startDt = "";

                returnDate = value === "All dates" ?
                    "19450815" :
                    (startDt = value.replace(/\//g, "").replace(/ /g, "").replace(/:/g, "").split("~")[0],
                        startDt.indexOf("AM") !== -1 ? startDt.replace("AM", "") : startDt.replace("PM", ""));
            } else {
                let text = $target.text();

                returnDate = text === "All dates" ? "19450815" : text.replace(/\//g, "").replace(/ /g, "").split("~")[0];
            }

            for (let i = 0, l = length - returnDate.length; i < l; i++) {
                returnDate += "0";
            }

            let timeForamtArray = ["H", "H", "m", "m", "s", "s"],
                timeForamt = "";

            for (let i = 0, l = returnDate.length - 8; i < l; i++) {
                timeForamt += timeForamtArray[i];
            }

            dateConversion = dateConversion * -1;
            returnDate = moment(returnDate, "YYYYMMDD" + timeForamt).subtract(dateConversion, 'hour').format("YYYYMMDD" + timeForamt);

            return returnDate;
        },

        endDt: function (target, length = 14, dateConversion = 0) {
            const $target = $(target);
            let returnDate = "";

            if ($target.prop('tagName').toLowerCase() === "input") {
                const value = $target.val();
                let endDt = "";

                returnDate = value === "All dates" ?
                    moment().format('YYYYMMDD') :
                    (endDt = value.replace(/\//g, "").replace(/ /g, "").replace(/:/g, "").split("~")[1],
                        endDt.indexOf("AM") !== -1 ? endDt.replace("AM", "") : endDt.replace("PM", ""));
            } else {
                let text = $target.text();

                returnDate = text === "All dates" ? moment().format('YYYYMMDD') : text.replace(/\//g, "").replace(/ /g, "").split("~")[1];
            }

            const tms = ['9', '5', '9', '5', '3', '2'];
            let addTms = "";

            for (let i = 0, l = length - returnDate.length; i < l; i++) {
                addTms += tms[i];
            }

            returnDate += addTms.split("").reverse().join("");


            let timeForamtArray = ["H", "H", "m", "m", "s", "s"],
                timeForamt = "";

            for (let i = 0, l = returnDate.length - 8; i < l; i++) {
                timeForamt += timeForamtArray[i];
            }

            dateConversion = dateConversion * -1;
            returnDate = moment(returnDate, "YYYYMMDD" + timeForamt).subtract(dateConversion, 'hour').format("YYYYMMDD" + timeForamt);

            return returnDate;
        },

        date: function (date) {
            let year = date.getFullYear();
            let month = (1 + date.getMonth());
            month = month >= 10 ? month : '0' + month;
            let day = date.getDate();
            day = day >= 10 ? day : '0' + day;

            let hour = date.getHours();
            hour = hour >= 10 ? hour : '0' + hour;
            let min = date.getMinutes();
            min = min >= 10 ? min : '0' + min;
            let sec = date.getSeconds();
            sec = sec >= 10 ? sec : '0' + sec;

            return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
        },

        password: function (str) {
            let id = $("#userId").val();
            let reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
            let hangulCheck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

            if (false === reg.test(str)) {
                return '비밀번호는 8자 이상이어야 하며, 숫자/대문자/소문자/특수문자를 모두 포함해야 합니다.';
            } else if (str.search(id) > -1) {
                return '비밀번호에 아이디가 포함되었습니다.';
            } else if (str.search(/\s/) != -1) {
                return '비밀번호는 공백 없이 입력해주세요.';
            } else if (hangulCheck.test(str)) {
                return '비밀번호에 한글을 사용 할 수 없습니다.';
            } else {
                return true;
            }
        }
    },

    modal: {
        jsPanel: function (title, width, height, fn) {
            $.jsPanel({
                contentSize: {width: width, height: height},
                headerTitle: title,
                content: "<p>&nbsp;&nbsp;loading ...</p>",
                contentOverflow: "auto",
                callback: function () {
                    if (fn !== null && fn !== undefined) {
                        fn();
                    }
                }
            });
        },

        right: function (width, url, param, fn) {
            $modalAppendDiv.empty();
            $modalLoadingMsg.show();
            $modal.modal("show").animate({
                    width: width
                }, function () {
                    $modalAppendDiv.load(contextPath + url + "/" + Date.now(), param, function () {
                        $modalLoadingMsg.hide();
                        $modal.append($modalAppendDiv);
                        fn();
                        $(".right-modal.modal").off();
                    });
                }
            );
        },

        rightForceQuit: function () {
            $('.modal-backdrop').remove();
            $('.right-modal').css('width', '0%').remove();
            $('body').removeClass('modal-open');
        }
    },

    common: {
        goDetail: function (detailObject) {
            $(".wrapper").width("100%");

            $.ajax({
                type: 'POST',
                url: `${contextPath}/rest/v1/user/sessionSet`,
                data: JSON.stringify(detailObject),
                contentType: 'application/json; charset=utf-8'
            }).done(function () {
                if (detailObject.blank == true) {
                    window.open(contextPath + "#" + detailObject.url)
                } else {
                    let url = window.location.href;
                    url = url.split("#")[1];

                    if (url === detailObject.url) {
                        location.replace(contextPath + "#");
                    }

                    location.href = contextPath + "#" + detailObject.url;
                }
            }).fail(function (jqXHR, errorType) {
                coreFn.alert.error(errorType);
            });
        },
        setBorderBottomLiner: function (el, active) {
            let formField = el.parentNode.parentNode;

            if (active) {
                formField.classList.add('form-field-is-active');
            } else {
                formField.classList.remove('form-field-is-active');
            }
        },
        copyText: function (target) {
            let $copyTarget = $(target).parent().parent().find('.form-control').length === 0 ?
                $(target).parent().parent().parent().find('.form-control') :
                $(target).parent().parent().find('.form-control');

            const copyValue = $copyTarget.prop('nodeName') === "SELECT" ?
                $copyTarget.find("option:checked").text() :
                $copyTarget.val();

            $("aside").append('<textarea class="extraTextArea" id="extraTextArea"></textarea>');
            $copyTarget = $("#extraTextArea");
            $copyTarget.val(copyValue);
            $copyTarget.select();
            document.execCommand('copy');
            $copyTarget.remove();

            coreFn.alert.success("Text copy complete", 1500);
            return false;
        },
        copyPqGridValues: function () {
            const $pageReload = $('#pageReload');
            const rowSelect = $pageReload.find('.pq-row-select.ui-state-highlight'),
                cellSelect = $pageReload.find('.pq-state-select.ui-state-highlight');

            let copyValues = '';

            if (rowSelect.length !== 0) {
                for (let i = 0, l = rowSelect.length; i < l; i++) {
                    if (i !== 0) {
                        copyValues += '\n';
                    }

                    $(rowSelect[i]).find('td').each(function (idx) {
                        let text = this.innerText
                        if (text != '' && text != null && text != undefined) {
                            copyValues += text + '\t';
                        }
                    })

                    copyValues = copyValues.substr(0, copyValues.length - 1);
                }

                textCopy(copyValues);
            } else if (cellSelect.length !== 0) {
                let prevRowIndex = -1;

                for (let i = 0, l = cellSelect.length; i < l; i++) {
                    const pqRowIndx = $(cellSelect[i]).closest('tr').attr('pq-row-indx');

                    if (i !== 0) {
                        if (prevRowIndex != pqRowIndx) {
                            copyValues += '\n';
                        }
                    }

                    let text = cellSelect[i].innerText;
                    if (text != '' && text != null && text != undefined) {
                        copyValues += text + '\t';
                    }

                    if (i + 1 <= l) {
                        const nextPqRowIndx = $(cellSelect[i + 1]).closest('tr').attr('pq-row-indx');

                        if (nextPqRowIndx != pqRowIndx) {
                            copyValues = copyValues.substr(0, copyValues.length - 1);
                        }
                    }

                    prevRowIndex = pqRowIndx;
                }

                textCopy(copyValues);
            }

            function textCopy(value) {
                let dom = document.createElement("textarea");
                document.body.appendChild(dom);
                dom.value = value;
                dom.select();
                document.execCommand('copy');
                document.body.removeChild(dom);
                coreFn.alert.success("Copy Grid Values Complete", 1500);
            }
        },
        conditionSessionSet: function (param) {
            if (param !== undefined && param.hasOwnProperty('url')) {
                $.ajax({
                    type: 'POST',
                    url: contextPath + "/rest/v1/user/sessionSet",
                    data: JSON.stringify(param),
                    contentType: 'application/json; charset=utf-8'
                })
            }
        },
        goToBack: function () {
            history.back();
        },
        createUuid: function () {
            function s4() {
                return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
            }

            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        },
        materialLabel: function () {
            let setActive = function setActive(el, active) {
                let formField = el.parentNode.parentNode;

                if (active) {
                    formField.classList.add('form-field-is-active');
                } else {
                    formField.classList.remove('form-field-is-active');
                    el.value === '' ? formField.classList.remove('form-field-is-filled') : formField.classList.add('form-field-is-filled');
                }
            };

            [].forEach.call(document.querySelectorAll('.form-field-label-input'), function (el) {
                el.onblur = function () {
                    setActive(el, false);
                };

                el.onfocus = function () {
                    setActive(el, true);
                };
            });
        },
        datePickerSet: function (defaultDate, target, dateConversion = 0) {
            const date = this.getSetDate(defaultDate, dateConversion);

            coreFn.common.dateRangePickerSetting(date[0], date[1], target);

            coreFn.eventBind.on('click', $(target).closest('#dateRangePicker'), function (e) {
                if (e.target == this) {
                    $(target).trigger("click");
                }
            });
        },
        dateTimePickerSet: function (defaultDate, target, dateConversion = 0) {
            const date = this.getSetDate(defaultDate, dateConversion);

            coreFn.common.dateRangeTimePickerSetting(date[0], date[1], target);

            coreFn.eventBind.on('click', $(target).closest('#dateRangeTimePicker'), function (e) {
                if (e.target == this) {
                    $(target).trigger("click");
                }
            });
        },
        getSetDate: function (defaultDate, dateConversion) {
            const date = [];
            let startDtParam = $("#startDtParam").val(),
                endDtParam = $("#endDtParam").val();

            if (startDtParam !== "" && startDtParam !== null && startDtParam !== "Invalid date" && endDtParam !== "" && endDtParam !== null && endDtParam !== "Invalid date") {
                startDtParam = moment(startDtParam, "YYYYMMDDHHmm").add(dateConversion, 'h');
                endDtParam = moment(endDtParam, "YYYYMMDDHHmm").add(dateConversion, 'h');
            } else {
                startDtParam = moment().subtract(defaultDate[0], defaultDate[1]);
                endDtParam = moment();
            }

            date.push(startDtParam);
            date.push(endDtParam);

            return date;
        },
        dateRangeTimePickerSetting: function (startDt, endDt, target) {
            let $target = $(target);

            function setDate(startDt, endDt) {
                const allDate = moment("194508150000", "YYYYMMDDHHmm");

                if (startDt.format('YYYYMMDDHHmm') === allDate.format('YYYYMMDDHHmm')) {
                    $target.val("All dates");
                } else {
                    $target.val(startDt.format('YYYY/MM/DD HH:mm A') + ' ~ ' + endDt.format('YYYY/MM/DD HH:mm A'));
                }
            }

            let dateRanges = {};
            dateRanges[language["common"]["now"]] = [moment(), moment()];
            dateRanges[language["common"]["week"]] = [moment().subtract(7, 'days'), moment()];
            dateRanges[language["common"]["month"]] = [moment().subtract(1, 'month'), moment()];
            dateRanges[language["common"]["3month"]] = [moment().subtract(3, 'month'), moment()];
            dateRanges[language["common"]["6month"]] = [moment().subtract(6, 'month'), moment()];
            dateRanges[language["common"]["year"]] = [moment().subtract(1, 'year'), moment()];
            dateRanges[language["common"]["all"]] = [moment("194508150000", "YYYYMMDDHHmm"), moment()];

            $target.daterangepicker({
                timePicker: true,
                ranges: dateRanges,
                startDate: startDt,
                endDate: endDt,
                autoUpdateInput: false,
                locale: {
                    "format":
                        "YYYY/MM/DD hh:mm A",
                    "separator":
                        " ~ ",
                    "applyLabel":
                        "Apply",
                    "cancelLabel":
                        "Cancel",
                    "customRangeLabel":
                        "Direct Select",
                    "daysOfWeek":
                        ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    "monthNames":
                        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
                }
            }, setDate);
            setDate(startDt, endDt);
        },
        dateRangePickerSetting: function (startDate, endDate, target) {
            let $target = $(target);

            function setDate(startDt, endDt) {
                const allDate = moment("19450815", "YYYYMMDD");

                if (startDt.format('YYYYMMDD') === allDate.format('YYYYMMDD')) {
                    $target.html("All dates");
                } else {
                    $target.html(startDt.format('YYYY/MM/DD') + ' ~ ' + endDt.format('YYYY/MM/DD'));
                }
            }

            let dateRanges = {};
            dateRanges[language["common"]["now"]] = [moment(), moment()];
            dateRanges[language["common"]["week"]] = [moment().subtract(7, 'days'), moment()];
            dateRanges[language["common"]["month"]] = [moment().subtract(1, 'month'), moment()];
            dateRanges[language["common"]["3month"]] = [moment().subtract(3, 'month'), moment()];
            dateRanges[language["common"]["6month"]] = [moment().subtract(6, 'month'), moment()];
            dateRanges[language["common"]["year"]] = [moment().subtract(1, 'year'), moment()];
            dateRanges[language["common"]["all"]] = [moment("19450815", "YYYYMMDD"), moment()];

            $target.daterangepicker({
                startDate: startDate,
                endDate: endDate,
                ranges: dateRanges,
                locale: {
                    "format":
                        "YYYY/MM/DD",
                    "separator":
                        " ~ ",
                    "applyLabel":
                        "Apply",
                    "cancelLabel":
                        "Cancel",
                    "customRangeLabel":
                        "Direct Select",
                    "daysOfWeek":
                        ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    "monthNames":
                        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
                }
            }, setDate);
            setDate(startDate, endDate);
        },
        changeLanguageSession: function (languageCode) {
            $.ajax({
                type: 'POST',
                url: contextPath + "/rest/v1/user/languageChange",
                data: {"languageCode": languageCode}
            }).done(function () {
                location.reload();
            })
        },
        undoCondition: function (datePickerOption) {
            const $conditionDiv = $('.condition-div');
            $conditionDiv.find('input').each(function () {
                if (!$(this).hasClass("no-change-condition")) {
                    $(this).val('');
                }
            });

            $conditionDiv.find('select').each(function () {
                if (!$(this).hasClass("no-change-condition")) {
                    let selectBoxId = this.id;

                    if ($("#" + selectBoxId).length !== 0) {
                        this.childNodes.selected = false;
                        this.childNodes[1].selected = true;
                    }

                    if ($("#" + selectBoxId + "_chosen").length !== 0) {
                        $(this).val('').trigger("chosen:updated");
                    }

                    if ($(this).next().hasClass("smartselect")) {
                        $(this).smartselect().getsmartselect().deselectAllOptions();
                    }
                }
            });

            if (datePickerOption !== undefined) {
                if ($(datePickerOption.target).prop('tagName').toLowerCase() === "input") {
                    coreFn.common.dateRangeTimePickerSetting(moment().subtract(datePickerOption.defaultDate[0], datePickerOption.defaultDate[1]), moment(), datePickerOption.target);
                } else {
                    // here
                    coreFn.common.dateRangePickerSetting(moment().subtract(datePickerOption.defaultDate[0], datePickerOption.defaultDate[1]), moment(), datePickerOption.target);
                }
            }
        },
        dataVerification: function () {
            let verificationMessage = "";

            $('input[addon*="verification"], textarea[addon*="verification"], select[addon*="verification"], ul[addon*="verification"]').each(function () {
                const tagName = $(this).prop("tagName");

                if (tagName.toLowerCase() === "input" || tagName.toLowerCase() === "textarea") {
                    if ($(this).val() === "") {
                        verificationMessage = $(this).attr("verification-msg");
                        return false;
                    }
                } else if (tagName.toLowerCase() === "select") {
                    if ($(this).val().length === 0) {
                        verificationMessage = $(this).attr("verification-msg");
                        return false;
                    }
                } else {
                    if ($(this).children().length === 0) {
                        verificationMessage = $(this).attr("verification-msg");
                        return false;
                    }
                }
            });

            return verificationMessage === undefined ? "" : verificationMessage;
        },
        getMultiSelectSearchCondition: function (array, $target) {
            if (array !== "" && array.length !== 0) {
                $target.each(function () {
                    if (array.indexOf($(this).val()) !== -1) {
                        $(this).attr("selected", true);
                    }
                });
            }
        },
        getMultiSelectBoxSelectedValues: function (target) {
            target = document.getElementById(target);

            let result = [],
                options = target && target.options,
                opt;

            for (let i = 0, l = options.length; i < l; i++) {
                opt = options[i];

                if (opt.selected) {
                    result.push(opt.value || opt.text);
                }
            }
            return result;
        }
    },

    addon: {
        clipboard: function (wrapper) {
            $(wrapper).find('input[addon*="clipboard"], select[addon*="clipboard"]').each(function (index) {
                let $this = this;
                let $parentDom = $(this).parent();

                if ($parentDom.attr("class") == "form-field-control") {
                    $parentDom.addClass("built-in-clipboard" + index);
                    $parentDom.append('<div class="clipboard-wrapper"><div class="clipboard"><i class="fas fa-clipboard"></i></div></div>');
                } else {
                    let afterDom = '<div class="clipboard-wrapper"><div class="clipboard"><i class="fas fa-clipboard"></i></div></div>';
                    $(this).remove();

                    $parentDom.append('<div class="input-group built-in-clipboard' + index + '">' + afterDom + '</div>');
                    $parentDom.find(".built-in-clipboard" + index).prepend($this);
                }
            });
        },
        chosen: function (wrapper) {
            $(wrapper).find('select[addon*="chosen"]').each(function () {
                $(this).is("[multiple]") ? $(this).chosen({
                    width: "100%",
                    hide_results_on_select: false
                }) : $(this).chosen({width: "100%", search_contains: true});
            });
        },
        smartSelect: function (wrapper) {
            $(wrapper).find('select[addon*="smartSelect"]').each(function () {

                const targetWidth = $(this).width(),
                    targetHeight = $(this).height() + 2;

                $(this).smartselect({
                    forceUnCheckTriggerEvent: true,
                    toolbar: {
                        buttonSearch: true,
                        buttonAlias: true,
                        buttonView: 'selected',
                        buttonUnfold: true,
                        buttonCancel: false,
                        buttonCheckAll: true,
                        buttonUnCheck: true
                    }
                });

                $(this).next().children(".dropdown-toggle").css({
                    "width": targetWidth + "px",
                    "height": targetHeight + "px"
                });
            });
        },
        verification: function (wrapper) {
            const $wrapper = $(wrapper);

            $wrapper.find('input[addon*="verification"], textarea[addon*="verification"], select[addon*="verification"], ul[addon*="verification"]').each((i, el) => {
                const $thisWrapper = $(el).closest(".form-group.row"),
                    labelText = $thisWrapper.find("label").text();


                $thisWrapper.find("label").html(labelText + " <v>*</v>");
                $(el).attr("verification-msg", labelText + "을(를) 입력해 주세요.")
            });
        },
        labelauty: function () {
            $("#pageReload").find('ul[addon*="labelauty"]').each(function () {
                $(this).find("input[type='radio']").each(function () {
                    $(this).addClass("to-labelauty");
                });
            });

            $(".to-labelauty").labelauty();
        }
    },

    grid: {
        ajax: function (url) {
            coreFn.ajaxObject.url = contextPath + url;
            coreFn.ajaxObject.getData = function (dataJSON) {
                try {
                    if (dataJSON.data[0].pq_cellattr !== null && dataJSON.data[0].pq_cellattr !== undefined) {
                        let dataLength = dataJSON.data.length;
                        for (let i = 0; i < dataLength; i++) {
                            let tooltipObject = JSON.parse(dataJSON.data[i].pq_cellattr);
                            if (tooltipObject.message != null && tooltipObject.message != "") {
                                let tooltipAttr = {};
                                tooltipAttr[tooltipObject.title] = {title: tooltipObject.message};
                                dataJSON.data[i].pq_cellattr = tooltipAttr;
                            }
                        }
                    }
                } catch (e) {
                    // console.log(e);
                }
                return {data: dataJSON.data};
            };
            return coreFn.ajaxObject
        },
        ajaxPagingType: function (url) {
            //배열 넘길때 값 깨짐 방지
            jQuery.ajaxSettings.traditional = true;
            coreFn.ajaxObject.url = contextPath + url;
            coreFn.ajaxObject.getData = function (dataJSON) {
                try {
                    if (dataJSON.data[0].pq_cellattr !== null && dataJSON.data[0].pq_cellattr !== undefined) {
                        let dataLength = dataJSON.data.length;
                        for (let i = 0; i < dataLength; i++) {
                            let tooltipObject = JSON.parse(dataJSON.data[i].pq_cellattr);
                            if (tooltipObject.message != null && tooltipObject.message != "") {
                                let tooltipAttr = {};
                                tooltipAttr[tooltipObject.title] = {title: tooltipObject.message};
                                dataJSON.data[i].pq_cellattr = tooltipAttr;
                            }
                        }
                    }
                } catch (e) {
                    console.log(e);
                }
                return {curPage: dataJSON.curPage, totalRecords: dataJSON.totalRecords, data: dataJSON.data};
            };
            return coreFn.ajaxObject;
        },

        search: function (getData, sessionParam, gridOption, gridId) {
            coreFn.session.resetSessionTime();

            if (sessionParam != "") {
                coreFn.common.conditionSessionSet(sessionParam);
            }

            if (gridOption.hasOwnProperty("colEdit")) {
                if (gridOption.colEdit === true) {
                    gridOption.create = function (evt, ui) {
                        let CM = $(this).pqGrid('getColModel'),
                            opts = [];
                        for (let i = 0; i < CM.length; i++) {
                            let column = CM[i];
                            if (column.hidden !== true) {
                                opts.push(column.dataIndx);
                            }
                        }
                        $(".columnSelector").val(opts);
                        $(".columnSelector").find("option[value='ShipCountry']").prop('disabled', true);
                        $(".columnSelector").pqSelect({
                            checkbox: true,
                            multiplePlaceholder: 'Select visible columns',
                            maxDisplay: 100,
                            width: 'auto'
                        });
                    };
                    gridOption.toolbar = {
                        items: [{
                            type: 'select', cls: 'columnSelector', options: function (ui) {
                                let CM = $(this).pqGrid('getColModel'),
                                    opts = [];
                                for (let i = 0; i < CM.length; i++) {
                                    let obj = {},
                                        column = CM[i];
                                    obj[column.dataIndx] = column.title !== "" ? column.title : "check box";
                                    opts.push(obj);
                                }
                                return opts;
                            }, listener: {
                                'change': function (evt) {
                                    let arr = $(this).val(),
                                        $grid = $(this).closest('.pq-grid'),
                                        CM = $grid.pqGrid('getColModel');

                                    for (let i = 0; i < CM.length; i++) {
                                        let column = CM[i],
                                            dataIndx = column.dataIndx + "";
                                        if ($.inArray(dataIndx, arr) == -1) {
                                            CM[i].hidden = true;
                                        } else {
                                            CM[i].hidden = false;
                                        }
                                    }
                                    $grid.pqGrid('refresh');
                                }
                            }, attr: "multiple='multiple'", style: "height:60px;"
                        }]
                    };
                }
            }

            getData.postData = sessionParam;
            gridOption.dataModel = getData;
            let $grid = $("#" + gridId).pqGrid(gridOption);

            if (coreFn.firstLoad === "N") {
                $grid.pqGrid("refreshDataAndView");
            }

            coreFn.firstLoad = "N";
            return $grid;
        },

        commentRender: function (ui) {
            let dataIndx = ui.dataIndx,
                cellData = ui.cellData,
                commentColumnCheck = JSON.stringify(ui.data[0].pq_cellattr);

            commentColumnCheck = commentColumnCheck.substr(2);
            commentColumnCheck = commentColumnCheck.substr(0, commentColumnCheck.indexOf('"'));

            if (dataIndx === commentColumnCheck && cellData !== undefined) {
                let pos = "bottom:3px;right:0;";
                if (ui.column.align == 'right') {
                    pos = "top:0;left:0;";
                }
                return "<div style='position:relative;'>" +
                    cellData +
                    "<span style='position:absolute;height:14px;width:14px;" + pos + "' class='ui-icon ui-icon-comment' ></span>" +
                    "</div>";
            } else {
                cellData === undefined ? cellData = '' : cellData;
                return cellData;
            }
        },

        colModelSetting: function (colModel, gridName) {
            let modelSet = $("#gridModelSet").val(),
                gridPersonalModelSet = $("#gridPersonalModelSet").val();

            if (modelSet !== null && modelSet !== "" && modelSet !== undefined) {
                modelSet = JSON.parse($("#gridModelSet").val());
            } else {
                modelSet = {};
            }

            if (modelSet.hasOwnProperty("columnSet")) {
                modelSet = modelSet.columnSet;

                if (gridName !== "" && gridName !== undefined) {
                    modelSet = modelSet[gridName]
                }

                let spliceColumnIndex = [];
                for (let i = 0, length = modelSet.length; i < length; i++) {
                    if (modelSet[i].show === "N") {
                        spliceColumnIndex.push(i);
                    }
                }

                spliceColumnIndex.sort((a, b) => b - a);

                for (let i = 0, length = spliceColumnIndex.length; i < length; i++) {
                    colModel.splice(spliceColumnIndex[i], 1)
                }
            }

            if (gridPersonalModelSet !== "" && gridPersonalModelSet !== undefined) {
                let gridPersonalModelSetObject = JSON.parse(gridPersonalModelSet).columnSet;
                gridPersonalModelSetObject = gridPersonalModelSetObject[gridName];

                for (let i = 0, length = gridPersonalModelSetObject.length; i < length; i++) {
                    for (let j = 0, length2 = colModel.length; j < length2; j++) {
                        if (gridPersonalModelSetObject[i].id === colModel[j].id) {

                            colModel[j].leftPos = gridPersonalModelSetObject[i].leftPos;
                            colModel[j].hidden = gridPersonalModelSetObject[i].hidden;
                            break;
                        }
                    }
                }

                colModel.sort((a, b) => parseFloat(a.leftPos) - parseFloat(b.leftPos));
            }

            return colModel;
        },

        columnSave: function (param, gridName) {
            let widgetObject = {};
            widgetObject[gridName] = [];

            for (let i = 0, length = param.length; i < length; i++) {
                const obj = {
                    id: param[i].id,
                    leftPos: param[i].leftPos,
                    hidden: param[i].hasOwnProperty("hidden") ? param[i].hidden : false
                };

                widgetObject[gridName].push(obj);
            }

            let object = {
                screenCode: $("#nowScreenCode").val(),
                scrnSetpInfo: JSON.stringify(widgetObject)
            };

            $.ajax({
                type: "POST",
                url: contextPath + "/rest/v1/widget/updateGridModel",
                data: JSON.stringify(object),
                contentType: "application/json",
                success: function (response) {
                    coreFn.alert.success(language["alert"]["complete"], 1500);
                    location.reload();
                }
            });
        }
    },

    alert: {
        success: function (message, time) {
            let sweetAlert = Swal.mixin({
                toast: true,
                position: 'center',
                showConfirmButton: false,
                timer: time,
                timerProgressBar: false,
                onOpen: function onOpen(toast) {
                    toast.addEventListener('mouseenter', Swal.stopTimer);
                    toast.addEventListener('mouseleave', Swal.resumeTimer);
                }
            });
            sweetAlert.fire({
                icon: 'success',
                title: message
            });
        },
        info: function (message) {
            Swal.fire(
                message,
                "",
                'info'
            )
        },
        confirm: function (message, fn) {
            sanctnCheck();

            function sanctnCheck() {
                const msg = coreFn.common.dataVerification();
                if (msg !== "") {
                    coreFn.alert.info(msg);
                    return false;
                }

                let swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger'
                    },
                    buttonsStyling: false
                });

                swalWithBootstrapButtons.fire({
                    title: message,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    reverseButtons: true
                }).then(function (result) {
                    if (result.value) {
                        fn();
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        return false;
                    }
                });
            }
        },
        error: function (message) {
            Swal.queue([{
                title: message,
                confirmButtonText: 'OK',
                icon: 'error',
                showLoaderOnConfirm: true,
            }])
        },
        input: function (largeText, smallText, fn) {
            Swal.fire({
                title: largeText,
                text: smallText,
                input: 'text',
                inputAttributes: {
                    autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'OK',
                showLoaderOnConfirm: true,
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                    fn(result);
                }
            });
        },
        ynCheck: function (largeText, smallText, fn) {
            Swal.fire({
                title: largeText,
                text: smallText,
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
            }).then((result) => {
                if (result.dismiss !== "backdrop") {
                    fn(result.isConfirmed);
                }
            })
        }
    },

    session: {
        sessionTimeId: "",
        sessionTimerId: "",
        sessionAlertCheck: false,
        onReSessionTimeCount: false,

        startSessionCount: function () {
            const $this = this;
            coreFn.clientSessionTime = coreFn.sessionTimeOutTime;
            let timer_context = document.querySelector('#sessionTimer').getContext('2d');

            coreFn.session.sessionTimerId = setTimeout(function startSessionCnt() {
                let min = parseInt((coreFn.clientSessionTime % 3600) / 60);
                let sec = coreFn.clientSessionTime % 60;
                if (coreFn.clientSessionTime < 0) return false;
                if (sec < 10) sec = '0' + sec;
                coreFn.clientSessionTime--;

                let time = min + ":" + sec;
                timer_context.clearRect(0, 0, 150, 100);
                timer_context.fillText(time, 10, 50);
                timer_context.fillStyle = 'white';
                timer_context.font = '21px digital-7';

                if (coreFn.clientSessionTime < 300 && !$this.sessionAlertCheck) {
                    $this.reSessionCheck();
                }

                if ($this.onReSessionTimeCount && $this.sessionAlertCheck) {
                    $("#timeCountDown").text(time);
                }

                coreFn.session.sessionTimeId = setTimeout(startSessionCnt, 1000);
            });
        },

        resetSessionTime: function () {
            coreFn.clientSessionTime = coreFn.sessionTimeOutTime;
            clearTimeout(coreFn.session.sessionTimeId);
            clearTimeout(coreFn.session.sessionTimerId);
            coreFn.session.startSessionCount();

            $.ajax({
                url: contextPath + "/rest/v1/user/sessionTimeRenewal",
                type: "POST"
            })
        },

        reSessionCheck: function () {
            const $this = this;
            this.sessionAlertCheck = true;

            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'session-extend-btn',
                    cancelButton: 'logout-btn'
                },
                buttonsStyling: false
            })

            function onCount() {
                $this.onReSessionTimeCount = true;
            }

            swalWithBootstrapButtons.fire({
                title: '<div>자동 로그아웃 안내</div>' +
                    '<div class="time-count-info">' +
                    '<div> 로그인 후 30분동안 페이지 이동이 없는 경우 로그아웃 됩니다.</div>' +
                    '<div> 남은 시간 : </div>' +
                    '<div class="time-count-down" id="timeCountDown"></div>' +
                    '</div>',
                showCancelButton: true,
                cancelButtonText: '로그아웃',
                confirmButtonText: '연장하기',
                reverseButtons: true,
                width: 720,
                focusConfirm: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                onOpen: onCount,
            }).then((result) => {
                if (result.isConfirmed) {
                    coreFn.session.resetSessionTime();
                    $this.onReSessionTimeCount = false;
                    $this.sessionAlertCheck = false;
                } else {
                    location.href = contextPath + "/login/logout";
                }
            })
        }
    },

    eventBind: {
        on: function (motion, el, fn) {
            $(el).off(motion);
            $(el).on(motion, fn);
        },

        document: function (motion, el, fn) {
            const $document = $(document);

            $document.off(motion, el);
            $document.on(motion, el, fn);
        },

        customMenu: function ($target, $menu) {
            $target.bind("contextmenu", function (e) {
                e.preventDefault();

                let winWidth = window.outerWidth,
                    winHeight = window.outerHeight;

                let posX = e.pageX,
                    posY = e.clientY;

                let menuWidth = $menu.width(),
                    menuHeight = $menu.height();

                let posLeft, posTop;

                let secMargin = 10;

                if (posX + menuWidth + secMargin >= winWidth && posY + menuHeight + secMargin >= winHeight) {
                    posLeft = posX - menuWidth - secMargin;
                    posTop = posY - menuHeight - secMargin;
                } else if (posX + menuWidth + secMargin >= winWidth) {
                    posLeft = posX - menuWidth - secMargin;
                    posTop = posY + secMargin;
                } else if (posY + menuHeight + secMargin >= winHeight) {
                    posLeft = posX + secMargin;
                    posTop = posY - menuHeight - secMargin;
                } else {
                    posLeft = posX + secMargin;
                    posTop = posY + secMargin;
                }

                const top = $target.hasClass('book-mark-menu') ? `${posTop + $(document).scrollTop() - 90}px` : `${posTop + $(document).scrollTop()}px`;

                $menu.css({
                    left: posLeft + "px",
                    top: top
                }).show();
                return false;
            });
        }
    },

    bottomMenu: {
        highestZ: 100,

        changeClbrCmpCdSearchCondition: {
            load: function () {
                $("#clbrCmpCdWizard").wizard({
                    onSubmit: function () {
                        $("input[name='clbrCmpCdRadio']:checked").each(function () {
                            let obj = $(this).attr("data-param");
                            obj = JSON.parse(obj);

                            const sessionParam = {
                                url: 'clbrCmpCdSearchConditon',
                                clbrCmpCd: obj.clbrCmpCd
                            }

                            $.ajax({
                                type: 'POST',
                                url: contextPath + "/rest/v1/user/sessionSet",
                                data: JSON.stringify(sessionParam),
                                contentType: 'application/json; charset=utf-8'
                            }).done(function () {
                                coreFn.alert.success(language["alert"]["complete"], 1500);
                            });
                        });

                        $('.wizard-ok').trigger("click");
                    },
                    previousText: '이전',
                    nextText: '다음',
                    submitText: '완료',
                    showCancel: true,
                    showPrevious: true,
                    showProgress: false,
                    isModal: true,
                    autoOpen: false
                });
            },

            show: function () {
                coreFn.ajax.fetchText('/rest/v1/common/selectClbrCmpCd')
                    .then(function (rs) {
                        let checked;
                        rs = JSON.parse(rs);

                        $('#clbrCmpCdList').empty();

                        let $frag = $(document.createDocumentFragment());

                        for (let i = 0, l = rs.list.length; i < l; i++) {
                            const checked = rs.userClbrCmpCd === rs.list[i].clbrCmpCd ? 'checked' : '';

                            $frag.append(`<input type='radio' name='clbrCmpCdRadio' data-labelauty='&nbsp;&nbsp;${rs.list[i].clbrCmpCd}: ${rs.list[i].clbrCmpTitle}' data-param='{\"clbrCmpCd\": \"${rs.list[i].clbrCmpCd}\"}' ${checked}>`);
                        }

                        coreFn.manipulationDom.labelauty($frag);
                        $("#clbrCmpCdList").append($frag);

                        $("#clbrCmpCdWizard").wizard('open');
                    })
            },
        },

        newNote: function () {
            var note = new Memo();
            note.id = coreFn.common.createUuid();
            note.timestamp = new Date().getTime();
            note.left = Math.round(Math.random() * 400) + 250 + 'px';
            note.top = Math.round(Math.random() * 500) + 60 + 'px';
            note.zIndex = ++this.highestZ;
            note.saveAsNew();
        },

        bookmark: function () {
            let url = window.location.href;
            url = url.split("#")[1];

            const $this = this,
                iconId = coreFn.common.createUuid();

            $.ajax({
                type: 'POST',
                url: contextPath + "/rest/v1/user/getPageParameter",
                data: {url: url}
            }).done(function (rs) {
                const emptyCheck = JSON.parse(rs);

                if (Object.keys(emptyCheck).length === 0) {
                    rs = JSON.stringify({url: url});
                }

                $("#newNote").parent().before("" +
                    "<li data-param='" + rs + "'>" +
                    "    <img src='" + contextPath + "/resources/image/bookmark.png' class='bottom-icons book-mark-menu' id='" + iconId + "' title='" + $("#breadcrumbs-two li").last().text() + "'>" +
                    "</li>");

                $this.update();
            });

            $(document).on("click", "#" + iconId, function () {
                coreFn.common.goDetail($(this).parent().data("param"));
            });

            coreFn.eventBind.customMenu($(".bottom-icons.book-mark-menu"), $(".bottom-custom-right-menu"));
        },

        setMenu: function () {
            $.ajax({
                type: 'POST',
                url: contextPath + "/rest/v1/user/selectBookmark",
            }).done(function (rs) {
                if (rs !== null && rs !== "") {
                    rs = JSON.parse(rs);

                    if (rs.length !== 0) {
                        for (let i = 0, l = rs.length; i < l; i++) {
                            $("#newNote").parent().before("" +
                                "<li data-param='" + rs[i].dataParam + "'>" +
                                "    <img src='" + contextPath + "/resources/image/bookmark.png' class='bottom-icons book-mark-menu' id='" + rs[i].id + "' title='" + rs[i].title + "'>" +
                                "</li>");

                            $(document).on("click", "#" + rs[i].id, function () {
                                coreFn.common.goDetail($(this).parent().data("param"));
                            })
                        }
                    }
                }

                coreFn.eventBind.customMenu($(".bottom-icons.book-mark-menu"), $(".bottom-custom-right-menu"));
            });
        },

        update: function () {
            let dataArr = [];

            $(".bottom-nav li").filter("[data-param]").each((i, el) => {
                let obj = {
                    dataParam: $(el).attr("data-param"),
                    id: $(el).children().attr("id"),
                    title: $(el).children().attr("title")
                };

                dataArr.push(obj)
            });

            $.ajax({
                type: 'POST',
                url: contextPath + "/rest/v1/user/updateBookmark",
                data: {data: JSON.stringify(dataArr)}
            });

            coreFn.eventBind.customMenu($(".bottom-icons.book-mark-menu"), $(".bottom-custom-right-menu"));
            ;
        },

        delete: function () {
            $("#" + coreFn.bottomIconId).parent().remove();
            coreFn.eventBind.customMenu($(".bottom-icons.book-mark-menu"), $(".bottom-custom-right-menu"));

            this.update();
        },

        reName: function () {
            const $this = this;

            Swal.fire({
                title: "Enter New Name",
                input: 'text',
                inputAttributes: {
                    autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'OK',
                showLoaderOnConfirm: true,
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                    $("#" + coreFn.bottomIconId).attr("title", result.value);

                    $this.update();
                }
            });

            coreFn.eventBind.customMenu($(".bottom-icons.book-mark-menu"), $(".bottom-custom-right-menu"));
        }
    },

    ajax: {
        fetchVoid: async function (url, obj) {
            coreFn.common.conditionSessionSet(obj);

            let fetchOption = {
                method: 'POST'
            }

            if (obj !== undefined) {
                fetchOption['headers'] = {"Content-type": "application/json; charset=UTF-8"};
                fetchOption['body'] = JSON.stringify(obj)
            }

            try {
                await fetch(`${contextPath}${url}`, fetchOption);
            } catch (error) {
                return error;
            }
        },
        fetchJson: async function (url, obj) {
            coreFn.common.conditionSessionSet(obj);

            let fetchOption = {
                method: 'POST'
            }

            if (obj !== undefined) {
                fetchOption['headers'] = {"Content-type": "application/json; charset=UTF-8"};
                fetchOption['body'] = JSON.stringify(obj)
            }

            try {
                const data = await fetch(`${contextPath}${url}`, fetchOption);
                try {
                    return data.json();
                } catch {
                    return null;
                }
            } catch (error) {
                return error;
            }
        },
        fetchText: async function (url, obj) {
            coreFn.common.conditionSessionSet(obj);

            let fetchOption = {
                method: 'POST'
            }

            if (obj !== undefined) {
                fetchOption['headers'] = {"Content-type": "application/json; charset=UTF-8"};
                fetchOption['body'] = JSON.stringify(obj)
            }

            try {
                const data = await fetch(`${contextPath}${url}`, fetchOption);
                return data.text();
            } catch (error) {
                return error;
            }
        },
        jquery: function () {

        }
    },

    etc: {
        scrollTop: function () {
            $('html, body').animate({scrollTop: '0'}, 200);
            $('#scrollTop').css('display', 'none');
        },

        isEmpty: function (param) {
            return Object.keys(param).length === 0;
        },

        dataTypeCheck: function (str) {
            try {
                const data = JSON.parse(str);
                if (data.constructor == Object) {
                    return "object";
                } else if (data.constructor == Array) {
                    return "array";
                }
            } catch (e) {
                return "else";
            }
        },

        insertSanctn: function (url, param) {
            $.ajax({
                url: url,
                type: "POST",
                data: JSON.stringify(param),
                contentType: "application/json",
                before: function () {
                    $processingDiv.show();
                },
                success: function () {
                    $processingDiv.hide();
                    coreFn.alert.success("결재 요청이 완료되었습니다.", 1500);
                }
            }).fail(function () {
                coreFn.alert.error(language["alert"]["error"]);
            });
        },

        replaceSeparator: function (str) {
            try {
                str = str.replace(/┌`%/gi, ", ");
            } catch (e) {

            }

            return str;
        },
    },

    ajaxCmni: {
        postKeyVal: function () {

        },

        postKeyValResExcelDown: function (url, postData) {
            let xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {

                    let filename = "";
                    let disposition = xhr.getResponseHeader('Content-Disposition');
                    if (disposition && disposition.indexOf('attachment') !== -1) {
                        let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                        let matches = filenameRegex.exec(disposition);
                        if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
                    }

                    //this.response is what you're looking for
                    console.log(this.response, typeof this.response);
                    let a = document.createElement("a");
                    let url = URL.createObjectURL(this.response)
                    a.href = url;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                }
            }

            xhr.open("POST", url);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.responseType = "blob";
            xhr.send(Object.keys(postData).map(key => `${key}=${postData[key]}`).join('&'));
        }
    },

    capture: function (target) {
        const node = document.querySelector(target);

        if(target === '.content-wrapper'){
            $(node).addClass('no-margin');
        }

        domtoimage.toPng(node)
            .then(function (dataUrl) {
                download(dataUrl);
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });

        function download(uri) {
            if(target === '.content-wrapper'){
                $(node).removeClass('no-margin');
            }

            var link = document.createElement("a");
            link.download = "Capture_" + getDate();
            link.href = uri;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            delete link;
        }

        function getDate() {
            var d = new Date(),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear(),
                hh = d.getHours(),
                mm = d.getMinutes(),
                ss = d.getSeconds();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return year + month + day + hh + mm + ss;
        }
    }
};