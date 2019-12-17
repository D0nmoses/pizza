$(document).ready(function () {


  $("a").click(function (event) {
    event.preventDefault();
  });

  var numOfOrders = 0;
  $(".num").text(numOfOrders);

  // hide dialogs on start
  $("#thanksMessage, #checkOrderMeatDeluxe, #checkOrderVeggie, #checkOrderTikka, #finishOrderDialog").hide();

  $("#addToCartMeatDeluxe").on("click", function () {
		$("#checkOrderMeatDeluxe").dialog({
				hide: "blind",
            	show : "blind",
            	width: "400px",
              closeText: "X"});
  })
  
  $("#addToCartVeggie").on("click", function () {
		$("#checkOrderVeggie").dialog({
				hide: "blind",
            	show : "blind",
            	width: "400px",
              closeText: "X"});
  })
  
  $("#addToCartTikka").on("click", function () {
		$("#checkOrderTikka").dialog({
				hide: "blind",
            	show : "blind",
            	width: "400px",
              closeText: "X"});
  })
  
  function checkboxChange(x) {
		var priceDialog = 0;
		$("#pizza"+x).children("li").children("input").each(function () {
			if($(this).is(":checked")){
				priceDialog+=3;
			}
				$("#totalDialog"+x+">span").text(priceDialog);
			$(this).change(function () {
				if ($(this).is(":checked")) {
					priceDialog += 3;
					console.log(priceDialog);
					$("#totalDialog"+x+">span").text(priceDialog);
				}else{
					priceDialog -= 3;
					$("#totalDialog"+x+">span").text(priceDialog);
				}
			})
		});
	}

	$('#pizza1').children('li').click(checkboxChange(1));
	$('#pizza2').children('li').click(checkboxChange(2));
  $('#pizza3').children('li').click(checkboxChange(3));
  
  $(".addIngredient").on("click", function () {
		// Creates input field and two buttons for adding an ingrediant that's not on the list
		var inputIng = '<input type="text" id="newIngredient">';
		var confirmInput = '<a class="btnStyle3 btnStyle confirmInput">&#10004;</a>';
		var cancelInput = '<a class="btnStyle3 btnStyle cancelInput">&#10008;</a>';
		var inputWrap = '<div class="addIngredientWrap">' + inputIng + confirmInput + cancelInput + '</div>'
		$(this).parent().children("ul").after(inputWrap);
    $("#newIngredient").focus();
    $("#newIngredient").attr("placeholder", "separate ingredients with a comma");

    $(".addIngredientWrap > .confirmInput").on("click", function () {
			if ($("#newIngredient").val() != "") {
        //split takes the value of the input and splits it into separate array elements after every comma
				var newIngredient = ($(".addIngredientWrap input").val()).split(",");
				var newCheckbox = '<input type="checkbox" checked>';
        
        for (var i = 0; i < newIngredient.length; i++){
         $(this).parent().siblings("ul").append("<li>" + newCheckbox + newIngredient[i] + "  (+3$)</li>");
        }
				

				$('#pizza1').children('li').click(checkboxChange(1));
				$('#pizza2').children('li').click(checkboxChange(2));
				$('#pizza3').children('li').click(checkboxChange(3));

				$(this).parent().remove();
			}else{
				$("#newIngredient").attr("placeholder", "Please add ingrediant");
			}
    });
    // Remove button hides the input
		$(".addIngredientWrap > .cancelInput").on("click", function () {
			$(this).parent().remove();
		})
  })
  // add ingredients button
  $(".listOver").on("click", function () {
		var orderName = '<h3 class="orderName"><span>' + $(this).parent().siblings(".ui-dialog-titlebar").children("span").text() + '</span><a class="delBtn">&#10008;</a>' +'</h3>';
		var orderIngredients = '<ul class="orderIngredients"></ul>';
		var orderPrice = '<h3 class="orderPrice"><span>' + $(this).parent().children(".totalDialog").children("span").text() + '</span>$<h3>'
		var horisontalLine = '<hr>';
		$(".cart").children("#listOfOrders").append("<li>" + orderName + orderIngredients + orderPrice + horisontalLine + "</li>");

		$(this).parent().children("ul").children().children("input:checked").each(function () {
			var selectedIngredient = $(this).parent().text();
			$(".orderIngredients").last().append("<li>" + selectedIngredient + "</li>");
    })

    // opens the cart side menu
		if ($('#cartToggle').prop('checked')) {
			$("#cartToggle").prop("checked", true);
		}else{
			$("#cartToggle").prop("checked", true);
		}

		$(this).parent(".ui-dialog-content").dialog("close");

		numOfOrders = $("#listOfOrders").children().length;
		$(".num").text(numOfOrders);

		// display total price in cart orders
		var totalOrderPrice = 0;
		$("#listOfOrders").children("li").children(".orderPrice").children("span").each(function () {
			var price = parseFloat($(this).text());
			totalOrderPrice += price;
			$(".cart > h3 > span").text(totalOrderPrice + "$");
    });
    
    // remove order from cart
		$(".delBtn").on("click", function () {
			var removePrice = $(this).parent().parent().children(".orderPrice").children("span").text();
			totalOrderPrice -= removePrice;
			$(".cart > h3 > span").text(totalOrderPrice + "$");

			$(this).parents("li").remove();
			numOfOrders = $("#listOfOrders").children().length;
			$(".num").text(numOfOrders);
		})
  });
  $(".finishOrder").on("click", function () {
    $("#finalOrderList > ol").children().remove();
   $(".orderName").children("span").each(function(){
     var finalOrder = '<li>' + $(this).text() + '</li>';
     $("#finalOrderList > ol").append(finalOrder);
   })

   $("#finishOrderDialog").dialog({
     hide: "blind",
       show : "blind",
       width: "500px",
       closeText: "X"
     });
 })

 $(".order").on("click", function () {
   var name = $("#buyerName").val();
   var number = $("#buyerNumber").val();
   var address = $("#buyerAddress").val();

   if (name != "" && number != "" && address != "") {
     $("#finishOrderDialog").dialog("close");
     $("#buyerInfo").children("p").remove();
     $("#thanksMessage").dialog({
       hide: "blind",
         show : "blind",
         width: "400px"
       });
       setTimeout(function(){
         $("#thanksMessage").dialog("close");
       }, 3000);
   }else{
     $("#buyerInfo").append('<p>Fill up all the inputs</p>');
   }
 })

})