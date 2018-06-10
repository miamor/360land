(function($){

	jQuery.event.props.push("dataTransfer");
	var pluginName = 'UploadImages',
		opts = {},
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
		errors = ["BrowserNotSupported", "TooManyFiles", "FileTooLarge", "NoFileSelected"],
		doc_leave_timer,
		stop_loop = false,
		files_count = 0,
		files;

    function UploadImages(element, options) {
        this.element = element;

        opts = this.options = $.extend( {}, default_opts, options) ;

        this._defaults = default_opts;
        this._name = pluginName;
		
        this.init();
    }

    UploadImages.prototype.init = function () {
		var __this = this;
		var $this = $(this.element);

		if (this.options.dragable) {
			$this.bind('drop', function (e) {
				__this.drop(e, __this.options)
			}).bind('dragenter', function (e) {
				__this.dragEnter(e, __this.options)
			}).bind('dragover', function (e) {
				__this.dragOver(e, __this.options)
			}).bind('dragleave', function (e) {
				__this.dragLeave(e, __this.options)
			});

			$(document).bind('drop', function (e) {
				__this.docDrop(e, __this.options)
			}).bind('dragenter', function (e) {
				__this.docEnter(e, __this.options)
			}).bind('dragover', function (e) {
				__this.docOver(e, __this.options)
			}).bind('dragleave', function (e) {
				__this.docLeave(e, __this.options)
			});
		}
		
		$this.on('click', function () {
			if (__this.options.maxfiles == 1 && $this.find('.remove-thumb').length) {
				$this.find('.remove-thumb').click();
			}
			$(this).find('.up-file-input').click();
		}).find('.up-file-input, .remove-thumb').on('click', function (event) {
			event.stopPropagation();
		});
		$this.find('.up-file-input').change(function (e) {
			__this.select(e);
		});
    };

	UploadImages.prototype.select = function (e) {
		//console.log('select e');
		//console.log(e);
		files = e.target.files;
		if (files === null || files === undefined) {
			this.options.error(errors[3]);
			return false;
		}
		
		files_count = files.length;
		this.upload(files);
		return false;
	}
     
	UploadImages.prototype.drop = function (e, options) {
		//console.log('drop e');
		//console.log(e);
		options.drop(e);
		files = e.dataTransfer.files;
		if (files === null || files === undefined) {
			options.error(errors[0]);
			return false;
		}
		
		files_count = files.length;
		this.upload(files);
		e.preventDefault();
		return false;
	}
	
	UploadImages.prototype.getBuilder = function(filename, filedata, boundary) {
		var dashdash = '--',
			crlf = '\r\n',
			builder = '';

		$.each(this.options.data, function(i, val) {
	    	if (typeof val === 'function') val = val();
			builder += dashdash;
			builder += boundary;
			builder += crlf;
			builder += 'Content-Disposition: form-data; name="'+i+'"';
			builder += crlf;
			builder += crlf;
			builder += val;
			builder += crlf;
		});
		
		builder += dashdash;
		builder += boundary;
		builder += crlf;
		builder += 'Content-Disposition: form-data; name="'+this.options.paramname+'"';
		builder += '; filename="' + filename + '"';
		builder += crlf;
		
		builder += 'Content-Type: application/octet-stream';
		builder += crlf;
		builder += crlf; 
		
		builder += filedata;
		builder += crlf;
        
		builder += dashdash;
		builder += boundary;
		builder += dashdash;
		builder += crlf;
		return builder;
	}

	UploadImages.prototype.progressBar = function (e, options, index, file) {
		if (e.lengthComputable) {
			var percentage = Math.round((e.loaded * 100) / e.total);
			if (this.currentProgress != percentage) {
				
				this.currentProgress = percentage;
				options.progressUpdated(index, file, this.currentProgress);
				
				var elapsed = new Date().getTime();
				var diffTime = elapsed - this.currentStart;
				if (diffTime >= options.refresh) {
					var diffData = e.loaded - this.startData;
					var speed = diffData / diffTime; // KB per second
					options.speedUpdated(this.index, this.file, speed);
					this.startData = e.loaded;
					this.currentStart = elapsed;
				}
			}
		}
	}
    
    
	UploadImages.prototype.upload = function(files) {
		stop_loop = false;
		if (!files) {
			this.options.error(errors[0]);
			return false;
		}
		var filesDone = 0,
			filesRejected = 0;

		if (files_count > this.options.maxfiles) {
		    this.options.error(errors[1]);
		    return false;
		}
		var __this = this;

		for (var i=0; i<files_count; i++) {
			if (stop_loop) return false;
			try {
				if (__this.beforeEach(files[i]) != false) {
					if (i === files_count) return;
					var reader = new FileReader(),
						max_file_size = 1048576 * __this.options.maxfilesize;
						
					reader.index = i;
					if (files[i].size > max_file_size) {
						__this.options.error(errors[2], files[i], i);
						filesRejected++;
						continue;
					}
					
					reader.onloadend = send;
					reader.readAsBinaryString(files[i]);
				} else {
					filesRejected++;
				}
			} catch(err) {
				__this.options.error(errors[0]);
				return false;
			}
		}

		function send(e) {
			// Sometimes the index is not attached to the
			// event object. Find it by size. Hack for sure.
			if (e.target.index == undefined) {
				e.target.index = __this.getIndexBySize(e.total);
			}

			var xhr = new XMLHttpRequest(),
				upload = xhr.upload,
				file = files[e.target.index],
				index = e.target.index,
				start_time = new Date().getTime(),
				boundary = '------multipartformboundary' + (new Date).getTime(),
				builder;
				
			newName = __this.rename(file.name);
			if (typeof newName === "string") {
				builder = __this.getBuilder(newName, e.target.result, boundary);
			} else {
				builder = __this.getBuilder(file.name, e.target.result, boundary);
			}
			
			upload.index = index;
			upload.file = file;
			upload.downloadStartTime = start_time;
			upload.currentStart = start_time;
			upload.currentProgress = 0;
			upload.startData = 0;
			upload.addEventListener("progress", function (evt) {
				__this.progressBar(evt, __this.options, index, file)
			}, false);
			
			xhr.open("POST", __this.options.url, true);
			xhr.setRequestHeader('content-type', 'multipart/form-data; boundary=' 
			    + boundary);
			xhr.setRequestHeader('Authorization', __this.options.token);

			xhr.sendAsBinary(builder);  
			
			__this.options.uploadStarted(index, file, files_count);  
			
			xhr.onload = function() { 
			    if (xhr.responseText) {
				var now = new Date().getTime(),
				    timeDiff = now - start_time,
					
					result = __this.options.uploadFinished(index, file, jQuery.parseJSON(xhr.responseText), timeDiff);

					filesDone++;
					if (filesDone == files_count - filesRejected) {
						__this.afterAll();
					}
			    if (result === false) stop_loop = true;
			    }
			};
		}
	}
    
	UploadImages.prototype.getIndexBySize = function (size) {
		for (var i=0; i < files_count; i++) {
			if (files[i].size == size) {
				return i;
			}
		}
		
		return undefined;
	}
    
	UploadImages.prototype.rename = function (name) {
		return this.options.rename(name);
	}
	
	UploadImages.prototype.beforeEach = function (file) {
		return this.options.beforeEach(file);
	}
	
	UploadImages.prototype.afterAll = function() {
		return this.options.afterAll();
	}
	
	UploadImages.prototype.dragEnter = function(e, options) {
		clearTimeout(doc_leave_timer);
		e.preventDefault();
		e.currentTarget.classList.add("dragover");
		options.dragEnter(e);
	}
	
	UploadImages.prototype.dragOver = function(e, options) {
		clearTimeout(doc_leave_timer);
		e.preventDefault();
		options.docOver(e);
		options.dragOver(e);
	}
	 
	UploadImages.prototype.dragLeave = function(e, options) {
		clearTimeout(doc_leave_timer);
		options.dragLeave(e);
		e.currentTarget.classList.remove("dragover");
		e.stopPropagation();
	}
	 
	UploadImages.prototype.docDrop = function(e, options) {
		e.preventDefault();
		options.docLeave(e);
		return false;
	}
	 
	UploadImages.prototype.docEnter = function(e, options) {
		clearTimeout(doc_leave_timer);
		e.preventDefault();
		options.docEnter(e);
		return false;
	}
	 
	UploadImages.prototype.docOver = function(e, options) {
		clearTimeout(doc_leave_timer);
		e.preventDefault();
		options.docOver(e);
		return false;
	}
	 
	UploadImages.prototype.docLeave = function(e, options) {
		doc_leave_timer = setTimeout(function(){
			options.docLeave(e);
		}, 200);
	}
	 
	UploadImages.prototype.empty = function(){}

	function empty () {}
	
	try {
		if (XMLHttpRequest.prototype.sendAsBinary) return;
		XMLHttpRequest.prototype.sendAsBinary = function(datastr) {
		    function byteValue(x) {
		        return x.charCodeAt(0) & 0xff;
		    }
		    var ords = Array.prototype.map.call(datastr, byteValue);
		    var ui8a = new Uint8Array(ords);
		    this.send(ui8a.buffer);
		}
	} catch(e) {}


	$.fn['UploadImages'] = function(options) {
		return this.each(function () {
			/*if (!$.data(this, 'dropbox')) {
                //$.data(this, 'dropbox', new UploadImages(this, options));
				this.UploadImages(options)
			}*/
			new UploadImages(this, options)
		})
	}

})(jQuery);