(function ($) {
	jQuery.event.props.push("dataTransfer");
	var opts = {},
		default_opts = {
			url: '',
			refresh: 1000,
			paramname: 'userfile',
			maxfiles: 25,
			maxfilesize: 1, // MBs
			data: {},
			token: empty,
			drop: empty,
			dragEnter: empty,
			dragOver: empty,
			dragLeave: empty,
			docEnter: empty,
			docOver: empty,
			docLeave: empty,
			beforeEach: empty,
			afterAll: empty,
			rename: empty,
			error: function(err, file, i){alert(err);},
			uploadStarted: empty,
			uploadFinished: empty,
			progressUpdated: empty,
			speedUpdated: empty
		},
		errors = ["BrowserNotSupported", "TooManyFiles", "FileTooLarge"],
		doc_leave_timer,
		stop_loop = false,
		files_count = 0,
		files;

	UploadImages = function (options) {
		var $this = this;
		opts = $.extend( {}, default_opts, options );

		this.initialize = function () {		
			/*this.bind('drop', $this.drop).bind('dragenter', $this.dragEnter).bind('dragover', $this.dragOver).bind('dragleave', $this.dragLeave);
			$(document).bind('drop', $this.docDrop).bind('dragenter', $this.docEnter).bind('dragover', $this.docOver).bind('dragleave', $this.docLeave);*/
			
			$this.on('click', function () {
				console.log($this);
				$(this).find('.up-file-input').click();
			}).find('.up-file-input, .remove-thumb').on('click', function (event) {
				event.stopPropagation();
			});
			$this.find('.up-file-input').change(function (e) {
				$this.select(e);
			});	
		}

		this.select = function (e) {
			console.log(e)
		}

        return this;
    }
    $.fn.UploadImages = UploadImages
}(jQuery));
