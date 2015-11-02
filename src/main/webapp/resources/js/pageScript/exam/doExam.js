/**
 * Created by Phuthikorn_T on 17/9/2558.
 */

var countdownContainerElement;
var timeLimitMillisec;
var timeTakenMillisec;
var unmarkedQuestionArray;

$(document).ready(function () {
    getExamPaperBody();
    timeLimitMillisec = $('#examHead').attr('timeLimit-minute') * 100 * 60;
    countdownContainerElement = $('#countdownContainer');
    $.timer(countdownTimer);
})




var goToUnfinishBtn = $('#goToUnfinish');
var goToUnfinishBtnInitialText = goToUnfinishBtn.text();
$("#SendPaper").on('click', function () {
    confirmationModalUpdate()
})

$("#confirmSubmitExam").on('click', function () {
    submitExam();
})

goToUnfinishBtn.on('click', function () {
    $('html, body').animate({
        scrollTop: ($('.questionContainer[questionNo="' + $(this).val() + '"').offset().top - 100)
    });
})

$('#countdownContainer').on('click', function () {
    $(':first-child', $(this)).toggle()
})

$('#toTop').on('click', function () {
    $("html, body").animate({scrollTop: 0}, "fast");
})

$('#toBottom').on('click', function () {
    $("html, body").animate({scrollTop: $(document).height()}, "fast");
})

$('#examBody').on('change', 'input[type="radio"]', function () {
    var name = $(this).attr('name');
    $('input[name="' + name + '"]').prop('checked', false)
    $(this).prop('checked', true)
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var confirmationModalUpdate = function () {
    unmarkedQuestionArray = checkExamCompletion();
    var confirmMessage = '';
    var confirmMessageElement = $('#submitExamConfirmMessage');

    if (unmarkedQuestionArray != null) {
        confirmMessage = 'มีข้อสอบที่ยังไม่ได้ตอบ ได้แก่ข้อที่<br/>[ ';
        for (var i = 0; i < unmarkedQuestionArray.length; i++) {
            if (i == 0) {
                confirmMessage = confirmMessage + unmarkedQuestionArray[i]
            } else {
                confirmMessage = confirmMessage + ", " + unmarkedQuestionArray[i]
            }
        }
        confirmMessage += " ]";
        goToUnfinishBtn.val(unmarkedQuestionArray[0]);
        goToUnfinishBtn.text(goToUnfinishBtnInitialText + " " + unmarkedQuestionArray[0])
        goToUnfinishBtn.show();
    } else {
        confirmMessage = 'ยืนยันการส่งข้อสอบ'
        goToUnfinishBtn.hide()
    }
    confirmMessageElement.empty();
    confirmMessageElement.append(confirmMessage)
}

var checkExamCompletion = function () {
    var questions = $('#examBody .questionContainer')
    var unfinishedArray = [];

    $.each(questions, function (index, value) {
        var questionNo = $(this).attr('questionNo');
        if (
            ($(this).find('input:checked').val() == undefined) &&
            ($(this).find('textarea').val() == '' || $(this).find('textarea').val() == undefined)) {

            unfinishedArray.push(questionNo)
        }
    })
    if (unfinishedArray.length == 0) {
        // unfinishedArray is empty == all Question are answered
        return null
    } else {
        return unfinishedArray
    }
}

var examTimeOut = function () {
    alert('หมดเวลาทำข้อสอบ');
    submitExam;
    location.href = "/TDCS/home.html";
}

var countdownTimer = new (function () {
    var $countdown,
    //$form, // Form used to change the countdown time
        incrementTime = 70,
        currentTime = $('#examHead').attr('timeLimit-minute') * 100 * 60,
    //currentTime = 1000000,

        updateTimer = function () {
            $countdown.html(formatTime(currentTime));
            if (currentTime == 0) {
                countdownTimer.Timer.stop();
                timerComplete();
                countdownTimer.resetCountdown();
                return;
            }

            if (currentTime <= timeLimitMillisec / 3) {
                if (currentTime <= timeLimitMillisec / 10) {
                    countdownContainerElement.removeClass("btn-success");
                    countdownContainerElement.removeClass("btn-warning");
                    countdownContainerElement.addClass("btn-danger");
                } else {
                    countdownContainerElement.removeClass('btn-success');
                    countdownContainerElement.removeClass('btn-danger');
                    countdownContainerElement.addClass('btn-warning');
                }
            }
            currentTime -= incrementTime / 10;
            timeTakenMillisec = timeLimitMillisec - currentTime;
            if (currentTime < 0) currentTime = 0;
        },
        timerComplete = function () {
            examTimeOut();
        },
        init = function () {
            $countdown = $('#countdown');
            countdownTimer.Timer = $.timer(updateTimer, incrementTime, true);
        };
    this.resetCountdown = function () {
    };
    this.stop = function () {
    };
    this.toggle = function () {
    };
    $(init);
});

function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}
function formatTime(time) {
    var min = parseInt(time / 6000);
    var sec = parseInt(time / 100) - (min * 60);
    //var hundredths = pad(time - (sec * 100) - (min * 6000), 2);
    //return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2) + ":" + hundredths;
    return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2);
}

