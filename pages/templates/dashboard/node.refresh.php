<form id="theform" class="place-add">
    <h4 class="page-title with-border show"><i class="fa fa-map-marker"></i> Refresh bài đăng</h4>
    <div class="add-form-content">
        <div class="form-group rank-select" attr-required="1">
            <div class="col-md-4 no-padding control-label">Chọn gói </div>
            <div class="col-md-8 no-padding">
                <div class="rank-one-select active" attr-rank="0">
                    <div class="rank-one-des">Blah blah </div>
                    <div class="rank-one-title">Gói thường</div>
                </div>
                <div class="rank-one-select" attr-rank="1">
                    <div class="rank-one-des">Bleh bleh</div>
                    <div class="rank-one-title">Gói vip</div>
                </div>
                <div class="clearfix"></div>
            </div>
            <input type="hidden" name="rank" id="rank" value="0"/>
            <div class="clearfix"></div>
        </div>
        
        <div class="form-group form-time" attr-required="1">
            <div class="col-md-4 no-padding control-label"><i class="fa fa-calendar"></i> Từ </div>
            <div class="col-md-3 no-padding">
                <input class="form-control" type="date" name="timefrom" id="timefrom">
            </div>
            <div class="col-md-1 no-padding control-label text-center">đến</div>
            <div class="col-md-3 no-padding">
                <input class="form-control" type="date" name="timeto" id="timeto">
            </div>
            <div class="clearfix"></div>
        </div>


        <div class="add-form-submit center">
            <input value="Làm lại" class="btn btn-default" type="reset">
            <input value="Refresh bài đăng" class="btn btn-primary" type="submit">
        </div>
    </div>
</form>