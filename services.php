<?php
require_once './model/model.php';

$res=Model::fetchAll('select * from tempdata');
print_r($res);

$_REQUEST['req'];
$req=json_decode($_REQUEST['req']);
print_r($req);
print_r($_SERVER['AUTH_USER']);
?>