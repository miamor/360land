<?php 
$pageTitle = 'Gửi phản hồi';
$config->addJS('dist', $page.'/form.js');

include 'templates/header.php';
?>

<h2 class="page-title show">Send feedback</h2>

<form id="theform" class="change-info">
    <div class="form-group">
        <div class="col-lg-3 control-label">Title</div>
        <div class="col-lg-9">
            <input type="text" name="title" class="form-control"/>
        </div>
        <div class="clearfix"></div>
    </div>

    <div class="form-group">
        <div class="col-lg-3 control-label">Content</div>
        <div class="col-lg-9">
            <textarea name="details" class="form-control"></textarea>
        </div>
        <div class="clearfix"></div>
    </div>

    <div class="form-group">
        <div class="col-lg-3 control-label">Email</div>
        <div class="col-lg-9">
            <input type="email" name="email" class="form-control"/>
        </div>
        <div class="clearfix"></div>
    </div>


    <div class="add-form-submit center">
        <input value="Reset" class="btn btn-default" type="reset">
        <input value="Submit" class="btn btn-primary" type="submit">
    </div>

</form>

<div class="clearfix"></div>