var getExamPaperBody = function () {
    $('.examBody').empty();
    $.ajax({
        type: "POST"
        , url: context+"/TDCS/exam/getExamBody"
        , async: false
        , data: {
            paperId: $('.examHead').attr('paperId')
        }
        , success: function (questionList) {
            var questionNo = 1;

            questionList.forEach(function (question) {
                var appendString = "";

                appendString +=
                    '<div class="row questionContainer" questionId="' + question.id + '" questionNo = "' + questionNo + '">' +
                    '<div class="panel panel-default">' +
                    '<div class="panel-body">' +
                    '<div class="row">' +
                    '<div class="col-md-10 col-md-offset-1">' +
                    'ข้อที่ ' + questionNo + '.&nbsp;<h5>' + question.description + '</h5>' +
                    '</div>' +
                    '</div>'


                if (question.questionType.id == 1) {
                    var choiceNo = 1;

                    question.choices.forEach(function (c) {

                        var choiceLabel
                        switch (choiceNo) {
                            case 1:
                                choiceLabel = 'ก'
                                break;
                            case 2:
                                choiceLabel = 'ข'
                                break;
                            case 3:
                                choiceLabel = 'ค'
                                break;
                            case 4:
                                choiceLabel = 'ง'
                                break;
                            default :
                                choiceLabel = 'ฮ'
                        }
                        if (c.status.id == 3) {
                            appendString +=
                                '<div class="row">' +
                                '<div class="col-md-10 col-md-offset-1">' +
                                '<form role="form">' +
                                '<div class="radio">' +
                                '<label><input class="answer" type="radio" name="' + question.id + '" value="' + c.id + '">' +
                                choiceLabel + '.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + c.description + '</label>' +
                                '</div>' +
                                '</form>' +
                                '</div>' +
                                '</div>'
                            choiceNo++;
                        }

                    })
                }
                else {
                    appendString +=
                        '<div class="row">' +
                        '<div class="col-md-10 col-md-offset-1">' +
                        '<textarea class="answer form-control subjectiveAnswer" cols="100%" rows="5" placeholder=""' +
                        'style="resize: none" name="' + question.id + '"></textarea>' +
                        '</div>' +
                        '</div>'
                }

                $('#examBody').append(appendString);
                questionNo++;

            })
        }, error: function () {
            console.log('doExam.js : getExamPaperBody Failed');
        }
    })
}

function answerRecord(questionId, answerObj, answerSubj) {
    this.questionId = questionId;
    this.answerObjective = answerObj;
    this.answerSubjective = answerSubj;
}

var submitExam = function () {
    var Questions = $('#examBody .questionContainer')

    var answerArray = [];

    $.each(Questions, function (index, value) {
        var questionId = $(this).attr('questionId');
        var answerObj = 0
        var answerSubj = null
        var questionType = 0
        if ($(this).find('input').length > 0) {
            questionType = 1
        }
        if (questionType == 1) {
            answerObj = $(this).find('input:checked').val()
        } else {
            answerSubj = $(this).find('textarea').val()
        }
        answerArray.push(new answerRecord(questionId, answerObj, answerSubj))
    })

    $.ajax({
        type: "POST"
        , async: false
        , url: context+"/TDCS/exam/submitExam"
        , data: {
            answerRecords: JSON.stringify(answerArray)
            , paperId: $('#examHead').attr('paperId')
            , timeTaken: parseInt(timeTakenMillisec / 60 / 100)
        }
        , success: function () {
            alert('บันทึกข้อมูลสำเร็จ')
            location.href = "/TDCS/home.html"
        }
        , error: function () {
            alert('บันทึกข้อมูลล้มเหลว')
        }
    })
}
