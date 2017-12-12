<h2 class="page-title show" style="margin-bottom:30px">Dashboard - Manage node</h2>


<div class="nav-tabs-custom">
    <ul class="nav nav-tabs">
        <li class="stat active"><a href="#stat" data-toggle="tab" aria-expanded="false">Thống kê</a></li>
        <li class="edit"><a href="#edit" data-toggle="tab" aria-expanded="true">Sửa thông tin</a></li>
    </ul>

    <div class="tab-content">
        <div class="tab-pane active" id="stat">
            <div class="col-lg-6 chart">
                <canvas id="areaChart" style="height:200px"></canvas>
            </div>
            <div class="col-lg-6 chart">
                <canvas id="lineChart" style="height:200px"></canvas>
            </div>
            <div class="clearfix"></div>

            <div class="stat-ratings" style="margin-top:50px">
                <?php include 'node.ratings.php' ?>
            </div>
        </div>

        <div class="tab-pane hide" id="edit">
            <?php include 'node.edit.form.php' ?>
        </div>
    </div>
</div>

<style>#map-search-form{position:relative!important}
.ratings-more{float:none}
.tab-content{padding:20px}</style>
