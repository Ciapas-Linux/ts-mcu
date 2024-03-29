/*==RESIZE CANVAS TO MAINTAIN PROPORTION ==*/
	    var fixDimensions = function(){
	    
		    //Get the image dimensions:
		    var image = {
		        width: $("canvas").width(),    
		        height: $("canvas").height()
		    };
		    
		    //Get the page dimensions:
		    var page = {
		        width:$(window).width(),
		        height:$(window).height()
		    };
		    
		    //Get the image ratio, this is what we want to preserve:
		    var imageRatio = image.width/image.height;
		    
		    //Get the page ratio, this is what we use to decide which dimension to fix:
		    var pageRatio = page.width/page.height;
		    
		    //Do we fix the height? (if not, we fix the width)
		    var fixHeight = (imageRatio > pageRatio);
		    
		    //Create a place to store the new image dimensions:
		    var newImage = {
		        left:0,
		        top:0,
		        width:0,
		        height:0
		    };
		    
		    //Do the calculations:
		    if (fixHeight){
		        newImage.height = page.height;
		        newImage.width = page.height * imageRatio;
		        //The height matches the page height, so we need to center
		        //the width.
		        newImage.left = -(newImage.width - page.width) / 2;
		    } else {
		        newImage.height = page.width / imageRatio;
		        newImage.width = page.width;
		        newImage.top = -(newImage.height - page.height) / 2;
		    
		    }
		    
		    //Now we set the image's new dimensions:
		    $("canvas").css({
		        "position":"absolute",
		        "top":newImage.top + 'px',
		        "left":newImage.left + 'px',
		        "width":newImage.width + 'px',
		        "height":newImage.height + 'px' 
		    });
		
		    console.log(fixHeight, image, page);
	};
	
	fixDimensions();
	$(window).resize(fixDimensions);
/*==RESIZE CANVAS TO MAINTAIN PROPORTION ==*/