<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require '/src/PHPMailer/srs/Exception.php';
    require '/src/PHPMailer/srs/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguege('ru', 'phpmailer/language/');
    $mail->IsHTML(true);

    //От кого письмо
    $mail->setFrom('svetlaya_st@list.ru', 'Сайт-визитка');
    //Кому отправить 
    $mail->addAddress('svetlaya_st@list.ru');
    //Тема письма 
    $mail->Subject = 'НОВОЕ ОБРАЩЕНИЕ НА САЙТЕ';

    //Тело письма
    $body = '<h1>Новый запрос на обратную связь на сайте:</h1>';

    if(trim(!empty($_POST['tel']))) {
        $body.='<p><strong>Телефон:</strong> '.$_POST['tel'].'</p>';
    }
    if(trim(!empty($_POST['select-category']))) {
        $body.='<p><strong>Способ связи:</strong> '.$_POST['select-category'].'</p>';
    }


    $mail->Body = $body;

    //Отправляем 
    if (!$mail->send()) {
        $message = 'Ошибка';
    } else {
        $message = 'Данные отправлены. Спасибо за обращение! Я свяжусь с вами в течение суток.';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>    